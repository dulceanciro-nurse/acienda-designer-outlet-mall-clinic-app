import React, { useState, useEffect } from 'react';

// PRE-DEFINED CLINIC STAFF ACCOUNTS LIST
const STAFF_ACCOUNTS = [
  { username: 'glecenda.rn', password: 'nursepassword1', name: 'Glecenda Anciro, RN, RM, OHN', role: 'Nurse' },
  { username: 'lea.loyola', password: 'aiderpassword2', name: 'Lea Loyola', role: '1st Aider' },
  { username: 'marie.estiller', password: 'aiderpassword3', name: 'Marie Estiller', role: '1st Aider' },
  { username: 'michelle.v', password: 'aiderpassword4', name: 'Michelle Villaviza', role: '1st Aider' },
  { username: 'reginald.u', password: 'aiderpassword5', name: 'Reginald Unawa', role: '1st Aider' },
  { username: 'migo.medina', password: 'aiderpassword6', name: 'Migo Medina', role: '1st Aider' },
];

export default function MallClinicPortal() {
  const [activeTab, setActiveTab] = useState('job-order');
  const [currentTime, setCurrentTime] = useState('');

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [loginCreds, setLoginCreds] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');

  // Queue List State with Type of Report tracking & SOAP details
  const [queueList, setQueueList] = useState([
    {
      ticketNo: 'Q-014',
      fullName: 'Maria Santos',
      category: 'Mall Tenant Staff / Employee',
      department: 'Starbucks - GF',
      contactNumber: '0917-123-4567',
      chiefComplaint: 'Slight dizziness, fatigue, and mild tension headache during shift.',
      reportType: 'Illness',
      status: 'Completed',
      disposition: 'RTW with instruction',
      dateOfAssessment: '2026-11-01 09:30 AM',
      completionDate: '2026-11-01 10:15 AM',
      vitals: { bp: '120/80 mmHg', hr: '78 bpm', temp: '36.5 °C', spo2: '98% SpO2' },
      soap: {
        subjective: 'Patient reports mild headache and dizziness after standing for long hours.',
        objective: 'Alert, coherent, vitals stable within normal limits.',
        assessment: 'Tension headache secondary to fatigue.',
        plan: 'Administered Paracetamol 500mg. Advised 15 mins rest in clinic.'
      }
    },
    {
      ticketNo: 'Q-015',
      fullName: 'Juan dela Cruz',
      category: 'Mall Shopper / Visitor',
      department: 'Guest (Government ID Verified)',
      contactNumber: '0918-987-6543',
      chiefComplaint: 'Minor laceration on right index finger from display glass.',
      reportType: 'Accident',
      status: 'Waiting',
      disposition: 'Pending',
      dateOfAssessment: '2026-11-02 02:10 PM',
      completionDate: '-',
      vitals: { bp: '130/85 mmHg', hr: '82 bpm', temp: '36.8 °C', spo2: '99% SpO2' },
      soap: { subjective: '', objective: '', assessment: '', plan: '' }
    }
  ]);

  // Selected Patient for Triage
  const [selectedTicketNo, setSelectedTicketNo] = useState('Q-014');

  // Form Inputs for Walk-in Intake
  const [intakeForm, setIntakeForm] = useState({
    fullName: '',
    category: 'Mall Tenant Staff / Employee',
    department: '',
    contactNumber: '',
    chiefComplaint: '',
    reportType: 'Illness'
  });

  // Live clock ticker
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  // Auto-logout timer (15 minutes of inactivity)
  useEffect(() => {
    let timer;
    if (isAuthenticated) {
      const resetTimer = () => {
        clearTimeout(timer);
        timer = setTimeout(() => {
          handleLogout();
          alert('Session expired due to inactivity. Please sign in again.');
        }, 15 * 60 * 1000);
      };
      window.addEventListener('mousemove', resetTimer);
      window.addEventListener('keypress', resetTimer);
      resetTimer();
      return () => {
        window.removeEventListener('mousemove', resetTimer);
        window.removeEventListener('keypress', resetTimer);
        clearTimeout(timer);
      };
    }
  }, [isAuthenticated]);

  const handleLogin = (e) => {
    e.preventDefault();
    const matchedStaff = STAFF_ACCOUNTS.find(
      (user) => user.username === loginCreds.username && user.password === loginCreds.password
    );

    if (matchedStaff) {
      setIsAuthenticated(true);
      setCurrentUser({ name: matchedStaff.name, role: matchedStaff.role });
      setLoginError('');
      setActiveTab('triage-portal');
    } else {
      setLoginError('Invalid username or password. Please verify staff credentials.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    setLoginCreds({ username: '', password: '' });
    setActiveTab('job-order');
  };

  // Submit Walk-in Form and add to Queue List
  const handleIntakeSubmit = (e) => {
    e.preventDefault();
    const newTicketNum = `Q-0${queueList.length + 14}`;
    const nowStr = new Date().toLocaleString([], { dateStyle: 'short', timeStyle: 'short' });
    const newPatientRecord = {
      ticketNo: newTicketNum,
      ...intakeForm,
      status: 'Waiting',
      disposition: 'Pending',
      dateOfAssessment: nowStr,
      completionDate: '-',
      vitals: { bp: '120/80 mmHg', hr: '75 bpm', temp: '36.6 °C', spo2: '98% SpO2' },
      soap: { subjective: '', objective: '', assessment: '', plan: '' }
    };

    setQueueList([...queueList, newPatientRecord]);
    setSelectedTicketNo(newTicketNum);
    alert(`Queue Ticket Generated Successfully: ${newTicketNum}`);
    
    setIntakeForm({ fullName: '', category: 'Mall Tenant Staff / Employee', department: '', contactNumber: '', chiefComplaint: '', reportType: 'Illness' });
    setActiveTab('status');
  };

  // Handle saving clinical record with selected disposition & completion date
  const handleSaveRecord = (dispositionType) => {
    const nowStr = new Date().toLocaleString([], { dateStyle: 'short', timeStyle: 'short' });
    setQueueList(queueList.map(p => {
      if (p.ticketNo === selectedTicketNo) {
        return { 
          ...p, 
          status: 'Completed', 
          disposition: dispositionType,
          completionDate: nowStr 
        };
      }
      return p;
    }));
    alert(`Medical record saved for ${currentPatient.fullName}.\nStatus: Completed - ${dispositionType}\nCompletion Date: ${nowStr}`);
  };

  // Generate PDF / Printable Consultation Record for a specific patient
  const generateConsultationPDF = (patient) => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Clinic Consultation Record - ${patient.ticketNo}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 30px; color: #1e293b; line-height: 1.5; }
            .header { text-align: center; border-bottom: 2px solid #2563eb; padding-bottom: 15px; margin-bottom: 20px; }
            .header h2 { margin: 0; color: #0B132B; font-size: 18px; }
            .header p { margin: 4px 0; font-size: 12px; color: #64748b; }
            .section-title { font-size: 13px; font-weight: bold; background: #f1f5f9; padding: 6px 10px; margin-top: 15px; border-left: 4px solid #2563eb; text-transform: uppercase; }
            .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 10px; font-size: 12px; }
            .row { margin-bottom: 8px; font-size: 12px; }
            .label { font-weight: bold; color: #475569; }
            .soap-box { background: #f8fafc; border: 1px solid #cbd5e1; padding: 10px; border-radius: 6px; margin-top: 6px; font-size: 12px; min-height: 40px; }
            .footer { margin-top: 40px; display: flex; justify-content: space-between; font-size: 12px; }
            .signature { border-top: 1px solid #000; width: 220px; text-align: center; padding-top: 5px; margin-top: 40px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h2>AÇIENDA DESIGNER OUTLET MALL • MEDICAL CLINIC</h2>
            <p>Silang, Cavite | Occupational Health Services</p>
            <p><strong>OFFICIAL CLINIC CONSULTATION RECORD</strong></p>
          </div>

          <div class="row"><span class="label">Ticket No:</span> ${patient.ticketNo}</div>
          <div class="row"><span class="label">Date of Assessment:</span> ${patient.dateOfAssessment}</div>
          <div class="row"><span class="label">Completion Date:</span> ${patient.completionDate}</div>

          <div class="section-title">Patient Information</div>
          <div class="grid">
            <div><span class="label">Full Name:</span> ${patient.fullName}</div>
            <div><span class="label">Category:</span> ${patient.category}</div>
            <div><span class="label">Department / Store:</span> ${patient.department}</div>
            <div><span class="label">Contact Number:</span> ${patient.contactNumber}</div>
            <div><span class="label">Report Type:</span> ${patient.reportType}</div>
          </div>

          <div class="section-title">Chief Complaint</div>
          <div class="soap-box">${patient.chiefComplaint || 'None recorded'}</div>

          <div class="section-title">Patient Vitals</div>
          <div class="grid">
            <div><span class="label">Blood Pressure:</span> ${patient.vitals?.bp || 'N/A'}</div>
            <div><span class="label">Heart Rate:</span> ${patient.vitals?.hr || 'N/A'}</div>
            <div><span class="label">Temperature:</span> ${patient.vitals?.temp || 'N/A'}</div>
            <div><span class="label">Oxygen Saturation:</span> ${patient.vitals?.spo2 || 'N/A'}</div>
          </div>

          <div class="section-title">SOAP Assessment & Notes</div>
          <div class="row" style="margin-top: 10px;"><span class="label">Subjective (S):</span></div>
          <div class="soap-box">${patient.soap?.subjective || 'N/A'}</div>
          <div class="row" style="margin-top: 10px;"><span class="label">Objective (O):</span></div>
          <div class="soap-box">${patient.soap?.objective || 'N/A'}</div>
          <div class="row" style="margin-top: 10px;"><span class="label">Assessment (A):</span></div>
          <div class="soap-box">${patient.soap?.assessment || 'N/A'}</div>
          <div class="row" style="margin-top: 10px;"><span class="label">Plan & Treatment (P):</span></div>
          <div class="soap-box">${patient.soap?.plan || 'N/A'}</div>

          <div class="row" style="margin-top: 15px;"><span class="label">Clinical Disposition:</span> <strong>${patient.disposition}</strong></div>

          <div class="footer">
            <div>
              <p>Status: <strong>${patient.status}</strong></p>
            </div>
            <div style="text-align: center;">
              <div class="signature">Glecenda Anciro, RN, RM, OHN<br/>Attending Occupational Health Nurse</div>
            </div>
          </div>

          <script>
            window.onload = function() { window.print(); }
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  // Export Monthly Clinic Report to CSV
  const exportToCSV = () => {
    const headers = ['Ticket No', 'Full Name', 'Category', 'Department / Store', 'Report Type', 'Chief Complaint', 'Status', 'Disposition', 'Assessment Date', 'Completion Date'];
    const rows = queueList.map(p => [
      p.ticketNo,
      `"${p.fullName}"`,
      `"${p.category}"`,
      `"${p.department}"`,
      p.reportType,
      `"${p.chiefComplaint}"`,
      p.status,
      `"${p.disposition}"`,
      `"${p.dateOfAssessment}"`,
      `"${p.completionDate}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Monthly_Clinic_Report_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Helper function to count stats for graphs
  const getCountsBy = (key) => {
    const counts = {};
    queueList.forEach(item => {
      const val = item[key] || 'Unspecified';
      counts[val] = (counts[val] || 0) + 1;
    });
    return counts;
  };

  const currentPatient = queueList.find(p => p.ticketNo === selectedTicketNo) || queueList[0];

  const styles = {
    container: { display: 'flex', minHeight: '100vh', fontFamily: 'Inter, system-ui, sans-serif', backgroundColor: '#f8fafc', color: '#1e293b' },
    sidebar: { width: '280px', backgroundColor: '#0B132B', color: '#ffffff', display: 'flex', flexDirection: 'column', flexShrink: 0 },
    sidebarHeader: { padding: '24px', borderBottom: '1px solid #1e293b', display: 'flex', alignItems: 'center', gap: '12px' },
    logoBox: { width: '40px', height: '40px', backgroundColor: '#2563eb', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '20px', color: '#fff' },
    navSection: { padding: '16px', flex: 1, overflowY: 'auto' },
    navTitle: { fontSize: '10px', fontWeight: 'bold', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px', paddingLeft: '12px' },
    navButton: (active) => ({
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      padding: '10px 14px',
      borderRadius: '10px',
      fontSize: '12px',
      fontWeight: active ? '600' : '500',
      backgroundColor: active ? '#2563eb' : 'transparent',
      color: '#fff',
      border: 'none',
      cursor: 'pointer',
      textAlign: 'left',
      marginBottom: '4px',
      transition: 'background 0.2s'
    }),
    mainWrapper: { flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 },
    header: { height: '64px', backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0', padding: '0 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)' },
    contentArea: { padding: '32px', overflowY: 'auto', flex: 1 },
    card: { backgroundColor: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '24px', boxShadow: '0 1px 3px 0 rgba(0,0,0,0.05)' },
    input: { width: '100%', border: '1px solid #cbd5e1', borderRadius: '10px', padding: '10px 14px', fontSize: '12px', outline: 'none', backgroundColor: '#fff', boxSizing: 'border-box', marginTop: '4px' },
    label: { display: 'block', fontSize: '10px', fontWeight: 'bold', color: '#64748b', textTransform: 'uppercase', marginBottom: '4px' },
    buttonPrimary: { width: '100%', backgroundColor: '#2563eb', color: '#fff', border: 'none', padding: '12px', borderRadius: '10px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer', marginTop: '12px' }
  };

  return (
    <div style={styles.container}>
      {/* SIDEBAR NAVIGATION */}
      <aside style={styles.sidebar}>
        <div style={styles.sidebarHeader}>
          <div style={styles.logoBox}>+</div>
          <div>
            <h1 style={{ fontSize: '11px', fontWeight: '900', margin: 0, letterSpacing: '0.05em' }}>MALL CLINIC PORTAL</h1>
            <p style={{ fontSize: '10px', color: '#94a3b8', margin: 0 }}>Occupational Health & Nurse Desk</p>
          </div>
        </div>

        <div style={styles.navSection}>
          <div style={{ marginBottom: '24px' }}>
            <p style={styles.navTitle}>Patient & Tenant Services</p>
            <button onClick={() => setActiveTab('job-order')} style={styles.navButton(activeTab === 'job-order')}>
              1. Walk-in Intake Entry
            </button>
            <button onClick={() => setActiveTab('status')} style={styles.navButton(activeTab === 'status')}>
              2. Check Ticket / Clearance
            </button>
            <button onClick={() => setActiveTab('consultation-record')} style={styles.navButton(activeTab === 'consultation-record')}>
              3. Clinic Consultation Record Request
            </button>
            <button onClick={() => setActiveTab('osh')} style={styles.navButton(activeTab === 'osh')}>
              4. Report OSH Incident
            </button>
          </div>

          <div>
            <p style={styles.navTitle}>Staff Operational Modules</p>
            <button 
              onClick={() => setActiveTab(isAuthenticated ? 'triage-portal' : 'login')} 
              style={styles.navButton(activeTab === 'triage-portal' || activeTab === 'login')}
            >
              {isAuthenticated ? `Portal Workspace (${currentUser?.role})` : 'Clinic Staff Portal Login'}
            </button>

            {isAuthenticated && (
              <>
                <button 
                  onClick={() => setActiveTab('patient-stats')} 
                  style={styles.navButton(activeTab === 'patient-stats')}
                >
                  📊 Patient Statistic (Queue Log)
                </button>
                <button 
                  onClick={() => setActiveTab('consultation-records-module')} 
                  style={styles.navButton(activeTab === 'consultation-records-module')}
                >
                  🗂️ Clinic Consultation Record (PDF)
                </button>
                <button 
                  onClick={() => setActiveTab('monthly-clinic')} 
                  style={styles.navButton(activeTab === 'monthly-clinic')}
                >
                  📈 Monthly Clinic Report (Graphs)
                </button>
              </>
            )}
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT CONTAINER */}
      <div style={styles.mainWrapper}>
        {/* TOP STATUS HEADER */}
        <header style={styles.header}>
          <div>
            <p style={{ fontSize: '10px', fontWeight: 'bold', color: '#2563eb', margin: 0, letterSpacing: '0.05em' }}>AÇIENDA OUTLET MALL • MEDICAL CLINIC</p>
            <h2 style={{ fontSize: '15px', fontWeight: '900', color: '#1e293b', margin: 0 }}>
              {activeTab === 'job-order' && 'Walk-in Intake Registration'}
              {activeTab === 'status' && 'Ticket & Queue Status Lookup'}
              {activeTab === 'consultation-record' && 'Clinic Consultation Record Request'}
              {activeTab === 'consultation-records-module' && 'Clinic Consultation Records & PDF Generation'}
              {activeTab === 'osh' && 'Occupational Safety & Health Incident Report'}
              {activeTab === 'login' && 'Staff Portal Authentication'}
              {activeTab === 'triage-portal' && `${currentUser?.role} Clinical Workspace`}
              {activeTab === 'patient-stats' && 'Patient Statistic & Queue Status Log'}
              {activeTab === 'monthly-clinic' && 'Monthly Clinic Summary & Graphical Analytics'}
            </h2>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', padding: '6px 12px', borderRadius: '10px', fontSize: '12px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981' }}></span>
              <span style={{ fontWeight: '600', color: '#334155' }}>Clinic Status: <strong style={{ color: '#059669' }}>OPEN</strong></span>
              <span style={{ color: '#cbd5e1' }}>|</span>
              <span style={{ color: '#64748b' }}>
                On Duty: <strong style={{ color: '#334155' }}>{currentUser ? `${currentUser.name} (${currentUser.role})` : 'Glecenda Anciro, RN, RM, OHN'}</strong>
              </span>
            </div>

            <div style={{ backgroundColor: '#eff6ff', border: '1px solid #dbeafe', color: '#1d4ed8', padding: '6px 12px', borderRadius: '10px', fontSize: '12px', fontWeight: 'bold' }}>
              🕒 {currentTime}
            </div>
          </div>
        </header>

        {/* WORKSPACE VIEW AREA */}
        <main style={styles.contentArea}>
          {activeTab === 'job-order' && (
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
              <div style={styles.card}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px', paddingBottom: '16px', borderBottom: '1px solid #f1f5f9' }}>
                  <div style={{ padding: '10px', backgroundColor: '#eff6ff', color: '#2563eb', borderRadius: '10px', fontWeight: 'bold' }}>📋</div>
                  <div>
                    <h3 style={{ fontSize: '13px', fontWeight: 'bold', margin: 0 }}>Clinic Visit Intake Form</h3>
                    <p style={{ fontSize: '11px', color: '#64748b', margin: 0 }}>Fill out basic details to generate a reference queue code for medical assessment.</p>
                  </div>
                </div>

                <form onSubmit={handleIntakeSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={styles.label}>FULL NAME *</label>
                      <input 
                        type="text" 
                        required 
                        value={intakeForm.fullName} 
                        onChange={(e) => setIntakeForm({...intakeForm, fullName: e.target.value})}
                        placeholder="e.g. Juan dela Cruz" 
                        style={styles.input} 
                      />
                    </div>
                    <div>
                      <label style={styles.label}>CATEGORY *</label>
                      <select 
                        value={intakeForm.category} 
                        onChange={(e) => setIntakeForm({...intakeForm, category: e.target.value})}
                        style={styles.input}
                      >
                        <option>Mall Tenant Staff / Employee</option>
                        <option>Mall Shopper / Visitor</option>
                        <option>Maintenance / Contractor</option>
                      </select>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={styles.label}>TENANT STORE / DEPARTMENT / ID</label>
                      <input 
                        type="text" 
                        value={intakeForm.department} 
                        onChange={(e) => setIntakeForm({...intakeForm, department: e.target.value})}
                        placeholder="e.g. Starbucks - GF or Valid ID No." 
                        style={styles.input} 
                      />
                    </div>
                    <div>
                      <label style={styles.label}>CONTACT NUMBER *</label>
                      <input 
                        type="text" 
                        required 
                        value={intakeForm.contactNumber} 
                        onChange={(e) => setIntakeForm({...intakeForm, contactNumber: e.target.value})}
                        placeholder="09XX-XXX-XXXX" 
                        style={styles.input} 
                      />
                    </div>
                  </div>

                  <div>
                    <label style={styles.label}>CHIEF COMPLAINT / VISIT REASON *</label>
                    <textarea 
                      required 
                      rows="3" 
                      value={intakeForm.chiefComplaint} 
                      onChange={(e) => setIntakeForm({...intakeForm, chiefComplaint: e.target.value})}
                      placeholder="Describe symptoms, injury, or clearance requirement..." 
                      style={{ ...styles.input, resize: 'vertical' }}
                    ></textarea>
                  </div>

                  <div>
                    <label style={styles.label}>TYPE OF REPORT *</label>
                    <select 
                      value={intakeForm.reportType} 
                      onChange={(e) => setIntakeForm({...intakeForm, reportType: e.target.value})}
                      style={styles.input}
                    >
                      <option value="Accident">Accident</option>
                      <option value="Illness">Illness</option>
                    </select>
                  </div>

                  <button type="submit" style={styles.buttonPrimary}>
                    Generate Queue Ticket →
                  </button>
                </form>
              </div>

              {/* GUIDELINES PANEL */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div style={{ backgroundColor: '#0B132B', color: '#fff', padding: '24px', borderRadius: '16px', boxShadow: '0 1px 3px 0 rgba(0,0,0,0.05)' }}>
                  <div style={{ color: '#60a5fa', fontWeight: 'bold', fontSize: '12px', marginBottom: '12px' }}>+ Walk-In Guidelines</div>
                  <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '11px', color: '#cbd5e1', lineHeight: '1.6', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <li>Mall clinic manages first aid, medical management, and vitals assessment.</li>
                    <li>Severe emergencies will be stabilized and referred immediately to the nearest hospital.</li>
                    <li>Mall employees must present a valid ADO ID for assistance.</li>
                    <li>Mall guests must present a valid government ID for assistance.</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'status' && (
            <div style={{ maxWidth: '600px', margin: '20px auto' }}>
              <div style={styles.card}>
                <h3 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>Active Queue Waiting List ({queueList.length} Patients)</h3>
                <p style={{ fontSize: '11px', color: '#64748b', marginBottom: '16px' }}>Patients currently registered for medical assessment:</p>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {queueList.map((p) => (
                    <div key={p.ticketNo} style={{ padding: '14px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '4px' }}>
                          <span style={{ fontSize: '12px', fontWeight: '900', color: '#2563eb' }}>{p.ticketNo}</span>
                          <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#0f172a' }}>{p.fullName}</span>
                        </div>
                        <p style={{ fontSize: '11px', color: '#64748b', margin: 0 }}>{p.department} • <em>{p.chiefComplaint}</em></p>
                        <p style={{ fontSize: '10px', color: '#94a3b8', marginTop: '4px' }}>Type: <strong>{p.reportType}</strong> | Assessed: {p.dateOfAssessment}</p>
                      </div>
                      <span style={{ padding: '4px 8px', backgroundColor: p.status === 'Waiting' ? '#fef3c7' : '#d1fae5', color: p.status === 'Waiting' ? '#92400e' : '#065f46', fontSize: '10px', fontWeight: 'bold', borderRadius: '6px' }}>
                        {p.status}
                      </span>
                    </div>
                  ))}
                </div>

                <button onClick={() => setActiveTab('job-order')} style={{ ...styles.buttonPrimary, backgroundColor: '#475569', marginTop: '20px' }}>
                  ← Back to Walk-in Intake Entry
                </button>
              </div>
            </div>
          )}

          {activeTab === 'consultation-record' && (
            <div style={{ maxWidth: '650px', margin: '20px auto' }}>
              <div style={styles.card}>
                <h3 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>Clinic Consultation Record Request</h3>
                <p style={{ fontSize: '11px', color: '#64748b', marginBottom: '16px' }}>Request past consultation notes, medical logs, or treatment records.</p>
                
                <form onSubmit={(e) => { e.preventDefault(); alert("Consultation Record Request Submitted Successfully. Clinic staff will process the medical certificate or notes."); }} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div>
                    <label style={styles.label}>Patient / Employee Full Name *</label>
                    <input type="text" required placeholder="e.g. Maria Santos" style={styles.input} />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                    <div>
                      <label style={styles.label}>Tenant Store / Department *</label>
                      <input type="text" required placeholder="e.g. Starbucks - GF" style={styles.input} />
                    </div>
                    <div>
                      <label style={styles.label}>Date of Consultation / Visit *</label>
                      <input type="date" required style={styles.input} />
                    </div>
                  </div>
                  <div>
                    <label style={styles.label}>Purpose of Request *</label>
                    <select style={styles.input}>
                      <option>Company HR Record / Medical Leave</option>
                      <option>Personal Medical Reference</option>
                      <option>Insurance Claim Support</option>
                    </select>
                  </div>
                  <button type="submit" style={styles.buttonPrimary}>Submit Record Request →</button>
                </form>
              </div>
            </div>
          )}

          {/* CLINIC CONSULTATION RECORDS & PDF GENERATION MODULE */}
          {activeTab === 'consultation-records-module' && isAuthenticated && (
            <div style={{ ...styles.card, maxWidth: '1000px', margin: '0 auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', paddingBottom: '16px', borderBottom: '1px solid #f1f5f9' }}>
                <div>
                  <h3 style={{ fontSize: '14px', fontWeight: 'bold', margin: 0 }}>Clinic Consultation Records & PDF Generation</h3>
                  <p style={{ fontSize: '11px', color: '#64748b', margin: 0 }}>View stored consultation logs and instantly generate official consultation records in PDF format per patient.</p>
                </div>
                <button onClick={() => setActiveTab('triage-portal')} style={{ padding: '6px 12px', backgroundColor: '#2563eb', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer' }}>← Back to Triage Workspace</button>
              </div>

              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#f8fafc', borderBottom: '2px solid #e2e8f0', color: '#475569' }}>
                      <th style={{ padding: '10px' }}>Ticket #</th>
                      <th style={{ padding: '10px' }}>Patient Name</th>
                      <th style={{ padding: '10px' }}>Department / Store</th>
                      <th style={{ padding: '10px' }}>Chief Complaint</th>
                      <th style={{ padding: '10px' }}>Disposition</th>
                      <th style={{ padding: '10px', textAlign: 'center' }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {queueList.map((p) => (
                      <tr key={p.ticketNo} style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '12px 10px', fontWeight: '900', color: '#2563eb' }}>{p.ticketNo}</td>
                        <td style={{ padding: '12px 10px' }}>
                          <strong style={{ display: 'block', color: '#0f172a' }}>{p.fullName}</strong>
                          <span style={{ color: '#64748b', fontSize: '10px' }}>{p.category}</span>
                        </td>
                        <td style={{ padding: '12px 10px', color: '#334155' }}>{p.department}</td>
                        <td style={{ padding: '12px 10px', color: '#b91c1c' }}>{p.chiefComplaint || 'N/A'}</td>
                        <td style={{ padding: '12px 10px', fontWeight: '600' }}>{p.disposition}</td>
                        <td style={{ padding: '12px 10px', textAlign: 'center' }}>
                          <button 
                            onClick={() => generateConsultationPDF(p)} 
                            style={{ padding: '6px 12px', backgroundColor: '#059669', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '10px', fontWeight: 'bold', cursor: 'pointer' }}
                          >
                            📄 Generate PDF
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'login' && !isAuthenticated && (
            <div style={{ maxWidth: '440px', margin: '20px auto' }}>
              <div style={styles.card}>
                <h3 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '4px' }}>Clinic Staff Portal Sign-In</h3>
                <p style={{ fontSize: '11px', color: '#64748b', marginBottom: '16px' }}>Authorized Nurses & First Aiders only.</p>
                
                {loginError && <p style={{ padding: '8px 12px', backgroundColor: '#fee2e2', color: '#b91c1c', fontSize: '11px', borderRadius: '8px', marginBottom: '12px' }}>{loginError}</p>}
                
                <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div>
                    <label style={styles.label}>Username</label>
                    <input type="text" value={loginCreds.username} onChange={(e) => setLoginCreds({...loginCreds, username: e.target.value})} placeholder="e.g. glecenda.rn or lea.loyola" style={styles.input} />
                  </div>
                  <div>
                    <label style={styles.label}>Password</label>
                    <input type="password" value={loginCreds.password} onChange={(e) => setLoginCreds({...loginCreds, password: e.target.value})} placeholder="••••••••" style={styles.input} />
                  </div>
                  <button type="submit" style={styles.buttonPrimary}>Sign In to Workspace</button>
                </form>

                <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid #f1f5f9' }}>
                  <p style={{ fontSize: '10px', fontWeight: 'bold', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '8px' }}>Configured Staff Login Roster:</p>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', fontSize: '10px', color: '#475569' }}>
                    <div style={{ padding: '6px', backgroundColor: '#f1f5f9', borderRadius: '6px' }}><strong>Nurse:</strong> glecenda.rn</div>
                    <div style={{ padding: '6px', backgroundColor: '#f1f5f9', borderRadius: '6px' }}><strong>1st Aider:</strong> lea.loyola</div>
                    <div style={{ padding: '6px', backgroundColor: '#f1f5f9', borderRadius: '6px' }}><strong>1st Aider:</strong> marie.estiller</div>
                    <div style={{ padding: '6px', backgroundColor: '#f1f5f9', borderRadius: '6px' }}><strong>1st Aider:</strong> michelle.v</div>
                    <div style={{ padding: '6px', backgroundColor: '#f1f5f9', borderRadius: '6px' }}><strong>1st Aider:</strong> reginald.u</div>
                    <div style={{ padding: '6px', backgroundColor: '#f1f5f9', borderRadius: '6px' }}><strong>1st Aider:</strong> migo.medina</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* MONTHLY CLINIC REPORT & GRAPHICAL ANALYTICS MODULE */}
          {activeTab === 'monthly-clinic' && isAuthenticated && (
            <div style={{ ...styles.card, maxWidth: '1000px', margin: '0 auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', paddingBottom: '16px', borderBottom: '1px solid #f1f5f9' }}>
                <div>
                  <h3 style={{ fontSize: '14px', fontWeight: 'bold', margin: 0 }}>Monthly Clinic Summary & Graphical Analytics</h3>
                  <p style={{ fontSize: '11px', color: '#64748b', margin: 0 }}>Visual distribution of cases by report type, category, department, chief complaint, and disposition.</p>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button onClick={exportToCSV} style={{ padding: '6px 12px', backgroundColor: '#059669', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer' }}>📥 Export Report (CSV)</button>
                  <button onClick={() => setActiveTab('triage-portal')} style={{ padding: '6px 12px', backgroundColor: '#2563eb', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer' }}>← Back to Triage Workspace</button>
                </div>
              </div>

              {/* Graphical Summaries Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                
                {/* 1. Cases by Type of Report (Accident vs Illness) */}
                <div style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px' }}>
                  <h4 style={{ fontSize: '12px', fontWeight: 'bold', color: '#1e293b', marginBottom: '12px', textTransform: 'uppercase' }}>Cases by Type of Report</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {Object.entries(getCountsBy('reportType')).map(([rep, count]) => {
                      const percentage = Math.round((count / queueList.length) * 100);
                      return (
                        <div key={rep} style={{ fontSize: '11px' }}>
                          <div style={{ display: 'flex', justifyContent: 'between', marginBottom: '2px', fontWeight: '600' }}>
                            <span>{rep}</span>
                            <span>{count} ({percentage}%)</span>
                          </div>
                          <div style={{ width: '100%', height: '8px', backgroundColor: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                            <div style={{ width: `${percentage}%`, height: '100%', backgroundColor: rep === 'Accident' ? '#dc2626' : '#2563eb', borderRadius: '4px' }}></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Cases by Category */}
                <div style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px' }}>
                  <h4 style={{ fontSize: '12px', fontWeight: 'bold', color: '#1e293b', marginBottom: '12px', textTransform: 'uppercase' }}>Cases by Category</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {Object.entries(getCountsBy('category')).map(([cat, count]) => {
                      const percentage = Math.round((count / queueList.length) * 100);
                      return (
                        <div key={cat} style={{ fontSize: '11px' }}>
                          <div style={{ display: 'flex', justifyContent: 'between', marginBottom: '2px', fontWeight: '600' }}>
                            <span>{cat}</span>
                            <span>{count} ({percentage}%)</span>
                          </div>
                          <div style={{ width: '100%', height: '8px', backgroundColor: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                            <div style={{ width: `${percentage}%`, height: '100%', backgroundColor: '#059669', borderRadius: '4px' }}></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 3. Cases by Department / Store */}
                <div style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px' }}>
                  <h4 style={{ fontSize: '12px', fontWeight: 'bold', color: '#1e293b', marginBottom: '12px', textTransform: 'uppercase' }}>Cases by Department / Store</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {Object.entries(getCountsBy('department')).map(([dept, count]) => {
                      const percentage = Math.round((count / queueList.length) * 100);
                      return (
                        <div key={dept} style={{ fontSize: '11px' }}>
                          <div style={{ display: 'flex', justifyContent: 'between', marginBottom: '2px', fontWeight: '600' }}>
                            <span>{dept}</span>
                            <span>{count} ({percentage}%)</span>
                          </div>
                          <div style={{ width: '100%', height: '8px', backgroundColor: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                            <div style={{ width: `${percentage}%`, height: '100%', backgroundColor: '#d97706', borderRadius: '4px' }}></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 4. Clinical Disposition / Instruction Summary */}
                <div style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px' }}>
                  <h4 style={{ fontSize: '12px', fontWeight: 'bold', color: '#1e293b', marginBottom: '12px', textTransform: 'uppercase' }}>Clinical Disposition Summary</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {Object.entries(getCountsBy('disposition')).map(([disp, count]) => {
                      const percentage = Math.round((count / queueList.length) * 100);
                      return (
                        <div key={disp} style={{ fontSize: '11px' }}>
                          <div style={{ display: 'flex', justifyContent: 'between', marginBottom: '2px', fontWeight: '600' }}>
                            <span>{disp}</span>
                            <span>{count}</span>
                          </div>
                          <div style={{ width: '100%', height: '8px', backgroundColor: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                            <div style={{ width: `${percentage}%`, height: '100%', backgroundColor: '#7c3aed', borderRadius: '4px' }}></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* PATIENT STATISTIC & QUEUE LOG MODULE */}
          {activeTab === 'patient-stats' && isAuthenticated && (
            <div style={{ ...styles.card, maxWidth: '1000px', margin: '0 auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', paddingBottom: '16px', borderBottom: '1px solid #f1f5f9' }}>
                <div>
                  <h3 style={{ fontSize: '14px', fontWeight: 'bold', margin: 0 }}>Patient Statistic & Queue Status Registry</h3>
                  <p style={{ fontSize: '11px', color: '#64748b', margin: 0 }}>Overview of all patients and tenants with ticket statuses, dates, and clinical dispositions.</p>
                </div>
                <button onClick={() => setActiveTab('triage-portal')} style={{ padding: '6px 12px', backgroundColor: '#2563eb', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer' }}>← Back to Triage Workspace</button>
              </div>

              {/* Statistics Summary Cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
                <div style={{ backgroundColor: '#eff6ff', padding: '16px', borderRadius: '12px', border: '1px solid #dbeafe' }}>
                  <span style={{ fontSize: '10px', fontWeight: 'bold', color: '#1e40af', textTransform: 'uppercase' }}>Total Registered Tickets</span>
                  <h2 style={{ fontSize: '20px', fontWeight: '900', color: '#1e3a8a', margin: '4px 0 0 0' }}>{queueList.length}</h2>
                </div>
                <div style={{ backgroundColor: '#fef3c7', padding: '16px', borderRadius: '12px', border: '1px solid #fde68a' }}>
                  <span style={{ fontSize: '10px', fontWeight: 'bold', color: '#92400e', textTransform: 'uppercase' }}>Currently Waiting</span>
                  <h2 style={{ fontSize: '20px', fontWeight: '900', color: '#78350f', margin: '4px 0 0 0' }}>{queueList.filter(p => p.status === 'Waiting').length}</h2>
                </div>
                <div style={{ backgroundColor: '#d1fae5', padding: '16px', borderRadius: '12px', border: '1px solid #a7f3d0' }}>
                  <span style={{ fontSize: '10px', fontWeight: 'bold', color: '#065f46', textTransform: 'uppercase' }}>Completed / Disposed</span>
                  <h2 style={{ fontSize: '20px', fontWeight: '900', color: '#064e3b', margin: '4px 0 0 0' }}>{queueList.filter(p => p.status === 'Completed').length}</h2>
                </div>
              </div>

              {/* Detailed Table */}
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#f8fafc', borderBottom: '2px solid #e2e8f0', color: '#475569' }}>
                      <th style={{ padding: '10px' }}>Ticket #</th>
                      <th style={{ padding: '10px' }}>Patient Name & Category</th>
                      <th style={{ padding: '10px' }}>Department / Store</th>
                      <th style={{ padding: '10px' }}>Type</th>
                      <th style={{ padding: '10px' }}>Chief Complaint</th>
                      <th style={{ padding: '10px' }}>Dates (Assessment / Completion)</th>
                      <th style={{ padding: '10px' }}>Queue Status</th>
                      <th style={{ padding: '10px' }}>Clinical Disposition / Instruction</th>
                    </tr>
                  </thead>
                  <tbody>
                    {queueList.map((p) => (
                      <tr key={p.ticketNo} style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '12px 10px', fontWeight: '900', color: '#2563eb' }}>{p.ticketNo}</td>
                        <td style={{ padding: '12px 10px' }}>
                          <strong style={{ display: 'block', color: '#0f172a' }}>{p.fullName}</strong>
                          <span style={{ color: '#64748b', fontSize: '10px' }}>{p.category}</span>
                        </td>
                        <td style={{ padding: '12px 10px', color: '#334155' }}>{p.department}</td>
                        <td style={{ padding: '12px 10px' }}>
                          <span style={{ padding: '2px 6px', backgroundColor: p.reportType === 'Accident' ? '#fee2e2' : '#dbeafe', color: p.reportType === 'Accident' ? '#b91c1c' : '#1d4ed8', borderRadius: '4px', fontWeight: 'bold' }}>
                            {p.reportType}
                          </span>
                        </td>
                        <td style={{ padding: '12px 10px', color: '#b91c1c' }}>{p.chiefComplaint}</td>
                        <td style={{ padding: '12px 10px', color: '#475569', fontSize: '10px' }}>
                          <div><strong>Assessed:</strong> {p.dateOfAssessment}</div>
                          <div><strong>Completed:</strong> {p.completionDate}</div>
                        </td>
                        <td style={{ padding: '12px 10px' }}>
                          <span style={{ padding: '4px 8px', backgroundColor: p.status === 'Waiting' ? '#fef3c7' : '#d1fae5', color: p.status === 'Waiting' ? '#92400e' : '#065f46', borderRadius: '6px', fontWeight: 'bold' }}>
                            {p.status}
                          </span>
                        </td>
                        <td style={{ padding: '12px 10px', fontWeight: '600', color: '#0f172a' }}>
                          {p.disposition === 'Pending' ? <span style={{ color: '#94a3b8', fontStyle: 'italic' }}>Pending Assessment</span> : p.disposition}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'triage-portal' && isAuthenticated && (
            <div style={{ ...styles.card, maxWidth: '900px', margin: '0 auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', paddingBottom: '16px', borderBottom: '1px solid #f1f5f9' }}>
                <div>
                  <h3 style={{ fontSize: '14px', fontWeight: 'bold', margin: 0 }}>{currentUser?.role} Assessment & SOAP Workspace</h3>
                  <p style={{ fontSize: '11px', color: '#64748b', margin: 0 }}>Active Session: <strong>{currentUser?.name}</strong> ({currentUser?.role})</p>
                </div>
                <button onClick={handleLogout} style={{ padding: '6px 12px', backgroundColor: '#fee2e2', color: '#b91c1c', border: 'none', borderRadius: '8px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer' }}>Sign Out</button>
              </div>

              {/* LIVE QUEUE SELECTOR FOR STAFF */}
              <div style={{ backgroundColor: '#eff6ff', border: '1px solid #dbeafe', borderRadius: '12px', padding: '16px', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span style={{ fontSize: '10px', fontWeight: 'bold', color: '#1d4ed8', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>Select Patient from Live Queue ({queueList.filter(p => p.status === 'Waiting').length} Waiting)</span>
                  <select 
                    value={selectedTicketNo} 
                    onChange={(e) => setSelectedTicketNo(e.target.value)}
                    style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #93c5fd', fontSize: '12px', backgroundColor: '#fff', fontWeight: '600', color: '#1e293b' }}
                  >
                    {queueList.map((p) => (
                      <option key={p.ticketNo} value={p.ticketNo}>
                        {p.ticketNo} — {p.fullName} ({p.department}) [{p.reportType}]
                      </option>
                    ))}
                  </select>
                </div>
                <span style={{ padding: '6px 12px', backgroundColor: '#2563eb', color: '#fff', fontSize: '11px', fontWeight: 'bold', borderRadius: '8px' }}>
                  Active Assessment
                </span>
              </div>

              {/* SELECTED PATIENT INFORMATION PANEL */}
              <div style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px', marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{ fontSize: '11px', fontWeight: '900', color: '#2563eb', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Patient Visit Profile • Ticket #{currentPatient.ticketNo}
                  </span>
                  <span style={{ padding: '2px 8px', backgroundColor: currentPatient.reportType === 'Accident' ? '#fee2e2' : '#dbeafe', color: currentPatient.reportType === 'Accident' ? '#b91c1c' : '#1d4ed8', fontSize: '10px', fontWeight: 'bold', borderRadius: '6px' }}>
                    Report Type: {currentPatient.reportType}
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '12px', fontSize: '12px', marginBottom: '12px' }}>
                  <div>
                    <span style={{ fontSize: '10px', color: '#64748b', display: 'block', fontWeight: 'bold' }}>FULL NAME</span>
                    <strong style={{ color: '#0f172a' }}>{currentPatient.fullName}</strong>
                  </div>
                  <div>
                    <span style={{ fontSize: '10px', color: '#64748b', display: 'block', fontWeight: 'bold' }}>CATEGORY</span>
                    <span style={{ color: '#334155' }}>{currentPatient.category}</span>
                  </div>
                  <div>
                    <span style={{ fontSize: '10px', color: '#64748b', display: 'block', fontWeight: 'bold' }}>CONTACT #</span>
                    <span style={{ color: '#334155' }}>{currentPatient.contactNumber}</span>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '12px', fontSize: '12px', paddingTop: '8px', borderTop: '1px dashed #cbd5e1' }}>
                  <div>
                    <span style={{ fontSize: '10px', color: '#64748b', display: 'block', fontWeight: 'bold' }}>TENANT / DEPARTMENT / ID</span>
                    <span style={{ color: '#334155', fontWeight: '600' }}>{currentPatient.department}</span>
                  </div>
                  <div>
                    <span style={{ fontSize: '10px', color: '#64748b', display: 'block', fontWeight: 'bold' }}>CHIEF COMPLAINT / REASON</span>
                    <span style={{ color: '#b91c1c', fontWeight: '500' }}>{currentPatient.chiefComplaint}</span>
                  </div>
                </div>
              </div>

              {/* PATIENT VITALS INTAKE (BP, HR, TEMP, SPO2) */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <h4 style={{ fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase', color: '#334155', margin: 0 }}>Patient Vitals Intake</h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
                  <div>
                    <label style={styles.label}>Blood Pressure</label>
                    <input type="text" defaultValue={currentPatient.vitals?.bp} placeholder="120/80 mmHg" style={styles.input} />
                  </div>
                  <div>
                    <label style={styles.label}>Heart Rate</label>
                    <input type="text" defaultValue={currentPatient.vitals?.hr} placeholder="78 bpm" style={styles.input} />
                  </div>
                  <div>
                    <label style={styles.label}>Temperature</label>
                    <input type="text" defaultValue={currentPatient.vitals?.temp} placeholder="36.5 °C" style={styles.input} />
                  </div>
                  <div>
                    <label style={styles.label}>Oxygen Saturation</label>
                    <input type="text" defaultValue={currentPatient.vitals?.spo2} placeholder="98% SpO2" style={styles.input} />
                  </div>
                </div>
              </div>

              {/* SOAP ASSESSMENT NOTES */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '24px' }}>
                <h4 style={{ fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase', color: '#334155', margin: 0 }}>SOAP Assessment & First Aid Notes</h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <textarea rows="3" defaultValue={currentPatient.soap?.subjective} placeholder="Subjective (S)..." style={styles.input}></textarea>
                  <textarea rows="3" defaultValue={currentPatient.soap?.objective} placeholder="Objective (O)..." style={styles.input}></textarea>
                  <textarea rows="3" defaultValue={currentPatient.soap?.assessment} placeholder="Assessment (A)..." style={styles.input}></textarea>
                  <textarea rows="3" defaultValue={currentPatient.soap?.plan} placeholder="Plan & Clearance (P)..." style={styles.input}></textarea>
                </div>
              </div>

              {/* DISPOSITION BUTTONS (COMPLETED OPTIONS) */}
              <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid #f1f5f9' }}>
                <label style={{ ...styles.label, marginBottom: '8px', color: '#1e293b' }}>Select Completion & Disposition Status upon Saving (Records Completion Date):</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                  <button onClick={() => handleSaveRecord('RTW with instruction')} style={{ padding: '10px', backgroundColor: '#059669', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer' }}>
                    ✓ Completed - RTW with instruction
                  </button>
                  <button onClick={() => handleSaveRecord('Referred to medical doctor for consultation')} style={{ padding: '10px', backgroundColor: '#2563eb', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer' }}>
                    ✓ Completed - Referred to MD for Consultation
                  </button>
                  <button onClick={() => handleSaveRecord('Assist in transport to HOC')} style={{ padding: '10px', backgroundColor: '#d97706', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer' }}>
                    ✓ Completed - Assist in transport to HOC
                  </button>
                  <button onClick={() => handleSaveRecord('Pick up by Silang ERT')} style={{ padding: '10px', backgroundColor: '#dc2626', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer' }}>
                    ✓ Completed - Pick up by Silang ERT
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
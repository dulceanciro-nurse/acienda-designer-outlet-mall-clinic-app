import React, { useState, useEffect } from 'react';

// PRE-DEFINED CLINIC STAFF ACCOUNTS LIST WITH PASSWORDS
const STAFF_ACCOUNTS = [
  { username: 'glecenda.rn', password: 'nursepassword1', name: 'Glecenda Anciro, RN, RM, OHN', role: 'Nurse', fullAccess: true },
  { username: 'lea.loyola', password: 'aiderpassword2', name: 'Lea Loyola', role: '1st Aider', fullAccess: false },
  { username: 'marie.estiller', password: 'aiderpassword3', name: 'Marie Estiller', role: '1st Aider', fullAccess: false },
  { username: 'michelle.v', password: 'aiderpassword4', name: 'Michelle Villaviza', role: '1st Aider', fullAccess: false },
  { username: 'reginald.u', password: 'aiderpassword5', name: 'Reginald Unawa', role: '1st Aider', fullAccess: false },
  { username: 'migo.medina', password: 'aiderpassword6', name: 'Migo Medina', role: '1st Aider', fullAccess: false },
];

const MEDICINE_SUPPLIES_PRICELIST = [
  { name: "ADVIL", price: 8.75 },
  { name: "ALAXAN", price: 8.00 },
  { name: "ALLERTA", price: 23.25 },
  { name: "AMLODIPINE 5MG", price: 6.50 },
  { name: "ARM SLING", price: 39.00 },
  { name: "BAND AID", price: 2.00 },
  { name: "BIOGESIC", price: 4.25 },
  { name: "BUSCOPAN", price: 32.50 },
  { name: "CATAPRES 75MCG", price: 32.25 },
  { name: "CERVICAL COLLAR", price: 600.00 },
  { name: "COTTON BALLS 300PCS/PACK", price: 100.00 },
  { name: "DIATABS", price: 8.00 },
  { name: "EFFICASCENT OIL WITH COTTON", price: 10.00 },
  { name: "ELASTIC BANDAGE (3X5)", price: 54.00 },
  { name: "ELASTIC BANDAGE (4X5)", price: 55.25 },
  { name: "ELICA OINTMENT 5GM/ Caladryl 30ml WITH APPLICATOR", price: 50.00 },
  { name: "EYE DROPS", price: 30.50 },
  { name: "FLAMMAZINE 5grm CREAM WITH APPLICATOR", price: 334.25 },
  { name: "GAUZE BANDAGE 3\"X 10YDS WITH MICROPORE TAPE", price: 25.00 },
  { name: "GAUZE BANDAGE 4\"X 10YDS WITH MICROPORE TAPE", price: 31.00 },
  { name: "HYDRITE SACHET", price: 16.25 },
  { name: "KN95 MASK", price: 25.00 },
  { name: "KREMIL-S", price: 8.75 },
  { name: "MEFENAMIC ACID", price: 5.75 },
  { name: "MUPiROCIN 20MG OINTMENT", price: 349.75 },
  { name: "N95 Mask", price: 90.00 },
  { name: "NEBULIZER KIT ADULT WITH NSS", price: 100.00 },
  { name: "NEBULIZER KIT PEDIA WITH NSS", price: 90.00 },
  { name: "NECK BRACE", price: 750.00 },
  { name: "NEEDLE G 21", price: 0.00 },
  { name: "NEOZEP(NO DROWSE)", price: 7.75 },
  { name: "OXYGEN MASK ADULT WITH O2 INHALATION", price: 100.00 },
  { name: "OXYGEN MASK PEDIA WITH O2 INHALATION", price: 100.00 },
  { name: "OXYGEN NASAL CANNULA(ADULT) WITH O2 INHALATION", price: 100.00 },
  { name: "OXYGEN NASAL CANNULA(PEDIA) WITH O2 INHALATION", price: 100.00 },
  { name: "SALONPAS PATCHES", price: 6.88 },
  { name: "SERC 16MG(EXIGO)", price: 63.25 },
  { name: "Solmux 500MG", price: 10.50 },
  { name: "STERILE GAUZE 2X2", price: 4.50 },
  { name: "STERILE GAUZE 4X4", price: 6.15 },
  { name: "STERILE Gloves", price: 25.00 },
  { name: "STREPSILS ORIGINAL 8PCS/PACK", price: 9.25 },
  { name: "TONGUE DEPRESSOR", price: 10.00 },
  { name: "Triangular Bandage", price: 108.00 },
  { name: "T-SYRINGE", price: 11.50 },
  { name: "VENTOLIN NEBULES", price: 55.00 },
  { name: "WHITE FLOWER WITH COTTON BALLS", price: 30.50 },
  { name: "Vicks 5gm Ointment WITH APPLICATOR", price: 10.00 },
  { name: "Wound Dressing-Minor", price: 100.00 },
  { name: "Wound Dressing-Major", price: 200.00 },
  { name: "Pressure Dressing Kit-Minor Active Bleeding", price: 300.00 },
  { name: "Pressure Dressing Kit-Major Active Bleeding", price: 500.00 },
  { name: "Burn-Minor TX", price: 100.00 },
  { name: "Burn-Major TX", price: 300.00 },
  { name: "Facemask", price: 20.00 }
];

export default function MallClinicPortal() {
  const [currentUser, setCurrentUser] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [selectedStaffIndex, setSelectedStaffIndex] = useState(0);
  const [passwordInput, setPasswordInput] = useState('');

  const [activeTab, setActiveTab] = useState('job-order');
  const [currentTime, setCurrentTime] = useState('');

  // INDEPENDENT DATE RANGE STATES FOR EXPORTS
  const [statStartDate, setStatStartDate] = useState('2026-11-01');
  const [statEndDate, setStatEndDate] = useState('2026-11-30');

  const [medStartDate, setMedStartDate] = useState('2026-11-01');
  const [medEndDate, setMedEndDate] = useState('2026-11-30');

  const [oshStartDate, setOshStartDate] = useState('2026-11-01');
  const [oshEndDate, setOshEndDate] = useState('2026-11-30');

  const [calStartDate, setCalStartDate] = useState('2026-11-01');
  const [calEndDate, setCalEndDate] = useState('2026-11-30');

  const [queueList, setQueueList] = useState([
    {
      ticketNo: 'Q-01',
      fullName: 'mika',
      category: 'Mall Tenant Staff / Employee',
      department: 'nike',
      contactNumber: '09560015266',
      chiefComplaint: 'headache',
      reportType: 'Illness',
      status: 'Waiting',
      disposition: 'Pending',
      dateOfAssessment: '11/10/2026 03:00 PM',
      completionDate: '-',
      vitals: { bp: '120/80 mmHg', pr: '78 bpm', temp: '36.5 °C', spo2: '98% SpO2' },
      soap: { subjective: 'Patient reports throbbing headache since morning.', objective: 'Alert, conscious, no acute distress.', assessment: 'Tension headache', plan: 'Administered Advil 2 tabs and advised rest.' },
      medicationsUsed: [{ name: "ADVIL", quantity: 2, unitPrice: 8.75 }]
    }
  ]);

  const [recordRequestForm, setRecordRequestForm] = useState({
    fullName: '',
    ticketNo: '',
    department: '',
    contactNumber: '',
    purpose: 'Employment Medical Clearance'
  });

  const [oshIncidents, setOshIncidents] = useState([
    {
      incidentId: 'OSH-1001',
      dateOfIncident: '2026-11-08',
      timeOfIncident: '10:30 AM',
      location: 'Ground Floor Atrium Corridor',
      incidentType: 'Slip, Trip, and Fall',
      severity: 'Minor-1st Aid only',
      injuredPerson: 'Juan Dela Cruz',
      department: 'Store Staff (Nike)',
      description: 'Wet floor due to cleaning without caution signage.',
      immediateAction: 'Provided first aid and placed wet floor signs.',
      reportedBy: 'Glecenda Anciro, RN',
      status: 'Under Investigation'
    }
  ]);

  const [oshForm, setOshForm] = useState({
    dateOfIncident: new Date().toISOString().split('T')[0],
    timeOfIncident: '',
    location: '',
    incidentType: 'Slip, Trip, and Fall',
    severity: 'Minor-1st Aid only',
    injuredPerson: '',
    department: '',
    description: '',
    immediateAction: '',
    reportedBy: 'Visitor / Patient',
    status: 'Open'
  });

  const [calendarEvents, setCalendarEvents] = useState([
    {
      eventId: 'CAL-501',
      activityName: 'Açienda Health & Wellness Fair 2026',
      scheduledDate: '2026-11-20',
      scheduledTime: '09:00 AM',
      location: 'Main Atrium, Açienda Outlet',
      kpiCategory: 'KPI1: Statutory Compliance',
      recurrence: 'One-Time Only',
      status: 'In Progress',
      statusDate: '2026-11-10',
      assignedPerson: 'Glecenda Anciro, RN, RM, OHN',
      notes: 'Coordination with Philhealth YAKAP and medical partners.',
      attachment: null
    }
  ]);

  const [calForm, setCalForm] = useState({
    activityName: '',
    scheduledDate: '',
    scheduledTime: '',
    location: '',
    kpiCategory: 'KPI1: Statutory Compliance',
    recurrence: 'One-Time Only',
    status: 'Not Started',
    statusDate: new Date().toISOString().split('T')[0],
    assignedPerson: 'Glecenda Anciro, RN, RM, OHN',
    notes: '',
    attachment: null
  });

  const [selectedTicketNo, setSelectedTicketNo] = useState('Q-01');
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [latestTicket, setLatestTicket] = useState(null);
  const [intakeForm, setIntakeForm] = useState({ fullName: '', category: 'Mall Tenant Staff / Employee', department: '', contactNumber: '', chiefComplaint: '', reportType: 'Illness' });
  const [editingEvent, setEditingEvent] = useState(null);
  const [editingOshIncident, setEditingOshIncident] = useState(null);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleTabChange = (tabName) => {
    const patientServices = ['job-order', 'check-ticket', 'consultation-records-module', 'osh-incident'];
    if (patientServices.includes(tabName)) {
      setActiveTab(tabName);
      return;
    }

    const staffOnlyTabs = ['triage-portal', 'patient-stats', 'clinic-calendar', 'monthly-clinic'];
    if (staffOnlyTabs.includes(tabName)) {
      if (!currentUser) {
        alert('🔒 Staff Login Required: Please sign in as a registered clinic staff to access operational modules.');
        setShowLoginModal(true);
        return;
      }
      if (!currentUser.fullAccess && !['triage-portal', 'patient-stats'].includes(tabName)) {
        alert('⛔ Access Restricted: Only Glecenda Anciro (Nurse) is authorized to access full administrative modules.');
        return;
      }
    }
    setActiveTab(tabName);
  };

  const handleStaffLogin = () => {
    const staff = STAFF_ACCOUNTS[selectedStaffIndex];
    if (passwordInput !== staff.password) {
      alert('❌ Maling Password! Pakisubukan muli.');
      return;
    }
    setCurrentUser(staff);
    setShowLoginModal(false);
    setPasswordInput('');
    alert(`Successfully signed in as ${staff.name}`);
  };

  const handleIntakeSubmit = (e) => {
    e.preventDefault();
    const newTicketNum = `Q-0${queueList.length + 1}`;
    const nowStr = new Date().toLocaleString([], { dateStyle: 'short', timeStyle: 'short' });
    const newPatientRecord = {
      ticketNo: newTicketNum,
      ...intakeForm,
      status: 'Waiting',
      disposition: 'Pending',
      dateOfAssessment: nowStr,
      completionDate: '-',
      vitals: { bp: '', pr: '', temp: '', spo2: '' },
      soap: { subjective: '', objective: '', assessment: '', plan: '' },
      medicationsUsed: []
    };

    setQueueList([...queueList, newPatientRecord]);
    setSelectedTicketNo(newTicketNum);
    setLatestTicket(newPatientRecord);
    setShowTicketModal(true);
    setIntakeForm({ fullName: '', category: 'Mall Tenant Staff / Employee', department: '', contactNumber: '', chiefComplaint: '', reportType: 'Illness' });
  };

  const handleRecordRequestSubmit = (e) => {
    e.preventDefault();
    alert(`Consultation Record Request submitted successfully!\nName: ${recordRequestForm.fullName}\nTicket: ${recordRequestForm.ticketNo || 'N/A'}\nPurpose: ${recordRequestForm.purpose}`);
    setRecordRequestForm({ fullName: '', ticketNo: '', department: '', contactNumber: '', purpose: 'Employment Medical Clearance' });
  };

  const handleOshSubmit = (e) => {
    e.preventDefault();
    const incidentId = `OSH-${Math.floor(1000 + Math.random() * 9000)}`;
    const newIncident = { incidentId, ...oshForm };
    setOshIncidents([newIncident, ...oshIncidents]);
    alert(`OSH Incident Report successfully filed and saved to Monthly OSH Registry!\nReference ID: ${incidentId}`);
    setOshForm({
      dateOfIncident: new Date().toISOString().split('T')[0],
      timeOfIncident: '',
      location: '',
      incidentType: 'Slip, Trip, and Fall',
      severity: 'Minor-1st Aid only',
      injuredPerson: '',
      department: '',
      description: '',
      immediateAction: '',
      reportedBy: currentUser ? currentUser.name : 'Visitor / Patient',
      status: 'Open'
    });
  };

  const handleSaveEditedOsh = (e) => {
    e.preventDefault();
    setOshIncidents(oshIncidents.map(inc => inc.incidentId === editingOshIncident.incidentId ? editingOshIncident : inc));
    setEditingOshIncident(null);
    alert('OSH Incident Status successfully updated!');
  };

  const generateOshPDF = (inc) => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head><title>OSH Report - ${inc.incidentId}</title></head>
        <body style="font-family: Arial; padding: 20px;">
          <h2>AÇIENDA MEDICAL CLINIC - OSH INCIDENT REPORT</h2>
          <p><strong>ID:</strong> ${inc.incidentId} | <strong>Status:</strong> ${inc.status}</p>
          <p><strong>Date/Time:</strong> ${inc.dateOfIncident} ${inc.timeOfIncident} | <strong>Location:</strong> ${inc.location}</p>
          <p><strong>Type:</strong> ${inc.incidentType} (${inc.severity})</p>
          <p><strong>Victim:</strong> ${inc.injuredPerson} (${inc.department})</p>
          <p><strong>Description:</strong> ${inc.description}</p>
          <p><strong>Immediate Action:</strong> ${inc.immediateAction}</p>
          <hr/>
          <p style="font-size: 10px; color: #64748b;">Downloaded on: ${new Date().toLocaleString([], { dateStyle: 'long', timeStyle: 'medium' })}</p>
          <script>window.onload = function() { window.print(); }</script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  const generateOshRegistryPDF = (filteredIncidents, startDate, endDate) => {
    const downloadDateTime = new Date().toLocaleString([], { dateStyle: 'long', timeStyle: 'medium' });
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head><title>OSH Incidents & Safety Hazards Registry</title></head>
        <body style="font-family: Arial; padding: 30px; color: #1e293b;">
          <h2>AÇIENDA DESIGNER OUTLET MALL • MEDICAL CLINIC</h2>
          <h3>Filed OSH Incidents & Safety Hazards Registry</h3>
          <p style="font-size: 12px; color: #0f172a;"><strong>Report Date Coverage:</strong> ${startDate} to ${endDate}</p>
          <p style="font-size: 11px; color: #64748b;"><strong>Date of Download:</strong> ${downloadDateTime}</p>
          <hr/>
          <table border="1" cellspacing="0" cellpadding="6" style="width:100%; border-collapse: collapse; font-size: 11px;">
            <tr style="background:#f1f5f9;">
              <th>ID</th><th>Date & Time</th><th>Location</th><th>Incident Type</th><th>Severity</th><th>Victim / Dept</th><th>Status</th>
            </tr>
            ${filteredIncidents.map(inc => `
              <tr>
                <td>${inc.incidentId}</td>
                <td>${inc.dateOfIncident} ${inc.timeOfIncident}</td>
                <td>${inc.location}</td>
                <td>${inc.incidentType}</td>
                <td>${inc.severity}</td>
                <td>${inc.injuredPerson} (${inc.department})</td>
                <td>${inc.status}</td>
              </tr>
            `).join('')}
          </table>
          <br/><br/>
          <p>Prepared by: <strong>Glecenda Anciro, RN, RM, OHN</strong></p>
          <script>window.onload = function() { window.print(); }</script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  const generateCalendarPDF = (eventsList, startDate, endDate) => {
    const downloadDateTime = new Date().toLocaleString([], { dateStyle: 'long', timeStyle: 'medium' });
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head><title>Clinic Activities & Programs Registry</title></head>
        <body style="font-family: Arial; padding: 30px; color: #1e293b;">
          <h2>AÇIENDA DESIGNER OUTLET MALL • MEDICAL CLINIC</h2>
          <h3>Scheduled Clinic Activities & Programs Registry</h3>
          <p style="font-size: 12px; color: #0f172a;"><strong>Report Date Coverage:</strong> ${startDate} to ${endDate}</p>
          <p style="font-size: 11px; color: #64748b;"><strong>Date of Download:</strong> ${downloadDateTime}</p>
          <hr/>
          <table border="1" cellspacing="0" cellpadding="6" style="width:100%; border-collapse: collapse; font-size: 11px;">
            <tr style="background:#f1f5f9;">
              <th>ID</th><th>Activity Name</th><th>Schedule</th><th>Location</th><th>KPI Category</th><th>Assigned Staff</th><th>Status</th>
            </tr>
            ${eventsList.map(ev => `
              <tr>
                <td>${ev.eventId}</td>
                <td><strong>${ev.activityName}</strong><br/>${ev.notes || ''}</td>
                <td>${ev.scheduledDate} (${ev.scheduledTime})</td>
                <td>${ev.location}</td>
                <td>${ev.kpiCategory}</td>
                <td>${ev.assignedPerson}</td>
                <td>${ev.status}</td>
              </tr>
            `).join('')}
          </table>
          <br/><br/>
          <p>Prepared by: <strong>Glecenda Anciro, RN, RM, OHN</strong></p>
          <script>window.onload = function() { window.print(); }</script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  const handleCalendarSubmit = (e) => {
    e.preventDefault();
    const eventId = `CAL-${Date.now().toString().slice(-4)}`;
    const newEvent = { eventId, ...calForm };
    setCalendarEvents([newEvent, ...calendarEvents]);
    alert(`Clinic Activity Scheduled Successfully!\nReference ID: ${eventId}`);
    setCalForm({
      activityName: '',
      scheduledDate: '',
      scheduledTime: '',
      location: '',
      kpiCategory: 'KPI1: Statutory Compliance',
      recurrence: 'One-Time Only',
      status: 'Not Started',
      statusDate: new Date().toISOString().split('T')[0],
      assignedPerson: 'Glecenda Anciro, RN, RM, OHN',
      notes: '',
      attachment: null
    });
  };

  const handleSaveEditedEvent = (e) => {
    e.preventDefault();
    setCalendarEvents(calendarEvents.map(ev => ev.eventId === editingEvent.eventId ? editingEvent : ev));
    setEditingEvent(null);
    alert('Activity details successfully updated!');
  };

  const handleEditFileUpload = (file) => {
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setEditingEvent({ ...editingEvent, attachment: { name: file.name, url: fileUrl } });
    }
  };

  const handleToggleMedication = (medObj) => {
    if (!currentPatient) return;
    setQueueList(queueList.map(p => {
      if (p.ticketNo === selectedTicketNo) {
        const currentMeds = p.medicationsUsed || [];
        const existingIndex = currentMeds.findIndex(m => m.name === medObj.name);
        let updatedMeds;
        if (existingIndex > -1) {
          updatedMeds = currentMeds.filter(m => m.name !== medObj.name);
        } else {
          updatedMeds = [...currentMeds, { name: medObj.name, quantity: 1, unitPrice: medObj.price }];
        }
        return { ...p, medicationsUsed: updatedMeds };
      }
      return p;
    }));
  };

  const handleQuantityChange = (medName, newQty) => {
    if (!currentPatient) return;
    const qty = Math.max(1, parseInt(newQty) || 1);
    setQueueList(queueList.map(p => {
      if (p.ticketNo === selectedTicketNo) {
        const updatedMeds = (p.medicationsUsed || []).map(m => {
          if (m.name === medName) return { ...m, quantity: qty };
          return m;
        });
        return { ...p, medicationsUsed: updatedMeds };
      }
      return p;
    }));
  };

  const handleVitalsChange = (field, value) => {
    if (!currentPatient) return;
    setQueueList(queueList.map(p => {
      if (p.ticketNo === selectedTicketNo) {
        return { ...p, vitals: { ...p.vitals, [field]: value } };
      }
      return p;
    }));
  };

  const handleSoapChange = (field, value) => {
    if (!currentPatient) return;
    setQueueList(queueList.map(p => {
      if (p.ticketNo === selectedTicketNo) {
        return { ...p, soap: { ...p.soap, [field]: value } };
      }
      return p;
    }));
  };

  const handleSaveRecord = (dispositionType) => {
    if (!currentPatient) return;
    const nowStr = new Date().toLocaleString([], { dateStyle: 'short', timeStyle: 'short' });
    setQueueList(queueList.map(p => {
      if (p.ticketNo === selectedTicketNo) {
        return { ...p, status: 'Completed', disposition: dispositionType, completionDate: nowStr };
      }
      return p;
    }));
    alert(`Medical record saved for ${currentPatient.fullName} and updated in Patient Statistic Queue.\nStatus: Completed - ${dispositionType}`);
  };

  const generateConsultationPDF = (patient) => {
    const medsListHtml = patient.medicationsUsed && patient.medicationsUsed.length > 0 ? 
      patient.medicationsUsed.map(m => `<li>${m.name} (Qty: <strong>${m.quantity}</strong>) — ₱${(m.quantity * m.unitPrice).toFixed(2)}</li>`).join('') : 
      '<li>No supplies used</li>';
    const totalSuppliesCost = (patient.medicationsUsed || []).reduce((sum, m) => sum + (m.quantity * m.unitPrice), 0);

    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head><title>Consultation Record - ${patient.ticketNo}</title></head>
        <body style="font-family: Arial; padding: 20px;">
          <h2>AÇIENDA MEDICAL CLINIC - CONSULTATION RECORD</h2>
          <p><strong>Ticket:</strong> ${patient.ticketNo} | <strong>Name:</strong> ${patient.fullName}</p>
          <p><strong>Department:</strong> ${patient.department || patient.category} | <strong>Type:</strong> ${patient.reportType}</p>
          <p><strong>Vitals:</strong> BP: ${patient.vitals?.bp || '-'} | PR: ${patient.vitals?.pr || '-'} | Temp: ${patient.vitals?.temp || '-'} | SpO2: ${patient.vitals?.spo2 || '-'}</p>
          <p><strong>SOAP Notes:</strong><br/>
             S: ${patient.soap?.subjective || '-'}<br/>
             O: ${patient.soap?.objective || '-'}<br/>
             A: ${patient.soap?.assessment || '-'}<br/>
             P: ${patient.soap?.plan || '-'}
          </p>
          <p><strong>Disposition:</strong> ${patient.disposition}</p>
          <h4>Medications & Supplies Used:</h4>
          <ul>${medsListHtml}</ul>
          <p><strong>Total Cost: ₱${totalSuppliesCost.toFixed(2)}</strong></p>
          <hr/>
          <p style="font-size: 10px; color: #64748b;">Downloaded on: ${new Date().toLocaleString([], { dateStyle: 'long', timeStyle: 'medium' })}</p>
          <script>window.onload = function() { window.print(); }</script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  const generateMonthlySummaryPDF = (aggregatedMeds, grandTotal, stats) => {
    const downloadDateTime = new Date().toLocaleString([], { dateStyle: 'long', timeStyle: 'medium' });
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head><title>Comprehensive Monthly Clinic Report</title></head>
        <body style="font-family: Arial; padding: 30px; color: #1e293b;">
          <h2>AÇIENDA DESIGNER OUTLET MALL • MEDICAL CLINIC</h2>
          <h3>Comprehensive Monthly Clinic Report & Statistics</h3>
          <p style="font-size: 12px; color: #0f172a;"><strong>Report Date Coverage:</strong> ${statStartDate} to ${statEndDate}</p>
          <p style="font-size: 11px; color: #64748b;"><strong>Date of Download:</strong> ${downloadDateTime}</p>
          <hr/>
          <h4>1. Patient Statistics Summary</h4>
          <p>Total Visits: <strong>${stats.totalVisits}</strong></p>
          <p>Report Types: ${Object.entries(stats.byReportType).map(([k,v]) => `${k}: ${v}`).join(', ')}</p>
          
          <h4>2. Monthly Financial & Medication Summary</h4>
          <table border="1" cellspacing="0" cellpadding="6" style="width:100%; border-collapse: collapse; font-size: 11px;">
            <tr style="background:#f1f5f9;"><th>Item</th><th>Price</th><th>Qty</th><th>Total (₱)</th></tr>
            ${aggregatedMeds.map(m => `<tr><td>${m.name}</td><td>₱${m.unitPrice.toFixed(2)}</td><td>${m.totalQty}</td><td>₱${m.totalCost.toFixed(2)}</td></tr>`).join('')}
          </table>
          <h3>Grand Total Cost: ₱${grandTotal.toFixed(2)}</h3>
          <br/><br/>
          <p>Prepared by: <strong>Glecenda Anciro, RN, RM, OHN</strong></p>
          <script>window.onload = function() { window.print(); }</script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  const generateMedicationSummaryPDF = (aggregatedMeds, grandTotal, startDate, endDate) => {
    const downloadDateTime = new Date().toLocaleString([], { dateStyle: 'long', timeStyle: 'medium' });
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head><title>Monthly Medication Usage & Financial Summary</title></head>
        <body style="font-family: Arial; padding: 30px; color: #1e293b;">
          <h2>AÇIENDA DESIGNER OUTLET MALL • MEDICAL CLINIC</h2>
          <h3>Monthly Medication Usage & Financial Summary</h3>
          <p style="font-size: 12px; color: #0f172a;"><strong>Report Date Coverage:</strong> ${startDate} to ${endDate}</p>
          <p style="font-size: 11px; color: #64748b;"><strong>Date of Download:</strong> ${downloadDateTime}</p>
          <hr/>
          <table border="1" cellspacing="0" cellpadding="6" style="width:100%; border-collapse: collapse; font-size: 11px;">
            <tr style="background:#f1f5f9;"><th>Medication / Supply Item</th><th>Unit Price</th><th>Total Qty Dispensed</th><th>Total Cost (₱)</th></tr>
            ${aggregatedMeds.map(m => `<tr><td>${m.name}</td><td>₱${m.unitPrice.toFixed(2)}</td><td>${m.totalQty}</td><td>₱${m.totalCost.toFixed(2)}</td></tr>`).join('')}
          </table>
          <h3>Grand Total Monthly Cost: ₱${grandTotal.toFixed(2)}</h3>
          <br/><br/>
          <p>Prepared by: <strong>Glecenda Anciro, RN, RM, OHN</strong></p>
          <script>window.onload = function() { window.print(); }</script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  // AGGREGATE MEDICATIONS
  const aggregatedMedMap = {};
  queueList.forEach(patient => {
    if (patient.medicationsUsed) {
      patient.medicationsUsed.forEach(med => {
        if (!aggregatedMedMap[med.name]) {
          aggregatedMedMap[med.name] = { name: med.name, unitPrice: med.unitPrice, totalQty: 0, totalCost: 0 };
        }
        aggregatedMedMap[med.name].totalQty += med.quantity;
        aggregatedMedMap[med.name].totalCost += med.quantity * med.unitPrice;
      });
    }
  });
  const aggregatedMedsList = Object.values(aggregatedMedMap);
  const grandTotalCost = aggregatedMedsList.reduce((sum, m) => sum + m.totalCost, 0);

  // AGGREGATE PATIENT STATISTICS FOR GRAPHS
  const statsByCategory = {};
  const statsByDepartment = {};
  const statsByComplaint = {};
  const statsByReportType = {};

  queueList.forEach(p => {
    statsByCategory[p.category] = (statsByCategory[p.category] || 0) + 1;
    const dept = p.department ? p.department.trim() : 'Unspecified / General';
    statsByDepartment[dept] = (statsByDepartment[dept] || 0) + 1;
    const comp = p.chiefComplaint ? p.chiefComplaint.trim().toLowerCase() : 'Not Specified';
    statsByComplaint[comp] = (statsByComplaint[comp] || 0) + 1;
    statsByReportType[p.reportType] = (statsByReportType[p.reportType] || 0) + 1;
  });

  const maxCatCount = Math.max(...Object.values(statsByCategory), 1);
  const maxDeptCount = Math.max(...Object.values(statsByDepartment), 1);
  const maxCompCount = Math.max(...Object.values(statsByComplaint), 1);
  const maxReportCount = Math.max(...Object.values(statsByReportType), 1);

  // AGGREGATE CALENDAR EVENTS BY KPI CATEGORY & STATUS
  const kpiCategoriesList = [
    'KPI1: Statutory Compliance',
    'KPI2: Hazard Remediation',
    'KPI3: Emergency Preparedness',
    'KPI4: Admin & Billing Integrity',
    'KPI5: Manning & Timekeeping'
  ];

  const kpiStatsMap = {};
  kpiCategoriesList.forEach(cat => {
    kpiStatsMap[cat] = { 'Not Started': 0, 'In Progress': 0, 'Completed': 0, 'Rescheduled': 0, total: 0 };
  });

  calendarEvents.forEach(ev => {
    if (kpiStatsMap[ev.kpiCategory]) {
      kpiStatsMap[ev.kpiCategory][ev.status] = (kpiStatsMap[ev.kpiCategory][ev.status] || 0) + 1;
      kpiStatsMap[ev.kpiCategory].total += 1;
    }
  });

  const maxKpiCount = Math.max(...Object.values(kpiStatsMap).map(s => s.total), 1);

  const currentPatient = queueList.find(p => p.ticketNo === selectedTicketNo) || (queueList.length > 0 ? queueList[0] : null);

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
      marginBottom: '4px'
    }),
    mainWrapper: { flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 },
    header: { height: '64px', backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0', padding: '0 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)' },
    contentArea: { padding: '32px', overflowY: 'auto', flex: 1 },
    card: { backgroundColor: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '24px', boxShadow: '0 1px 3px 0 rgba(0,0,0,0.05)' },
    input: { width: '100%', border: '1px solid #cbd5e1', borderRadius: '10px', padding: '10px 14px', fontSize: '12px', outline: 'none', backgroundColor: '#fff', boxSizing: 'border-box', marginTop: '4px' },
    label: { display: 'block', fontSize: '10px', fontWeight: 'bold', color: '#64748b', textTransform: 'uppercase', marginBottom: '4px' },
    buttonPrimary: { width: '100%', backgroundColor: '#2563eb', color: '#fff', border: 'none', padding: '12px', borderRadius: '10px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer', marginTop: '12px' },
    modalOverlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 },
    modalCard: { backgroundColor: '#fff', borderRadius: '16px', padding: '24px', width: '100%', maxWidth: '450px', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)', maxHeight: '90vh', overflowY: 'auto' }
  };

  return (
    <div style={styles.container}>
      {/* SIDEBAR */}
      <aside style={styles.sidebar}>
        <div style={styles.sidebarHeader}>
          <div style={styles.logoBox}>+</div>
          <div>
            <h1 style={{ fontSize: '11px', fontWeight: '900', margin: 0, letterSpacing: '0.05em' }}>MALL CLINIC PORTAL</h1>
            <p style={{ fontSize: '10px', color: '#94a3b8', margin: 0 }}>
              {currentUser ? `Staff: ${currentUser.role}` : 'Patient & Visitor Portal'}
            </p>
          </div>
        </div>

        <div style={styles.navSection}>
          <div style={{ marginBottom: '16px' }}>
            <p style={styles.navTitle}>Patient & Tenant Services</p>
            <button onClick={() => handleTabChange('job-order')} style={styles.navButton(activeTab === 'job-order')}>
              1. Walk-in Intake Entry
            </button>
            <button onClick={() => handleTabChange('check-ticket')} style={styles.navButton(activeTab === 'check-ticket')}>
              2. Check Ticket / Clearance
            </button>
            <button onClick={() => handleTabChange('consultation-records-module')} style={styles.navButton(activeTab === 'consultation-records-module')}>
              3. Clinic Consultation Record Request
            </button>
            <button onClick={() => handleTabChange('osh-incident')} style={styles.navButton(activeTab === 'osh-incident')}>
              4. Report OSH Incident
            </button>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <p style={styles.navTitle}>Staff Operational Modules</p>
            <button onClick={() => handleTabChange('triage-portal')} style={styles.navButton(activeTab === 'triage-portal')}>
              Portal Workspace (Nurse)
            </button>
            <button onClick={() => handleTabChange('patient-stats')} style={styles.navButton(activeTab === 'patient-stats')}>
              📊 Patient Statistic (Queue Log)
            </button>
            <button onClick={() => handleTabChange('clinic-calendar')} style={styles.navButton(activeTab === 'clinic-calendar')}>
              📅 Clinic Activity & Calendar
            </button>
            <button onClick={() => handleTabChange('monthly-clinic')} style={styles.navButton(activeTab === 'monthly-clinic')}>
              📊 Monthly Clinic Report & OSH
            </button>
          </div>
        </div>

        <div style={{ padding: '16px', borderTop: '1px solid #1e293b' }}>
          {currentUser ? (
            <button 
              onClick={() => {
                setCurrentUser(null);
                setActiveTab('job-order');
                alert('Successfully signed out to Patient Portal mode.');
              }} 
              style={{ width: '100%', padding: '10px', backgroundColor: '#dc2626', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
            >
              🚪 Sign Out ({currentUser.name.split(' ')[0]})
            </button>
          ) : (
            <button 
              onClick={() => { setShowLoginModal(true); setPasswordInput(''); }} 
              style={{ width: '100%', padding: '10px', backgroundColor: '#2563eb', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
            >
              🔐 Staff Login / Sign In
            </button>
          )}
        </div>
      </aside>

      {/* STAFF SIGN IN MODAL */}
      {showLoginModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalCard}>
            <h3 style={{ fontSize: '15px', fontWeight: 'bold', color: '#0B132B', marginBottom: '8px' }}>
              Clinic Staff Sign In
            </h3>
            <p style={{ fontSize: '11px', color: '#64748b', marginBottom: '14px' }}>
              Piliin ang iyong account at i-type ang tamang password para makapasok.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '14px', maxHeight: '220px', overflowY: 'auto' }}>
              {STAFF_ACCOUNTS.map((acc, idx) => (
                <div 
                  key={idx}
                  onClick={() => setSelectedStaffIndex(idx)}
                  style={{ 
                    padding: '10px 12px', 
                    borderRadius: '8px', 
                    border: selectedStaffIndex === idx ? '2px solid #2563eb' : '1px solid #cbd5e1', 
                    backgroundColor: selectedStaffIndex === idx ? '#eff6ff' : '#fff',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <div>
                    <strong style={{ fontSize: '11px', color: '#1e293b', display: 'block' }}>{acc.name}</strong>
                    <span style={{ fontSize: '10px', color: '#64748b' }}>Role: {acc.role}</span>
                  </div>
                  {selectedStaffIndex === idx && <span style={{ color: '#2563eb', fontWeight: 'bold', fontSize: '11px' }}>✓ Selected</span>}
                </div>
              ))}
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={styles.label}>ENTER PASSWORD *</label>
              <input 
                type="password" 
                value={passwordInput} 
                onChange={(e) => setPasswordInput(e.target.value)} 
                placeholder="I-type ang password (e.g. nursepassword1)" 
                style={styles.input} 
                autoFocus
              />
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button 
                onClick={() => setShowLoginModal(false)} 
                style={{ flex: 1, padding: '10px', backgroundColor: '#64748b', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer' }}
              >
                Cancel
              </button>
              <button 
                onClick={handleStaffLogin} 
                style={{ flex: 1, padding: '10px', backgroundColor: '#2563eb', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer' }}
              >
                Sign In Now →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT OSH INCIDENT STATUS MODAL */}
      {editingOshIncident && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalCard}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 'bold', color: '#2563eb', margin: 0 }}>
                Edit OSH Status: {editingOshIncident.incidentId}
              </h3>
              <button onClick={() => setEditingOshIncident(null)} style={{ background: 'none', border: 'none', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', color: '#64748b' }}>✕</button>
            </div>

            <form onSubmit={handleSaveEditedOsh} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={styles.label}>INCIDENT TYPE & LOCATION</label>
                <div style={{ fontSize: '12px', color: '#1e293b', fontWeight: '600' }}>{editingOshIncident.incidentType} — {editingOshIncident.location}</div>
              </div>

              <div>
                <label style={styles.label}>UPDATE OSH STATUS *</label>
                <select 
                  value={editingOshIncident.status} 
                  onChange={(e) => setEditingOshIncident({...editingOshIncident, status: e.target.value})} 
                  style={styles.input}
                >
                  <option value="Open">Open</option>
                  <option value="Under Investigation">Under Investigation</option>
                  <option value="Resolved & Closed">Resolved & Closed</option>
                </select>
              </div>

              <div>
                <label style={styles.label}>IMMEDIATE / CORRECTIVE ACTIONS</label>
                <textarea 
                  rows="3" 
                  value={editingOshIncident.immediateAction} 
                  onChange={(e) => setEditingOshIncident({...editingOshIncident, immediateAction: e.target.value})} 
                  style={{ ...styles.input, resize: 'vertical' }}
                ></textarea>
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button type="button" onClick={() => setEditingOshIncident(null)} style={{ flex: 1, padding: '10px', backgroundColor: '#64748b', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>Cancel</button>
                <button type="submit" style={{ flex: 1, padding: '10px', backgroundColor: '#2563eb', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>Save Status</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT ACTIVITY MODAL */}
      {editingEvent && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalCard}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 'bold', color: '#2563eb', margin: 0 }}>
                Edit Activity Details: {editingEvent.eventId}
              </h3>
              <button onClick={() => setEditingEvent(null)} style={{ background: 'none', border: 'none', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', color: '#64748b' }}>✕</button>
            </div>

            <form onSubmit={handleSaveEditedEvent} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={styles.label}>ACTIVITY / PROGRAM NAME</label>
                <input type="text" required value={editingEvent.activityName} onChange={(e) => setEditingEvent({...editingEvent, activityName: e.target.value})} style={styles.input} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={styles.label}>SCHEDULED DATE</label>
                  <input type="date" required value={editingEvent.scheduledDate} onChange={(e) => setEditingEvent({...editingEvent, scheduledDate: e.target.value})} style={styles.input} />
                </div>
                <div>
                  <label style={styles.label}>SCHEDULED TIME</label>
                  <input type="text" required value={editingEvent.scheduledTime} onChange={(e) => setEditingEvent({...editingEvent, scheduledTime: e.target.value})} style={styles.input} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={styles.label}>LOCATION / VENUE</label>
                  <input type="text" required value={editingEvent.location} onChange={(e) => setEditingEvent({...editingEvent, location: e.target.value})} style={styles.input} />
                </div>
                <div>
                  <label style={styles.label}>KPI CATEGORY</label>
                  <select value={editingEvent.kpiCategory} onChange={(e) => setEditingEvent({...editingEvent, kpiCategory: e.target.value})} style={styles.input}>
                    {kpiCategoriesList.map((kpi, i) => (
                      <option key={i} value={kpi}>{kpi}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={styles.label}>STATUS</label>
                  <select value={editingEvent.status} onChange={(e) => setEditingEvent({...editingEvent, status: e.target.value})} style={styles.input}>
                    <option>Not Started</option>
                    <option>In Progress</option>
                    <option>Completed</option>
                    <option>Rescheduled</option>
                  </select>
                </div>
                <div>
                  <label style={styles.label}>STATUS UPDATE DATE</label>
                  <input type="date" value={editingEvent.statusDate || ''} onChange={(e) => setEditingEvent({...editingEvent, statusDate: e.target.value})} style={styles.input} />
                </div>
              </div>

              <div>
                <label style={styles.label}>ASSIGNED STAFF</label>
                <input type="text" value={editingEvent.assignedPerson} onChange={(e) => setEditingEvent({...editingEvent, assignedPerson: e.target.value})} style={styles.input} />
              </div>

              <div>
                <label style={styles.label}>NOTES / OBJECTIVES</label>
                <textarea rows="2" value={editingEvent.notes} onChange={(e) => setEditingEvent({...editingEvent, notes: e.target.value})} style={{ ...styles.input, resize: 'vertical' }}></textarea>
              </div>

              {editingEvent.status === 'Completed' && (
                <div style={{ padding: '10px', backgroundColor: '#f0fdf4', border: '1px dashed #16a34a', borderRadius: '8px' }}>
                  <label style={{ ...styles.label, color: '#15803d' }}>📷 Proof / Photo Attachment for Completed Activity:</label>
                  <input type="file" accept="image/*" onChange={(e) => handleEditFileUpload(e.target.files[0])} style={{ fontSize: '11px', width: '100%', marginTop: '4px' }} />
                  {editingEvent.attachment && (
                    <div style={{ marginTop: '4px', fontSize: '11px', color: '#166534', fontWeight: 'bold' }}>
                      ✓ Attached: {editingEvent.attachment.name}
                    </div>
                  )}
                </div>
              )}

              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button type="button" onClick={() => setEditingEvent(null)} style={{ flex: 1, padding: '10px', backgroundColor: '#64748b', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>Cancel</button>
                <button type="submit" style={{ flex: 1, padding: '10px', backgroundColor: '#2563eb', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MAIN CONTAINER */}
      <div style={styles.mainWrapper}>
        <header style={styles.header}>
          <div>
            <p style={{ fontSize: '10px', fontWeight: 'bold', color: '#2563eb', margin: 0, letterSpacing: '0.05em' }}>AÇIENDA OUTLET MALL • MEDICAL CLINIC</p>
            <h2 style={{ fontSize: '15px', fontWeight: '900', color: '#1e293b', margin: 0 }}>
              {activeTab === 'job-order' && 'Walk-in Intake Registration'}
              {activeTab === 'check-ticket' && 'Check Ticket / Clearance Status'}
              {activeTab === 'consultation-records-module' && 'Clinic Consultation Record Request Form'}
              {activeTab === 'osh-incident' && 'Report OSH Incident / Hazard'}
              {activeTab === 'triage-portal' && `${currentUser?.role} Clinical Workspace`}
              {activeTab === 'patient-stats' && 'Patient Statistic & Queue Status Log'}
              {activeTab === 'clinic-calendar' && 'Clinic Activity & Program Calendar Dashboard'}
              {activeTab === 'monthly-clinic' && 'Monthly Clinic Report & OSH Incidents Registry'}
            </h2>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', padding: '6px 12px', borderRadius: '10px', fontSize: '12px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981' }}></span>
              <span style={{ fontWeight: '600', color: '#334155' }}>Clinic Status: <strong style={{ color: '#059669' }}>OPEN</strong></span>
              <span style={{ color: '#cbd5e1' }}>|</span>
              <span style={{ color: '#64748b' }}>Current User: <strong>{currentUser ? `${currentUser.name} (${currentUser.role})` : 'Patient / Visitor (General Portal)'}</strong></span>
            </div>
            <div style={{ backgroundColor: '#eff6ff', border: '1px solid #dbeafe', color: '#1d4ed8', padding: '6px 12px', borderRadius: '10px', fontSize: '12px', fontWeight: 'bold' }}>
              🕒 {currentTime}
            </div>
          </div>
        </header>

        <main style={styles.contentArea}>
          {activeTab === 'job-order' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '24px', alignItems: 'start', maxWidth: '1200px', margin: '0 auto' }}>
              <div style={styles.card}>
                <h3 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '4px' }}>Clinic Visit Intake Form</h3>
                <p style={{ fontSize: '11px', color: '#64748b', marginBottom: '16px' }}>Fill out basic details to generate a reference queue code for medical assessment.</p>
                <form onSubmit={handleIntakeSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                    <div>
                      <label style={styles.label}>FULL NAME *</label>
                      <input type="text" required value={intakeForm.fullName} onChange={(e) => setIntakeForm({...intakeForm, fullName: e.target.value})} placeholder="e.g. Juan dela Cruz" style={styles.input} />
                    </div>
                    <div>
                      <label style={styles.label}>CATEGORY *</label>
                      <select value={intakeForm.category} onChange={(e) => setIntakeForm({...intakeForm, category: e.target.value})} style={styles.input}>
                        <option>Mall Tenant Staff / Employee</option>
                        <option>Mall Shopper / Visitor</option>
                        <option>Maintenance / Contractor</option>
                      </select>
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                    <div>
                      <label style={styles.label}>TENANT STORE / DEPARTMENT / ID</label>
                      <input type="text" value={intakeForm.department} onChange={(e) => setIntakeForm({...intakeForm, department: e.target.value})} placeholder="e.g. Starbucks - GF or Valid ID No." style={styles.input} />
                    </div>
                    <div>
                      <label style={styles.label}>CONTACT NUMBER *</label>
                      <input type="text" required value={intakeForm.contactNumber} onChange={(e) => setIntakeForm({...intakeForm, contactNumber: e.target.value})} placeholder="09XX-XXX-XXXX" style={styles.input} />
                    </div>
                  </div>
                  <div>
                    <label style={styles.label}>CHIEF COMPLAINT / VISIT REASON *</label>
                    <textarea required rows="3" value={intakeForm.chiefComplaint} onChange={(e) => setIntakeForm({...intakeForm, chiefComplaint: e.target.value})} placeholder="Describe symptoms, injury, or clearance requirement..." style={{ ...styles.input, resize: 'vertical' }}></textarea>
                  </div>
                  <div>
                    <label style={styles.label}>TYPE OF REPORT *</label>
                    <select value={intakeForm.reportType} onChange={(e) => setIntakeForm({...intakeForm, reportType: e.target.value})} style={styles.input}>
                      <option value="Illness">Illness</option>
                      <option value="Accident">Accident</option>
                    </select>
                  </div>
                  <button type="submit" style={styles.buttonPrimary}>Generate Queue Ticket →</button>
                </form>
              </div>

              <div style={{ backgroundColor: '#0B132B', color: '#fff', borderRadius: '16px', padding: '24px', boxShadow: '0 1px 3px 0 rgba(0,0,0,0.05)' }}>
                <h4 style={{ fontSize: '13px', fontWeight: 'bold', margin: '0 0 12px 0', color: '#60a5fa' }}>📌 Walk-In Guidelines</h4>
                <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '11px', lineHeight: '1.6', color: '#cbd5e1', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <li>Mall clinic manages first aid, medical management, and vitals assessment.</li>
                  <li>Severe emergencies will be stabilized and referred immediately to the nearest hospital.</li>
                  <li>Mall employees must present a valid ADO ID for assistance.</li>
                  <li>Mall guests must present a valid government ID for assistance.</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'check-ticket' && (
            <div style={{ ...styles.card, maxWidth: '700px', margin: '0 auto' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>Check Ticket or Medical Clearance Status</h3>
              <p style={{ fontSize: '11px', color: '#64748b', marginBottom: '16px' }}>I-verify ang status ng iyong pila o clearance.</p>
              <div style={{ display: 'flex', gap: '10px' }}>
                <input type="text" placeholder="Enter Ticket Number (e.g. Q-01)" style={styles.input} />
                <button style={{ padding: '10px 20px', backgroundColor: '#2563eb', color: '#fff', border: 'none', borderRadius: '10px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer', whiteSpace: 'nowrap' }}>Search Ticket</button>
              </div>
            </div>
          )}

          {activeTab === 'consultation-records-module' && (
            <div style={{ ...styles.card, maxWidth: '750px', margin: '0 auto' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '4px', color: '#2563eb' }}>Clinic Consultation Record / Clearance Request Form</h3>
              <p style={{ fontSize: '11px', color: '#64748b', marginBottom: '16px' }}>I-fill out ang form na ito para humiling ng opisyal na kopya ng iyong consultation record o medical clearance certificate mula sa clinic.</p>

              <form onSubmit={handleRecordRequestSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div>
                    <label style={styles.label}>FULL NAME *</label>
                    <input type="text" required value={recordRequestForm.fullName} onChange={(e) => setRecordRequestForm({...recordRequestForm, fullName: e.target.value})} placeholder="e.g. Juan Dela Cruz" style={styles.input} />
                  </div>
                  <div>
                    <label style={styles.label}>QUEUE TICKET NUMBER (IF KNOWN)</label>
                    <input type="text" value={recordRequestForm.ticketNo} onChange={(e) => setRecordRequestForm({...recordRequestForm, ticketNo: e.target.value})} placeholder="e.g. Q-01" style={styles.input} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div>
                    <label style={styles.label}>TENANT STORE / DEPARTMENT</label>
                    <input type="text" value={recordRequestForm.department} onChange={(e) => setRecordRequestForm({...recordRequestForm, department: e.target.value})} placeholder="e.g. Nike Store / Admin" style={styles.input} />
                  </div>
                  <div>
                    <label style={styles.label}>CONTACT NUMBER *</label>
                    <input type="text" required value={recordRequestForm.contactNumber} onChange={(e) => setRecordRequestForm({...recordRequestForm, contactNumber: e.target.value})} placeholder="09XX-XXX-XXXX" style={styles.input} />
                  </div>
                </div>

                <div>
                  <label style={styles.label}>PURPOSE OF REQUEST *</label>
                  <select value={recordRequestForm.purpose} onChange={(e) => setRecordRequestForm({...recordRequestForm, purpose: e.target.value})} style={styles.input}>
                    <option>Employment Medical Clearance</option>
                    <option>Return to Work (RTW) Clearance</option>
                    <option>Insurance / OSH Accident Claim</option>
                    <option>Personal Health Record Copy</option>
                  </select>
                </div>

                <button type="submit" style={styles.buttonPrimary}>Submit Record Request 📨</button>
              </form>
            </div>
          )}

          {activeTab === 'osh-incident' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '850px', margin: '0 auto' }}>
              <div style={styles.card}>
                <h3 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '4px', color: '#2563eb' }}>+ File Occupational Safety & Health (OSH) Incident Report</h3>
                <p style={{ fontSize: '11px', color: '#64748b', marginBottom: '16px' }}>Mag-file ng incident o hazard report. Awtomatiko itong mase-save sa Monthly OSH Incidents Registry.</p>
                
                <form onSubmit={handleOshSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '14px' }}>
                    <div>
                      <label style={styles.label}>DATE OF INCIDENT *</label>
                      <input type="date" required value={oshForm.dateOfIncident} onChange={(e) => setOshForm({...oshForm, dateOfIncident: e.target.value})} style={styles.input} />
                    </div>
                    <div>
                      <label style={styles.label}>TIME OF INCIDENT *</label>
                      <input type="time" required value={oshForm.timeOfIncident} onChange={(e) => setOshForm({...oshForm, timeOfIncident: e.target.value})} style={styles.input} />
                    </div>
                    <div>
                      <label style={styles.label}>LOCATION / VENUE *</label>
                      <input type="text" required value={oshForm.location} onChange={(e) => setOshForm({...oshForm, location: e.target.value})} placeholder="e.g. GF Atrium" style={styles.input} />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '14px' }}>
                    <div>
                      <label style={styles.label}>INCIDENT TYPE *</label>
                      <select value={oshForm.incidentType} onChange={(e) => setOshForm({...oshForm, incidentType: e.target.value})} style={styles.input}>
                        <option>Slip, Trip, and Fall</option>
                        <option>Struck by Object</option>
                        <option>Electrical Hazard / Shock</option>
                        <option>Fire / Smoke Incident</option>
                        <option>Ergonomic / Strain Injury</option>
                        <option>Other Safety Hazard</option>
                      </select>
                    </div>
                    <div>
                      <label style={styles.label}>SEVERITY LEVEL *</label>
                      <select value={oshForm.severity} onChange={(e) => setOshForm({...oshForm, severity: e.target.value})} style={styles.input}>
                        <option value="Minor-1st Aid only">Minor-1st Aid only</option>
                        <option value="Moderate- Medical treatment">Moderate- Medical treatment</option>
                        <option value="Major-Hospitalization">Major-Hospitalization</option>
                        <option value="Non-Fatal- Facility damage requiring attention">Non-Fatal- Facility damage requiring attention</option>
                      </select>
                    </div>
                    <div>
                      <label style={styles.label}>STATUS *</label>
                      <select value={oshForm.status} onChange={(e) => setOshForm({...oshForm, status: e.target.value})} style={styles.input}>
                        <option>Open</option>
                        <option>Under Investigation</option>
                        <option>Resolved & Closed</option>
                      </select>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                    <div>
                      <label style={styles.label}>INJURED PERSON / INVOLVED INDIVIDUAL</label>
                      <input type="text" value={oshForm.injuredPerson} onChange={(e) => setOshForm({...oshForm, injuredPerson: e.target.value})} placeholder="e.g. Juan Dela Cruz" style={styles.input} />
                    </div>
                    <div>
                      <label style={styles.label}>TENANT STORE / DEPARTMENT</label>
                      <input type="text" value={oshForm.department} onChange={(e) => setOshForm({...oshForm, department: e.target.value})} placeholder="e.g. Nike Store" style={styles.input} />
                    </div>
                  </div>

                  <div>
                    <label style={styles.label}>DESCRIPTION OF INCIDENT / ACCIDENT *</label>
                    <textarea required rows="3" value={oshForm.description} onChange={(e) => setOshForm({...oshForm, description: e.target.value})} placeholder="Paano nangyari ang insidente? Ilarawan ang mga detalye..." style={{ ...styles.input, resize: 'vertical' }}></textarea>
                  </div>

                  <div>
                    <label style={styles.label}>IMMEDIATE CORRECTIVE ACTIONS TAKEN *</label>
                    <textarea required rows="2" value={oshForm.immediateAction} onChange={(e) => setOshForm({...oshForm, immediateAction: e.target.value})} placeholder="Anong agarang aksyon ang ginawa (hal. First aid, paglagay ng caution sign)..." style={{ ...styles.input, resize: 'vertical' }}></textarea>
                  </div>

                  <button type="submit" style={styles.buttonPrimary}>Submit & Save OSH Incident Report 📋</button>
                </form>
              </div>
            </div>
          )}

          {activeTab === 'triage-portal' && (
            <div style={{ ...styles.card, maxWidth: '950px', margin: '0 auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', paddingBottom: '16px', borderBottom: '1px solid #f1f5f9' }}>
                <div>
                  <h3 style={{ fontSize: '14px', fontWeight: 'bold', margin: 0 }}>{currentUser?.role} Assessment & SOAP Workspace</h3>
                  <p style={{ fontSize: '11px', color: '#64748b', margin: 0 }}>Active Session: <strong>{currentUser?.name}</strong> ({currentUser?.role})</p>
                </div>
              </div>

              <div style={{ backgroundColor: '#eff6ff', border: '1px solid #dbeafe', borderRadius: '12px', padding: '16px', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span style={{ fontSize: '10px', fontWeight: 'bold', color: '#1d4ed8', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>Select Patient from Live Queue ({queueList.filter(p => p.status === 'Waiting').length} Waiting)</span>
                  {queueList.length === 0 ? (
                    <span style={{ fontSize: '12px', color: '#64748b', fontStyle: 'italic' }}>No active patients in queue</span>
                  ) : (
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
                  )}
                </div>
                <span style={{ padding: '6px 12px', backgroundColor: '#2563eb', color: '#fff', fontSize: '11px', fontWeight: 'bold', borderRadius: '8px' }}>
                  Active Assessment
                </span>
              </div>

              {currentPatient ? (
                <>
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

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '12px', paddingTop: '8px', borderTop: '1px dashed #cbd5e1' }}>
                      <div>
                        <span style={{ fontSize: '10px', color: '#64748b', display: 'block', fontWeight: 'bold' }}>TENANT / DEPARTMENT / ID</span>
                        <span style={{ color: '#334155', fontWeight: '600' }}>{currentPatient.department}</span>
                      </div>
                      <div>
                        <span style={{ fontSize: '10px', color: '#64748b', display: 'block', fontWeight: 'bold' }}>CHIEF COMPLAINT / REASON</span>
                        <span style={{ color: '#b91c1c', fontWeight: '500' }}>{currentPatient.chiefComplaint}</span>
                      </div>
                    </div>

                    {/* VITALS INPUT SECTION */}
                    <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px dashed #cbd5e1' }}>
                      <label style={{ ...styles.label, color: '#2563eb', marginBottom: '8px' }}>🩺 Vital Signs Assessment:</label>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
                        <div>
                          <label style={{ fontSize: '9px', color: '#64748b', fontWeight: 'bold' }}>BLOOD PRESSURE (BP)</label>
                          <input 
                            type="text" 
                            value={currentPatient.vitals?.bp || ''} 
                            onChange={(e) => handleVitalsChange('bp', e.target.value)} 
                            placeholder="120/80 mmHg" 
                            style={styles.input} 
                          />
                        </div>
                        <div>
                          <label style={{ fontSize: '9px', color: '#64748b', fontWeight: 'bold' }}>PULSE RATE (PR)</label>
                          <input 
                            type="text" 
                            value={currentPatient.vitals?.pr || ''} 
                            onChange={(e) => handleVitalsChange('pr', e.target.value)} 
                            placeholder="78 bpm" 
                            style={styles.input} 
                          />
                        </div>
                        <div>
                          <label style={{ fontSize: '9px', color: '#64748b', fontWeight: 'bold' }}>TEMPERATURE</label>
                          <input 
                            type="text" 
                            value={currentPatient.vitals?.temp || ''} 
                            onChange={(e) => handleVitalsChange('temp', e.target.value)} 
                            placeholder="36.5 °C" 
                            style={styles.input} 
                          />
                        </div>
                        <div>
                          <label style={{ fontSize: '9px', color: '#64748b', fontWeight: 'bold' }}>OXYGEN SATURATION (SPO2)</label>
                          <input 
                            type="text" 
                            value={currentPatient.vitals?.spo2 || ''} 
                            onChange={(e) => handleVitalsChange('spo2', e.target.value)} 
                            placeholder="98% SpO2" 
                            style={styles.input} 
                          />
                        </div>
                      </div>
                    </div>

                    {/* SOAP NOTES SECTION */}
                    <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px dashed #cbd5e1' }}>
                      <label style={{ ...styles.label, color: '#2563eb', marginBottom: '8px' }}>📝 Nurse SOAP Notes Assessment:</label>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                        <div>
                          <label style={{ fontSize: '9px', color: '#64748b', fontWeight: 'bold' }}>S - SUBJECTIVE (Patient Symptoms / History)</label>
                          <textarea 
                            rows="2" 
                            value={currentPatient.soap?.subjective || ''} 
                            onChange={(e) => handleSoapChange('subjective', e.target.value)} 
                            placeholder="Enter subjective details..." 
                            style={{ ...styles.input, resize: 'vertical' }}
                          ></textarea>
                        </div>
                        <div>
                          <label style={{ fontSize: '9px', color: '#64748b', fontWeight: 'bold' }}>O - OBJECTIVE (Physical Examination / Findings)</label>
                          <textarea 
                            rows="2" 
                            value={currentPatient.soap?.objective || ''} 
                            onChange={(e) => handleSoapChange('objective', e.target.value)} 
                            placeholder="Enter objective findings..." 
                            style={{ ...styles.input, resize: 'vertical' }}
                          ></textarea>
                        </div>
                        <div>
                          <label style={{ fontSize: '9px', color: '#64748b', fontWeight: 'bold' }}>A - ASSESSMENT (Clinical Impression / Diagnosis)</label>
                          <textarea 
                            rows="2" 
                            value={currentPatient.soap?.assessment || ''} 
                            onChange={(e) => handleSoapChange('assessment', e.target.value)} 
                            placeholder="Enter assessment..." 
                            style={{ ...styles.input, resize: 'vertical' }}
                          ></textarea>
                        </div>
                        <div>
                          <label style={{ fontSize: '9px', color: '#64748b', fontWeight: 'bold' }}>P - PLAN (Medical Management / Intervention)</label>
                          <textarea 
                            rows="2" 
                            value={currentPatient.soap?.plan || ''} 
                            onChange={(e) => handleSoapChange('plan', e.target.value)} 
                            placeholder="Enter plan / treatment..." 
                            style={{ ...styles.input, resize: 'vertical' }}
                          ></textarea>
                        </div>
                      </div>
                    </div>

                    <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px dashed #cbd5e1' }}>
                      <label style={{ ...styles.label, color: '#059669', marginBottom: '8px' }}>SELECT MEDICATION / 1ST AID MATERIALS & QUANTITY USED:</label>
                      <div style={{ maxHeight: '250px', overflowY: 'auto', backgroundColor: '#fff', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '10px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        {MEDICINE_SUPPLIES_PRICELIST.map((med, idx) => {
                          const existingMed = (currentPatient.medicationsUsed || []).find(m => m.name === med.name);
                          const isChecked = !!existingMed;
                          return (
                            <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '11px', color: '#334155', borderBottom: '1px solid #f1f5f9', paddingBottom: '6px', paddingTop: '4px', backgroundColor: isChecked ? '#f0fdf4' : 'transparent', paddingLeft: isChecked ? '8px' : '0', paddingRight: isChecked ? '8px' : '0', borderRadius: '6px' }}>
                              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', flex: 1 }}>
                                <input 
                                  type="checkbox" 
                                  checked={isChecked} 
                                  onChange={() => handleToggleMedication(med)}
                                  style={{ cursor: 'pointer', width: '16px', height: '16px', flexShrink: 0 }}
                                />
                                <span style={{ fontWeight: isChecked ? 'bold' : 'normal' }}>
                                  {med.name} <em style={{ color: '#64748b' }}>(₱{med.price.toFixed(2)})</em>
                                </span>
                              </label>

                              {isChecked && (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0, marginLeft: '10px' }}>
                                  <span style={{ fontSize: '10px', fontWeight: 'bold', color: '#166534' }}>Qty Used:</span>
                                  <input 
                                    type="number" 
                                    min="1" 
                                    value={existingMed.quantity} 
                                    onChange={(e) => handleQuantityChange(med.name, e.target.value)}
                                    style={{ width: '60px', padding: '4px 6px', fontSize: '11px', border: '1px solid #16a34a', borderRadius: '6px', textAlign: 'center', fontWeight: 'bold', backgroundColor: '#fff', color: '#166534' }}
                                  />
                                  <span style={{ fontSize: '10px', color: '#059669', fontWeight: 'bold', width: '70px', textAlign: 'right' }}>
                                    ₱{(existingMed.quantity * med.price).toFixed(2)}
                                  </span>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid #f1f5f9' }}>
                    <label style={{ ...styles.label, marginBottom: '8px', color: '#1e293b' }}>Select Disposition Status and Save to Patient Statistic Queue:</label>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                      <button onClick={() => handleSaveRecord('Completed-RTW with instructions')} style={{ padding: '12px', backgroundColor: '#059669', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer', textAlign: 'left' }}>
                        💾 Save & Complete: RTW with instructions
                      </button>
                      <button onClick={() => handleSaveRecord('Completed-Sent Home-for Medical Clearance and FTW')} style={{ padding: '12px', backgroundColor: '#2563eb', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer', textAlign: 'left' }}>
                        💾 Save & Complete: Sent Home for Clearance & FTW
                      </button>
                      <button onClick={() => handleSaveRecord('Completed-Discharged with instructions')} style={{ padding: '12px', backgroundColor: '#0d9488', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer', textAlign: 'left' }}>
                        💾 Save & Complete: Discharged with instructions
                      </button>
                      <button onClick={() => handleSaveRecord('Completed-Assist in HOC transport')} style={{ padding: '12px', backgroundColor: '#ca8a04', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer', textAlign: 'left' }}>
                        💾 Save & Complete: Assist in HOC transport
                      </button>
                      <button onClick={() => handleSaveRecord('Completed-Pick up by Silang ERT-ambulance')} style={{ padding: '12px', backgroundColor: '#dc2626', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer', textAlign: 'left' }}>
                        💾 Save & Complete: Pick up by Silang ERT-ambulance
                      </button>
                      <button onClick={() => handleSaveRecord('Completed-Refused HOC transfer assistance')} style={{ padding: '12px', backgroundColor: '#475569', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer', textAlign: 'left' }}>
                        💾 Save & Complete: Refused HOC transfer assistance
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <p style={{ textAlign: 'center', color: '#94a3b8', fontStyle: 'italic' }}>Walang napiling pasyente.</p>
              )}
            </div>
          )}

          {activeTab === 'patient-stats' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '1100px', margin: '0 auto' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                <div style={{ border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px', backgroundColor: '#fff' }}>
                  <span style={{ fontSize: '10px', fontWeight: 'bold', color: '#64748b', textTransform: 'uppercase' }}>Total Patient Visits</span>
                  <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#2563eb', margin: '4px 0 0 0' }}>{queueList.length}</h3>
                </div>
                <div style={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px' }}>
                  <span style={{ fontSize: '10px', fontWeight: 'bold', color: '#64748b', textTransform: 'uppercase' }}>Total Illness vs Accidents</span>
                  <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#0f172a', margin: '4px 0 0 0' }}>
                    {queueList.filter(p => p.reportType === 'Illness').length} Illness / {queueList.filter(p => p.reportType === 'Accident').length} Accident
                  </h3>
                </div>
                <div style={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px' }}>
                  <span style={{ fontSize: '10px', fontWeight: 'bold', color: '#64748b', textTransform: 'uppercase' }}>Total Supplies Dispensed Cost</span>
                  <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#059669', margin: '4px 0 0 0' }}>
                    ₱{grandTotalCost.toFixed(2)}
                  </h3>
                </div>
              </div>

              <div style={styles.card}>
                <h3 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Patient Statistic & Queue Status Registry
                </h3>

                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px', textAlign: 'left' }}>
                    <thead>
                      <tr style={{ backgroundColor: '#f8fafc', borderBottom: '2px solid #e2e8f0', color: '#475569' }}>
                        <th style={{ padding: '10px' }}>Ticket #</th>
                        <th style={{ padding: '10px' }}>Patient Name / Dept</th>
                        <th style={{ padding: '10px' }}>Type & Status</th>
                        <th style={{ padding: '10px' }}>Vitals</th>
                        <th style={{ padding: '10px' }}>Disposition</th>
                        <th style={{ padding: '10px' }}>Medications & Supplies Used</th>
                        <th style={{ padding: '10px', textAlign: 'center' }}>Export Record PDF</th>
                      </tr>
                    </thead>
                    <tbody>
                      {queueList.map((p) => {
                        const totalCost = (p.medicationsUsed || []).reduce((sum, m) => sum + (m.quantity * m.unitPrice), 0);
                        return (
                          <tr key={p.ticketNo} style={{ borderBottom: '1px solid #f1f5f9' }}>
                            <td style={{ padding: '12px 10px', fontWeight: 'bold', color: '#2563eb' }}>{p.ticketNo}</td>
                            <td style={{ padding: '12px 10px' }}>
                              <strong style={{ color: '#0f172a' }}>{p.fullName}</strong>
                              <div style={{ color: '#64748b', fontSize: '10px' }}>{p.department || p.category}</div>
                            </td>
                            <td style={{ padding: '12px 10px' }}>
                              <span style={{ padding: '2px 6px', backgroundColor: '#eff6ff', color: '#1d4ed8', borderRadius: '4px', fontWeight: 'bold', fontSize: '9px' }}>{p.reportType}</span>
                              <div style={{ fontWeight: 'bold', color: p.status === 'Completed' ? '#059669' : '#d97706', marginTop: '2px', fontSize: '10px' }}>{p.status}</div>
                            </td>
                            <td style={{ padding: '12px 10px', color: '#334155', fontSize: '10px' }}>
                              BP: {p.vitals?.bp || '-'}<br/>
                              PR: {p.vitals?.pr || '-'}<br/>
                              T: {p.vitals?.temp || '-'}<br/>
                              SpO2: {p.vitals?.spo2 || '-'}
                            </td>
                            <td style={{ padding: '12px 10px', color: '#334155', fontSize: '10px', fontWeight: '600' }}>
                              {p.disposition}
                            </td>
                            <td style={{ padding: '12px 10px', color: '#334155' }}>
                              {p.medicationsUsed && p.medicationsUsed.length > 0 ? (
                                <div>
                                  {p.medicationsUsed.map(m => `${m.name} (${m.quantity}x)`).join(', ')}
                                  <div style={{ color: '#059669', fontWeight: 'bold', fontSize: '10px', marginTop: '2px' }}>Total Cost: ₱{totalCost.toFixed(2)}</div>
                                </div>
                              ) : (
                                <span style={{ color: '#94a3b8', fontStyle: 'italic' }}>No supplies used</span>
                              )}
                            </td>
                            <td style={{ padding: '12px 10px', textAlign: 'center' }}>
                              <button onClick={() => generateConsultationPDF(p)} style={{ padding: '6px 12px', backgroundColor: '#059669', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '10px', fontWeight: 'bold', cursor: 'pointer' }}>
                                📄 Export PDF
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* CLINIC ACTIVITY & PROGRAM CALENDAR DASHBOARD WITH KPI STATUS GRAPH & DATE FILTER */}
          {activeTab === 'clinic-calendar' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '1200px', margin: '0 auto' }}>
              
              {/* SCHEDULER FORM */}
              <div style={styles.card}>
                <h3 style={{ fontSize: '13px', fontWeight: 'bold', marginBottom: '14px', color: '#2563eb' }}>+ Schedule New Clinic Activity or Program</h3>
                <form onSubmit={handleCalendarSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={styles.label}>ACTIVITY / PROGRAM NAME *</label>
                      <input type="text" required value={calForm.activityName} onChange={(e) => setCalForm({...calForm, activityName: e.target.value})} placeholder="e.g. Workplace Mental Health Seminar" style={styles.input} />
                    </div>
                    <div>
                      <label style={styles.label}>SCHEDULED DATE *</label>
                      <input type="date" required value={calForm.scheduledDate} onChange={(e) => setCalForm({...calForm, scheduledDate: e.target.value})} style={styles.input} />
                    </div>
                    <div>
                      <label style={styles.label}>SCHEDULED TIME *</label>
                      <input type="time" required value={calForm.scheduledTime} onChange={(e) => setCalForm({...calForm, scheduledTime: e.target.value})} style={styles.input} />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={styles.label}>LOCATION / VENUE *</label>
                      <input type="text" required value={calForm.location} onChange={(e) => setCalForm({...calForm, location: e.target.value})} placeholder="e.g. Mall Clinic Atrium" style={styles.input} />
                    </div>
                    <div>
                      <label style={styles.label}>KPI CATEGORY *</label>
                      <select value={calForm.kpiCategory} onChange={(e) => setCalForm({...calForm, kpiCategory: e.target.value})} style={styles.input}>
                        {kpiCategoriesList.map((kpi, i) => (
                          <option key={i} value={kpi}>{kpi}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label style={styles.label}>RECURRENCE *</label>
                      <select value={calForm.recurrence} onChange={(e) => setCalForm({...calForm, recurrence: e.target.value})} style={styles.input}>
                        <option>One-Time Only</option>
                        <option>Weekly</option>
                        <option>Monthly</option>
                        <option>Quarterly</option>
                      </select>
                    </div>
                    <div>
                      <label style={styles.label}>INITIAL STATUS *</label>
                      <select value={calForm.status} onChange={(e) => setCalForm({...calForm, status: e.target.value})} style={styles.input}>
                        <option>Not Started</option>
                        <option>In Progress</option>
                        <option>Completed</option>
                        <option>Rescheduled</option>
                      </select>
                    </div>
                    <div>
                      <label style={styles.label}>STATUS UPDATE DATE *</label>
                      <input type="date" required value={calForm.statusDate} onChange={(e) => setCalForm({...calForm, statusDate: e.target.value})} style={styles.input} />
                    </div>
                  </div>

                  <div>
                    <label style={styles.label}>ASSIGNED STAFF *</label>
                    <input type="text" value={calForm.assignedPerson} onChange={(e) => setCalForm({...calForm, assignedPerson: e.target.value})} style={styles.input} />
                  </div>

                  <div>
                    <label style={styles.label}>ADDITIONAL NOTES / OBJECTIVES</label>
                    <textarea rows="2" value={calForm.notes} onChange={(e) => setCalForm({...calForm, notes: e.target.value})} placeholder="Enter brief description or goals..." style={{ ...styles.input, resize: 'vertical' }}></textarea>
                  </div>

                  <button type="submit" style={styles.buttonPrimary}>Schedule Activity to Calendar 📅</button>
                </form>
              </div>

              {/* KPI STATUS GRAPH CARD */}
              <div style={styles.card}>
                <h3 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '14px', color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  📊 Clinic Activities Status Graph by KPI Category
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                  {kpiCategoriesList.map((kpi, idx) => {
                    const stats = kpiStatsMap[kpi];
                    return (
                      <div key={idx} style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px' }}>
                        <h4 style={{ fontSize: '11px', fontWeight: 'bold', color: '#1e293b', marginBottom: '8px', minHeight: '28px' }}>{kpi}</h4>
                        <div style={{ fontSize: '11px', color: '#475569', display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '10px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span>Completed:</span><strong style={{ color: '#166534' }}>{stats['Completed']}</strong>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span>In Progress:</span><strong style={{ color: '#854d0e' }}>{stats['In Progress']}</strong>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span>Not Started:</span><strong style={{ color: '#334155' }}>{stats['Not Started']}</strong>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span>Rescheduled:</span><strong style={{ color: '#991b1b' }}>{stats['Rescheduled']}</strong>
                          </div>
                        </div>
                        <div style={{ width: '100%', backgroundColor: '#e2e8f0', borderRadius: '4px', height: '8px', overflow: 'hidden' }}>
                          <div style={{ width: `${Math.round((stats.total / maxKpiCount) * 100)}%`, backgroundColor: '#2563eb', height: '100%', borderRadius: '4px' }}></div>
                        </div>
                        <span style={{ fontSize: '10px', color: '#64748b', display: 'block', marginTop: '6px', textAlign: 'right' }}>Total Events: <strong>{stats.total}</strong></span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* CALENDAR REGISTRY TABLE */}
              <div style={styles.card}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
                  <h3 style={{ fontSize: '13px', fontWeight: 'bold', margin: 0, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Scheduled Clinic Activities & Programs Registry ({calendarEvents.length} Events)
                  </h3>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: '#f1f5f9', padding: '8px 12px', borderRadius: '10px', border: '1px solid #cbd5e1' }}>
                    <div>
                      <span style={{ fontSize: '9px', fontWeight: 'bold', color: '#64748b', display: 'block' }}>FROM:</span>
                      <input type="date" value={calStartDate} onChange={(e) => setCalStartDate(e.target.value)} style={{ fontSize: '11px', padding: '4px', border: '1px solid #cbd5e1', borderRadius: '6px' }} />
                    </div>
                    <div>
                      <span style={{ fontSize: '9px', fontWeight: 'bold', color: '#64748b', display: 'block' }}>TO:</span>
                      <input type="date" value={calEndDate} onChange={(e) => setCalEndDate(e.target.value)} style={{ fontSize: '11px', padding: '4px', border: '1px solid #cbd5e1', borderRadius: '6px' }} />
                    </div>
                    <button 
                      onClick={() => generateCalendarPDF(calendarEvents, calStartDate, calEndDate)} 
                      style={{ padding: '8px 14px', backgroundColor: '#059669', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer', height: 'fit-self', alignSelf: 'flex-end' }}
                    >
                      📄 Export PDF
                    </button>
                  </div>
                </div>

                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px', textAlign: 'left' }}>
                    <thead>
                      <tr style={{ backgroundColor: '#f8fafc', borderBottom: '2px solid #e2e8f0', color: '#475569' }}>
                        <th style={{ padding: '10px' }}>ID (Click to Edit)</th>
                        <th style={{ padding: '10px' }}>Activity / Program Name</th>
                        <th style={{ padding: '10px' }}>Schedule</th>
                        <th style={{ padding: '10px' }}>Location</th>
                        <th style={{ padding: '10px' }}>KPI Category</th>
                        <th style={{ padding: '10px' }}>Recurrence</th>
                        <th style={{ padding: '10px' }}>Assigned Staff</th>
                        <th style={{ padding: '10px' }}>Status / Remarks</th>
                      </tr>
                    </thead>
                    <tbody>
                      {calendarEvents.length === 0 ? (
                        <tr>
                          <td colSpan="8" style={{ padding: '20px', textAlign: 'center', color: '#94a3b8', fontStyle: 'italic' }}>Walang naka-schedule na aktibidad.</td>
                        </tr>
                      ) : (
                        calendarEvents.map((ev) => (
                          <tr key={ev.eventId} style={{ borderBottom: '1px solid #f1f5f9' }}>
                            <td style={{ padding: '12px 10px' }}>
                              <button 
                                onClick={() => setEditingEvent(ev)} 
                                style={{ background: 'none', border: 'none', color: '#2563eb', fontWeight: '900', cursor: 'pointer', textDecoration: 'underline', padding: 0, fontSize: '11px' }}
                                title="Click to edit activity details"
                              >
                                {ev.eventId}
                              </button>
                            </td>

                            <td style={{ padding: '12px 10px' }}>
                              <strong style={{ color: '#0f172a', display: 'block' }}>{ev.activityName}</strong>
                              <span style={{ fontSize: '10px', color: '#64748b' }}>{ev.notes}</span>
                            </td>
                            <td style={{ padding: '12px 10px' }}>{ev.scheduledDate} ({ev.scheduledTime})</td>
                            <td style={{ padding: '12px 10px' }}>{ev.location}</td>
                            <td style={{ padding: '12px 10px' }}>{ev.kpiCategory}</td>
                            <td style={{ padding: '12px 10px', color: '#059669', fontWeight: '600' }}>{ev.recurrence}</td>
                            <td style={{ padding: '12px 10px' }}>{ev.assignedPerson}</td>
                            <td style={{ padding: '12px 10px' }}>
                              <span style={{ 
                                padding: '4px 10px', 
                                borderRadius: '12px', 
                                fontWeight: 'bold', 
                                fontSize: '10px', 
                                backgroundColor: ev.status === 'Completed' ? '#dcfce7' : ev.status === 'In Progress' ? '#fef9c3' : ev.status === 'Rescheduled' ? '#fee2e2' : '#f1f5f9', 
                                color: ev.status === 'Completed' ? '#166534' : ev.status === 'In Progress' ? '#854d0e' : ev.status === 'Rescheduled' ? '#991b1b' : '#334155',
                                display: 'inline-block'
                              }}>
                                {ev.status}
                              </span>
                              {ev.attachment && <div style={{ fontSize: '9px', color: '#166534', marginTop: '2px' }}>✓ Has Photo</div>}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* MONTHLY REPORT & FINANCIAL SUMMARY WITH PATIENT STATISTICS GRAPHS */}
          {activeTab === 'monthly-clinic' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '1100px', margin: '0 auto' }}>
              
              {/* 1. MONTHLY STATS & GRAPHS */}
              <div style={styles.card}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
                  <div>
                    <h3 style={{ fontSize: '15px', fontWeight: 'bold', margin: 0, color: '#0f172a' }}>Monthly Clinic Statistics & Graph Reports</h3>
                    <p style={{ fontSize: '11px', color: '#64748b', margin: '2px 0 0 0' }}>Graphical breakdown ng patient visits ayon sa kategorya, departamento, chief complaints, at uri ng report.</p>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: '#f1f5f9', padding: '8px 12px', borderRadius: '10px', border: '1px solid #cbd5e1' }}>
                    <div>
                      <span style={{ fontSize: '9px', fontWeight: 'bold', color: '#64748b', display: 'block' }}>FROM:</span>
                      <input type="date" value={statStartDate} onChange={(e) => setStatStartDate(e.target.value)} style={{ fontSize: '11px', padding: '4px', border: '1px solid #cbd5e1', borderRadius: '6px' }} />
                    </div>
                    <div>
                      <span style={{ fontSize: '9px', fontWeight: 'bold', color: '#64748b', display: 'block' }}>TO:</span>
                      <input type="date" value={statEndDate} onChange={(e) => setStatEndDate(e.target.value)} style={{ fontSize: '11px', padding: '4px', border: '1px solid #cbd5e1', borderRadius: '6px' }} />
                    </div>
                    <button 
                      onClick={() => generateMonthlySummaryPDF(aggregatedMedsList, grandTotalCost, { totalVisits: queueList.length, byReportType: statsByReportType })} 
                      style={{ padding: '8px 14px', backgroundColor: '#059669', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer', height: 'fit-self', alignSelf: 'flex-end' }}
                    >
                      📄 Export PDF
                    </button>
                  </div>
                </div>

                {/* GRAPH SECTION: 4 GRAPHS IN 2x2 GRID */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
                  
                  {/* 1. BY CATEGORY */}
                  <div style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px' }}>
                    <h4 style={{ fontSize: '12px', fontWeight: 'bold', color: '#475569', textTransform: 'uppercase', marginBottom: '12px' }}>
                      📊 Patient Visits by Category
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {Object.entries(statsByCategory).map(([cat, count], idx) => {
                        const pct = Math.round((count / maxCatCount) * 100);
                        return (
                          <div key={idx} style={{ fontSize: '11px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                              <span style={{ fontWeight: 'bold', color: '#1e293b' }}>{cat}</span>
                              <span style={{ color: '#2563eb', fontWeight: 'bold' }}>{count} visits</span>
                            </div>
                            <div style={{ width: '100%', backgroundColor: '#e2e8f0', borderRadius: '4px', height: '8px', overflow: 'hidden' }}>
                              <div style={{ width: `${Math.max(pct, 10)}%`, backgroundColor: '#2563eb', height: '100%', borderRadius: '4px' }}></div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* 2. BY TENANT / DEPARTMENT */}
                  <div style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px' }}>
                    <h4 style={{ fontSize: '12px', fontWeight: 'bold', color: '#475569', textTransform: 'uppercase', marginBottom: '12px' }}>
                      📊 Patient Visits by Tenant / Department
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {Object.entries(statsByDepartment).map(([dept, count], idx) => {
                        const pct = Math.round((count / maxDeptCount) * 100);
                        return (
                          <div key={idx} style={{ fontSize: '11px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                              <span style={{ fontWeight: 'bold', color: '#1e293b' }}>{dept}</span>
                              <span style={{ color: '#059669', fontWeight: 'bold' }}>{count} cases</span>
                            </div>
                            <div style={{ width: '100%', backgroundColor: '#e2e8f0', borderRadius: '4px', height: '8px', overflow: 'hidden' }}>
                              <div style={{ width: `${Math.max(pct, 10)}%`, backgroundColor: '#059669', height: '100%', borderRadius: '4px' }}></div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* 3. BY CHIEF COMPLAINT / CASES */}
                  <div style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px' }}>
                    <h4 style={{ fontSize: '12px', fontWeight: 'bold', color: '#475569', textTransform: 'uppercase', marginBottom: '12px' }}>
                      📊 Number of Cases (Chief Complaint / Reason)
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {Object.entries(statsByComplaint).map(([comp, count], idx) => {
                        const pct = Math.round((count / maxCompCount) * 100);
                        return (
                          <div key={idx} style={{ fontSize: '11px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                              <span style={{ fontWeight: 'bold', color: '#1e293b', textTransform: 'capitalize' }}>{comp}</span>
                              <span style={{ color: '#d97706', fontWeight: 'bold' }}>{count} cases</span>
                            </div>
                            <div style={{ width: '100%', backgroundColor: '#e2e8f0', borderRadius: '4px', height: '8px', overflow: 'hidden' }}>
                              <div style={{ width: `${Math.max(pct, 10)}%`, backgroundColor: '#d97706', height: '100%', borderRadius: '4px' }}></div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* 4. BY TYPE OF REPORT */}
                  <div style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px' }}>
                    <h4 style={{ fontSize: '12px', fontWeight: 'bold', color: '#475569', textTransform: 'uppercase', marginBottom: '12px' }}>
                      📊 Patient Visits by Type of Report (Illness vs Accident)
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {Object.entries(statsByReportType).map(([repType, count], idx) => {
                        const pct = Math.round((count / maxReportCount) * 100);
                        return (
                          <div key={idx} style={{ fontSize: '11px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                              <span style={{ fontWeight: 'bold', color: '#1e293b' }}>{repType}</span>
                              <span style={{ color: '#9333ea', fontWeight: 'bold' }}>{count} reports</span>
                            </div>
                            <div style={{ width: '100%', backgroundColor: '#e2e8f0', borderRadius: '4px', height: '8px', overflow: 'hidden' }}>
                              <div style={{ width: `${Math.max(pct, 10)}%`, backgroundColor: '#9333ea', height: '100%', borderRadius: '4px' }}></div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                </div>
              </div>

              {/* 2. MONTHLY FINANCIAL & USAGE SUMMARY CARD WITH ITS OWN DATE FILTER */}
              <div style={styles.card}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
                  <div>
                    <h3 style={{ fontSize: '14px', fontWeight: 'bold', margin: 0, color: '#0f172a' }}>Monthly Medication Usage & Financial Summary</h3>
                    <p style={{ fontSize: '11px', color: '#64748b', margin: '2px 0 0 0' }}>Aktwal na itemized na listahan, dami, at kabuuang halaga ng mga nagamit na gamot at supplies.</p>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: '#f1f5f9', padding: '8px 12px', borderRadius: '10px', border: '1px solid #cbd5e1' }}>
                    <div>
                      <span style={{ fontSize: '9px', fontWeight: 'bold', color: '#64748b', display: 'block' }}>FROM:</span>
                      <input type="date" value={medStartDate} onChange={(e) => setMedStartDate(e.target.value)} style={{ fontSize: '11px', padding: '4px', border: '1px solid #cbd5e1', borderRadius: '6px' }} />
                    </div>
                    <div>
                      <span style={{ fontSize: '9px', fontWeight: 'bold', color: '#64748b', display: 'block' }}>TO:</span>
                      <input type="date" value={medEndDate} onChange={(e) => setMedEndDate(e.target.value)} style={{ fontSize: '11px', padding: '4px', border: '1px solid #cbd5e1', borderRadius: '6px' }} />
                    </div>
                    <button 
                      onClick={() => generateMedicationSummaryPDF(aggregatedMedsList, grandTotalCost, medStartDate, medEndDate)} 
                      style={{ padding: '8px 14px', backgroundColor: '#059669', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer', height: 'fit-self', alignSelf: 'flex-end' }}
                    >
                      📄 Export PDF
                    </button>
                  </div>
                </div>

                {aggregatedMedsList.length === 0 ? (
                  <p style={{ textAlign: 'center', color: '#94a3b8', fontStyle: 'italic', padding: '20px' }}>Wala pang naitalang nagamit na gamot o supplies.</p>
                ) : (
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px', textAlign: 'left' }}>
                      <thead>
                        <tr style={{ backgroundColor: '#f8fafc', borderBottom: '2px solid #e2e8f0', color: '#475569' }}>
                          <th style={{ padding: '10px' }}>Medication / Supply Item</th>
                          <th style={{ padding: '10px', textAlign: 'center' }}>Unit Price</th>
                          <th style={{ padding: '10px', textAlign: 'center' }}>Total Qty Dispensed</th>
                          <th style={{ padding: '10px', textAlign: 'right' }}>Total Cost (₱)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {aggregatedMedsList.map((med, idx) => (
                          <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                            <td style={{ padding: '10px', fontWeight: 'bold', color: '#0f172a' }}>{med.name}</td>
                            <td style={{ padding: '10px', textAlign: 'center' }}>₱{med.unitPrice.toFixed(2)}</td>
                            <td style={{ padding: '10px', textAlign: 'center', fontWeight: 'bold', color: '#2563eb' }}>{med.totalQty}</td>
                            <td style={{ padding: '10px', textAlign: 'right', fontWeight: 'bold', color: '#059669' }}>₱{med.totalCost.toFixed(2)}</td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr style={{ backgroundColor: '#f8fafc', borderTop: '2px solid #cbd5e1' }}>
                          <td colSpan="3" style={{ padding: '12px 10px', fontWeight: 'bold', textAlign: 'right', fontSize: '12px' }}>GRAND TOTAL MONTHLY COST:</td>
                          <td style={{ padding: '12px 10px', textAlign: 'right', fontWeight: '900', color: '#059669', fontSize: '14px' }}>₱{grandTotalCost.toFixed(2)}</td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                )}
              </div>

              {/* 3. OSH INCIDENTS REGISTRY TABLE WITH CLICKABLE ID FOR EDITING STATUS */}
              <div style={styles.card}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '12px' }}>
                  <h3 style={{ fontSize: '13px', fontWeight: 'bold', margin: 0, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#2563eb' }}>
                    Filed OSH Incidents & Safety Hazards Registry ({oshIncidents.length} Reports)
                  </h3>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: '#f1f5f9', padding: '8px 12px', borderRadius: '10px', border: '1px solid #cbd5e1' }}>
                    <div>
                      <span style={{ fontSize: '9px', fontWeight: 'bold', color: '#64748b', display: 'block' }}>FROM:</span>
                      <input type="date" value={oshStartDate} onChange={(e) => setOshStartDate(e.target.value)} style={{ fontSize: '11px', padding: '4px', border: '1px solid #cbd5e1', borderRadius: '6px' }} />
                    </div>
                    <div>
                      <span style={{ fontSize: '9px', fontWeight: 'bold', color: '#64748b', display: 'block' }}>TO:</span>
                      <input type="date" value={oshEndDate} onChange={(e) => setOshEndDate(e.target.value)} style={{ fontSize: '11px', padding: '4px', border: '1px solid #cbd5e1', borderRadius: '6px' }} />
                    </div>
                    <button 
                      onClick={() => generateOshRegistryPDF(oshIncidents, oshStartDate, oshEndDate)} 
                      style={{ padding: '8px 14px', backgroundColor: '#059669', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer', height: 'fit-self', alignSelf: 'flex-end' }}
                    >
                      📄 Export PDF
                    </button>
                  </div>
                </div>

                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px', textAlign: 'left' }}>
                    <thead>
                      <tr style={{ backgroundColor: '#f8fafc', borderBottom: '2px solid #e2e8f0', color: '#475569' }}>
                        <th style={{ padding: '10px' }}>ID (Click to Edit)</th>
                        <th style={{ padding: '10px' }}>Date & Time</th>
                        <th style={{ padding: '10px' }}>Location</th>
                        <th style={{ padding: '10px' }}>Incident Type</th>
                        <th style={{ padding: '10px' }}>Severity</th>
                        <th style={{ padding: '10px' }}>Victim / Dept</th>
                        <th style={{ padding: '10px' }}>Status</th>
                        <th style={{ padding: '10px', textAlign: 'center' }}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {oshIncidents.map((inc) => (
                        <tr key={inc.incidentId} style={{ borderBottom: '1px solid #f1f5f9' }}>
                          <td style={{ padding: '10px' }}>
                            <button 
                              onClick={() => setEditingOshIncident(inc)} 
                              style={{ background: 'none', border: 'none', color: '#2563eb', fontWeight: '900', cursor: 'pointer', textDecoration: 'underline', padding: 0, fontSize: '11px' }}
                              title="Click to edit OSH status"
                            >
                              {inc.incidentId}
                            </button>
                          </td>
                          <td style={{ padding: '10px' }}>{inc.dateOfIncident}<br/><span style={{ color: '#64748b' }}>{inc.timeOfIncident}</span></td>
                          <td style={{ padding: '10px' }}>{inc.location}</td>
                          <td style={{ padding: '10px', fontWeight: '600' }}>{inc.incidentType}</td>
                          <td style={{ padding: '10px' }}>
                            <span style={{ padding: '2px 8px', borderRadius: '6px', fontSize: '10px', fontWeight: 'bold', backgroundColor: inc.severity.includes('Minor') ? '#dcfce7' : '#fee2e2', color: inc.severity.includes('Minor') ? '#166534' : '#b91c1c' }}>
                              {inc.severity}
                            </span>
                          </td>
                          <td style={{ padding: '10px' }}>{inc.injuredPerson || 'N/A'}<br/><span style={{ color: '#64748b' }}>{inc.department}</span></td>
                          <td style={{ padding: '10px' }}>
                            <span style={{ fontWeight: 'bold', color: inc.status === 'Resolved & Closed' ? '#059669' : '#d97706' }}>
                              {inc.status}
                            </span>
                          </td>
                          <td style={{ padding: '10px', textAlign: 'center' }}>
                            <button onClick={() => generateOshPDF(inc)} style={{ padding: '6px 10px', backgroundColor: '#059669', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '10px', fontWeight: 'bold', cursor: 'pointer' }}>
                              📄 PDF
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}
        </main>
      </div>
    </div>
  );
}
'use client';

import { useMemo, useState } from 'react';

type WocData = {
  workOrder: string; partNumber: string; revision: string; customer: string; quantity: string; dueDate: string; department: string;
  operation: string; process: string; currentListedRate: string; observedBaseline: string; setupTime: string; notes: string;
  issueType: string; priority: string; problemSummary: string; requestedAction: string;
};

const initial: WocData = { workOrder:'', partNumber:'', revision:'', customer:'', quantity:'', dueDate:'', department:'', operation:'', process:'', currentListedRate:'', observedBaseline:'', setupTime:'', notes:'', issueType:'Incorrect Time', priority:'Medium', problemSummary:'', requestedAction:'' };
const DEFAULT_TO_EMAIL = 'Christophertroyhilton@gmail.com';

const checks = ['I confirm the work order number is correct.','I confirm the part number is correct.','I confirm the operation/process is correct.','I confirm the issue and requested correction are accurate.','I confirm the email draft is ready to send.'];

export default function Page() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<WocData>(initial);
  const [img, setImg] = useState<string>('');
  const [confirm, setConfirm] = useState<boolean[]>(Array(5).fill(false));
  const [sending, setSending] = useState(false);
  const [msg, setMsg] = useState('');
  const today = new Date().toLocaleDateString();

  const report = useMemo(()=>`ENGINEERING WORK ORDER CORRECTION REPORT\n\nTitle:\n${data.workOrder} / ${data.partNumber} – ${data.issueType} Correction Request\n\nCorrection Type:\n${data.issueType}\n\nPriority:\n${data.priority}\n\nPart / Work Order Information:\nWork Order Number:\n${data.workOrder}\n\nPart Number:\n${data.partNumber}\n\nRevision:\n${data.revision}\n\nCustomer:\n${data.customer}\n\nQuantity:\n${data.quantity}\n\nDepartment:\n${data.department}\n\nOperation / Router Step:\n${data.operation}\n\nProcess:\n${data.process}\n\nCurrent Work Order Condition:\n${data.currentListedRate || data.notes}\n\nObserved Problem:\n${data.problemSummary}\n\nCorrected / Requested Information:\n${data.requestedAction}\n\nTime Correction Details:\nCurrent Listed Rate:\n${data.currentListedRate}\n\nObserved Sustainable Baseline:\n${data.observedBaseline}\n\nRecommended Engineering Baseline:\n${data.observedBaseline}, pending Engineering review\n\nReason for Correction:\nThe current listed rate creates an unrealistic production expectation. Based on shop-floor observation, the observed sustainable baseline is more balanced and realistic for this operation.\n\nEvidence / Basis for Correction:\nThe work order router identifies the affected operation. Shop-floor review identified the current listed rate or information as inaccurate, missing, or not sustainable.\n\nRisk if Not Corrected:\nIf the work order information is not corrected, scheduling, labor planning, costing, and production expectations may continue to be based on inaccurate data.\n\nRequested Engineering Action:\n${data.requestedAction}\n\nSubmitted By:\nChris\n\nDate:\n${today}`,[data,today]);

  const email = useMemo(()=>`To:\n${DEFAULT_TO_EMAIL}\n\nSubject:\nWork Order Correction Request – ${data.workOrder} / ${data.partNumber} – ${data.issueType}\n\nBody:\nEngineering Team,\n\nPlease review the work order correction request for the following:\n\nWork Order:\n${data.workOrder}\n\nPart Number:\n${data.partNumber}\n\nRevision:\n${data.revision}\n\nCustomer:\n${data.customer}\n\nOperation:\n${data.operation} – ${data.process}\n\nIssue Summary:\n${data.problemSummary}\n\nCurrent Listed Condition:\n${data.currentListedRate || data.notes}\n\nObserved Sustainable Baseline / Corrected Information:\n${data.observedBaseline}\n\nRequested Correction:\n${data.requestedAction}\n\nReason for Request:\nThe current work order information creates an inaccurate production expectation and may affect scheduling, labor planning, costing, or production flow if left unchanged.\n\nPriority:\n${data.priority}\n\nThank you,\n\nChris`,[data]);

  const set = (k:keyof WocData,v:string)=>setData(d=>({...d,[k]:v}));
  const copy = async (text:string)=> navigator.clipboard.writeText(text);
  const loadSample=()=>setData({...data,workOrder:'042631-001',partNumber:'CYM-1750-LH-BU',revision:'B',customer:'ENWORK',quantity:'35 EA',department:'Welding',operation:'003000 L WD10',process:'WELDING',issueType:'Incorrect Time',currentListedRate:'33 parts per hour',observedBaseline:'12.5 parts per hour',priority:'High',problemSummary:'The current listed welding rate of 33 parts per hour is not obtainable or sustainable under actual production conditions.',requestedAction:'Please review and update the welding runtime/rate from 33 parts per hour to a sustainable baseline of 12.5 parts per hour, or establish the correct Engineering-approved welding time.'});

  async function send(){
    setSending(true);setMsg('');
    const res = await fetch('/api/send',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({recipient:DEFAULT_TO_EMAIL,subject:`Work Order Correction Request – ${data.workOrder} / ${data.partNumber} – ${data.issueType}`,emailBody:email,reportBody:report})});
    const out = await res.json();
    setMsg(out.error || 'Email sent successfully.');
    setSending(false);
  }

  return <main className='container'>
    <h1>AI-WOC Lite</h1><p className='small'>Snap → Extract → Confirm → Issue → Generate Draft → Confirm → Send</p>
    <div className='card'><h2>1. Capture</h2>
      <input type='file' accept='image/*' onChange={(e)=>{const f=e.target.files?.[0]; if(f){setImg(URL.createObjectURL(f));}}}/>
      {img && <img className='preview' src={img} alt='preview'/>}
      <div className='row'><button className='secondary' onClick={()=>setMsg('OCR placeholder: use Manual Entry for MVP.')}>Extract Work Order Data</button><button onClick={()=>setStep(2)}>Manual Entry</button></div>
      <button className='secondary' onClick={loadSample}>Load Sample WOC</button>
    </div>

    <div className='card'><h2>2-3. Data + Issue</h2>
      {(['workOrder','partNumber','revision','customer','quantity','dueDate','department','operation','process','currentListedRate','observedBaseline','setupTime','notes'] as (keyof WocData)[]).map(k=><div key={k}><label>{k}</label><input value={data[k]} onChange={e=>set(k,e.target.value)}/></div>)}
      <label>Issue Type</label><select value={data.issueType} onChange={e=>set('issueType',e.target.value)}>{['Incorrect Time','Missing Information','Missing Operation','Missing Fixture Callout','Wrong Routing','Missing Setup Time','Missing Grind / Finish Time','Other'].map(v=><option key={v}>{v}</option>)}</select>
      <label>Priority</label><select value={data.priority} onChange={e=>set('priority',e.target.value)}>{['Low','Medium','High','Critical'].map(v=><option key={v}>{v}</option>)}</select>
      <label>Problem Summary</label><textarea value={data.problemSummary} onChange={e=>set('problemSummary',e.target.value)}/>
      <label>Requested Engineering Action</label><textarea value={data.requestedAction} onChange={e=>set('requestedAction',e.target.value)}/>
      <button onClick={()=>setStep(4)}>Generate Draft Output</button>
    </div>

    {step>=4 && <div className='card'><h2>4-5. Draft + Confirm + Send</h2>
      <h3>Report</h3><pre>{report}</pre>
      <h3>Email Draft</h3><pre>{email}</pre>
      {checks.map((c,i)=><label className='inline' key={c}><input type='checkbox' checked={confirm[i]} onChange={e=>setConfirm(s=>s.map((v,idx)=>idx===i?e.target.checked:v))}/>{c}</label>)}
      <div className='row'><button className='secondary' onClick={()=>copy(report)}>Copy Report</button><button className='secondary' onClick={()=>copy(email)}>Copy Email</button></div>
      <button disabled={!confirm.every(Boolean)||sending} onClick={send}>{sending?'Sending...':'Send Email'}</button>
      {msg && <p className='small'>{msg}</p>}
    </div>}
  </main>;
}

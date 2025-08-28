
"use client";
import { useEffect, useMemo, useState } from "react";
type HostOption = { label: string; mention?: string };
const OFFICE_NAME = process.env.NEXT_PUBLIC_OFFICE_NAME || "Our Office";
function getHostOptions(): HostOption[] | null {
  try {
    const raw = process.env.NEXT_PUBLIC_HOSTS;
    if (!raw) return null;
    const arr = JSON.parse(raw) as HostOption[];
    return Array.isArray(arr) ? arr : null;
  } catch { return null; }
}
export default function CheckinForm() {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [lookingFor, setLookingFor] = useState("");
  const [selectedHost, setSelectedHost] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<null | { ok: boolean; message: string }>(null);
  const hostOptions = useMemo(getHostOptions, []);
  useEffect(()=>{ const v=localStorage.getItem("fo_checkin_name"); if(v) setName(v); },[]);
  useEffect(()=>{ if(name) localStorage.setItem("fo_checkin_name", name); },[name]);
  async function handleSubmit(e: React.FormEvent){
    e.preventDefault(); setStatus(null);
    const hostLabel = hostOptions?.find(h=>h.label===selectedHost)?.label ?? "";
    const hostMention = hostOptions?.find(h=>h.label===selectedHost)?.mention ?? "";
    const payload = { name: name.trim(), company: company.trim()||undefined, phone: phone.trim()||undefined,
      lookingFor: lookingFor.trim() || hostLabel || undefined, hostMention: hostMention || undefined,
      notes: notes.trim()||undefined, location: OFFICE_NAME };
    if(!payload.name || !payload.lookingFor){ setStatus({ok:false,message:"Please fill in your name and who you’re looking for."}); return; }
    setSubmitting(true);
    try{
      const res = await fetch("/api/checkin",{ method:"POST", headers:{ "Content-Type":"application/json" }, body: JSON.stringify(payload) });
      if(!res.ok){ const err = await res.json().catch(()=>({})); throw new Error(err?.error || `Request failed (${res.status})`); }
      setStatus({ok:true,message:"Checked in! We’ve notified the team."});
      setCompany(""); setPhone(""); setLookingFor(""); setSelectedHost(""); setNotes("");
    }catch(err:any){ setStatus({ok:false,message:err?.message||"Something went wrong."}); }
    finally{ setSubmitting(false); }
  }
  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-sm ring-1 ring-gray-200 rounded-2xl p-5 sm:p-6 space-y-4">
      <div className="space-y-1.5">
        <label htmlFor="name" className="text-sm font-medium">Your name *</label>
        <input id="name" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Jane Doe"
          className="w-full rounded-xl border border-gray-300 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-500" required/>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label htmlFor="company" className="text-sm font-medium">Company</label>
          <input id="company" value={company} onChange={(e)=>setCompany(e.target.value)} placeholder="Acme Co."
            className="w-full rounded-xl border border-gray-300 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-500"/>
        </div>
        <div className="space-y-1.5">
          <label htmlFor="phone" className="text-sm font-medium">Phone</label>
          <input id="phone" value={phone} onChange={(e)=>setPhone(e.target.value)} placeholder="(555) 123-4567"
            className="w-full rounded-xl border border-gray-300 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-500"/>
        </div>
      </div>
      {hostOptions ? (
        <div className="space-y-1.5">
          <label htmlFor="host" className="text-sm font-medium">Who are you here to see? *</label>
          <select id="host" value={selectedHost} onChange={(e)=>setSelectedHost(e.target.value)}
            className="w-full rounded-xl border border-gray-300 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white" required={!lookingFor}>
            <option value="" disabled>Select a person or team…</option>
            {hostOptions.map(opt => <option key={opt.label} value={opt.label}>{opt.label}</option>)}
          </select>
          <p className="text-xs text-gray-500">You can also use the box below.</p>
        </div>
      ): null}
      <div className="space-y-1.5">
        <label htmlFor="lookingFor" className="text-sm font-medium">Free-text: who are you looking for? {hostOptions? "" : "*"}</label>
        <input id="lookingFor" value={lookingFor} onChange={(e)=>setLookingFor(e.target.value)} placeholder="e.g., Front Desk, Andrew"
          className="w-full rounded-xl border border-gray-300 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-500" required={!hostOptions}/>
      </div>
      <div className="space-y-1.5">
        <label htmlFor="notes" className="text-sm font-medium">Notes</label>
        <textarea id="notes" value={notes} onChange={(e)=>setNotes(e.target.value)} rows={3}
          className="w-full rounded-xl border border-gray-300 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-500 resize-y" placeholder="Anything else we should know?"/>
      </div>
      <button type="submit" disabled={submitting}
        className="w-full rounded-xl bg-primary-600 hover:bg-primary-700 disabled:opacity-60 text-white font-medium py-3 transition-colors">
        {submitting? "Checking in…" : "Check in"}
      </button>
      {status && <div className={`rounded-xl border p-3 text-sm ${status.ok?"border-green-200 bg-green-50 text-green-800":"border-red-200 bg-red-50 text-red-800"}`}>{status.message}</div>}
    </form>
  );
}

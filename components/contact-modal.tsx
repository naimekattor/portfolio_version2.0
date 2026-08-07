'use client';

import React, { useState } from 'react';
import { Calendar, Mail, Phone, Clock, CheckCircle2, X, Sparkles, Send } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'call' | 'email';
}

export function ContactModal({ isOpen, onClose, initialMode = 'call' }: ContactModalProps) {
  const [mode, setMode] = useState<'call' | 'email'>(initialMode);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Form State
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Full-Stack Web App',
    callDate: new Date().toISOString().split('T')[0],
    timeSlot: '02:00 PM - 02:30 PM',
    message: '',
  });

  if (!isOpen) return null;

  const timeSlots = [
    '09:00 AM - 09:30 AM',
    '11:00 AM - 11:30 AM',
    '02:00 PM - 02:30 PM',
    '04:00 PM - 04:30 PM',
    '07:00 PM - 07:30 PM',
  ];

  const topics = [
    'Full-Stack Web App',
    'AI / LLM Integration',
    'Cloud / DevOps Architecture',
    'Technical Advisory / Consulting',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    const formattedSubject =
      mode === 'call'
        ? `[Scheduled Call] ${form.subject} on ${form.callDate} @ ${form.timeSlot}`
        : `[Email Inquiry] ${form.subject}`;

    const formattedMessage =
      mode === 'call'
        ? `Scheduled Call Request:\nDate: ${form.callDate}\nTime Slot: ${form.timeSlot}\nPhone/WhatsApp: ${form.phone || 'Not provided'}\nTopic: ${form.subject}\n\nNotes/Agenda:\n${form.message || 'No additional notes provided.'}`
        : form.message;

    try {
      const res = await fetch('http://localhost:4000/api/v1/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          subject: formattedSubject,
          message: formattedMessage,
        }),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        const json = await res.json();
        setErrorMsg(json.message || 'Failed to submit inquiry. Please check your input.');
      }
    } catch (err) {
      console.error('Failed to submit contact form:', err);
      setErrorMsg('Server unavailable. Please try again in a moment.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setErrorMsg('');
    setForm({
      name: '',
      email: '',
      phone: '',
      subject: 'Full-Stack Web App',
      callDate: new Date().toISOString().split('T')[0],
      timeSlot: '02:00 PM - 02:30 PM',
      message: '',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-xl overflow-hidden shadow-2xl relative my-6 max-h-[92vh] flex flex-col">
        {/* Modal Header */}
        <div className="p-6 pb-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">Let's Connect & Collaborate</h3>
              <p className="text-xs text-slate-400">Direct booking & technical query portal</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {submitted ? (
          <div className="p-10 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/10">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-bold text-white">
              {mode === 'call' ? 'Call Slot Booked Successfully!' : 'Query Sent Successfully!'}
            </h4>
            <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
              {mode === 'call'
                ? `Thank you, ${form.name}! Your call request for ${form.callDate} at ${form.timeSlot} has been received. I will confirm via email at ${form.email}.`
                : `Thank you, ${form.name}! Your inquiry regarding "${form.subject}" has been delivered. I will respond to ${form.email} within 24 hours.`}
            </p>
            <div className="pt-4">
              <button
                onClick={handleReset}
                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-xl text-sm transition-all shadow-lg shadow-indigo-600/20"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <div className="p-6 overflow-y-auto flex-1 space-y-6">
            {/* Mode Switcher Tabs */}
            <div className="grid grid-cols-2 p-1 bg-slate-950 border border-slate-800 rounded-2xl">
              <button
                type="button"
                onClick={() => setMode('call')}
                className={`flex items-center justify-center gap-2 py-2.5 text-xs font-bold rounded-xl transition-all ${
                  mode === 'call'
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Calendar className="w-3.5 h-3.5" />
                Schedule a Call
              </button>
              <button
                type="button"
                onClick={() => setMode('email')}
                className={`flex items-center justify-center gap-2 py-2.5 text-xs font-bold rounded-xl transition-all ${
                  mode === 'email'
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Mail className="w-3.5 h-3.5" />
                Send Email / Query
              </button>
            </div>

            {errorMsg && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-xs text-red-300 font-medium">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold uppercase text-slate-400">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="e.g. Alex Rivera"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm mt-1 focus:outline-none focus:border-indigo-500 text-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase text-slate-400">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="alex@company.com"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm mt-1 focus:outline-none focus:border-indigo-500 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold uppercase text-slate-400">
                  {mode === 'call' ? 'Phone / WhatsApp Number (Optional)' : 'Phone Number (Optional)'}
                </label>
                <div className="relative mt-1">
                  <Phone className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+1 (555) 000-0000"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-3.5 py-2.5 text-sm focus:outline-none focus:border-indigo-500 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold uppercase text-slate-400">Service / Topic</label>
                <select
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm mt-1 focus:outline-none focus:border-indigo-500 text-white"
                >
                  {topics.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              {/* Call Specific Controls */}
              {mode === 'call' && (
                <div className="space-y-4 pt-2 border-t border-slate-800/80">
                  <div>
                    <label className="text-xs font-semibold uppercase text-slate-400 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      required
                      min={new Date().toISOString().split('T')[0]}
                      value={form.callDate}
                      onChange={(e) => setForm({ ...form, callDate: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm mt-1 focus:outline-none focus:border-indigo-500 text-white"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold uppercase text-slate-400 flex items-center gap-1.5 mb-2">
                      <Clock className="w-3.5 h-3.5 text-indigo-400" />
                      Available Time Slot (EST)
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {timeSlots.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setForm({ ...form, timeSlot: slot })}
                          className={`py-2 px-2.5 rounded-xl text-xs font-medium border transition-all text-center ${
                            form.timeSlot === slot
                              ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300 font-bold'
                              : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <div>
                <label className="text-xs font-semibold uppercase text-slate-400">
                  {mode === 'call' ? 'Call Agenda / Project Notes (Optional)' : 'Message / Detailed Query *'}
                </label>
                <textarea
                  required={mode === 'email'}
                  rows={mode === 'call' ? 3 : 4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder={
                    mode === 'call'
                      ? 'Briefly describe what you would like to discuss during our call...'
                      : 'Share your project scope, goals, timeframe, or questions...'
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm mt-1 focus:outline-none focus:border-indigo-500 text-slate-200"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-sm transition-all shadow-lg shadow-indigo-600/30 disabled:opacity-50"
                >
                  {loading ? (
                    'Submitting...'
                  ) : mode === 'call' ? (
                    <>
                      <Calendar className="w-4 h-4" /> Confirm & Schedule Call
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" /> Send Inquiry
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

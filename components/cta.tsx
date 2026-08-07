'use client';

import React, { useState } from 'react';
import { Mail, Calendar, Clock, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/language-context';

const availableServices = [
  'E-commerce Website',
  'SaaS Website',
  'AI Agent Building',
  'AI Chatbot',
  'n8n Automation',
  'Education & School Systems',
  'AI-Powered Website',
  'WhatsApp Automation',
  'Messenger Automation',
  'Instagram Automation',
  'Other / Custom Request',
];

const timeSlots = [
  '09:00 AM - 09:30 AM',
  '10:00 AM - 10:30 AM',
  '11:00 AM - 11:30 AM',
  '02:00 PM - 02:30 PM',
  '03:30 PM - 04:00 PM',
  '05:00 PM - 05:30 PM',
];

export function CTA() {
  const { t, language } = useLanguage();
  const [mode, setMode] = useState('email');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const [form, setForm] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    message: '',
    callDate: new Date().toISOString().split('T')[0],
    timeSlot: '02:00 PM - 02:30 PM',
  });

  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const toggleService = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      if (mode === 'email') {
        const payload = {
          name: form.name,
          email: form.email,
          phone: form.phone,
          company: form.company,
          message: form.message,
          services: selectedServices,
        };

        const res = await fetch('http://localhost:4000/api/v1/contacts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          throw new Error('Failed to send contact message.');
        }
      } else {
        const payload = {
          name: form.name,
          email: form.email,
          phone: form.phone,
          company: form.company,
          message: `[SCHEDULED CALL] Date: ${form.callDate}, Time: ${form.timeSlot}. Services: ${selectedServices.join(', ')}. ${form.message}`,
          services: selectedServices,
        };

        const res = await fetch('http://localhost:4000/api/v1/contacts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          throw new Error('Failed to schedule call.');
        }
      }

      setSubmitted(true);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setForm({
      name: '',
      company: '',
      phone: '',
      email: '',
      message: '',
      callDate: new Date().toISOString().split('T')[0],
      timeSlot: '02:00 PM - 02:30 PM',
    });
    setSelectedServices([]);
  };

  return (
    <section id="contact" className="relative py-24 md:py-28 bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 dark:bg-slate-900 border border-primary-100 dark:border-slate-800 text-primary-600 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" /> {t('cta.badge')}
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-slate-100 leading-tight">
                {language !== 'en' ? t('cta.title') : (
                  <>
                    Let&rsquo;s scale your
                    <br />
                    brand<span className="text-primary-600">, together.</span>
                  </>
                )}
              </h2>

              <p className="text-base text-slate-600 dark:text-slate-400">
                Get in touch directly at{' '}
                <a
                  href="mailto:naim.dev.tech@gmail.com"
                  className="text-primary-600 dark:text-primary-400 font-semibold underline decoration-primary-300 underline-offset-4 hover:text-primary-800 transition-colors"
                >
                  naim.dev.tech@gmail.com
                </a>
              </p>

              <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-wider pt-2">
                <button
                  type="button"
                  onClick={() => setMode('email')}
                  className={`pb-1 border-b-2 transition-colors ${
                    mode === 'email'
                      ? 'border-primary-600 text-primary-600'
                      : 'border-transparent text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
                  }`}
                >
                  {t('cta.sendMessage')}
                </button>
                <span className="text-slate-300 dark:text-slate-700">/</span>
                <button
                  type="button"
                  onClick={() => setMode('call')}
                  className={`pb-1 border-b-2 transition-colors ${
                    mode === 'call'
                      ? 'border-primary-600 text-primary-600'
                      : 'border-transparent text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
                  }`}
                >
                  {t('cta.scheduleCall')}
                </button>
              </div>
            </div>
          </div>

          {/* Right Column Form */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 p-8 sm:p-10 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl">
            {submitted ? (
              <div className="py-12 space-y-6 text-center">
                <CheckCircle2 className="w-12 h-12 text-primary-600 mx-auto" />
                <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                  {mode === 'call' ? 'Call Scheduled!' : 'Message Sent!'}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
                  {mode === 'call'
                    ? `Thanks, ${form.name}. Your call request for ${form.callDate} at ${form.timeSlot} is confirmed. A calendar invite will be sent to ${form.email}.`
                    : `Thanks, ${form.name}. Your note landed in my inbox — expect a response at ${form.email} within 24 hours.`}
                </p>
                <button
                  onClick={handleReset}
                  className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {errorMsg && (
                  <div className="p-4 rounded-xl bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-xs font-semibold">
                    {errorMsg}
                  </div>
                )}

                {/* Form Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
                      Your Name <span className="text-primary-600">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      dir="auto"
                      required
                      placeholder="Jane Doe"
                      value={form.name}
                      onChange={handleChange}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:border-primary-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
                      Email Address <span className="text-primary-600">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      dir="auto"
                      required
                      placeholder="jane@company.com"
                      value={form.email}
                      onChange={handleChange}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:border-primary-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
                      Company / Organization
                    </label>
                    <input
                      type="text"
                      name="company"
                      dir="auto"
                      placeholder="Acme Corp"
                      value={form.company}
                      onChange={handleChange}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:border-primary-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
                      Phone / WhatsApp
                    </label>
                    <input
                      type="text"
                      name="phone"
                      dir="auto"
                      placeholder="+1 (555) 000-0000"
                      value={form.phone}
                      onChange={handleChange}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:border-primary-600"
                    />
                  </div>
                </div>

                {/* Services Checkboxes */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-3">
                    Services Needed
                  </label>
                  <div className="grid grid-cols-2 gap-2.5">
                    {availableServices.map((service) => {
                      const isChecked = selectedServices.includes(service);
                      return (
                        <label
                          key={service}
                          className="flex items-center gap-2 cursor-pointer select-none text-xs text-slate-700 dark:text-slate-300"
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggleService(service)}
                            className="w-3.5 h-3.5 rounded border-slate-300 dark:border-slate-700 text-primary-600 focus:ring-0 cursor-pointer"
                          />
                          <span>{service}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* Call schedule extra inputs if mode is call */}
                {mode === 'call' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-primary-50/50 dark:bg-slate-800/50 border border-primary-100 dark:border-slate-800">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
                        Preferred Date
                      </label>
                      <input
                        type="date"
                        name="callDate"
                        value={form.callDate}
                        onChange={handleChange}
                        className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-slate-100"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
                        Time Slot
                      </label>
                      <select
                        name="timeSlot"
                        value={form.timeSlot}
                        onChange={handleChange}
                        className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-slate-100"
                      >
                        {timeSlots.map((slot) => (
                          <option key={slot} value={slot}>
                            {slot}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}

                {/* Message Box */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
                    Project Details & Goals <span className="text-primary-600">*</span>
                  </label>
                  <textarea
                    name="message"
                    dir="auto"
                    required
                    rows={4}
                    placeholder="Tell me about your project goals, scope, timeline, or requirements..."
                    value={form.message}
                    onChange={handleChange}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:border-primary-600"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-primary-600 hover:bg-primary-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? (
                    'Processing...'
                  ) : (
                    <>
                      {mode === 'call' ? t('cta.scheduleBtn') : t('cta.submitBtn')}
                      <ArrowRight className="w-4 h-4 rtl-flip" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

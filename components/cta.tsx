'use client';

import React, { useState } from "react";
import { Calendar, CheckCircle2, Send } from "lucide-react";

function HandshakeIllustration() {
  return (
    <svg
      width="380"
      height="200"
      viewBox="0 0 340 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="max-w-full h-auto"
    >
      <path
        d="M 10 130 L 70 85 L 110 115 L 50 160 Z"
        fill="#171310"
        stroke="#171310"
        strokeWidth="2"
      />
      <path
        d="M 65 82 L 80 72 L 95 85 L 80 95 Z"
        fill="#f4e9df"
        stroke="#171310"
        strokeWidth="1.5"
      />
      <path
        d="M 330 130 L 270 85 L 230 115 L 290 160 Z"
        fill="#171310"
        stroke="#171310"
        strokeWidth="2"
      />
      <path
        d="M 275 82 L 260 72 L 245 85 L 260 95 Z"
        fill="#f4e9df"
        stroke="#171310"
        strokeWidth="1.5"
      />
      <path
        d="M 90 75 Q 120 45 150 70 Q 165 85 180 85 Q 195 85 200 95 Q 170 120 130 110 C 110 105 100 90 90 75 Z"
        fill="#fdfbf7"
        stroke="#171310"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path
        d="M 250 75 Q 220 45 190 70 Q 175 85 160 85 Q 145 85 140 95 Q 170 125 210 110 C 230 105 240 90 250 75 Z"
        fill="#fdfbf7"
        stroke="#171310"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path
        d="M 140 75 Q 155 88 170 85"
        stroke="#171310"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M 145 85 Q 160 98 175 95"
        stroke="#171310"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M 150 95 Q 165 108 180 105"
        stroke="#171310"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M 200 75 Q 185 88 170 85"
        stroke="#171310"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M 195 85 Q 180 98 165 95"
        stroke="#171310"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M 190 95 Q 175 108 160 105"
        stroke="#171310"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* halftone stipple on cuffs, matching reference */}
      {Array.from({ length: 24 }).map((_, i) => {
        const row = Math.floor(i / 6);
        const col = i % 6;
        return (
          <circle
            key={`l-${i}`}
            cx={22 + col * 7 - row * 2}
            cy={128 + row * 8}
            r="1.4"
            fill="#f4e9df"
          />
        );
      })}
      {Array.from({ length: 24 }).map((_, i) => {
        const row = Math.floor(i / 6);
        const col = i % 6;
        return (
          <circle
            key={`r-${i}`}
            cx={318 - col * 7 + row * 2}
            cy={128 + row * 8}
            r="1.4"
            fill="#f4e9df"
          />
        );
      })}
    </svg>
  );
}

interface FormFieldProps {
  label: string;
  required?: boolean;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder?: string;
  as?: "input" | "textarea";
}

function FormField({
  label,
  required = false,
  type = "text",
  value,
  onChange,
  placeholder,
  as = "input",
}: FormFieldProps) {
  const Tag = as;
  return (
    <div>
      <label className="block text-[13px] text-[#171310] mb-1.5">
        {label} {required && <span className="text-[#b5502f]">*</span>}
      </label>
      <Tag
        type={as === "input" ? type : undefined}
        required={required}
        value={value}
        onChange={onChange as any}
        placeholder={placeholder}
        rows={as === "textarea" ? 2 : undefined}
        className="w-full bg-transparent border-b border-[#171310]/25 focus:border-[#171310] py-1.5 text-sm text-[#171310] placeholder:text-[#171310]/35 focus:outline-none transition-colors duration-200 resize-none"
      />
    </div>
  );
}

export function CTA() {
  const [mode, setMode] = useState("email");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [form, setForm] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
    message: "",
    callDate: new Date().toISOString().split("T")[0],
    timeSlot: "02:00 PM - 02:30 PM",
  });

  const [selectedServices, setSelectedServices] = useState([]);

  const availableServices = [
    "Paid Media",
    "Content Creation",
    "Digital Experience",
    "Strategy & Consulting",
    "Email",
    "Other",
  ];

  const timeSlots = [
    "09:00 AM - 09:30 AM",
    "11:00 AM - 11:30 AM",
    "02:00 PM - 02:30 PM",
    "04:00 PM - 04:30 PM",
    "07:00 PM - 07:30 PM",
  ];

  const toggleService = (service) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service],
    );
  };

  const servicesText =
    selectedServices.length > 0 ? selectedServices.join(", ") : "General Query";
  const subjectPreview =
    mode === "call"
      ? `[Scheduled Call] ${servicesText} on ${form.callDate} @ ${form.timeSlot}`
      : `[Inquiry] ${servicesText}`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const formattedMessage =
      mode === "call"
        ? `Scheduled Call Request:\nDate: ${form.callDate}\nTime Slot: ${form.timeSlot}\nCompany: ${form.company || "N/A"}\nPhone/WhatsApp: ${form.phone || "N/A"}\nServices Requested: ${servicesText}\n\nProject Overview:\n${form.message || "No additional details provided."}`
        : `Company: ${form.company || "N/A"}\nServices Requested: ${servicesText}\n\nProject Details:\n${form.message}`;

    try {
      const res = await fetch("http://localhost:4000/api/v1/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          subject: subjectPreview,
          message: formattedMessage,
        }),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        const json = await res.json();
        setErrorMsg(
          json.message || "Failed to submit form. Please check your details.",
        );
      }
    } catch (err) {
      console.error("Failed to submit contact form:", err);
      setErrorMsg("Server connection failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setErrorMsg("");
    setForm({
      name: "",
      company: "",
      phone: "",
      email: "",
      message: "",
      callDate: new Date().toISOString().split("T")[0],
      timeSlot: "02:00 PM - 02:30 PM",
    });
    setSelectedServices([]);
  };

  return (
    <section
      id="contact"
      className="relative"
      style={{ padding: "110px 0 120px", background: "#eee1d2" }}
    >
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20">
          {/* ── Left Column ── */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className="space-y-5">
              <h2
                className="text-[#171310] leading-[1.08]"
                style={{
                  fontFamily: 'Georgia, "Times New Roman", serif',
                  fontSize: "clamp(2.4rem, 4vw, 3.4rem)",
                }}
              >
                Let&rsquo;s scale your
                <br />
                brand<span className="italic">, together.</span>
              </h2>

              <p className="text-[15px] text-[#171310]/70">
                Get a start @{" "}
                <a
                  href="mailto:naim.dev.tech@gmail.com"
                  className="text-[#b5502f] underline decoration-[#b5502f]/50 underline-offset-4 hover:decoration-[#b5502f] transition-colors"
                >
                  naim.dev.tech@gmail.com
                </a>
              </p>

              <div className="flex items-center gap-5 pt-1 text-[13px] text-[#171310]/60">
                <button
                  type="button"
                  onClick={() => setMode("email")}
                  className={`transition-colors ${mode === "email" ? "text-[#171310] underline underline-offset-4 decoration-[#b5502f]" : "hover:text-[#171310]"}`}
                >
                  Send a message
                </button>
                <span className="text-[#171310]/25">/</span>
                <button
                  type="button"
                  onClick={() => setMode("call")}
                  className={`transition-colors ${mode === "call" ? "text-[#171310] underline underline-offset-4 decoration-[#b5502f]" : "hover:text-[#171310]"}`}
                >
                  Schedule a call
                </button>
              </div>
            </div>

            <div className="pt-14 lg:pt-0">
              <HandshakeIllustration />
            </div>
          </div>

          {/* ── Right Column: Form ── */}
          <div className="lg:col-span-7">
            {submitted ? (
              <div className="py-16 space-y-5">
                <CheckCircle2 className="w-7 h-7 text-[#171310]" />
                <h3
                  className="text-[#171310]"
                  style={{ fontFamily: "Georgia, serif", fontSize: "1.6rem" }}
                >
                  {mode === "call" ? "Call scheduled." : "Message sent."}
                </h3>
                <p className="text-sm text-[#171310]/65 max-w-sm leading-relaxed">
                  {mode === "call"
                    ? `Thanks, ${form.name}. Your call request for ${form.callDate} at ${form.timeSlot} is in — confirming shortly via ${form.email}.`
                    : `Thanks, ${form.name}. Your note landed in my inbox — expect a reply at ${form.email} within 24 hours.`}
                </p>
                <button
                  onClick={handleReset}
                  className="px-7 py-3 bg-[#171310] hover:bg-[#3a3128] text-white text-sm rounded-full transition-colors"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Mode Switcher Tabs */}
                <div className="flex items-center gap-6 border-b border-[#171310]/15 pb-4 mb-2">
                  <button
                    type="button"
                    onClick={() => setMode("email")}
                    className={`flex items-center gap-2 text-xs uppercase font-bold tracking-wider pb-1.5 border-b-2 transition-all cursor-pointer ${
                      mode === "email"
                        ? "border-[#b5502f] text-[#171310]"
                        : "border-transparent text-[#171310]/40 hover:text-[#171310]"
                    }`}
                  >
                    <Send className="w-3.5 h-3.5" /> Send Message
                  </button>
                  <button
                    type="button"
                    onClick={() => setMode("call")}
                    className={`flex items-center gap-2 text-xs uppercase font-bold tracking-wider pb-1.5 border-b-2 transition-all cursor-pointer ${
                      mode === "call"
                        ? "border-[#b5502f] text-[#171310]"
                        : "border-transparent text-[#171310]/40 hover:text-[#171310]"
                    }`}
                  >
                    <Calendar className="w-3.5 h-3.5" /> Schedule a Call
                  </button>
                </div>

                {errorMsg && (
                  <div className="text-[13px] text-[#b5502f]">{errorMsg}</div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                  <FormField
                    label="Name"
                    required
                    value={form.name}
                    placeholder="Type name"
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                  <FormField
                    label="Company"
                    value={form.company}
                    placeholder="Type company name"
                    onChange={(e) =>
                      setForm({ ...form, company: e.target.value })
                    }
                  />
                <FormField
                  label="Phone / WhatsApp"
                  type="tel"
                  value={form.phone}
                  placeholder="Type phone number"
                  onChange={(e) =>
                    setForm({ ...form, phone: e.target.value })
                  }
                />
                <FormField
                  label="Email Address"
                  required
                  type="email"
                  value={form.email}
                  placeholder="Type email address"
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                />
              </div>

              {mode === "call" && (
                <div className="bg-[#171310]/5 p-4 rounded-2xl space-y-4 border border-[#171310]/10 animate-fade-in">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#b5502f] flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" /> Select Call Slot
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                    <div>
                      <label className="block text-[13px] text-[#171310] mb-1.5 font-medium">
                        Preferred Call Date *
                      </label>
                      <input
                        type="date"
                        required
                        min={new Date().toISOString().split("T")[0]}
                        value={form.callDate}
                        onChange={(e) =>
                          setForm({ ...form, callDate: e.target.value })
                        }
                        className="w-full bg-white/80 border border-[#171310]/20 rounded-xl px-3 py-2 text-sm text-[#171310] focus:outline-none focus:border-[#171310]"
                      />
                    </div>
                    <div>
                      <label className="block text-[13px] text-[#171310] mb-1.5 font-medium">
                        Time Slot (EST) *
                      </label>
                      <select
                        value={form.timeSlot}
                        onChange={(e) =>
                          setForm({ ...form, timeSlot: e.target.value })
                        }
                        className="w-full bg-white/80 border border-[#171310]/20 rounded-xl px-3 py-2 text-sm text-[#171310] focus:outline-none focus:border-[#171310]"
                      >
                        {timeSlots.map((slot) => (
                          <option key={slot} value={slot}>
                            {slot}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              )}

              <FormField
                label={mode === "call" ? "Call Agenda / Notes (Optional)" : "How can we help? *"}
                required={mode === "email"}
                as="textarea"
                value={form.message}
                placeholder={mode === "call" ? "Describe project scope or agenda..." : "A brief description here"}
                onChange={(e) =>
                  setForm({ ...form, message: e.target.value })
                }
              />

                <div>
                  <label className="block text-[13px] text-[#171310] mb-3">
                    Services <span className="text-[#b5502f]">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-x-8 gap-y-2.5">
                    {availableServices.map((service) => {
                      const isChecked = selectedServices.includes(service);
                      return (
                        <label
                          key={service}
                          className="flex items-center gap-2.5 cursor-pointer select-none text-[13px] text-[#171310]/85"
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggleService(service)}
                            className="w-3.5 h-3.5 rounded-sm border-[#171310]/40 text-[#171310] focus:ring-0 focus:ring-offset-0 cursor-pointer"
                          />
                          {service}
                        </label>
                      );
                    })}
                  </div>
                </div>

                {selectedServices.length > 0 && (
                  <p className="text-[11px] text-[#171310]/40 font-mono">
                    Subject line: {subjectPreview}
                  </p>
                )}

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-7 py-3 bg-[#171310] hover:bg-[#3a3128] text-white text-sm rounded-full transition-colors disabled:opacity-50 flex items-center gap-2"
                  >
                    {loading ? (
                      "Sending..."
                    ) : mode === "call" ? (
                      <>
                        <Calendar className="w-3.5 h-3.5" /> Schedule Call
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" /> Send Message
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default CTA;

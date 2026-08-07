'use client';

import React from 'react';
import { useAdmin } from '../admin-context';
import { Mail, Calendar, Phone, Trash2, Clock, User } from 'lucide-react';

export default function AdminContactsPage() {
  const { contacts, handleDelete } = useAdmin();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-bold text-white">Inbound Inquiries & Calls ({contacts.length})</h3>
          <p className="text-xs text-slate-400">Scheduled call requests and contact form inquiries</p>
        </div>
      </div>

      <div className="space-y-4">
        {contacts.map((msg) => {
          const isCall = msg.subject?.includes('[Scheduled Call]');

          return (
            <div
              key={msg.id}
              className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-colors"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold shadow-md ${
                      isCall
                        ? 'bg-amber-500/10 border border-amber-500/20 text-amber-400'
                        : 'bg-indigo-500/10 border border-indigo-500/20 text-indigo-400'
                    }`}
                  >
                    {isCall ? <Calendar className="w-5 h-5" /> : <Mail className="w-5 h-5" />}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-white text-base">{msg.name}</h4>
                      <span
                        className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                          isCall
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                            : 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                        }`}
                      >
                        {isCall ? 'Scheduled Call' : 'Email Inquiry'}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mt-1">
                      <span className="flex items-center gap-1">
                        <Mail className="w-3 h-3 text-slate-500" /> {msg.email}
                      </span>
                      {msg.phone && (
                        <span className="flex items-center gap-1 text-emerald-400 font-mono">
                          <Phone className="w-3 h-3 text-emerald-400" /> {msg.phone}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-500 font-mono">
                    {new Date(msg.createdAt).toLocaleDateString()} @ {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                  <button
                    onClick={() => handleDelete('contacts', msg.id)}
                    className="p-2 text-slate-400 hover:text-red-400 transition-colors"
                    title="Delete Message"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="text-xs font-semibold text-indigo-300 bg-indigo-950/40 px-3 py-1.5 rounded-lg border border-indigo-800/40 mb-3">
                Subject: {msg.subject}
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 text-sm text-slate-200 whitespace-pre-wrap leading-relaxed">
                {msg.message}
              </div>
            </div>
          );
        })}

        {contacts.length === 0 && (
          <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-12 text-center text-slate-500 text-sm">
            <Mail className="w-8 h-8 mx-auto mb-2 text-slate-600" />
            No inquiries or call requests received yet.
          </div>
        )}
      </div>
    </div>
  );
}

'use client';

import React from 'react';
import { useAdmin } from '../admin-context';

export default function AdminContactsPage() {
  const { contacts } = useAdmin();

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-bold text-white">Contact Messages ({contacts.length})</h3>
        <p className="text-xs text-slate-400">Inbound inquiry and contact form messages</p>
      </div>

      <div className="space-y-3">
        {contacts.map((msg) => (
          <div key={msg.id} className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-bold text-white text-sm">
                  {msg.name} ({msg.email})
                </h4>
                <div className="text-xs text-indigo-400 font-medium mt-0.5">{msg.subject}</div>
              </div>
              <span className="text-[11px] text-slate-500">{new Date(msg.createdAt).toLocaleDateString()}</span>
            </div>
            <p className="text-sm text-slate-300 mt-3 bg-slate-950 p-3 rounded-xl border border-slate-800">{msg.message}</p>
          </div>
        ))}

        {contacts.length === 0 && (
          <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-8 text-center text-slate-500 text-sm">
            No contact messages received yet.
          </div>
        )}
      </div>
    </div>
  );
}

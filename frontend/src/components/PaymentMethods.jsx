import React from 'react';
import { BellRing, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function PaymentMethods() {
  const upiApps = [
    { name: 'GPay', color: 'bg-blue-50 text-blue-600 border-blue-200' },
    { name: 'PhonePe', color: 'bg-purple-50 text-purple-700 border-purple-200' },
    { name: 'Paytm', color: 'bg-sky-50 text-sky-600 border-sky-200' },
    { name: 'BHIM UPI', color: 'bg-orange-50 text-orange-600 border-orange-200' },
  ];

  return (
    <div className="mx-4 my-4 bg-white rounded-2xl p-4 shadow-soft border border-gray-100">
      <div className="flex items-center gap-2 mb-2">
        <div className="p-1.5 rounded-lg bg-emerald-100 text-emerald-800">
          <BellRing className="w-4 h-4" />
        </div>
        <div>
          <h3 className="text-xs font-bold text-textPrimary">
            DON'T MISS A PAYMENT
          </h3>
          <p className="text-[11px] text-textSecondary">
            Set up 1-click Auto-pay with your favorite UPI app
          </p>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2 my-3">
        {upiApps.map((app, idx) => (
          <div
            key={idx}
            className={`flex flex-col items-center justify-center p-2 rounded-xl border text-center font-bold text-xs ${app.color}`}
          >
            <span>{app.name}</span>
            <span className="text-[9px] font-normal text-gray-500 mt-0.5">Auto-pay</span>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-1.5 text-[11px] text-emerald-700 bg-emerald-50 px-2.5 py-1.5 rounded-lg border border-emerald-200">
        <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
        <span>0 Penalty Guarantee with 1Fi Smart UPI reminders</span>
      </div>
    </div>
  );
}

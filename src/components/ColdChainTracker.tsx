"use client";

import React, { useState, useEffect } from 'react';
import { Snowflake, Activity } from 'lucide-react';

export default function ColdChainTracker() {
  const [temp, setTemp] = useState(3.4);

  // Subtle fluctuation to simulate live sensor readout
  useEffect(() => {
    const interval = setInterval(() => {
      const delta = (Math.random() * 0.4 - 0.2).toFixed(1);
      setTemp((prev) => parseFloat(Math.min(4.5, Math.max(2.2, parseFloat(prev.toString()) + parseFloat(delta))).toFixed(1)));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const steps = [
    { title: 'Order Received', desc: 'Chemist DL Verified', active: true },
    { title: 'FDA Batch Audit', desc: 'Expiry & Quality Check', active: true },
    { title: '2°C Cold Room Pack', desc: 'Gel Pack Insulated Box', active: true },
    { title: 'Same-Day Dispatch', desc: 'Bhandup Fleet Transit', active: true }
  ];

  return (
    <div className="bg-white p-8 md:p-12 rounded-3xl border border-slate-200 shadow-md my-16 md:my-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-bold uppercase tracking-wider mb-2">
            <Activity size={14} className="text-sky-600 animate-pulse" />
            <span>LIVE BHANDUP WAREHOUSE TELEMETRY</span>
          </div>
          <h3 className="font-heading font-extrabold text-2xl text-primary">
            WHO-GDP Cold Storage & Fulfillment Assurance
          </h3>
          <p className="text-slate-500 text-sm">
            Continuous 24/7 digital thermal monitoring for insulins, vaccines, & critical care injectables.
          </p>
        </div>

        {/* Live Telemetry Display */}
        <div className="bg-slate-900 text-white p-4 rounded-2xl border border-slate-800 shrink-0 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center">
            <Snowflake size={26} className="animate-spin" style={{ animationDuration: '10s' }} />
          </div>
          <div>
            <div className="text-[11px] text-sky-400 font-bold uppercase tracking-widest flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              LIVE COLD ROOM TEMP
            </div>
            <div className="font-heading font-extrabold text-2xl text-white font-mono">
              {temp}°C <span className="text-xs text-slate-400 font-sans font-normal">(Optimal 2°C to 8°C)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Process Pipeline Visualizer */}
      <div>
        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
          Cold Chain Order Fulfillment Pipeline:
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">
          {steps.map((step, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 relative flex flex-col justify-center h-full">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
                  {idx + 1}
                </div>
                <h4 className="font-bold text-primary text-sm">{step.title}</h4>
              </div>
              <p className="text-xs text-slate-500 pl-9">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

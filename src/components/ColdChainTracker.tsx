"use client";

import React, { useState, useEffect } from 'react';
import { Snowflake, Activity } from 'lucide-react';

export default function ColdChainTracker() {
  const [temp, setTemp] = useState(3.4);

  useEffect(() => {
    const interval = setInterval(() => {
      const delta = (Math.random() * 0.4 - 0.2).toFixed(1);
      setTemp((prev) => parseFloat(Math.min(4.5, Math.max(2.2, parseFloat(prev.toString()) + parseFloat(delta))).toFixed(1)));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const steps = [
    { title: 'Order Received', desc: 'Chemist DL Verified' },
    { title: 'FDA Batch Audit', desc: 'Expiry & Quality Check' },
    { title: '2°C Cold Room Pack', desc: 'Gel Pack Insulated Box' },
    { title: 'Same-Day Dispatch', desc: 'Bhandup Fleet Transit' }
  ];

  return (
    <div className="cold-chain-card">
      <div className="cold-chain-header">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-2 whitespace-nowrap">
            <Activity size={14} className="text-sky-600 animate-pulse shrink-0" />
            <span>LIVE WAREHOUSE TELEMETRY</span>
          </div>
          <h3 className="font-heading font-extrabold text-2xl text-primary">
            WHO-GDP Cold Storage & Fulfillment Assurance
          </h3>
          <p className="text-slate-500 text-sm mt-1">
            Continuous 24/7 digital thermal monitoring for insulins, vaccines, & critical care injectables.
          </p>
        </div>

        {/* Live Telemetry Display - stacked layout */}
        <div
          className="shrink-0"
          style={{
            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
            color: '#fff',
            padding: '1.25rem 1.5rem',
            borderRadius: '1rem',
            border: '1px solid #334155',
            textAlign: 'center',
            minWidth: '180px',
          }}
        >
          <div className="text-xs text-sky-400 font-bold uppercase tracking-widest flex items-center justify-center gap-1.5 mb-2">
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#34d399', display: 'inline-block', animation: 'pulse 2s infinite' }} />
            LIVE COLD ROOM TEMP
          </div>
          <div className="flex items-center justify-center gap-2 mb-1">
            <Snowflake size={22} className="text-sky-400" style={{ animation: 'spin 10s linear infinite' }} />
            <span className="font-heading font-extrabold text-3xl text-white font-mono">{temp}°C</span>
          </div>
          <div className="text-xs text-slate-400">Optimal: 2°C to 8°C</div>
        </div>
      </div>

      {/* Process Pipeline */}
      <div>
        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
          Cold Chain Order Fulfillment Pipeline:
        </div>

        <div className="cold-chain-pipeline-grid">
          {steps.map((step, idx) => (
            <div key={idx} className="cold-chain-step-card">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs shrink-0">
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

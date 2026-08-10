"use client";

import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';

interface Preset {
  name: string;
  mrp: number;
  ptr: number;
  scheme: number;
  gst: number;
}

export default function MarginCalculator() {
  const [mrp, setMrp] = useState<number | string>(223.40);
  const [ptr, setPtr] = useState<number | string>(159.50);
  const [schemeDiscount, setSchemeDiscount] = useState<number | string>(5);
  const [gstRate, setGstRate] = useState<number | string>(12);
  const [quantity, setQuantity] = useState<number | string>(10);

  const grossPtr = typeof ptr === 'number' ? ptr : parseFloat(ptr) || 0;
  const grossMrp = typeof mrp === 'number' ? mrp : parseFloat(mrp) || 0;
  const schemeVal = (grossPtr * (typeof schemeDiscount === 'number' ? schemeDiscount : parseFloat(schemeDiscount) || 0)) / 100;
  const netPtrBeforeGst = grossPtr - schemeVal;
  const gstAmount = (netPtrBeforeGst * (typeof gstRate === 'number' ? gstRate : parseFloat(gstRate) || 0)) / 100;
  const finalLandingCost = netPtrBeforeGst + gstAmount;

  const profitPerPack = grossMrp - finalLandingCost;
  const marginPercentage = grossMrp > 0 ? ((profitPerPack / grossMrp) * 100).toFixed(2) : '0';
  const qty = typeof quantity === 'number' ? quantity : parseInt(quantity) || 1;
  const totalOrderProfit = (profitPerPack * qty).toFixed(2);
  const totalInvestment = (finalLandingCost * qty).toFixed(2);

  const presets: Preset[] = [
    { name: 'Augmentin 625 Duo', mrp: 223.40, ptr: 159.50, scheme: 5, gst: 12 },
    { name: 'Pan D Capsule', mrp: 199.00, ptr: 138.00, scheme: 8, gst: 12 },
    { name: 'Lantus Pen (Cold Chain)', mrp: 685.00, ptr: 510.00, scheme: 4, gst: 5 },
    { name: 'Montair LC Tablet', mrp: 340.00, ptr: 242.00, scheme: 6, gst: 12 }
  ];

  const applyPreset = (preset: Preset) => {
    setMrp(preset.mrp);
    setPtr(preset.ptr);
    setSchemeDiscount(preset.scheme);
    setGstRate(preset.gst);
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 via-primary to-slate-900 text-white rounded-3xl p-6 md:p-8 shadow-xl border border-slate-800 my-10">
      <div className="max-w-3xl mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-950/80 border border-sky-800 text-sky-400 text-xs font-bold uppercase tracking-wider mb-3">
          <Sparkles size={14} />
          <span>RETAILER PROFIT & SCHEME CALCULATOR</span>
        </div>
        <h3 className="font-heading font-extrabold text-2xl md:text-3xl text-white">
          Calculate Your Net Chemist PTR Margin & Profits
        </h3>
        <p className="text-slate-300 text-sm mt-1">
          Estimate your exact landing cost, GST input credit, scheme discount savings, and net profit margins before placing wholesale bulk orders with VS Medico.
        </p>
      </div>

      {/* Presets */}
      <div className="mb-6 flex flex-wrap gap-2 items-center">
        <span className="text-xs text-slate-400 font-semibold">Popular Product Presets:</span>
        {presets.map((p, idx) => (
          <button
            key={idx}
            onClick={() => applyPreset(p)}
            className="text-xs bg-slate-800/80 hover:bg-sky-900/80 text-sky-300 border border-slate-700 hover:border-sky-500 px-3 py-1.5 rounded-lg font-medium transition-all"
          >
            {p.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Input Controls */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="form-group mb-0">
            <label className="form-label text-slate-200 text-xs font-semibold">MRP Per Pack (₹)</label>
            <div className="relative">
              <input
                type="number"
                step="0.1"
                value={mrp}
                onChange={(e) => setMrp(e.target.value)}
                className="form-control bg-slate-800 border-slate-700 text-white font-bold text-base focus:border-sky-400"
              />
            </div>
          </div>

          <div className="form-group mb-0">
            <label className="form-label text-slate-200 text-xs font-semibold">PTR Wholesale Price (₹)</label>
            <div className="relative">
              <input
                type="number"
                step="0.1"
                value={ptr}
                onChange={(e) => setPtr(e.target.value)}
                className="form-control bg-slate-800 border-slate-700 text-white font-bold text-base focus:border-sky-400"
              />
            </div>
          </div>

          <div className="form-group mb-0">
            <label className="form-label text-slate-200 text-xs font-semibold">Scheme / Cash Discount (%)</label>
            <input
              type="number"
              step="0.5"
              value={schemeDiscount}
              onChange={(e) => setSchemeDiscount(e.target.value)}
              className="form-control bg-slate-800 border-slate-700 text-white font-bold text-base focus:border-sky-400"
            />
          </div>

          <div className="form-group mb-0">
            <label className="form-label text-slate-200 text-xs font-semibold">GST Slab (%)</label>
            <select
              value={gstRate}
              onChange={(e) => setGstRate(e.target.value)}
              className="form-control bg-slate-800 border-slate-700 text-white font-bold text-base focus:border-sky-400"
            >
              <option value="5">5% (Life Saving & Cold Chain)</option>
              <option value="12">12% (Standard Formulations)</option>
              <option value="18">18% (OTC & Surgicals)</option>
            </select>
          </div>

          <div className="form-group mb-0 sm:col-span-2">
            <label className="form-label text-slate-200 text-xs font-semibold">Order Quantity (Boxes / Strips)</label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="form-control bg-slate-800 border-slate-700 text-white font-bold text-base focus:border-sky-400"
            />
          </div>
        </div>

        {/* Output Results Box */}
        <div className="lg:col-span-5 bg-slate-800/90 rounded-2xl p-6 border border-slate-700 space-y-4">
          <div className="flex justify-between items-center pb-3 border-b border-slate-700">
            <span className="text-xs text-slate-400 font-semibold">Estimated Net Landing Cost:</span>
            <span className="font-mono font-extrabold text-lg text-white">₹{finalLandingCost.toFixed(2)} / pack</span>
          </div>

          <div className="flex justify-between items-center pb-3 border-b border-slate-700">
            <span className="text-xs text-slate-400 font-semibold">GST Input Tax Credit:</span>
            <span className="font-mono font-bold text-sm text-emerald-400">₹{gstAmount.toFixed(2)}</span>
          </div>

          <div className="bg-emerald-950/80 border border-emerald-800 p-4 rounded-xl text-center">
            <div className="text-xs text-emerald-300 font-bold uppercase tracking-wider mb-1">YOUR PROFIT MARGIN</div>
            <div className="font-heading font-extrabold text-3xl text-emerald-400">
              {marginPercentage}%
            </div>
            <div className="text-xs text-emerald-200 mt-1 font-medium">
              ₹{profitPerPack.toFixed(2)} Profit per Pack
            </div>
          </div>

          <div className="pt-2 text-xs text-slate-300 space-y-1">
            <div className="flex justify-between">
              <span>Total Estimated Investment:</span>
              <strong className="text-white font-mono">₹{totalInvestment}</strong>
            </div>
            <div className="flex justify-between">
              <span>Total Net Chemist Profit ({quantity} packs):</span>
              <strong className="text-emerald-400 font-mono text-sm">₹{totalOrderProfit}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

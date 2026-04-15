import React from 'react';

export default function RiskComplianceMonitor() {
  return (
    <main className="pt-24 px-6 space-y-8 max-w-2xl mx-auto pb-32">
      {/* Dashboard Header / Identity */}
      <section className="space-y-1 tour-compliance-header">
        <p className="font-label text-[10px] uppercase tracking-[0.15em] text-primary-fixed-dim">Security Protocol v4.0</p>
        <h2 className="font-headline text-3xl font-bold tracking-tight text-on-surface">Compliance Monitor</h2>
      </section>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 tour-compliance-metrics">
        {/* Risk Score Dial Card */}
        <div className="bg-surface-container-high rounded-xl p-6 relative overflow-hidden flex flex-col items-center justify-center min-h-[280px]">
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(195,245,255,0.15)_0%,rgba(195,245,255,0)_70%)]"></div>
          <h3 className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant absolute top-6 left-6">Real-Time Risk Index</h3>
          
          {/* Dial Visualization */}
          <div className="relative w-40 h-40 mt-4 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle className="text-surface-container-lowest" cx="50" cy="50" fill="transparent" r="45" stroke="currentColor" strokeWidth="8"></circle>
              <circle className="text-secondary" cx="50" cy="50" fill="transparent" r="45" stroke="currentColor" strokeDasharray="282.7" strokeDashoffset="240" strokeWidth="8"></circle>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-headline text-4xl font-bold text-on-surface">14</span>
              <span className="font-label text-[10px] text-secondary uppercase font-bold tracking-tighter">LOW RISK</span>
            </div>
          </div>
          
          <div className="mt-6 flex gap-4 w-full justify-around">
            <div className="text-center">
              <p className="text-[10px] text-on-surface-variant uppercase tracking-tighter">Stability</p>
              <p className="text-sm font-bold text-secondary">98.2%</p>
            </div>
            <div className="text-center">
              <p className="text-[10px] text-on-surface-variant uppercase tracking-tighter">Exposure</p>
              <p className="text-sm font-bold text-on-surface">0.04%</p>
            </div>
          </div>
        </div>

        {/* Environmental Impact Card */}
        <div className="bg-surface-container-low rounded-xl p-6 flex flex-col">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant">Environmental Impact</h3>
              <p className="text-xl font-headline font-bold text-on-surface mt-1">Carbon Footprint</p>
            </div>
            <span className="material-symbols-outlined text-secondary text-2xl">eco</span>
          </div>
          <div className="flex-grow space-y-4">
            <div className="bg-surface-container-lowest p-4 rounded-lg">
              <div className="flex justify-between items-end mb-2">
                <span className="text-[10px] text-on-surface-variant uppercase font-medium">Compute Consumption</span>
                <span className="text-xs font-bold text-on-surface">1.2t CO2e</span>
              </div>
              <div className="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden">
                <div className="h-full bg-secondary w-1/3"></div>
              </div>
            </div>
            <div className="bg-surface-container-lowest p-4 rounded-lg">
              <div className="flex justify-between items-end mb-2">
                <span className="text-[10px] text-on-surface-variant uppercase font-medium">Offsite Offset</span>
                <span className="text-xs font-bold text-secondary">+0.8t CO2e</span>
              </div>
              <div className="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden">
                <div className="h-full bg-secondary-container w-2/3"></div>
              </div>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-secondary"></span>
            <span className="text-[10px] text-on-surface-variant font-medium uppercase tracking-tighter">Project Net Zero Target: 2025</span>
          </div>
        </div>
      </div>

      {/* Responsible AI Guardrails */}
      <section className="space-y-4 tour-compliance-guardrails">
        <div className="flex justify-between items-end">
          <h3 className="font-headline text-lg font-bold">AI Guardrails Log</h3>
          <span className="text-[10px] font-label text-on-surface-variant uppercase tracking-widest">Last Sync: 2m ago</span>
        </div>
        <div className="space-y-3">
          {/* Autonomous Passed Item */}
          <div className="bg-surface-container-highest rounded-xl p-4 flex items-center justify-between group hover:bg-surface-variant transition-colors border-l-4 border-secondary">
            <div className="flex items-center gap-4">
              <div className="bg-secondary/10 p-2 rounded-lg">
                <span className="material-symbols-outlined text-secondary">security</span>
              </div>
              <div>
                <p className="text-sm font-bold text-on-surface">Bias Detection System</p>
                <p className="text-[10px] text-on-surface-variant uppercase tracking-tighter">Autonomous scan complete • Dataset v12</p>
              </div>
            </div>
            <span className="text-[10px] font-bold text-secondary px-2 py-1 bg-secondary/10 rounded uppercase">PASSED</span>
          </div>

          {/* Human Intervention Required */}
          <div className="bg-surface-container-highest rounded-xl p-4 flex items-center justify-between border-l-4 border-tertiary-fixed-dim">
            <div className="flex items-center gap-4">
              <div className="bg-tertiary-fixed-dim/10 p-2 rounded-lg">
                <span className="material-symbols-outlined text-tertiary-fixed-dim">gavel</span>
              </div>
              <div>
                <p className="text-sm font-bold text-on-surface">Ethical Constraint Review</p>
                <p className="text-[10px] text-on-surface-variant uppercase tracking-tighter">Manual validation required for Policy P-09</p>
              </div>
            </div>
            <span className="text-[10px] font-bold text-tertiary-fixed-dim px-2 py-1 bg-tertiary-fixed-dim/10 rounded uppercase">ACTION REQUIRED</span>
          </div>

          {/* Active Guardrail */}
          <div className="bg-surface-container-highest rounded-xl p-4 flex items-center justify-between border-l-4 border-primary-fixed-dim">
            <div className="flex items-center gap-4">
              <div className="bg-primary-fixed-dim/10 p-2 rounded-lg">
                <span className="material-symbols-outlined text-primary-fixed-dim">visibility</span>
              </div>
              <div>
                <p className="text-sm font-bold text-on-surface">PII Redaction Engine</p>
                <p className="text-[10px] text-on-surface-variant uppercase tracking-tighter">Continuous monitoring active</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-fixed-dim animate-pulse"></span>
              <span className="text-[10px] font-bold text-primary-fixed-dim uppercase">ACTIVE</span>
            </div>
          </div>
        </div>
      </section>

      {/* Compliance Heatmap Section */}
      <section className="space-y-4 tour-compliance-heatmap">
        <h3 className="font-headline text-lg font-bold">Node Integrity</h3>
        <div className="bg-surface-container-low rounded-xl p-6">
          <div className="grid grid-cols-6 gap-2">
            <div className="h-8 rounded bg-secondary"></div>
            <div className="h-8 rounded bg-secondary"></div>
            <div className="h-8 rounded bg-secondary-container"></div>
            <div className="h-8 rounded bg-secondary"></div>
            <div className="h-8 rounded bg-tertiary-fixed-dim"></div>
            <div className="h-8 rounded bg-secondary"></div>
            <div className="h-8 rounded bg-secondary"></div>
            <div className="h-8 rounded bg-secondary"></div>
            <div className="h-8 rounded bg-secondary"></div>
            <div className="h-8 rounded bg-secondary-container"></div>
            <div className="h-8 rounded bg-secondary"></div>
            <div className="h-8 rounded bg-secondary"></div>
          </div>
          <div className="mt-4 flex justify-between items-center text-[10px] text-on-surface-variant uppercase tracking-widest font-medium">
            <span>Region: US-EAST-1</span>
            <span className="flex items-center gap-2">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-secondary"></span> Healthy</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-tertiary-fixed-dim"></span> Warning</span>
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}

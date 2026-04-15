import React from 'react';

export default function ExecutiveDashboard() {
  return (
    <main className="pt-24 pb-32 px-6 max-w-lg mx-auto">
      {/* Global Health Metric */}
      <section className="mb-10 relative tour-global-health">
        <div className="absolute -top-12 -left-12 w-48 h-48 bg-secondary/10 blur-[80px] rounded-full"></div>
        <div className="flex flex-col gap-1 relative z-10">
          <span className="text-[10px] font-bold tracking-[0.2em] text-on-surface-variant font-space uppercase">Global Health Status</span>
          <div className="flex items-baseline gap-2">
            <span className="text-7xl font-bold font-space tracking-tighter text-secondary">94</span>
            <span className="text-2xl font-bold font-space text-secondary/60">%</span>
          </div>
          <div className="h-1 w-full bg-surface-container-high rounded-full overflow-hidden mt-4">
            <div className="h-full bg-secondary w-[94%] shadow-[0_0_12px_rgba(64,229,108,0.4)]"></div>
          </div>
        </div>
      </section>

      {/* Bento Grid: Agents & Quick Stats */}
      <div className="grid grid-cols-2 gap-4 mb-10 tour-active-agents">
        {/* Active Agents Card */}
        <div className="col-span-1 bg-surface-container-high p-5 rounded-xl border border-white/5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-3">
            <span className="material-symbols-outlined text-primary-fixed-dim text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>smart_toy</span>
          </div>
          <div className="flex flex-col gap-4">
            <span className="text-[10px] font-bold tracking-widest text-on-surface-variant uppercase">Active Agents</span>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold font-space text-primary">8</span>
              <span className="text-sm font-medium text-outline">/ 10</span>
            </div>
            <div className="flex gap-1">
              {[...Array(8)].map((_, i) => <div key={i} className="w-1.5 h-1.5 rounded-full bg-secondary"></div>)}
              {[...Array(2)].map((_, i) => <div key={i+8} className="w-1.5 h-1.5 rounded-full bg-surface-variant"></div>)}
            </div>
          </div>
        </div>

        {/* Compliance Ticker */}
        <div className="col-span-1 bg-surface-container-high p-5 rounded-xl border border-white/5 flex flex-col justify-between tour-compliance">
          <span className="text-[10px] font-bold tracking-widest text-on-surface-variant uppercase">Compliance</span>
          <div className="flex flex-col">
            <span className="text-3xl font-bold font-space text-secondary">100<span className="text-sm ml-0.5">%</span></span>
            <span className="text-[10px] text-secondary/60 font-medium">LATEST AUDIT PASSED</span>
          </div>
        </div>
      </div>

      {/* Critical Escalations Section */}
      <section className="mb-10 tour-escalations">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-sm font-bold font-space tracking-widest text-on-surface uppercase">Critical Escalations</h2>
          <span className="px-2 py-0.5 bg-error/10 text-error text-[10px] font-bold rounded border border-error/20">2 ACTIVE</span>
        </div>
        <div className="space-y-4">
          <div className="bg-surface-container-low rounded-xl p-4 flex gap-4 items-start border-l-4 border-tertiary-fixed-dim">
            <div className="bg-tertiary-fixed-dim/10 p-2 rounded-lg">
              <span className="material-symbols-outlined text-tertiary-fixed-dim">warning</span>
            </div>
            <div className="flex-1">
              <div className="flex justify-between mb-1">
                <h3 className="text-sm font-bold text-on-surface">Material Procurement Delay</h3>
                <span className="text-[10px] text-outline">2H AGO</span>
              </div>
              <p className="text-xs text-on-surface-variant leading-relaxed mb-3">Steel structural components for Sector 7-B are stalled at customs. Agent <span className="text-primary-fixed-dim">AX-09</span> requires sign-off.</p>
              <button className="bg-primary hover:bg-primary-container text-on-primary text-[10px] font-bold py-1.5 px-4 rounded-md transition-colors uppercase tracking-wider">Resolve Now</button>
            </div>
          </div>

          <div className="bg-surface-container-low rounded-xl p-4 flex gap-4 items-start border-l-4 border-tertiary-fixed-dim">
            <div className="bg-tertiary-fixed-dim/10 p-2 rounded-lg">
              <span className="material-symbols-outlined text-tertiary-fixed-dim">gavel</span>
            </div>
            <div className="flex-1">
              <div className="flex justify-between mb-1">
                <h3 className="text-sm font-bold text-on-surface">Compliance Override Required</h3>
                <span className="text-[10px] text-outline">5H AGO</span>
              </div>
              <p className="text-xs text-on-surface-variant leading-relaxed mb-3">Autonomous zoning agent encountered local ordinance conflict in site expansion phase.</p>
              <div className="flex gap-2">
                <button className="bg-surface-container-highest text-on-surface text-[10px] font-bold py-1.5 px-4 rounded-md hover:bg-surface-variant transition-colors uppercase tracking-wider">View Case</button>
                <button className="bg-surface-container-highest text-on-surface text-[10px] font-bold py-1.5 px-4 rounded-md hover:bg-surface-variant transition-colors uppercase tracking-wider">Defer</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Flow Visualizer */}
      <section className="mb-10 tour-flow">
        <h2 className="text-sm font-bold font-space tracking-widest text-on-surface uppercase mb-6">Autonomous Execution Flow</h2>
        <div className="bg-surface-container-lowest rounded-2xl p-6 border border-white/5 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent"></div>
          <div className="flex items-center justify-between relative z-10">
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center border border-secondary/30">
                <span className="material-symbols-outlined text-secondary text-xl">database</span>
              </div>
              <span className="text-[9px] font-bold text-outline uppercase">Intake</span>
            </div>
            <div className="flex-1 h-[1px] bg-gradient-to-r from-secondary/50 via-secondary to-primary/50 mx-2 relative">
              <div className="absolute -top-1 left-1/2 w-2 h-2 bg-secondary rounded-full shadow-[0_0_8px_#40e56c]"></div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center border border-primary/30">
                <span className="material-symbols-outlined text-primary text-xl">memory</span>
              </div>
              <span className="text-[9px] font-bold text-outline uppercase">Processing</span>
            </div>
            <div className="flex-1 h-[1px] bg-surface-container-high mx-2"></div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-surface-container-low flex items-center justify-center border border-outline/20">
                <span className="material-symbols-outlined text-outline text-xl">rocket_launch</span>
              </div>
              <span className="text-[9px] font-bold text-outline uppercase">Deploy</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

import React from 'react';

export default function IntakePlanning() {
  return (
    <main className="pt-24 pb-28 px-4 md:px-8 max-w-5xl mx-auto space-y-6">
      {/* Agents Status Section */}
      <section className="grid grid-cols-2 gap-4 tour-intake-agents">
        <div className="bg-surface-container-high p-4 rounded-xl border-l-2 border-primary-fixed-dim/50 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(0,218,243,0.15)_0%,rgba(0,218,243,0)_70%)]"></div>
          <div className="flex items-center justify-between mb-2">
            <span className="font-headline text-[10px] uppercase tracking-[0.1em] text-primary-fixed-dim">Active Agent</span>
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-secondary shadow-[0_0_8px_rgba(64,229,108,0.6)]"></div>
              <span className="text-[9px] text-secondary font-medium">LIVE</span>
            </div>
          </div>
          <h3 className="font-headline text-lg text-primary leading-tight">Intake Agent</h3>
          <p className="text-xs text-on-surface-variant mt-1">Scanning business requirements...</p>
        </div>
        
        <div className="bg-surface-container-high p-4 rounded-xl border-l-2 border-primary-fixed-dim/50 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(0,218,243,0.15)_0%,rgba(0,218,243,0)_70%)]"></div>
          <div className="flex items-center justify-between mb-2">
            <span className="font-headline text-[10px] uppercase tracking-[0.1em] text-primary-fixed-dim">Active Agent</span>
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-secondary shadow-[0_0_8px_rgba(64,229,108,0.6)]"></div>
              <span className="text-[9px] text-secondary font-medium">LIVE</span>
            </div>
          </div>
          <h3 className="font-headline text-lg text-primary leading-tight">Planning Agent</h3>
          <p className="text-xs text-on-surface-variant mt-1">Optimizing execution paths...</p>
        </div>
      </section>

      {/* Input Section */}
      <section className="bg-surface-container rounded-xl p-6 space-y-4 tour-intake-input">
        <div className="flex items-center justify-between">
          <h2 className="font-headline text-xl text-primary tracking-tight">Project Genesis</h2>
          <span className="text-[10px] font-label uppercase tracking-widest text-outline">v2.4 Neural Parser</span>
        </div>
        <div className="relative">
          <label className="sr-only" htmlFor="business-request">Input Business Request</label>
          <textarea 
            id="business-request" 
            className="w-full h-40 bg-surface-container-lowest border-none border-b border-primary-fixed-dim/20 focus:ring-0 focus:border-primary-fixed-dim text-on-surface placeholder-on-surface-variant/40 rounded-lg p-4 font-body text-sm resize-none transition-all" 
            placeholder="Describe your business objective, scope, and technical constraints here..."
          ></textarea>
          <div className="absolute bottom-3 right-3 flex items-center gap-2 opacity-40">
            <span className="material-symbols-outlined text-xs">attachment</span>
            <span className="material-symbols-outlined text-xs">mic</span>
          </div>
        </div>
        <button className="w-full h-14 bg-gradient-to-r from-primary-fixed-dim to-primary-container text-on-primary font-headline font-bold uppercase tracking-widest text-sm rounded-lg flex items-center justify-center gap-3 active:scale-[0.98] transition-transform shadow-[0_0_30px_rgba(0,218,243,0.15)]">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
          Parse Requirements
        </button>
      </section>

      {/* Task List Preview */}
      <section className="space-y-4 tour-intake-tasks">
        <div className="flex items-center justify-between px-2">
          <h3 className="font-headline text-sm uppercase tracking-[0.2em] text-on-surface-variant">Generated Task List</h3>
          <span className="text-xs text-outline">4 nodes active</span>
        </div>
        
        <div className="space-y-3">
          {/* Task Card 1: Processing */}
          <div className="bg-surface-container-low p-4 rounded-xl flex items-center gap-4 group transition-colors hover:bg-surface-container">
            <div className="w-10 h-10 rounded-lg bg-surface-container-highest flex items-center justify-center text-primary-fixed-dim">
              <span className="material-symbols-outlined">database</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold text-on-surface">Data Schema Validation</h4>
                <span className="text-[10px] font-medium text-primary-fixed-dim uppercase tracking-tighter">Processing</span>
              </div>
              <div className="w-full bg-surface-container-highest h-1 mt-2 rounded-full overflow-hidden">
                <div className="bg-primary-fixed-dim h-full w-2/3 animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Task Card 2: Ready */}
          <div className="bg-surface-container-low p-4 rounded-xl flex items-center gap-4 group transition-colors hover:bg-surface-container">
            <div className="w-10 h-10 rounded-lg bg-surface-container-highest flex items-center justify-center text-secondary">
              <span className="material-symbols-outlined">verified</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold text-on-surface">Compliance Protocol Check</h4>
                <span className="text-[10px] font-medium text-secondary uppercase tracking-tighter">Validated</span>
              </div>
              <p className="text-[11px] text-on-surface-variant mt-1">GDPR and SOC2 alignment verified by Agent-7.</p>
            </div>
          </div>

          {/* Task Card 3: Human Needed */}
          <div className="bg-surface-container-low p-4 rounded-xl border-l-4 border-tertiary-fixed-dim flex items-center gap-4 group transition-colors hover:bg-surface-container">
            <div className="w-10 h-10 rounded-lg bg-surface-container-highest flex items-center justify-center text-tertiary-fixed-dim">
              <span className="material-symbols-outlined">person_alert</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold text-on-surface">Budgetary Cap Override</h4>
                <span className="text-[10px] font-medium text-tertiary-fixed-dim uppercase tracking-tighter">Human Action</span>
              </div>
              <p className="text-[11px] text-on-surface-variant mt-1">Planning agent suggests 12% increase for redundancy.</p>
            </div>
          </div>

          {/* Task Card 4: Scheduled */}
          <div className="bg-surface-container-low p-4 rounded-xl flex items-center gap-4 group transition-colors hover:bg-surface-container">
            <div className="w-10 h-10 rounded-lg bg-surface-container-highest flex items-center justify-center text-outline">
              <span className="material-symbols-outlined">account_tree</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold text-on-surface">Infrastructure Provisioning</h4>
                <span className="text-[10px] font-medium text-outline uppercase tracking-tighter">Queued</span>
              </div>
              <p className="text-[11px] text-on-surface-variant mt-1">Scheduled after Schema Validation completion.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

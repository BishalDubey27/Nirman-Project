import React from 'react';

const AgentCard = ({ id, name, status, health, icon, active, warning }) => {
  const isBusy = status === 'BUSY';
  const isIdle = status === 'IDLE';
  
  let borderColor = 'border-transparent hover:border-outline-variant/30';
  let badgeColor = 'bg-surface-container-highest text-on-surface-variant';
  let healthColor = 'text-on-surface';
  let iconColor = 'text-on-surface-variant';
  let glow = null;

  if (active) {
    borderColor = 'hover:translate-y-[-2px]';
    badgeColor = 'bg-primary/10 border border-primary/20 text-primary-fixed-dim';
    healthColor = 'text-secondary';
    iconColor = 'text-primary-fixed-dim';
    glow = <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(0,218,243,0.15)_0%,rgba(0,218,243,0)_70%)]"></div>;
  } else if (warning) {
    borderColor = 'border-l-4 border-error';
    badgeColor = 'bg-error-container/20 text-error';
    healthColor = 'text-error';
    iconColor = 'text-error';
  } else if (isBusy && !warning) {
    borderColor = 'border-l-4 border-tertiary-fixed-dim';
    badgeColor = 'bg-tertiary-container/10 border border-tertiary-container/20 text-tertiary-fixed-dim';
    healthColor = 'text-tertiary-fixed-dim';
    iconColor = 'text-tertiary-fixed-dim';
  }

  const bgClass = active ? 'bg-surface-container-high' : 'bg-surface-container-low';

  return (
    <div className={`relative group ${bgClass} p-5 rounded-xl transition-all ${borderColor} overflow-hidden`}>
      {glow}
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex justify-between items-start mb-4">
          <div className="flex flex-col">
            <span className={`font-headline text-[0.65rem] uppercase tracking-widest mb-1 ${active ? 'text-primary-fixed-dim' : warning ? 'text-error' : isBusy ? 'text-tertiary-fixed-dim' : 'text-on-surface-variant'}`}>{id}</span>
            <h3 className="font-headline text-lg font-bold text-on-surface">{name}</h3>
          </div>
          <div className={`${badgeColor} px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-tighter`}>{status}</div>
        </div>
        <div className="mt-auto space-y-4">
          <div className="flex justify-between items-end">
            <div>
              <p className="font-label text-[10px] text-on-surface-variant uppercase tracking-widest mb-1">Health Score</p>
              <p className={`font-headline text-2xl font-bold ${healthColor}`}>{health}<span className="text-xs ml-0.5 text-on-surface-variant">%</span></p>
            </div>
            <span className={`material-symbols-outlined text-3xl ${iconColor}`} style={active ? { fontVariationSettings: "'FILL' 1" } : {}}>{icon}</span>
          </div>
          <div className="h-1 w-full bg-surface-container-lowest rounded-full overflow-hidden">
            <div className={`h-full ${active ? 'bg-secondary' : isIdle ? 'bg-on-surface-variant/30' : warning ? 'bg-error' : 'bg-tertiary-fixed-dim'}`} style={{ width: `${health}%` }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function AgentWorkforceHub() {
  const agents = [
    { id: 'A-01', name: 'Intake', status: 'ACTIVE', health: 98, icon: 'input_circle', active: true },
    { id: 'A-02', name: 'Planning', status: 'IDLE', health: 100, icon: 'calendar_today' },
    { id: 'A-03', name: 'Staffing', status: 'BUSY', health: 84, icon: 'groups' },
    { id: 'A-04', name: 'Risk', status: 'ACTIVE', health: 92, icon: 'security', active: true },
    { id: 'A-05', name: 'Execution', status: 'ACTIVE', health: 95, icon: 'rocket_launch', active: true },
    { id: 'A-06', name: 'Communication', status: 'IDLE', health: 100, icon: 'forum' },
    { id: 'A-07', name: 'Escalation', status: 'BUSY', health: 72, icon: 'warning', warning: true },
    { id: 'A-08', name: 'Delivery Review', status: 'IDLE', health: 99, icon: 'fact_check' },
    { id: 'A-09', name: 'Rebalance', status: 'ACTIVE', health: 91, icon: 'balance', active: true },
    { id: 'A-10', name: 'Project Observer', status: 'ACTIVE', health: 100, icon: 'visibility', active: true },
  ];

  return (
    <main className="pt-20 pb-24 px-4 min-h-screen max-w-5xl mx-auto">
      {/* Header Section */}
      <section className="mb-8 px-2 tour-hub-header">
        <div className="flex items-baseline justify-between">
          <div>
            <p className="font-headline text-[0.65rem] uppercase tracking-[0.2em] text-primary-fixed-dim mb-1">Mission Control</p>
            <h2 className="font-headline text-3xl font-bold tracking-tight text-on-surface">Agent Workforce</h2>
          </div>
          <div className="flex items-center gap-2 bg-surface-container-low px-3 py-1.5 rounded-lg">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
            <span className="font-label text-[10px] font-bold uppercase tracking-wider text-secondary">System Online</span>
          </div>
        </div>
      </section>

      {/* Agent Hub Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 tour-hub-grid">
        {agents.map((agent) => (
          <AgentCard key={agent.id} {...agent} />
        ))}
      </div>
    </main>
  );
}

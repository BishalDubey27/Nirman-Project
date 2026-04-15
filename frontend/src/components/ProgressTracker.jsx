import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../config';

const healthConfig = {
  healthy: { color: 'text-secondary', bar: 'bg-secondary', label: 'Healthy', icon: 'check_circle' },
  at_risk: { color: 'text-tertiary-fixed-dim', bar: 'bg-tertiary-fixed-dim', label: 'At Risk', icon: 'warning' },
  critical: { color: 'text-error', bar: 'bg-error', label: 'Critical', icon: 'error' },
};

function ProgressDial({ pct, health }) {
  const cfg = healthConfig[health] || healthConfig.healthy;
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (pct / 100) * circumference;

  return (
    <div className="relative w-24 h-24 flex items-center justify-center">
      <svg className="-rotate-90 w-full h-full" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r={radius} fill="transparent" stroke="currentColor"
          className="text-surface-container-lowest" strokeWidth="8" />
        <circle cx="50" cy="50" r={radius} fill="transparent"
          stroke="currentColor" className={cfg.color}
          strokeWidth="8" strokeDasharray={circumference} strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 0.6s ease' }} />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className={`font-headline text-xl font-bold ${cfg.color}`}>{pct}%</span>
      </div>
    </div>
  );
}

function ProjectCard({ project, token, defaultExpanded = false }) {
  const [summary, setSummary] = useState(null);
  const [expanded, setExpanded] = useState(defaultExpanded);
  const cfg = summary ? (healthConfig[summary.health] || healthConfig.healthy) : healthConfig.healthy;

  useEffect(() => {
    if (!token) return;
    fetch(`${API_BASE_URL}/projects/${project.id}/progress-summary`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.ok ? r.json() : null)
      .then(setSummary)
      .catch(() => {});
  }, [project.id, token]);

  if (!summary) {
    return (
      <div className="bg-surface-container-low rounded-xl p-4 animate-pulse">
        <div className="h-4 bg-surface-container-highest rounded w-1/2 mb-2" />
        <div className="h-2 bg-surface-container-highest rounded w-full" />
      </div>
    );
  }

  return (
    <div className="bg-surface-container-low rounded-xl overflow-hidden">
      <button
        onClick={() => setExpanded((e) => !e)}
        className="w-full flex items-center gap-4 p-4 hover:bg-surface-container transition-colors text-left"
      >
        <ProgressDial pct={summary.overall_progress} health={summary.health} />
        <div className="flex-1 min-w-0">
          <p className="font-headline font-bold text-on-surface truncate">{summary.project_name}</p>
          <div className={`flex items-center gap-1 mt-1 ${cfg.color}`}>
            <span className="material-symbols-outlined text-sm">{cfg.icon}</span>
            <span className="text-[10px] font-bold uppercase tracking-wider">{cfg.label}</span>
          </div>
          <div className="flex gap-3 mt-2 text-[10px] text-on-surface-variant uppercase tracking-wider">
            <span>✅ {summary.tasks_completed}/{summary.tasks_total} done</span>
            {summary.tasks_delayed > 0 && (
              <span className="text-error">⚠ {summary.tasks_delayed} delayed</span>
            )}
            {summary.days_remaining != null && (
              <span>{summary.days_remaining}d left</span>
            )}
          </div>
        </div>
        <span className="material-symbols-outlined text-on-surface-variant">
          {expanded ? 'expand_less' : 'expand_more'}
        </span>
      </button>

      {expanded && (
        <div className="px-4 pb-4 space-y-3 border-t border-outline-variant/10">
          {/* Budget bar */}
          <div className="pt-3">
            <div className="flex justify-between text-[10px] text-on-surface-variant mb-1 uppercase tracking-wider">
              <span>Budget Used</span>
              <span className={summary.budget_used_pct > 90 ? 'text-error' : ''}>{summary.budget_used_pct}%</span>
            </div>
            <div className="h-1.5 bg-surface-container-lowest rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${summary.budget_used_pct > 90 ? 'bg-error' : summary.budget_used_pct > 70 ? 'bg-tertiary-fixed-dim' : 'bg-secondary'}`}
                style={{ width: `${Math.min(summary.budget_used_pct, 100)}%`, transition: 'width 0.5s ease' }}
              />
            </div>
          </div>

          {/* Task breakdown pills */}
          <div className="grid grid-cols-3 gap-2 text-center text-[10px]">
            {[
              { label: 'Completed', val: summary.tasks_completed, color: 'text-secondary' },
              { label: 'In Progress', val: summary.tasks_in_progress, color: 'text-primary-fixed-dim' },
              { label: 'Blocked', val: summary.tasks_blocked, color: 'text-error' },
            ].map((s) => (
              <div key={s.label} className="bg-surface-container-highest rounded-lg py-2">
                <p className={`font-headline font-bold text-lg ${s.color}`}>{s.val}</p>
                <p className="text-on-surface-variant uppercase tracking-wider">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Milestones */}
          {summary.milestones.length > 0 && (
            <div>
              <p className="text-[10px] text-on-surface-variant uppercase tracking-widest mb-2">Milestones</p>
              <div className="space-y-2">
                {summary.milestones.slice(0, 5).map((m) => (
                  <div key={m.task_id} className="flex items-center gap-2">
                    <span className={`material-symbols-outlined text-sm ${m.is_on_track ? 'text-secondary' : 'text-error'}`}>
                      {m.is_on_track ? 'task_alt' : 'schedule'}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-on-surface truncate">{m.title}</p>
                      <p className="text-[9px] text-on-surface-variant">Due {new Date(m.deadline).toLocaleDateString()}</p>
                    </div>
                    <span className="text-[10px] font-bold text-on-surface-variant">{m.completion_pct}%</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function ProgressTracker({ token }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;
    fetch(`${API_BASE_URL}/projects/`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.ok ? r.json() : [])
      .then((data) => {
        setProjects(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [token]);

  if (loading) {
    return (
      <div className="space-y-3">
        {[1, 2].map((i) => (
          <div key={i} className="bg-surface-container-low rounded-xl p-4 animate-pulse h-20" />
        ))}
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="bg-surface-container-low rounded-xl p-6 text-center text-on-surface-variant text-sm">
        <span className="material-symbols-outlined block text-3xl mb-2 opacity-50">folder_open</span>
        No active projects yet
      </div>
    );
  }

  return (
    <div className="space-y-3 tour-progress-tracker">
      {projects.map((p, i) => (
        <ProjectCard key={p.id} project={p} token={token} defaultExpanded={i === 0} />
      ))}
    </div>
  );
}

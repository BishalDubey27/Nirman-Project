import React, { useState, useEffect, useRef } from 'react';
import { API_BASE_URL } from '../config';

/**
 * NotificationBell — polls /notifications/mine every 30s
 * Shows a badge count and a slide-in panel on click.
 */
export default function NotificationBell({ token }) {
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);
  const [unread, setUnread] = useState(0);
  const panelRef = useRef(null);

  const fetchNotifications = async () => {
    if (!token) return;
    try {
      const res = await fetch(`${API_BASE_URL}/notifications/mine`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setNotifications(data);
        setUnread(data.filter((n) => !n.is_read).length);
      }
    } catch (_) {}
  };

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000); // poll every 30s
    return () => clearInterval(interval);
  }, [token]);

  // Close panel on outside click
  useEffect(() => {
    const handler = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const markRead = async (id) => {
    if (!token) return;
    await fetch(`${API_BASE_URL}/notifications/${id}/read`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
    });
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, is_read: true } : n)));
    setUnread((c) => Math.max(0, c - 1));
  };

  const markAllRead = async () => {
    if (!token) return;
    await fetch(`${API_BASE_URL}/notifications/read-all`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
    });
    setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })));
    setUnread(0);
  };

  const typeColors = {
    demand_change: 'border-tertiary-fixed-dim text-tertiary-fixed-dim',
    task_assigned: 'border-primary-fixed-dim text-primary-fixed-dim',
    meeting_scheduled: 'border-secondary text-secondary',
    progress_alert: 'border-error text-error',
    general: 'border-outline text-on-surface-variant',
  };

  return (
    <div className="relative" ref={panelRef}>
      {/* Bell button */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="relative p-2 text-on-surface-variant hover:text-primary-fixed-dim transition-colors tour-notifications"
        aria-label="Notifications"
      >
        <span className="material-symbols-outlined text-2xl">notifications</span>
        {unread > 0 && (
          <span className="absolute top-1 right-1 w-4 h-4 bg-error text-on-error text-[9px] font-bold rounded-full flex items-center justify-center animate-pulse">
            {unread > 9 ? '9+' : unread}
          </span>
        )}
      </button>

      {/* Slide-in notification panel */}
      {open && (
        <div className="absolute right-0 top-12 w-80 bg-surface-container-high border border-outline-variant/30 rounded-xl shadow-2xl z-50 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-outline-variant/20">
            <span className="font-headline font-bold text-sm text-on-surface uppercase tracking-widest">
              Notifications
            </span>
            {unread > 0 && (
              <button
                onClick={markAllRead}
                className="text-[10px] text-primary-fixed-dim hover:underline font-bold uppercase tracking-wider"
              >
                Mark all read
              </button>
            )}
          </div>

          {/* List */}
          <div className="max-h-96 overflow-y-auto divide-y divide-outline-variant/10">
            {notifications.length === 0 ? (
              <div className="p-6 text-center text-on-surface-variant text-sm">
                <span className="material-symbols-outlined block text-3xl mb-2 opacity-50">notifications_none</span>
                No notifications yet
              </div>
            ) : (
              notifications.map((n) => (
                <div
                  key={n.id}
                  onClick={() => !n.is_read && markRead(n.id)}
                  className={`px-4 py-3 cursor-pointer transition-colors border-l-2 ${
                    typeColors[n.type] || typeColors.general
                  } ${n.is_read ? 'opacity-50 bg-transparent' : 'bg-surface-container-highest hover:bg-surface-container'}`}
                >
                  <p className="text-xs font-bold text-on-surface leading-snug">{n.title}</p>
                  <p className="text-[10px] text-on-surface-variant mt-0.5 leading-relaxed line-clamp-2">{n.body}</p>
                  <p className="text-[9px] text-on-surface-variant/50 mt-1">
                    {new Date(n.created_at).toLocaleString()}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

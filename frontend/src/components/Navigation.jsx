import React from 'react';
import NotificationBell from './NotificationBell';

export function TopAppBar({ onToggleTheme }) {
  const token = localStorage.getItem('token');
  return (
    <header className="fixed top-0 w-full z-50 bg-[#111316] text-[#00daf3] flex justify-between items-center px-6 h-16 w-full">
      <div className="flex items-center gap-3">
        <span className="material-symbols-outlined text-[#00daf3]">grid_view</span>
        <h1 className="font-['Space_Grotesk'] tracking-wider uppercase text-sm font-bold tracking-tighter text-[#c3f5ff]">NIRMAN PROJECT</h1>
      </div>
      <div className="flex items-center gap-2">
        <span className="material-symbols-outlined cursor-pointer hover:bg-surface-container p-1 rounded-full transition-colors" onClick={onToggleTheme}>light_mode</span>
        <NotificationBell token={token} />
        <div className="w-8 h-8 rounded-full bg-surface-container-high border border-outline-variant/30 flex items-center justify-center overflow-hidden tour-profile">
          <img alt="User Profile" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDVOsVoi0zmrTulbqdZavXmLOi__kSGQtqeKJrMmIm3s9NY2YOtIK1JWQEoCcwTxTkS4sd3X_Kk8gjLwFCJLhUcvsOc9egvmMRBnzkKmSbDJ4rlOB7Xo_q5iDrOVEDj4SBrpEW2OIwg27KCLAVLWUjCDBoI5rsgedT00N-1IplqHUiCwNBfCDB1RM7O10q6rF-BzkkcZF6goJMJ6A58bAcLXo2yXW0Hf_ixbCWiDCHoibyQ4s7mkFRpz84qIABCZPwrxCnKPRpb310" />
        </div>
      </div>
    </header>
  );
}


export function BottomNavBar({ currentPage, setCurrentPage }) {
  const tabs = [
    { id: 'dashboard', icon: 'dashboard', label: 'Dashboard' },
    { id: 'intake', icon: 'add_task', label: 'Intake' },
    { id: 'agents', icon: 'smart_toy', label: 'Agents' },
    { id: 'compliance', icon: 'verified_user', label: 'Compliance' },
    { id: 'execution', icon: 'account_tree', label: 'Execution', disabled: true },
  ];

  return (
    <nav className="fixed bottom-0 w-full z-50 border-t border-[#c3f5ff]/15 bg-[#111316]/80 backdrop-blur-xl shadow-[0_-4px_24px_rgba(195,245,255,0.06)] h-20 pb-safe px-4 flex justify-around items-center">
      {tabs.map((tab) => {
        const isActive = currentPage === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => !tab.disabled && setCurrentPage(tab.id)}
            className={`flex flex-col items-center justify-center transition-all active:scale-95 duration-200 tour-nav-${tab.id} ${
              isActive 
                ? "text-[#00daf3] relative after:content-[''] after:absolute after:-bottom-1 after:w-1 after:h-1 after:bg-[#00daf3] after:rounded-full" 
                : "text-[#e2e2e6]/60 hover:text-[#c3f5ff]"
            } ${tab.disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <span 
              className="material-symbols-outlined" 
              style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}
            >
              {tab.icon}
            </span>
            <span className="font-['Inter'] text-[10px] font-medium tracking-[0.05em] uppercase mt-1">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
}

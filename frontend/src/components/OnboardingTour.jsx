import React from 'react';
import * as ReactJoyride from 'react-joyride';
const Joyride = ReactJoyride.default ?? ReactJoyride;
const STATUS = ReactJoyride.STATUS ?? { FINISHED: 'finished', SKIPPED: 'skipped' };

export default function OnboardingTour({ run, setRun }) {
  const steps = [
    {
      target: '.tour-global-health',
      content: 'Welcome to Nirman Project! This is your Global Health Metric, reflecting the overall status of your projects and agents.',
      disableBeacon: true,
    },
    {
      target: '.tour-active-agents',
      content: 'Here you can see the number of active AI agents currently managing your workflows.',
    },
    {
      target: '.tour-escalations',
      content: 'Any critical issues or manual interventions required will appear here as escalations.',
    },
    {
      target: '.tour-nav-intake',
      content: 'Use the Intake screen to submit a new business request and let the agents break it down.',
    },
    {
      target: '.tour-nav-agents',
      content: 'Check the real-time status of all your 10 specialized AI agents in the Agent Workforce Hub.',
    },
    {
      target: '.tour-nav-compliance',
      content: 'Monitor risk metrics, guardrails, and compliance logs in real-time.',
    }
  ];

  const handleJoyrideCallback = (data) => {
    const { status } = data;
    const finishedStatuses = [STATUS.FINISHED, STATUS.SKIPPED];
    
    if (finishedStatuses.includes(status)) {
      setRun(false);
      localStorage.setItem('hasSeenTour', 'true');
    }
  };

  return (
    <Joyride
      steps={steps}
      run={run}
      continuous={true}
      showSkipButton={true}
      showProgress={true}
      styles={{
        options: {
          arrowColor: '#282a2d',
          backgroundColor: '#282a2d',
          overlayColor: 'rgba(0, 0, 0, 0.7)',
          primaryColor: '#00daf3',
          textColor: '#e2e2e6',
          zIndex: 1000,
        },
        tooltipContainer: {
          textAlign: 'left',
          fontFamily: 'Inter, sans-serif'
        },
        buttonNext: {
          backgroundColor: '#00daf3',
          color: '#001f24',
          fontFamily: 'Space Grotesk, sans-serif',
          fontWeight: 'bold',
          textTransform: 'uppercase',
          letterSpacing: '0.05em'
        },
        buttonBack: {
          color: '#bac9cc'
        },
        buttonSkip: {
          color: '#bac9cc'
        }
      }}
      callback={handleJoyrideCallback}
    />
  );
}

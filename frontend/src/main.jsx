import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './App.css'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }
  componentDidCatch(error, info) {
    console.error('[Nirman] App crashed:', error, info)
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh', background: '#111316', color: '#e2e2e6',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          justifyContent: 'center', fontFamily: 'Inter, sans-serif', padding: '2rem'
        }}>
          <span style={{ fontSize: '3rem' }}>⚠️</span>
          <h1 style={{ color: '#ffb4ab', marginTop: '1rem', fontFamily: 'Space Grotesk, sans-serif' }}>
            App crashed
          </h1>
          <pre style={{
            background: '#1e2023', color: '#bac9cc', padding: '1rem',
            borderRadius: '8px', maxWidth: '700px', overflow: 'auto',
            fontSize: '0.75rem', marginTop: '1rem', textAlign: 'left'
          }}>
            {this.state.error?.toString()}
          </pre>
          <button
            onClick={() => { this.setState({ hasError: false, error: null }); window.location.reload(); }}
            style={{
              marginTop: '1.5rem', padding: '0.75rem 2rem',
              background: '#00daf3', color: '#001f24', border: 'none',
              borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer',
              fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '0.05em'
            }}
          >
            RELOAD APP
          </button>
        </div>
      )
    }
    return this.props.children
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
)

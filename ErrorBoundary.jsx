import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { hasError: false }; }
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(error) { console.error('Wayline UI error:', error); }
  render() {
    if (this.state.hasError) return <main className="fatal-error"><h1>Something went wrong</h1><p>The workspace could not display this screen. Reload the app to try again.</p><button className="button button--primary" onClick={() => window.location.reload()}>Reload workspace</button></main>;
    return this.props.children;
  }
}

import './Dashboard.css'

function Dashboard() {
  return (
    <div className="dashboard">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>BURNIQ</h2>
        </div>
        <nav className="sidebar-nav">
          <a href="#dashboard" className="nav-item active">Dashboard</a>
          <a href="#analytics" className="nav-item">Analytics</a>
          <a href="#reports" className="nav-item">Reports</a>
          <a href="#settings" className="nav-item">Settings</a>
        </nav>
      </aside>

      <main className="main-content">
        <header className="dashboard-header">
          <h1>Dashboard</h1>
        </header>

        <div className="dashboard-grid">
          <div className="card burnout-card">
            <h3>Burnout Score</h3>
            <div className="burnout-score">65%</div>
            <p>High Risk</p>
          </div>

          <div className="card activity-card">
            <h3>Activity</h3>
            <div className="activity-stats">
              <div className="stat">
                <span className="stat-value">8.5</span>
                <span className="stat-label">Hours Today</span>
              </div>
              <div className="stat">
                <span className="stat-value">42</span>
                <span className="stat-label">This Week</span>
              </div>
            </div>
          </div>

          <div className="card recommendations-card">
            <h3>AI Recommendations</h3>
            <ul className="recommendations">
              <li>Take a 15-minute break</li>
              <li>Schedule time for deep work</li>
              <li>Consider reducing meeting load</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Dashboard
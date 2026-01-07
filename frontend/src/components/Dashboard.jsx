import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'
import './Dashboard.css'

function Dashboard() {
  const navigate = useNavigate()
  const [userName, setUserName] = useState('')
  const [burnoutScore, setBurnoutScore] = useState(null)
  const [burnoutStatus, setBurnoutStatus] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({
    workHours: '',
    breakCount: '',
    stressLevel: ''
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchUserProfile()
    fetchLatestScore()
  }, [])

  const fetchUserProfile = async () => {
    try {
      const response = await api.get('/user/profile')
      setUserName(response.data.user.name)
    } catch (error) {
      console.error('Error fetching profile:', error)
    }
  }

  const fetchLatestScore = async () => {
    try {
      const response = await api.get('/score/history')
      if (response.data.data && response.data.data.length > 0) {
        const latestScore = response.data.data[0]
        setBurnoutScore(latestScore.score)
        setBurnoutStatus(latestScore.status)
      }
    } catch (error) {
      console.error('Error fetching score:', error)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await api.post('/score/calculate', {
        workHours: parseFloat(formData.workHours),
        breakCount: parseInt(formData.breakCount),
        stressLevel: parseInt(formData.stressLevel)
      })

      setBurnoutScore(response.data.data.score)
      setBurnoutStatus(response.data.data.status)
      setShowModal(false)
      setFormData({ workHours: '', breakCount: '', stressLevel: '' })
      alert('Burnout score calculated successfully!')
    } catch (error) {
      alert(error.response?.data?.message || 'Error calculating score')
    } finally {
      setLoading(false)
    }
  }

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
          <button onClick={handleLogout} className="nav-item logout-btn">Logout</button>
        </nav>
      </aside>

      <main className="main-content">
        <header className="dashboard-header">
          <h1>Dashboard</h1>
          {userName && <p className="welcome-text">Welcome back, {userName}!</p>}
        </header>

        <div className="dashboard-grid">
          <div className="card burnout-card">
            <h3>Burnout Score</h3>
            <div className="burnout-score">
              {burnoutScore !== null ? `${Math.round(burnoutScore)}%` : '--'}
            </div>
            <p>{burnoutStatus || 'No data yet'}</p>
            <button onClick={() => setShowModal(true)} className="calculate-btn">
              Calculate New Score
            </button>
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

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Calculate Burnout Score</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="workHours">Work Hours Today</label>
                <input
                  type="number"
                  id="workHours"
                  name="workHours"
                  value={formData.workHours}
                  onChange={handleInputChange}
                  min="0"
                  step="0.5"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="breakCount">Number of Breaks</label>
                <input
                  type="number"
                  id="breakCount"
                  name="breakCount"
                  value={formData.breakCount}
                  onChange={handleInputChange}
                  min="0"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="stressLevel">Stress Level (1-10)</label>
                <input
                  type="number"
                  id="stressLevel"
                  name="stressLevel"
                  value={formData.stressLevel}
                  onChange={handleInputChange}
                  min="0"
                  max="10"
                  required
                />
              </div>
              <div className="modal-actions">
                <button type="button" onClick={() => setShowModal(false)} className="btn-cancel">
                  Cancel
                </button>
                <button type="submit" disabled={loading} className="btn-submit">
                  {loading ? 'Calculating...' : 'Calculate'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard
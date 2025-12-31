import { Link } from 'react-router-dom'
import './LandingPage.css'

function LandingPage() {
  return (
    <div className="landing-page">
      <nav className="navbar">
        <div className="nav-content">
          <h2>BURNIQ</h2>
          <div className="nav-links">
            <a href="#about">About</a>
            <a href="#features">Features</a>
            <Link to="/login">Login</Link>
          </div>
        </div>
      </nav>

      <section className="hero">
        <h1>BURN BRIGHT.<br />THINK SMART.</h1>
        <p>Minimalist solutions for maximum impact</p>
        <Link to="/signup">
          <button className="cta-button">GET STARTED</button>
        </Link>
      </section>

      <section className="features">
        <div className="feature-column">
          <h3>FAST</h3>
          <p>Lightning speed performance</p>
        </div>
        <div className="feature-column">
          <h3>CLEAN</h3>
          <p>Minimal design philosophy</p>
        </div>
        <div className="feature-column">
          <h3>SMART</h3>
          <p>Intelligent automation</p>
        </div>
      </section>
    </div>
  )
}

export default LandingPage
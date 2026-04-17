import { useNavigate } from 'react-router-dom';
import '../styles/LandingPage.css';

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="page landing-page">
      {/* ── Illustration Area ── */}
      <div className="landing-illustration">
        <div className="illustration-inner">
          <div className="blob blob-1" />
          <div className="blob blob-2" />
          <div className="blob blob-3" />
          <div className="blob blob-4" />
          <div className="logo-badge">
            <div className="logo-text">PopX</div>
            <div className="logo-sub">Connect &amp; Grow</div>
          </div>
        </div>
      </div>

      {/* ── Bottom Content Card ── */}
      <div className="landing-content">
        <h1 className="landing-title">Welcome to PopX</h1>
        <p className="landing-subtitle">
          Your gateway to a world of connections,
          opportunities, and endless possibilities.
        </p>

        <div className="landing-buttons">
          <button
            className="btn btn-primary"
            id="btn-create-account"
            onClick={() => navigate('/signup')}
          >
            Create Account
          </button>

          <button
            className="btn btn-secondary"
            id="btn-login"
            onClick={() => navigate('/login')}
          >
            Already Registered? Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;

import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/Profile.css';

// Inline SVG avatar fallback (geometric purple illustration)
const AVATAR_URL =
  'https://api.dicebear.com/8.x/adventurer/svg?seed=PopX&backgroundColor=b6e3f4,c0aede,d1d4f9&radius=50';

function Profile() {
  const navigate  = useNavigate();
  const location  = useLocation();

  const name  = location.state?.name  || 'Marry Doe';
  const email = location.state?.email || 'marry@example.com';

  return (
    <div className="page profile-page">
      {/* ── Top Header Bar ── */}
      <div className="profile-header">
        <div className="profile-header-top">
          <button
            className="profile-header-back"
            id="btn-back-profile"
            onClick={() => navigate('/')}
            aria-label="Go back"
          >
            ←
          </button>
          <h1 className="profile-header-title">Account Settings</h1>
        </div>
      </div>

      {/* ── Identity Card ── */}
      <div className="profile-identity-card">
        <div className="avatar-wrapper">
          <img
            src={AVATAR_URL}
            alt={`${name}'s avatar`}
            className="avatar-img"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=6c47ff&color=fff&size=76`;
            }}
          />
          <div className="avatar-badge">
            {/* Camera icon */}
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 15.5A3.5 3.5 0 0 1 8.5 12 3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5 3.5 3.5 0 0 1-3.5 3.5m7.43-10c.04 0 .07.01.1.01L21 7H3.04L4.43 5.5c.04-.01.08-.01.11-.01H19.43M20 4H15l-1.83-2H10L8.17 4H4C2.9 4 2 4.9 2 6v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2z"/>
            </svg>
          </div>
        </div>

        <div className="profile-identity-info">
          <p className="profile-name">{name}</p>
          <p className="profile-email">{email}</p>
        </div>
      </div>

      {/* ── Stats Row ── */}
      <div className="profile-stats">
        <div className="stat-card">
          <div className="stat-value">12</div>
          <div className="stat-label">Posts</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">4.8K</div>
          <div className="stat-label">Followers</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">219</div>
          <div className="stat-label">Following</div>
        </div>
      </div>

      {/* ── Bio Card ── */}
      <div className="profile-content">
        <div className="profile-bio-card">
          <p className="profile-section-label">About Me</p>
          <hr className="dashed-divider" />
          <p className="profile-bio-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
            enim ad minim veniam, quis nostrud exercitation ullamco.
          </p>
        </div>
      </div>

      {/* ── Logout ── */}
      <button
        className="logout-btn"
        id="btn-logout"
        onClick={() => navigate('/')}
      >
        Sign Out
      </button>
    </div>
  );
}

export default Profile;

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Signup.css';

const INITIAL = {
  fullName:    '',
  phone:       '',
  email:       '',
  password:    '',
  company:     '',
  isAgency:    'no',
};

function Signup() {
  const navigate = useNavigate();
  const [form, setForm]       = useState(INITIAL);
  const [errors, setErrors]   = useState({});
  const [touched, setTouched] = useState({});

  // Required fields
  const requiredFields = ['fullName', 'phone', 'email', 'password'];

  const validators = {
    fullName: (v) => (!v.trim() ? 'Full name is required.' : ''),
    phone:    (v) => (!v.trim() ? 'Phone number is required.' : !/^\+?[\d\s\-]{7,15}$/.test(v) ? 'Enter a valid phone number.' : ''),
    email:    (v) => (!v.trim() ? 'Email is required.' : !v.includes('@') ? 'Enter a valid email.' : ''),
    password: (v) => (!v ? 'Password is required.' : v.length < 6 ? 'Minimum 6 characters.' : ''),
    company:  () => '',   // optional
  };

  const isFormReady = requiredFields.every(
    (f) => form[f].trim() !== '' && !validators[f]?.(form[f])
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validators[name]?.(form[name]) ?? '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Touch all required fields
    const allTouched = requiredFields.reduce((acc, f) => ({ ...acc, [f]: true }), {});
    setTouched(allTouched);
    const allErrors = requiredFields.reduce(
      (acc, f) => ({ ...acc, [f]: validators[f]?.(form[f]) ?? '' }), {}
    );
    setErrors(allErrors);

    if (isFormReady) {
      navigate('/profile', { state: { name: form.fullName, email: form.email } });
    }
  };

  return (
    <div className="page auth-page">
      {/* ── Header Band ── */}
      <div className="auth-header-band signup-header-band">
        <button
          className="auth-back-btn"
          id="btn-back-signup"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>
        <h1 className="auth-title">Create your<br />PopX account</h1>
      </div>

      {/* ── Scrollable Form ── */}
      <div className="signup-scroll-body">
        <form onSubmit={handleSubmit} noValidate>
          {/* Full Name */}
          <div className="input-group">
            <label htmlFor="signup-name">
              Full Name <span className="required">*</span>
            </label>
            <input
              id="signup-name"
              type="text"
              name="fullName"
              placeholder="Enter full name"
              value={form.fullName}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="name"
            />
            {touched.fullName && errors.fullName && (
              <span className="error-text">{errors.fullName}</span>
            )}
          </div>

          {/* Phone */}
          <div className="input-group">
            <label htmlFor="signup-phone">
              Phone Number <span className="required">*</span>
            </label>
            <input
              id="signup-phone"
              type="tel"
              name="phone"
              placeholder="Enter phone number"
              value={form.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="tel"
            />
            {touched.phone && errors.phone && (
              <span className="error-text">{errors.phone}</span>
            )}
          </div>

          {/* Email */}
          <div className="input-group">
            <label htmlFor="signup-email">
              Email Address <span className="required">*</span>
            </label>
            <input
              id="signup-email"
              type="email"
              name="email"
              placeholder="Enter email address"
              value={form.email}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="email"
            />
            {touched.email && errors.email && (
              <span className="error-text">{errors.email}</span>
            )}
          </div>

          {/* Password */}
          <div className="input-group">
            <label htmlFor="signup-password">
              Password <span className="required">*</span>
            </label>
            <input
              id="signup-password"
              type="password"
              name="password"
              placeholder="Enter password (min 6 chars)"
              value={form.password}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="new-password"
            />
            {touched.password && errors.password && (
              <span className="error-text">{errors.password}</span>
            )}
          </div>

          {/* Company (optional) */}
          <div className="input-group">
            <label htmlFor="signup-company">
              Company Name
              <span className="optional-badge">Optional</span>
            </label>
            <input
              id="signup-company"
              type="text"
              name="company"
              placeholder="Enter company name"
              value={form.company}
              onChange={handleChange}
              autoComplete="organization"
            />
          </div>

          {/* Agency Radio */}
          <div className="radio-group">
            <span className="radio-group-label">Are you an Agency?</span>
            <div className="radio-options">
              {['yes', 'no'].map((val) => (
                <label key={val} className="radio-option" htmlFor={`agency-${val}`}>
                  <input
                    id={`agency-${val}`}
                    type="radio"
                    name="isAgency"
                    value={val}
                    checked={form.isAgency === val}
                    onChange={handleChange}
                  />
                  {val.charAt(0).toUpperCase() + val.slice(1)}
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            id="btn-signup-submit"
            className={`btn btn-primary ${isFormReady ? 'active-btn' : ''}`}
            disabled={!isFormReady}
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;

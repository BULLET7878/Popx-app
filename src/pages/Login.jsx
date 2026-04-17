import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors]     = useState({});
  const [touched, setTouched]   = useState({});

  const isEmailValid    = formData.email.includes('@') && formData.email.length > 4;
  const isPasswordValid = formData.password.length >= 6;
  const isFormReady     = isEmailValid && isPasswordValid;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // clear error on type
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    validate(name);
  };

  const validate = (field) => {
    const newErrors = { ...errors };
    if (field === 'email') {
      newErrors.email = !formData.email
        ? 'Email is required.'
        : !formData.email.includes('@')
        ? 'Please enter a valid email address.'
        : '';
    }
    if (field === 'password') {
      newErrors.password = !formData.password
        ? 'Password is required.'
        : formData.password.length < 6
        ? 'Password must be at least 6 characters.'
        : '';
    }
    setErrors(newErrors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Force-validate all fields
    setTouched({ email: true, password: true });
    validate('email');
    validate('password');
    if (isFormReady) {
      navigate('/profile');
    }
  };

  return (
    <div className="page auth-page">
      {/* ── Header Band ── */}
      <div className="auth-header-band">
        <button
          className="auth-back-btn"
          id="btn-back-login"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>
        <h1 className="auth-title">Signin to your<br />PopX account</h1>
        <p className="auth-subtitle">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
      </div>

      {/* ── Form Body ── */}
      <div className="auth-form-body">
        <form onSubmit={handleSubmit} noValidate>
          {/* Email */}
          <div className="input-group">
            <label htmlFor="login-email">
              Email Address <span className="required">*</span>
            </label>
            <input
              id="login-email"
              type="email"
              name="email"
              placeholder="Enter email address"
              value={formData.email}
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
            <label htmlFor="login-password">
              Password <span className="required">*</span>
            </label>
            <input
              id="login-password"
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="current-password"
            />
            {touched.password && errors.password && (
              <span className="error-text">{errors.password}</span>
            )}
          </div>

          <div className="form-spacer" />

          <button
            type="submit"
            id="btn-login-submit"
            className={`btn btn-primary ${isFormReady ? 'active-btn' : ''}`}
            disabled={!isFormReady}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;

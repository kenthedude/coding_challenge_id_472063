import React, { useState } from 'react';
import { loginUser } from '../../../services/axios/auth.axios';
import './login.css';

interface LoginFormData {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormData>({ email: '', password: '' });
  const [error, setError] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError('Both fields are required.');
      return;
    }

    const response = await loginUser(formData.email, formData.password);
    switch (response) {
      case 200:
        // Redirect to login
        break;
      case 401:
        setError('Invalid Credentials');
        break;
      default:
        setError('There was an error during your process, please try again');
        break;
    }
  };

  return (
    <div className="login-form-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        {error && <p className="error">{error}</p>}

        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;

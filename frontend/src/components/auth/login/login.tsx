import React, { useState } from 'react';
import { jwtDecode, type JwtPayload } from "jwt-decode";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setToken } from '../../../features/auth/authSlice';
import { loginUser } from '../../../services/axios/auth.axios';
import RegisterModal from './register-modal/register-modal';
import './login.css';

interface LoginFormData {
  email: string;
  password: string;
}

interface JwtDecoded extends JwtPayload {
  id: string;
  name: string;
  email: string;
}

const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormData>({ email: '', password: '' });
  const [error, setError] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError('Both fields are required.');
      return;
    }

    const response = await loginUser({ email: formData.email, password: formData.password });

    if (response.status === 200) {
      const jwt = response.jwt as string;
      const name: JwtDecoded = jwtDecode(jwt);
      dispatch(setToken({ token: jwt, name: name.name, email: formData.email }));
      navigate('/home');
      return;
    }

    const invalidCredentials = 'Invalid Credentials';
    const internalError = 'There was an error during your process, please try again';

    setError(response.status === 401 ? invalidCredentials : internalError);
  };

  return (
    <div className="container">
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
      <div className="register-container">
        <div className="register-content">
          <h2>Don't have an user?</h2>
          <button onClick={openModal}>Register!</button>
        </div>
      </div>
      <RegisterModal isOpen={isModalOpen} closeModal={closeModal} />
    </div>
  );
};

export default LoginForm;

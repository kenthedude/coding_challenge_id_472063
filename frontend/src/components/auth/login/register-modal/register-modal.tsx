import React, { useState } from 'react';
import './register-modal.css';
import { registerUser } from '../../../../services/axios/auth.axios';
import type { CommonResponse } from '../../../../types/common.types';
import type { AxiosResponse } from 'axios';

interface RegisterModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

const RegisterModal: React.FC<RegisterModalProps> = ({ isOpen, closeModal }) => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      setError('All fields are required.');
      return;
    }

    try {
      const response = await registerUser(formData.username, formData.email, formData.password);
      if (response.status === 200 && response.data.success) {
        closeModal();
      } else {
        const errorMessage = response.status === 400 ? 'Duplicated email found' : 'Server error';
        setError(errorMessage);
        console.error('Server error:', error);
      }
    } catch (error) {
      const knownError = error as AxiosResponse<CommonResponse, string>;
      const errorMessage = knownError.status === 400 ? 'Duplicated email found' : 'Server error';
      setError(errorMessage);
      console.error('Server error:', error);
    }
  };

  return (
    isOpen ? (
      <div className="modal-overlay">
        <div className="modal-content">
          <h2>Register</h2>
          {error && <p className="error">{error}</p>}
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
            />
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
            <button className="submit-btn" type="submit">Register</button>
            <button className="close-btn" onClick={closeModal}>Close</button>
          </form>
        </div>
      </div>
    ) : null
  );
};

export default RegisterModal;

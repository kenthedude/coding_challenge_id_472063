import React from 'react';
import './register-modal.css';
import { registerUser } from '../../../../services/axios/auth.axios';
import useModalHandler from '../../../../hooks/useModalHandler';

interface RegisterModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

const RegisterModal: React.FC<RegisterModalProps> = ({ isOpen, closeModal }) => {
  const data = {
    username: '',
    email: '',
    password: ''
  }
  const { formData, error, handleSubmit, handleChange } = useModalHandler(closeModal, data, registerUser);

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

import React from 'react';
import { registerUser } from '../../../services/axios/auth.axios';
import useModalHandler from '../../../hooks/useModalHandler';
import './edit-modal.css';

interface CreateModalProps {
  data: any, // eslint-disable-line
  isOpen: boolean;
  closeModal: () => void;
  fetchTasks: () => void;
}

const EditModal: React.FC<CreateModalProps> = ({ data, isOpen, closeModal, fetchTasks }) => {
  const { formData, error, handleSubmit, handleChange } = useModalHandler(closeModal, data, registerUser, fetchTasks);

  return (
    isOpen ? (
      <div className="modal-overlay">
        <div className="modal-content">
          <h2>Edit Changes of task {data.title}</h2>
          {error && <p className="error">{error}</p>}
          <form onSubmit={handleSubmit}>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              defaultValue={formData.title}
            />
            <label htmlFor="description">Description</label>
            <input
              type="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              defaultValue={formData.description}
            />
            <label htmlFor="Completed">Completed</label>
            <input
              type="checkbox"
              name="completed"
              value={formData.completed}
              onChange={handleChange}
              defaultValue={formData.completed}
            />
            <button className="submit-btn" type="submit">Save Changes</button>
            <button className="close-btn" onClick={closeModal}>Discard Changes</button>
          </form>
        </div>
      </div>
    ) : null
  );
};

export default EditModal;

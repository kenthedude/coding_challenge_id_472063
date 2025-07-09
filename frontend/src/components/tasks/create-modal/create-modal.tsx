import React from 'react';
import { postTask } from '../../../services/axios/tasks.axios';
import useModalHandler from '../../../hooks/useModalHandler';
import './create-modal.css';

interface CreateModalProps {
  isOpen: boolean;
  closeModal: () => void;
  fetchTasks: () => void;
}

const CreateModal: React.FC<CreateModalProps> = ({ isOpen, closeModal, fetchTasks }) => {
  const defaultData = {
    title: '',
    description: '',
    priority: 'low',
    dueDate: '',
  }
  const {
    formData,
    error,
    handleSubmit,
    handleChange,
    handleDateChange,
    handleSelectChange,
  } = useModalHandler(closeModal, defaultData, postTask, fetchTasks);

  return (
    isOpen ? (
      <div className="modal-overlay">
        <div className="modal-content">
          <h2>Create a new task</h2>
          {error && <p className="error">{error}</p>}
          <form onSubmit={handleSubmit}>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title.toString()}
              onChange={handleChange}
              placeholder={'Write your title here'}
            />
            <label htmlFor="description">Description</label>
            <input
              type="text"
              name="description"
              value={formData.description.toString()}
              onChange={handleChange}
              placeholder={'You can write an optional placeholder here'}
            />
            <label htmlFor="priority">Priority</label>
            <select
              name="priority"
              id="priority"
              value={formData.priority.toString()}
              onChange={handleSelectChange}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <label htmlFor="dueDate">Due Date</label>
            <input
              type="date"
              name="dueDate"
              value={formData.dueDate.toString().split('T')[0]}
              onChange={handleDateChange}
            />
            <button className="submit-btn" type="submit">Save Changes</button>
            <button className="close-btn" onClick={closeModal}>Discard Changes</button>
          </form>
        </div>
      </div>
    ) : null
  );
};

export default CreateModal;

import React from 'react';
import { putTask } from '../../../services/axios/tasks.axios';
import useModalHandler from '../../../hooks/useModalHandler';
import './edit-modal.css';

interface CreateModalProps {
  data: any, // eslint-disable-line
  isOpen: boolean;
  closeModal: () => void;
  fetchTasks: () => void;
}

const EditModal: React.FC<CreateModalProps> = ({ data, isOpen, closeModal, fetchTasks }) => {
  const {
    formData,
    error,
    handleSubmit,
    handleChange,
    handleSelectChange,
    handleDateChange,
    handleBooleanChange,
    handleChangeInParams
  } = useModalHandler(closeModal, data, putTask, fetchTasks);
  if (formData?._id !== data?._id) { handleChangeInParams(data) }
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
              value={formData.title.toString()}
              onChange={handleChange}
            />
            <label htmlFor="description">Description</label>
            <input
              type="description"
              name="description"
              value={formData.description.toString()}
              onChange={handleChange}
            />
            <label htmlFor="Completed">Completed</label>
            <input
              type="checkbox"
              name="completed"
              value={formData.completed.toString()}
              onChange={handleBooleanChange}
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
              value={formData.dueDate?.toString().split('T')[0] || ''}
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

export default EditModal;

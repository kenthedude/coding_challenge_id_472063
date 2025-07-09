import React from 'react';
import './delete-modal.css';
import { deleteTask } from '../../../services/axios/tasks.axios';

interface RegisterModalProps {
  isOpen: boolean;
  taskId: string;
  closeModal: () => void;
  refreshTasks: () => void;
}

const DeleteModal: React.FC<RegisterModalProps> = ({ isOpen, closeModal, taskId, refreshTasks }) => {
  const deleteSelectedTask = async () => {
    try {
      const response = await deleteTask({ stringRequest: taskId });
      if (response.status === 200 && response.data.success) {
        refreshTasks();
        closeModal();
      } else {
        console.error('Server error: ', response.data.error);
      }
    } catch (error) {
      console.error('Server error:', error);
    }
  };

  return (
    isOpen ? (
      <div className="modal-overlay">
        <div className="modal-content">
          <h2>Are you sure you want to delete this task?</h2>
          <button className="delete-btn" onClick={deleteSelectedTask}>Delete</button>
          <button className="close-btn" onClick={closeModal}>Close</button>
        </div>
      </div>
    ) : null
  );
};

export default DeleteModal;

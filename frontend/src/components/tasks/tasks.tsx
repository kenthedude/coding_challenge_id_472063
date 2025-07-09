import React, { useState } from 'react';
import Table from '../common/table/table';
import DeleteModal from './delete-modal/delete-modal';
import CreateModal from './create-modal/create-modal';
import EditModal from './edit-modal/edit-modal';
import useFetchTasks from '../../hooks/useFetchTasks';
import './tasks.css';

const Tasks: React.FC = () => {
  const [selectedTaskIndex, setSelectedTaskIndex] = useState<number>(0);
  const [isOpenEditModal, setIsOpenEditModal] = useState<boolean>(false);
  const [isOpenCreateModal, setIsOpenCreateModal] = useState<boolean>(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const { tasks, totalTasks, error, loading, fetchTasks } = useFetchTasks(page, size);

  const headers = ['title', 'description', 'completed', 'priority', 'dueDate', 'createdAt', 'updatedAt', 'actions'];

  const handleSelect = (option: string, taskIndex: number) => {
    setSelectedTaskIndex(taskIndex);
    if (option === 'Edit') {
      setIsOpenEditModal(true);
      return;
    }
    setIsOpenDeleteModal(true);
  };

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>{error}</div>
  }

  return (
    <div>
      <button
        className='create-task-btn'
        onClick={() => setIsOpenCreateModal(true)}
      >
        CreateModal
      </button>
      <CreateModal
        isOpen={isOpenCreateModal}
        closeModal={() => setIsOpenCreateModal(false)}
        fetchTasks={fetchTasks}
      />
      <DeleteModal
        isOpen={isOpenDeleteModal}
        taskId={tasks[selectedTaskIndex]?._id || ''}
        closeModal={() => setIsOpenDeleteModal(false)}
        refreshTasks={fetchTasks}
      />
      <EditModal
        isOpen={isOpenEditModal}
        data={tasks[selectedTaskIndex]}
        closeModal={() => setIsOpenEditModal(false)}
        fetchTasks={fetchTasks}
      />
      <Table
        columns={headers}
        data={tasks}
        page={page}
        size={size}
        total={totalTasks}
        handleSelect={handleSelect}
      />
    </div>
  );
};

export default Tasks;

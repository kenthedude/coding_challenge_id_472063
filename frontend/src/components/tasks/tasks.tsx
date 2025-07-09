import React, { useEffect, useState } from 'react';
import Table from '../common/table/table';
import DeleteModal from './delete-modal/delete-modal';
import type { Task } from '../../types/tasks.types';
import { getTasks } from '../../services/axios/tasks.axios';

const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [fetchError, setFetchError] = useState<string>('');
  const [totalTasks, setTotalTasks] = useState<number>(0);
  const [selectedTaskId, setSelectedTaskId] = useState<string>('');
  const [isOpenEditModal, setIsOpenEditModal] = useState<boolean>(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);

  const [loading, setLoading] = useState<boolean>(true);
  const headers = ['title', 'description', 'completed', 'priority', 'dueDate', 'userId', 'createdAt', 'updatedAt', 'actions'];

  useEffect(() => { fetchTasks(); }, []);

  const handleSelect = (option: string, taskId: string) => {
    setSelectedTaskId(taskId);
    if (option === 'Edit') {
      setIsOpenEditModal(true);
      return;
    }
    setIsOpenDeleteModal(true);
  };

  const closeDeleteModal = () => setIsOpenDeleteModal(false);

  const fetchTasks = async () => {
    try {
      const response = await getTasks(page, size);
      if (response.status === 200) {
        setTasks(response.data.data.items);
        setTotalTasks(response.data.data.totalItems);
      }
    } catch (error) {
      console.error('Server error:', error);
      setFetchError('There was a problem loading your tasks, please try again later by reloading the page');
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (fetchError) {
    return <div>{fetchError}</div>
  }

  return (
    <div>
      <DeleteModal
        isOpen={isOpenDeleteModal}
        taskId={selectedTaskId}
        closeModal={closeDeleteModal}
        refreshTasks={fetchTasks}
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

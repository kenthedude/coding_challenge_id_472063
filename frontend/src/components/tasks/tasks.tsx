import React, { useEffect, useState } from 'react';
import { getTasks } from '../../services/axios/tasks.axios';
import type { Task } from '../../types/tasks.types';
import Table from '../common/table/table';

const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [fetchError, setFetchError] = useState<string>('');
  const [totalTasks, setTotalTasks] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);

  const [loading, setLoading] = useState<boolean>(true);
  const headers = ['title', 'description', 'completed', 'priority', 'dueDate', 'userId', 'createdAt', 'updatedAt'];

  useEffect(() => { fetchTasks(); }, []);

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
      <Table
        columns={headers}
        data={tasks}
        page={page}
        size={size}
        total={totalTasks}
      />
    </div>
  );
};

export default Tasks;

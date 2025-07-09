import { useEffect, useState } from "react"
import { getTasks } from "../services/axios/tasks.axios"
import { type Task } from "../types/tasks.types"


export default function useFetchTasks(page: number, size: number) {
  const [tasks, setTasks] = useState<Task[]>([])
  const [totalTasks, setTotalTasks] = useState(0)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => { fetchTasks(); }, []);

  const fetchTasks = async () => {
    try {
      const response = await getTasks({ page, size });
      if (response.status === 200) {
        setTasks(response.data.data.items);
        setTotalTasks(response.data.data.totalItems);
      }
    } catch (error) {
      console.error('Server error:', error);
      setError('There was a problem loading your tasks, please try again later by reloading the page');
    } finally {
      setLoading(false);
    }
  }

  return { tasks, totalTasks, error, loading, fetchTasks }
}

import type { AxiosResponse } from "axios";
import React, { useState } from "react";
import type { CommonResponse } from "../types/common.types";

export default function useModalHandler(
  closeModal: () => void,
  params: { [key: string]: string },
  axiosCall: (request: any) => Promise<AxiosResponse<CommonResponse, string>>, // eslint-disable-line
  fetchTasks?: () => void
) {
  const [formData, setFormData] = useState({ ...params });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = new Date(e.target.value).toISOString();
    setFormData({ ...formData, [e.target.name]: date });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axiosCall(formData);
      if (response.status === 200 && response.data.success) {
        if (fetchTasks) { fetchTasks(); }
        closeModal();
      } else {
        const errorMessage = response.status === 400 ? 'Bad Parameters' : 'Server error';
        setError(errorMessage);
        console.error('Server error:', error);
      }
    } catch (error) {
      const knownError = error as AxiosResponse<CommonResponse, string>;
      const errorMessage = knownError.status === 400 ? 'Bad Parameters' : 'Server error';
      setError(errorMessage);
      console.error('Server error:', error);
    }
  };

  return { formData, error, handleChange, handleDateChange, handleSelectChange, handleSubmit }
}


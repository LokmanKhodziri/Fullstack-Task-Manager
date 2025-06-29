'use client';

import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import styled from 'styled-components';
import { useGlobalState } from '@/app/context/globalContextProvider';

interface Props {
  onClose: () => void;
  onTaskCreated?: () => void;
}

function CreateContent({ onClose, onTaskCreated }: Props) {
  const { theme } = useGlobalState();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [completed, setCompleted] = useState(false);
  const [important, setImportant] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (name: string) => (e: any) => {
    const value =
      e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    switch (name) {
      case 'title':
        setTitle(e.target.value);
        break;
      case 'description':
        setDescription(e.target.value);
        break;
      case 'date':
        setDate(e.target.value);
        break;
      case 'completed':
        setCompleted(e.target.checked);
        break;
      case 'important':
        setImportant(e.target.checked);
        break;
      default:
        break;
    }
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setDate('');
    setCompleted(false);
    setImportant(false);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // Validate required fields
    if (!title || !description || !date) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (title.length < 3) {
      toast.error('Title must be at least 3 characters long');
      return;
    }

    setIsSubmitting(true);

    const task = {
      title,
      description,
      date,
      completed,
      important,
    };

    try {
      const res = await axios.post('/api/tasks', task);

      if (res.data.error) {
        toast.error(res.data.error);
        return;
      }

      toast.success('Task Created Successfully!');
      resetForm();
      onClose(); // Close the modal

      // Refresh the task list by triggering a page reload or context update
      if (onTaskCreated) {
        onTaskCreated();
      }
    } catch (error: any) {
      console.error('Error creating task:', error);
      toast.error(error.response?.data?.error || 'Something went wrong!');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormStyled theme={theme} onSubmit={handleSubmit}>
      <h1>Create New Task</h1>

      <div className="input-control">
        <label htmlFor="title">Title *</label>
        <input
          type="text"
          id="title"
          value={title}
          name="title"
          placeholder="Enter task title"
          onChange={handleChange('title')}
          required
        />
      </div>

      <div className="input-control">
        <label htmlFor="description">Description *</label>
        <textarea
          name="description"
          id="description"
          value={description}
          rows={4}
          placeholder="Enter task description"
          onChange={handleChange('description')}
          required
        />
      </div>

      <div className="input-control">
        <label htmlFor="date">Due Date *</label>
        <input
          type="date"
          id="date"
          value={date}
          name="date"
          onChange={handleChange('date')}
          required
        />
      </div>

      <div className="checkbox-control">
        <label htmlFor="completed">
          <input
            type="checkbox"
            id="completed"
            checked={completed}
            onChange={handleChange('completed')}
          />
          Mark as Completed
        </label>
      </div>

      <div className="checkbox-control">
        <label htmlFor="important">
          <input
            type="checkbox"
            id="important"
            checked={important}
            onChange={handleChange('important')}
          />
          Mark as Important
        </label>
      </div>

      <div className="submit-btn">
        <button type="button" onClick={onClose} disabled={isSubmitting}>
          Cancel
        </button>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Creating...' : 'Create Task'}
        </button>
      </div>
    </FormStyled>
  );
}

const FormStyled = styled.form`
  h1 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
    color: ${(props) => props.theme.colorGrey0};
  }

  .input-control {
    margin-bottom: 1rem;

    label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 500;
      color: ${(props) => props.theme.colorGrey0};
    }

    input,
    textarea {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid ${(props) => props.theme.borderColor2};
      border-radius: 0.5rem;
      background-color: ${(props) => props.theme.colorBg};
      color: ${(props) => props.theme.colorGrey0};
      font-size: 0.9rem;

      &:focus {
        outline: none;
        border-color: ${(props) => props.theme.colorPrimaryGreen};
      }

      &::placeholder {
        color: ${(props) => props.theme.colorGrey2};
      }
    }

    textarea {
      resize: vertical;
      min-height: 100px;
    }
  }

  .checkbox-control {
    margin-bottom: 1rem;

    label {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      cursor: pointer;
      color: ${(props) => props.theme.colorGrey0};
      font-weight: 500;

      input[type='checkbox'] {
        width: auto;
        margin: 0;
      }
    }
  }

  .submit-btn {
    display: flex;
    gap: 1rem;
    margin-top: 2rem;

    button {
      flex: 1;
      padding: 0.75rem 1rem;
      border: none;
      border-radius: 0.5rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;

      &:first-child {
        background-color: ${(props) => props.theme.colorGrey5};
        color: ${(props) => props.theme.colorGrey0};

        &:hover:not(:disabled) {
          background-color: ${(props) => props.theme.colorGrey4};
        }
      }

      &:last-child {
        background-color: ${(props) => props.theme.colorPrimaryGreen};
        color: white;

        &:hover:not(:disabled) {
          background-color: ${(props) => props.theme.colorGreenDark};
        }
      }

      &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }
    }
  }
`;

export default CreateContent;

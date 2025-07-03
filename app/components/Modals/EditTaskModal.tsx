import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Modal from './Modal';
import { useGlobalState } from '@/app/context/globalContextProvider';

interface EditTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: {
    id: string;
    title?: string;
    description: string;
    date: string;
    isCompleted?: boolean;
    isImportant?: boolean;
  };
  onSubmit: (
    id: string,
    updates: {
      title: string;
      description: string;
      date: string;
      isCompleted?: boolean;
      isImportant?: boolean;
    }
  ) => Promise<void>;
}

const EditTaskModal: React.FC<EditTaskModalProps> = ({
  isOpen,
  onClose,
  task,
  onSubmit,
}) => {
  const { theme } = useGlobalState();
  const [title, setTitle] = useState(task.title || '');
  const [description, setDescription] = useState(task.description);
  const [date, setDate] = useState(task.date);
  const [isCompleted, setIsCompleted] = useState(task.isCompleted || false);
  const [isImportant, setIsImportant] = useState(task.isImportant || false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setTitle(task.title || '');
    setDescription(task.description);
    setDate(task.date);
    setIsCompleted(task.isCompleted || false);
    setIsImportant(task.isImportant || false);
  }, [task]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await onSubmit(task.id, {
      title,
      description,
      date,
      isCompleted,
      isImportant,
    });
    setIsSubmitting(false);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <EditFormStyled onSubmit={handleSubmit} theme={theme}>
        <h1>Edit Task</h1>
        <div className="input-control">
          <label htmlFor="edit-title">Title *</label>
          <input
            type="text"
            id="edit-title"
            value={title}
            name="title"
            placeholder="Enter task title"
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="input-control">
          <label htmlFor="edit-description">Description *</label>
          <textarea
            name="description"
            id="edit-description"
            value={description}
            rows={4}
            placeholder="Enter task description"
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="input-control">
          <label htmlFor="edit-date">Due Date *</label>
          <input
            type="date"
            id="edit-date"
            value={date}
            name="date"
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div className="checkbox-control">
          <label htmlFor="edit-completed">
            <input
              type="checkbox"
              id="edit-completed"
              checked={isCompleted}
              onChange={(e) => setIsCompleted(e.target.checked)}
            />
            Mark as Completed
          </label>
        </div>
        <div className="checkbox-control">
          <label htmlFor="edit-important">
            <input
              type="checkbox"
              id="edit-important"
              checked={isImportant}
              onChange={(e) => setIsImportant(e.target.checked)}
            />
            Mark as Important
          </label>
        </div>
        <div className="submit-btn">
          <button type="button" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </button>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </EditFormStyled>
    </Modal>
  );
};

const EditFormStyled = styled.form`
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
      }

      &:last-child {
        background-color: ${(props) => props.theme.colorPrimaryGreen};
        color: #fff;
      }

      &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }
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
`;

export default EditTaskModal;

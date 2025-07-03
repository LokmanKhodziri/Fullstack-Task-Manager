'use client';

import { useGlobalState } from '@/app/context/globalContextProvider';
import { edit, trash } from '@/app/utils/Icons';
import { formatDate } from '@/app/utils/formatDate';
import React, { useState } from 'react';
import styled from 'styled-components';
import EditTaskModal from '@/app/components/Modals/EditTaskModal';
import { FaStar } from 'react-icons/fa';

interface Props {
  title?: string;
  description: string;
  date: string;
  isCompleted: boolean;
  important?: boolean;
  id: string;
}

function TaskItem({
  title,
  description,
  date,
  isCompleted,
  important,
  id,
}: Props) {
  const { theme, deleteTask, updateTask, editTask, tasks } = useGlobalState();
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Find the latest task data from global state
  const latestTask = tasks.find((t) => t.id === id) || {
    id,
    title,
    description,
    date,
    isCompleted,
    isImportant: important,
  };

  const handleEditSubmit = async (
    id: string,
    updates: { title: string; description: string; date: string }
  ) => {
    setIsSubmitting(true);
    await editTask(id, updates);
    setIsSubmitting(false);
    setIsEditing(false);
  };

  return (
    <TaskItemStyled theme={theme}>
      <EditTaskModal
        isOpen={isEditing}
        onClose={() => setIsEditing(false)}
        task={latestTask}
        onSubmit={handleEditSubmit}
      />
      <h2
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {title}
        {latestTask.isImportant && (
          <FaStar
            style={{ color: '#f1c40f', marginLeft: 8, fontSize: '1.2em' }}
            title="Important"
          />
        )}
      </h2>
      <p>{description}</p>
      <div className="date">{formatDate(date)}</div>
      <div className="task-footer">
        {isCompleted ? (
          <button
            className="completed"
            onClick={() => {
              updateTask(id, false);
            }}
          >
            Completed
          </button>
        ) : (
          <button
            className="not-completed"
            onClick={() => updateTask(id, true)}
          >
            Not Completed
          </button>
        )}
        <button className="edit" onClick={() => setIsEditing(true)}>
          {edit}
        </button>
        <button
          className="delete"
          onClick={() => {
            deleteTask(id);
          }}
        >
          {trash}
        </button>
      </div>
    </TaskItemStyled>
  );
}

const TaskItemStyled = styled.div`
  padding: 1.2rem 1rem;
  border-radius: 0.8rem;
  background-color: ${(props) => props.theme.borderColor2};
  box-shadow: ${(props) => props.theme.shadow7};
  border: 1px solid ${(props) => props.theme.borderColor2};
  height: 16rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  .date {
    margin-top: auto;
  }

  > h1 {
    font-size: 1.5rem;
    font-weight: 600;
  }

  .task-footer {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    button {
      border: none;
      outline: none;
      cursor: pointer;

      i {
        font-size: 1.4rem;
        color: ${(props) => props.theme.colorGrey2};
      }
    }

    button.edit {
      margin-left: auto;
    }

    .completed,
    .not-completed {
      display: inline-block;
      padding: 0.4rem 1rem;
      border-radius: 30px;
      background-color: ${(props) => props.theme.colorDanger};
    }

    .completed {
      background-color: ${(props) => props.theme.colorGreenDark};
    }
  }
`;

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
`;

export default TaskItem;

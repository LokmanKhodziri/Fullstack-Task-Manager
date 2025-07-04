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
  padding: 1.5rem 1.2rem;
  border-radius: 1rem;
  background-color: ${(props) => props.theme.borderColor2};
  box-shadow: ${(props) => props.theme.shadow7};
  border: 1px solid ${(props) => props.theme.borderColor2};
  min-height: 15rem;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  margin-bottom: 1.2rem;

  > h1,
  > h2 {
    font-size: 1.35rem;
    font-weight: 700;
    word-break: break-word;
    margin-bottom: 0.2rem;
    color: ${(props) => props.theme.colorGrey0};
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
  }

  p {
    word-break: break-word;
    font-size: 1.05rem;
    color: ${(props) => props.theme.colorGrey2};
    margin-bottom: 0.2rem;
  }

  .date {
    margin-top: 0.2rem;
    font-size: 0.98rem;
    color: ${(props) => props.theme.colorGrey3};
    word-break: break-word;
  }

  .task-footer {
    display: flex;
    align-items: center;
    gap: 0.7rem;
    flex-wrap: wrap;
    margin-top: auto;
    width: 100%;
    justify-content: flex-start;

    button {
      border: none;
      outline: none;
      cursor: pointer;
      min-width: 40px;
      min-height: 38px;
      font-size: 1.08rem;
      padding: 0.45rem 1.1rem;
      border-radius: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.4rem;
      transition:
        background 0.2s,
        color 0.2s,
        box-shadow 0.2s;
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
      margin-bottom: 0;
    }

    button.edit {
      background: #1e90ff22;
      color: #1e90ff;
      border: 1.5px solid #1e90ff44;
      padding: 0.45rem 0.7rem;
      font-size: 1.15rem;
    }
    button.edit:hover {
      background: #1e90ff44;
      color: #fff;
    }

    button.delete {
      background: #ff222222;
      color: #ff2222;
      border: 1.5px solid #ff222244;
      padding: 0.45rem 0.7rem;
      font-size: 1.15rem;
    }
    button.delete:hover {
      background: #ff222244;
      color: #fff;
    }

    .completed,
    .not-completed {
      font-weight: 600;
      border: 1.5px solid #2ecc4044;
      color: #2ecc40;
      background: #2ecc4022;
      flex: 1 1 120px;
      min-width: 120px;
      justify-content: center;
      font-size: 1.08rem;
      padding: 0.45rem 0.7rem;
    }
    .completed {
      background-color: ${(props) => props.theme.colorGreenDark};
      color: #fff;
      border: 1.5px solid #2ecc40;
    }
    .not-completed {
      background: #b0b0b0;
      color: #fff;
      border: 1.5px solid #b0b0b0;
    }
  }

  @media (max-width: 900px) {
    min-height: 12rem;
    padding: 1.1rem 0.7rem;
    border-radius: 0.8rem;
    > h1,
    > h2 {
      font-size: 1.08rem;
    }
    p {
      font-size: 0.98rem;
    }
    .date {
      font-size: 0.85rem;
    }
  }

  @media (max-width: 600px) {
    width: 100%;
    min-width: 0;
    max-width: 100vw;
    margin-bottom: 1rem;
    padding: 0.7rem 0.5rem;
    border-radius: 0.6rem;
    box-shadow: ${(props) => props.theme.shadow7};
    > h1,
    > h2 {
      font-size: 1.1rem;
      gap: 0.3rem;
    }
    p {
      font-size: 0.95rem;
    }
    .date {
      font-size: 0.82rem;
    }
    .task-footer {
      flex-direction: row;
      align-items: center;
      gap: 0.7rem;
      margin-top: 0.7rem;
      button.edit,
      button.delete,
      .completed,
      .not-completed {
        width: auto;
        min-width: 0;
        font-size: 1.08rem;
        padding: 0.7rem 0.7rem;
        border-radius: 0.6rem;
        margin-bottom: 0;
        justify-content: center;
      }
      button {
        font-size: 1.15rem;
        min-height: 48px;
      }
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

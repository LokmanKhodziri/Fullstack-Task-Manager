'use client';

import { useGlobalState } from '@/app/context/globalContextProvider';
import React, { useState } from 'react';
import styled from 'styled-components';
import TaskItem from '../TaskItem/TaskItem';
import { plus } from '@/app/utils/Icons';
import Modal from '../Modals/Modal';
import CreateContent from '../Modals/CreateContent';
import { FaPlus } from 'react-icons/fa';

interface Props {
  title?: string;
  tasks?: any[];
}

function Tasks({ title, tasks }: Props) {
  const { theme, isLoading, allTasks } = useGlobalState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const safeTasks = Array.isArray(tasks) ? tasks : [];

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleTaskCreated = () => {
    // Refresh the task list
    if (allTasks) {
      allTasks();
    }
  };

  return (
    <TaskStyled theme={theme}>
      <div className="tasks-header">
        <h1>{title}</h1>
        <AddTaskButton onClick={openModal} aria-label="Add New Task">
          <FaPlus />
        </AddTaskButton>
      </div>
      {!isLoading ? (
        <div className="tasks grid">
          {safeTasks.length > 0 ? (
            safeTasks.map((task) => (
              <TaskItem
                key={task.id}
                title={task.title}
                description={task.description}
                date={task.date}
                isCompleted={task.isCompleted}
                id={task.id}
              />
            ))
          ) : (
            <p>No tasks available</p>
          )}
        </div>
      ) : (
        <div className="tasks-loader w-full h-full flex items-center justify-center">
          <span className="loader">Loading...</span>
        </div>
      )}

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <CreateContent onClose={closeModal} onTaskCreated={handleTaskCreated} />
      </Modal>
    </TaskStyled>
  );
}

const AddTaskButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #1e90ff;
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 1.3rem;
  margin-left: auto;
  margin-right: 0.2rem;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(30, 144, 255, 0.1);
  transition:
    background 0.2s,
    color 0.2s,
    box-shadow 0.2s;
  &:hover {
    background: #156dc1;
    color: #fff;
    box-shadow: 0 4px 16px rgba(30, 144, 255, 0.18);
  }
`;

const TaskStyled = styled.main`
  width: 100%;
  background-color: ${(props) => props.theme.colorBg2};
  border: 2px solid ${(props) => props.theme.borderColor2};
  border-radius: 1rem;
  padding: 2rem;
  overflow-y: auto;
  height: 100%;
  margin: 0 auto;

  .tasks-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.5rem;
    gap: 0.5rem;
  }

  &::-webkit-scrollbar {
    width: 0.5rem;
  }

  .tasks {
    margin: 2rem 0;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 1.5rem;
    align-items: stretch;
  }

  @media (max-width: 1000px) {
    .tasks {
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    }
  }

  @media (max-width: 600px) {
    padding: 0.5rem 0.1rem;
    border-radius: 0.7rem;
    max-width: 100vw;
    .tasks-header {
      padding: 0.2rem 0.2rem 0.2rem 0.1rem;
      margin-bottom: 0.2rem;
    }
    .tasks {
      grid-template-columns: 1fr;
      gap: 1rem;
      margin: 1rem 0;
    }
    > h1 {
      font-size: 1.1rem;
      padding-left: 0.2rem;
      &::after {
        width: 2rem;
        height: 0.15rem;
      }
    }
    .create-task {
      font-size: 1rem;
      min-height: 3.2rem;
      padding: 0.7rem 0;
      border-radius: 0.6rem;
    }
  }

  > h1 {
    font-size: clamp(1.5rem, 2vw, 2rem);
    font-weight: 600;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      bottom: -0.5rem;
      left: 0;
      width: 3rem;
      height: 0.2rem;
      background-color: ${(props) => props.theme.colorPrimaryGreen};
      border-radius: 0.5rem;
    }
  }

  .create-task {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    min-height: 15rem;
    height: 100%;
    background: ${(props) => props.theme.borderColor2};
    color: ${(props) => props.theme.colorGrey2};
    font-weight: 600;
    cursor: pointer;
    border-radius: 1rem;
    border: 2.5px dashed ${(props) => props.theme.colorGrey5};
    box-shadow: ${(props) => props.theme.shadow7};
    font-size: 1.1rem;
    width: 100%;
    padding: 1.2rem 0.7rem;
    transition:
      background 0.2s,
      color 0.2s,
      border-color 0.2s,
      box-shadow 0.2s;
    text-align: center;
    svg {
      font-size: 2rem;
      color: #1e90ff;
      margin-bottom: 0.2rem;
    }
    &:hover {
      background-color: ${(props) => props.theme.colorGrey5};
      color: ${(props) => props.theme.colorGrey0};
      border-color: #1e90ff;
      box-shadow: 0 4px 16px rgba(30, 144, 255, 0.1);
    }
  }
`;

export default Tasks;

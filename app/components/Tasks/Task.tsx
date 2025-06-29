'use client';

import { useGlobalState } from '@/app/context/globalContextProvider';
import React, { useState } from 'react';
import styled from 'styled-components';
import TaskItem from '../TaskItem/TaskItem';
import { plus } from '@/app/utils/Icons';
import Modal from '../Modals/Modal';
import CreateContent from '../Modals/CreateContent';

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
      <h1>{title}</h1>
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

          <button className="create-task" onClick={openModal}>
            {plus}
            Add New Task
          </button>
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

const TaskStyled = styled.main`
  width: 100%;
  background-color: ${(props) => props.theme.colorBg2};
  border: 2px solid ${(props) => props.theme.borderColor2};
  border-radius: 1rem;
  padding: 2rem;
  overflow-y: auto;
  height: 100%;

  &::-webkit-scrollbar {
    width: 0.5rem;
  }

  .tasks {
    margin: 2rem 0;
  }

  > h1 {
    font-size: clamp(1.5rem, 2vw, 2rem);
    font-weight: 600;
    positoin: relative;

    &::after {
      content: '';
      position: absolute;
      bottom: -0.5rem;
      left: 0;
      width: 3 rem;
      height: 0.2rem;
      background-color: ${(props) => props.theme.colorPrimaryGreen};
      border-radius: 0.5rem;
    }
  }

  .create-task{
    display: flexl
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    height: 16rem;
    color: ${(props) => props.theme.colorGrey2};
    font-weight: 600;
    cursor: pointer;
    border-radius: 1rem;
    border: 3px dashed ${(props) => props.theme.colorGrey5};
    transition: all 0.3s ease;

    &:hover {
      background-color: ${(props) => props.theme.colorGrey5};
      color: ${(props) => props.theme.colorGrey0};
    }
  }
`;

export default Tasks;

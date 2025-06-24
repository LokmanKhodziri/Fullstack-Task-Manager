'use client';

import { edit, trash } from '@/app/utils/Icons';
import React from 'react';
import styled from 'styled-components';

interface Props {
  title?: string;
  description: string;
  date: string;
  isCompleted: boolean;
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
  return (
    <TaskItemStyled>
      <h2>{title}</h2>
      <p>{description}</p>
      <span>{new Date(date).toLocaleDateString()}</span>
      <div className="task-footer">
        {isCompleted ? (
          <button className="completed">Completed</button>
        ) : (
          <button className="not-completed">Not Completed</button>
        )}
        <button className="edit">{edit}</button>
        <button className="delete">{trash}</button>
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
`

export default TaskItem;

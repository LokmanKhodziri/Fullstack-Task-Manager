"use client"

import { edit, trash } from '@/app/utils/Icons';
import React from 'react';

interface Props {
    title?: string;
    description: string;
    date: string;
    isCompleted: boolean;
    id: string
}

function TaskItem({ title, description, date, isCompleted, important, id }: Props) {

  return (
    <div>
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
    </div>
  );
}

export default TaskItem;
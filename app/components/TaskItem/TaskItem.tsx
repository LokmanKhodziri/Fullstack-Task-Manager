"use client"

import React from 'react';

interface Props {
    task: any
}

function TaskItem({ task }: Props) {

    const {title, description, date, completed, important} = task;

  return (
    <div>
        <h2>{title}</h2>
        <p>{description}</p>
        <span>{new Date(date).toLocaleDateString()}</span>
    </div>
  );
}

export default TaskItem;
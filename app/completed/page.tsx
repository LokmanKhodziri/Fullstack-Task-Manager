'use client';

import React from 'react';
import { useGlobalState } from '../context/globalContextProvider';
import Tasks from '../components/Tasks/Task';

function page() {
  const { completedTasks } = useGlobalState();

  return <Tasks title="Completed Tasks" tasks={completedTasks} />;
}

export default page;

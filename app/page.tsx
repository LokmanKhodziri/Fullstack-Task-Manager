"use client"

import Tasks from "./components/Tasks/Task";
import { useGlobalState } from "./context/globalContextProvider";

export default function Home() {

  const {tasks} = useGlobalState();

  return <Tasks title="My Tasks" tasks={tasks}/>;
}

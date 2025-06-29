"use client";

import React from "react";
import { useGlobalState } from "../context/globalContextProvider";
import Tasks from "../components/Tasks/Task";

function page() {

  const { important } = useGlobalState();
  return <Tasks title="Important Tasks" tasks={important} />;
}

export default page;

"use client";

import React from "react";
import Sidebar from "./Sidebar/Sidebar";
import ContextProvider from "./Provider/ContextProvider";
import { useAuth } from "@clerk/nextjs";

interface Props {
  children: React.ReactNode;
}

function ClientLayout({ children }: Props) {
  const { userId } = useAuth();

  return (
    <ContextProvider>
      {userId && <Sidebar />}
      <div className="w-full">{children}</div>
    </ContextProvider>
  );
}

export default ClientLayout;

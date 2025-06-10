"use client";

import React from "react";
import Sidebar from "./Sidebar";
import ContextProvider from "./Provider/ContextProvider";

interface Props {
  children: React.ReactNode;
}

function ClientLayout({ children }: Props) {
  return (
    <ContextProvider>
      <Sidebar />
      <div className="w-full">{children}</div>
    </ContextProvider>
  );
}

export default ClientLayout;

"use client";

import { Toaster } from "react-hot-toast";

const ReactToastProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <Toaster position="top-center" />
    </>
  );
};

export default ReactToastProvider;

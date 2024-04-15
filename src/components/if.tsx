import React from "react";

interface IfProps {
  condition: unknown;
  children: React.ReactNode;
}

const If = ({ condition, children }: IfProps) => {
  return <>{condition && children}</>;
};

export default If;

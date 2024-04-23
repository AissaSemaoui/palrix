import React from "react";

interface IfProps {
  condition: boolean;
  children: React.ReactNode;
}

interface ElseProps {
  children: React.ReactNode;
}

const If = ({ condition, children }: IfProps) => (condition ? children : null);
const Else = ({ children }: ElseProps) => children;

const Show = ({ children }: { children: React.ReactNode }) => {
  console.time("test childrens");
  const PassedComponents = React.Children.toArray(children).filter(
    (child) => React.isValidElement(child) && child.type === If && child.props?.condition,
  );
  const ElseComponent = React.Children.toArray(children).find(
    (child) => React.isValidElement(child) && child.type === Else,
  );
  console.timeEnd("test childrens");

  console.log(PassedComponents);

  return <>{PassedComponents.length ? PassedComponents : ElseComponent}</>;
};

Show.If = If;
Show.Else = Else;

export default Show;

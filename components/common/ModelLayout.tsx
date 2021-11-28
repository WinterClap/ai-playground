import React from "react";

interface Props {}

export const ModelLayout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <nav>this IS A nav bar this IS A nav bar</nav> {children}
    </>
  );
};

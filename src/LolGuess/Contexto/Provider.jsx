import React from "react";
import Context from "./Context";

const Provider = ({ children }) => {
  return <Context.Provider>{children}</Context.Provider>;
};

export default Provider;

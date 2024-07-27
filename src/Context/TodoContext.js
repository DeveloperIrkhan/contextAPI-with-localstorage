import { createContext, useContext } from "react";

export const todoContext = createContext({});

export const useTodo = () => {
  return useContext(todoContext);
};

export todoProvider = todoContext.Provider; 

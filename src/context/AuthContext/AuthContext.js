import { createContext } from "react";

export const defaultLoginObject = {
  isLogged: false,
  toggleIsLogged: () => {
    console.log("context change");
  },
};

export const AuthContext = createContext(defaultLoginObject);

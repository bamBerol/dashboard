import { createContext } from "react";

export const defaultLoginObject = {
  isLogged: false,
  isLoading: true,
  toggleIsLogged: () => {
    console.log("context change");
  },
};

export const AuthContext = createContext(defaultLoginObject);

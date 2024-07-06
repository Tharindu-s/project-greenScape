"use client";
import { createContext, useReducer, useEffect } from "react";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { professional: action.payload };
    case "LOGOUT":
      return { professional: null };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    professional: null,
  });

  useEffect(() => {
    const professional = JSON.parse(localStorage.getItem("professional"));

    if (professional) {
      dispatch({ type: "LOGIN", payload: professional });
    }
  }, []);

  console.log("AuthContext state:", state);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

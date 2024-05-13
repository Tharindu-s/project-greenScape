const { useState } = require("react");
const { useAuthContext } = require("./useAuthContext");

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch("/api/user/login", {
      method: "POST",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setIsLoading(false);
    }
    if (response.ok) {
      //   save the user to local storage
      localStorage.setItem("user", JSON.stringify(json));

      //   update the auth context
      dispatch({ type: "LOGIN", payload: json });
      setIsLoading(false);
    }
  };

  return { login, error, isLoading };
};

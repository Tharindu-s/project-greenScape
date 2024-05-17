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
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setIsLoading(false);
    } else {
      // Save the user to local storage
      localStorage.setItem(
        "user",
        JSON.stringify({
          email: json.email,
          token: json.token,
          userId: json.userId,
        })
      );

      // Update the auth context
      dispatch({ type: "LOGIN", payload: json });
      setIsLoading(false);
    }
  };

  return { login, error, isLoading };
};

const { useState } = require("react");
const { useAuthContext } = require("./useAuthContext");

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch("/api/professional/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setIsLoading(false);
      return false; // Return false on failure
    } else {
      // Save the professional to local storage
      localStorage.setItem(
        "professional",
        JSON.stringify({
          email: json.email,
          token: json.token,
          professionalId: json.professionalId,
          professionalName: json.name,
        })
      );

      // Update the auth context
      dispatch({ type: "LOGIN", payload: json });
      setIsLoading(false);
      return true; // Return true on success
    }
  };

  return { login, error, isLoading };
};

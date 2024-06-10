const { useState } = require("react");
const { useAuthContext } = require("./useAuthContext");

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const signup = async (name, email, password, city, country) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch("/api/user/signup", {
      method: "POST",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, city, country }),
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setIsLoading(false);
    }
    if (response.ok) {
      //   save the user to local storage
      // localStorage.setItem("user", JSON.stringify(json));

      localStorage.setItem(
        "user",
        JSON.stringify({
          email: json.email,
          token: json.token,
          userId: json.userId,
          userName: json.name,
        })
      );

      //   update the auth context
      dispatch({ type: "LOGIN", payload: json });
      setIsLoading(false);
    }
  };

  return { signup, error, isLoading };
};

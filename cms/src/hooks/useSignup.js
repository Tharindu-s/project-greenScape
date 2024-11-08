const { useState } = require("react");
const { useAuthContext } = require("./useAuthContext");
import { toast } from "react-hot-toast";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const signup = async (name, email, password, city, country) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch("/api/professional/signup", {
      method: "POST",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, city, country }),
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setIsLoading(false);
      toast.error(json.error);
    }
    if (response.ok) {
      //   save the professional to local storage
      // localStorage.setItem("professional", JSON.stringify(json));
      toast.success("Signup successful");

      localStorage.setItem(
        "professional",
        JSON.stringify({
          email: json.email,
          token: json.token,
          professionalId: json.professionalId,
          professionalName: json.name,
        })
      );

      //   update the auth context
      dispatch({ type: "LOGIN", payload: json });
      setIsLoading(false);
      return true;
    }
  };

  return { signup, error, isLoading };
};

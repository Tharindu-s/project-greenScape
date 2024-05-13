"use client";
import { useEffect } from "react";
import Form from "../components/Common/Form";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useWorkoutsContext } from "@/hooks/useWorkoutsContext";
import Products from "@/components/home/Products";

export default function Home() {
  const { workouts, dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch("/api/workouts", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_WORKOUTS", payload: json });
      }
    };

    if (user) {
      fetchWorkouts();
    }
  }, [dispatch, user]);
  return (
    <div className="home">
      <div className="workouts">
        {workouts &&
          workouts.map((workout) => (
            <div key={workout._id}>
              <h2>{workout.title}</h2>
              <h2>{workout.reps}</h2>
              <h2>{workout.load}</h2>
            </div>
          ))}
      </div>
      <Form />
      <Products />
    </div>
  );
}

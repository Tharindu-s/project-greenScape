"use client";
import { useEffect, useState } from "react";
import Form from "../components/Common/Form";

export default function Home() {
  const [workouts, setWorkouts] = useState(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch("/api/workouts");
      const json = await response.json();

      if (response.ok) {
        setWorkouts(json);
      }
    };

    fetchWorkouts();
  }, []);
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
    </div>
  );
}

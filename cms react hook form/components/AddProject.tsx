"use client";
import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useForm, SubmitHandler } from "react-hook-form";

type FormFields = {
  title: string;
  description: string;
};

const AddProject = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>();

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input {...register("title")} type="text" placeholder="title" />
      <Input
        {...register("description")}
        type="text"
        placeholder="description"
      />
      <Button type="submit">Add Project</Button>
    </form>
  );
};

export default AddProject;

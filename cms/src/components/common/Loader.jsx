import React from "react";
import { tailChase } from "ldrs";
tailChase.register();

const Loader = () => {
  return (
    <div>
      <l-tail-chase size="60" speed="1.75" color="black"></l-tail-chase>
    </div>
  );
};

export default Loader;

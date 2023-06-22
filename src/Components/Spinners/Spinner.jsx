import React from "react";
import { ScaleLoader } from "react-spinners";

const override = {
  display: "block",
  margin: "0 auto",
  position: "absolute",
  top: "50%",
  left: "50%",
  TransformTranslate: "(-50,-50)",
};
const Spinner = () => {
  return (
    <ScaleLoader
      color="orange"
      cssOverride={override}
          size={200}
      aria-label="Loading Spinner"
      data-testid="loader"
      speedMultiplier='1'
    />
  );
};

export default Spinner;

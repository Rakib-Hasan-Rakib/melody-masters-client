import React from "react";
import { Helmet } from "react-helmet-async";
import TopSlider from "./TopSlider/TopSlider";
import PopularClasses from "./PopularClasses/PopularClasses";
import PopularInstractors from "./PopularInstractors/PopularInstractors";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Melody Masters | Home</title>
      </Helmet>
      <TopSlider />
      <PopularClasses />
      <PopularInstractors />
    </div>
  );
};

export default Home;

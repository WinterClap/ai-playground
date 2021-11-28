import type { NextPage } from "next";
import React from "react";
import { Header } from "../components/home-page/Header";
import { ModelSection } from "../components/home-page/ModelSection";
import { models } from "../constants/homePage";

export type EnhancedNextPage = NextPage & { withLayout?: React.ComponentType };

const Home: NextPage = () => {
  return (
    <>
      <Header text={"AI playground"} />
      <ModelSection models={models} />
    </>
  );
};

export default Home;

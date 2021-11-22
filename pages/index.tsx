import type { NextPage } from "next";
import { Header } from "../components/home-page/Header";
import { ModelSection } from "../components/home-page/ModelSection";
import { models } from "../constants/homePage";

const Home: NextPage = () => {
  return (
    <>
      <Header text={"AI playground"} />
      <ModelSection models={models} />
    </>
  );
};

export default Home;

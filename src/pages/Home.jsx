import React from "react";
import ExplainMe from "../components/ExplainMe";

const Home = () => {
  return (
    <div class="container">
      <header>
        <h1 style={{ margin: "0px" }}>Explain Me</h1>
        <span>Like I am Five.</span>
      </header>
      <main>
        <ExplainMe />
      </main>
    </div>
  );
};

export default Home;

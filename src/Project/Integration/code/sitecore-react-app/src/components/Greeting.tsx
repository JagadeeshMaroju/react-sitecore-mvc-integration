import React from "react";

type Props = {
  title: string;
  resultsPerPage: string;
};

const Greeting: React.FC<Props> = ({ title, resultsPerPage }) => {
  return (
    <div>
      <h1>{title}</h1>
      <p>Showing {resultsPerPage} results per page.</p>
      <p>Hello from React inside Sitecore MVC!</p>
    </div>
  );
};

export default Greeting;
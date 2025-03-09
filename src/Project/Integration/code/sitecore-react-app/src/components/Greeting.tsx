import React from "react";

type Props = {
  title: string;
    description: string;
};

const Greeting: React.FC<Props> = ({ title, description }) => {
  return (
    <div>
      <h1>{title}</h1>
          <p>{description}</p>
    </div>
  );
};

export default Greeting;
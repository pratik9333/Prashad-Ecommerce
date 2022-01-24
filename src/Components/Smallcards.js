import React from "react";

const Smallcards = ({ name, price }) => {
  return (
    <div className="custom-card p-2 mr-3 ">
      <h1 className="name">{name}</h1>
      <h1 className="price">{parseInt(price, 10)} /-</h1>
      <h2
        style={{
          color: "#3E4095",
          cursor: "pointer",
          fontWeight: "900",
          fontSize: "30px",
          textAlign: "center",
          marginTop: "25px",
        }}
      >
        अभी खरीदें
      </h2>
    </div>
  );
};

export default Smallcards;

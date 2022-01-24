import React from "react";
import Homeimg from "../Assets/Images/home.jpg";
import "../App.css";

import { Link } from "react-router-dom";
import Smallcards from "../Components/Smallcards";

const Home = () => {
  return (
    <div className="main">
      <div>
        <img src={Homeimg} name="image-map" className="img" />
      </div>

      <h1 className="mb-5 mt-4" style={{ color: "#EF2A34" }}>
        आइटम खरीदें
      </h1>

      <div className="d-flex  flex-row flex-box-all gy-5 gx-3 justify-content-between flex-wrap">
        <Link to={"/cart/" + 12}>
          <div className="flex-item ">
            <Smallcards name="सवामणि" price={5100} />
          </div>
        </Link>
        <Link to={"/cart/" + 13}>
          <div className="flex-item ">
            <Smallcards name="छप्पन भोग" price={3100} />
          </div>
        </Link>

        <Link to={"/cart/" + 14}>
          <div className="flex-item ">
            <Smallcards name="पान भोग" price={2100} />
          </div>
        </Link>

        <Link to={"/cart/" + 15}>
          <div className="flex-item ">
            <Smallcards name="ड्राईफ्रुट भोग" price={7100} />
          </div>
        </Link>

        <Link to={"/cart/" + 16}>
          <div className="flex-item ">
            <Smallcards name="प्रति फूल" price={5} />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Home;

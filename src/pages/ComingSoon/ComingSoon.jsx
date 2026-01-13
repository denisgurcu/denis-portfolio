import React from "react";
import { Link } from "react-router-dom";
import "./ComingSoon.css";

const ComingSoon = () => {
  return (
    <section className="coming-soon-page">
      <div className="coming-soon-content">
        <h1 className="coming-soon-title">Denis Gurcu</h1>

        <p className="coming-soon-subtitle">
          Designer & Front-End Developer
        </p>

<p className="coming-soon-subtext coming-soon-inline">
  I’m currently refreshing the site. Everything you need is right here:{" "}
  <a className="clickable" href="/Denis_Gurcu_Resume.pdf" target="_blank" rel="noreferrer">
    my resume
  </a>
  ,{" "}
  <a className="clickable" href="https://linkedin.com/in/denisgurcu" target="_blank" rel="noreferrer">
    LinkedIn
  </a>
  ,{" "}
  <a className="clickable" href="https://github.com/denisgurcu" target="_blank" rel="noreferrer">
    GitHub.</a> <br></br>
  Check out my recent work:{" "}
  <Link className="clickable" to="https://elevatemusicproject.com">
    Elevate Music Project
  </Link>
  ,{" "}
  <Link className="clickable" to="https://www.partybarcrawls.com/">
    Party Bar Crawls
  </Link>
  , and{" "}
  <Link className="clickable" to="https://slatevancouver.com">
    Slate Vancouver
  </Link>
  .
</p>



        <p className="coming-soon-subtext playful">
          You can also have some fun below ↓
        </p>

        <div className="down-arrow">↓</div>
      </div>
    </section>
  );
};

export default ComingSoon;

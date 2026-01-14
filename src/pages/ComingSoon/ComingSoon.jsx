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
  <a
    className="clickable"
    href="/Denis_Gurcu_Resume.pdf"
    target="_blank"
    rel="noreferrer"
  >
    my resume
  </a>
  ,{" "}
  <a
    className="clickable"
    href="https://linkedin.com/in/denisgurcu"
    target="_blank"
    rel="noreferrer"
  >
    LinkedIn
  </a>
  ,{" "}
  <a
    className="clickable"
    href="https://github.com/denisgurcu"
    target="_blank"
    rel="noreferrer"
  >
    GitHub
  </a>
  . <br />
  Check out my recent work:{" "}
  <a
    className="clickable"
    href="https://elevatemusicproject.com"
    target="_blank"
    rel="noreferrer"
  >
    Elevate Music Project
  </a>
  ,{" "}
  <a
    className="clickable"
    href="https://www.partybarcrawls.com/"
    target="_blank"
    rel="noreferrer"
  >
    Party Bar Crawls
  </a>
  , and{" "}
  <a
    className="clickable"
    href="https://slatevancouver.com"
    target="_blank"
    rel="noreferrer"
  >
    Slate Vancouver
  </a>
  .
</p>




        <p className="coming-soon-subtext playful">
          You can also have some fun below
        </p>

        <div className="down-arrow">↓</div>
      </div>
    </section>
  );
};

export default ComingSoon;

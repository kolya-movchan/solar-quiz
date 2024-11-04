import React, { useEffect } from "react";

import { Container } from "../container";
import { UnqualifiedBanner } from "../../components/UnqualifiedBanner";

export const Unqualified = () => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <Container className="container container-unqualified" style={{ paddingY: 0 }}>
      <div>
        <h1 className="title" style={{ marginBottom: "16px" }}>
          It’s not a good fit
        </h1>

        <p
          style={{ margin: "0", color: "#475467", fontSize: "18px", maxWidth: 430 }}
        >
          Unfortunately, your home is not a good fit for solar. Hover over the
          information icon below to learn why.
        </p>
      </div>

      <UnqualifiedBanner />
      <a
        href="https://smartenergygeeks.com/"
        className="unqualified-btn button"
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <span>Go Home</span>
      </a>
    </Container>
  );
};

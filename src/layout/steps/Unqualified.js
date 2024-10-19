import React from "react";

import { Container } from "../container";
import { UnqualifiedBanner } from "../../components/unqualified-banner";

export const Unqualified = () => {
  return (
    <Container className="container container-unqualified">
      <h1 className="title">Oh no!</h1>

      <p style={{ margin: "0", color: "#475467", fontSize: "18px" }}>
        Unfortunately, your home is not applicable for the program..
      </p>

      <UnqualifiedBanner />

      <a
        href="/"
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

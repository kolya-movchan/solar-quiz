import React, { useEffect } from "react";
import { Card } from "../../components/ItemCard";
import { Container } from "../container";
import { statesProviders } from "../../mop/statesProviders";
import classNames from "classnames";

export const UtilityProvider = ({
  handleUserAnswer,
  quizData,
  stateAbbreviation,
}) => {
  const providersList = statesProviders.find(
    (data) => data.State === stateAbbreviation
  )?.Providers || [
    { name: "APS", img: "/aps.svg" },
    { name: "SRP", img: "/srp.svg" },
    { name: "TEP", img: "/tep.webp" },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  console.log(111, providersList);

  return (
    <Container className="container-with-cards ">
      <h1 className="title title-master">Who is your utility provider?</h1>
      <div className="card-container">
        {providersList?.map((provider, idx) => (
          <Card
            key={idx}
            title={provider.name}
            img={`/providers/${provider.img}`}
            onClick={() =>
              handleUserAnswer({
                provider,
                is_mannual_provider: false,
                mannual_provider: null,
              })
            }
            imgWidth={145}
            imgHeight={65}
            // isOneBg={true}
            containerPadding="20px 20px 0px 20px"
            isActive={quizData.provider === provider}
            isDisabled={quizData.hasOwnProperty("provider")}
            classImg="card-img-roof-condition"
            style={{ border: "1px solid #D2D2D2" }}
          />
        ))}
        <div
          style={{
            width: "100%",
            borderRadius: "8px",
          }}
          className={classNames("input-other-provider-container", {
            "input-other-provider-container--active":
              quizData.is_mannual_provider,
          })}
        >
          <input
            value={quizData.mannual_provider}
            style={{
              borderRadius: "4px",
              width: "100%",
              boxSizing: "border-box",
              outline: "none",
              border: "1px solid #D2D2D2",
            }}
            type="text"
            placeholder="Other Utility Provider"
            className="input-other-provider"
            onChange={(e) => {
              handleUserAnswer({
                mannual_provider: e.target.value,
                is_mannual_provider: e.target.value.length > 0 ? true : null,
                provider: null,
              });
            }}
          />
        </div>
      </div>
    </Container>
  );
};

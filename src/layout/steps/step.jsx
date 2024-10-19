import React from "react";
import classNames from "classnames";
import { Container } from "../container";
import { Card } from "../../components/Card";

import { homeTypes } from "../../mop/home-types";
import { roofConditions } from "../../mop/roof-conditions";
import { statesProviders } from "../../mop/statesProviders";
import { utilityBillsList } from "../../mop/utilityBillsList";
import { creditScoreList } from "../../mop/creditScoreList";

const renderHomeOwnership = (handleUserAnswer, quizData) => (
  <>
    <h1 className="title title-master">Do you own or rent your home?</h1>
    <div className="card-container">
      {["Own", "Rent"].map((option) => (
        <Card
          key={option}
          title={option}
          img={`/icons/${option.toLowerCase()}.svg`}
          classImg="card-img-own-home"
          onClick={handleUserAnswer}
          quizData={{ home_ownership: option.toLowerCase() }}
          containerPadding="20px 20px 0px 20px"
          isActive={quizData.home_ownership === option.toLowerCase()}
          isDisabled={quizData.hasOwnProperty("home_ownership")}
          style={{ border: "1px solid #D2D2D2" }}
        />
      ))}
    </div>
  </>
);

const renderHomeType = (handleUserAnswer, quizData) => (
  <>
    <h1 className="title title-master">What is your home type?</h1>
    <div className="card-container">
      {homeTypes.map((homeType) => (
        <Card
          key={homeType.id}
          title={homeType.name}
          img={homeType.icon}
          onClick={handleUserAnswer}
          quizData={{ home_type: homeType.id }}
          classImg="card-icon-image"
          isActive={quizData.home_type === homeType.id}
          isDisabled={quizData.hasOwnProperty("home_type")}
          style={{ border: "none" }}
        />
      ))}
    </div>
  </>
);

const renderRoofCondition = (handleUserAnswer, quizData) => (
  <>
    <h1 className="title title-master">
      How would you describe the condition of your roof?
    </h1>
    <div className="card-container">
      {roofConditions.map((condition) => (
        <Card
          key={condition.id}
          title={condition.name}
          img={condition.icon}
          onClick={() => handleUserAnswer({ roof_condition: condition.id })}
          isOneBg={true}
          containerPadding="20px 20px 0px 20px"
          isActive={quizData.roof_condition === condition.id}
          isDisabled={quizData.hasOwnProperty("roof_condition")}
          classImg="card-img-roof-condition"
          style={{ border: "1px solid #D2D2D2" }}
        />
      ))}
    </div>
  </>
);

const renderUtilityProvider = (handleUserAnswer, quizData, providersList) => (
  <>
    <h1 className="title title-master">Who is your utility provider?</h1>
    <div className="card-container">
      {providersList?.map((provider, idx) => (
        <Card
          key={idx}
          title={provider}
          img="/providers/provider.png"
          onClick={() =>
            handleUserAnswer({
              provider,
              is_mannual_provider: false,
              mannual_provider: null,
            })
          }
          isOneBg={true}
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
  </>
);

const renderUtilityBills = (handleUserAnswer, quizData) => (
  <>
    <h1 className="title title-master">
      How much are your monthly electric bills?
    </h1>
    <div className="card-container-emojie" style={{ marginBottom: "20px" }}>
      {utilityBillsList.map((bill) => (
        <Card
          key={bill.id}
          title={bill.name}
          img={`/emojies/${bill.id}.png`}
          onClick={() => handleUserAnswer({ utility_bill_amount: bill.id })}
          imgHeight={64}
          imgWidth={64}
          isActive={quizData.utility_bill_amount === bill.id}
          isDisabled={quizData.hasOwnProperty("utility_bill_amount")}
          classImg="card-emojie"
          style={{
            border: "1px solid #D2D2D2",
            backgroundColor: "#FAFAFA",
          }}
        />
      ))}
    </div>
  </>
);

const renderCreditScore = (handleUserAnswer, quizData) => (
  <>
    <h1 className="title title-master">What is your credit score?</h1>
    <div className="card-container-emojie" style={{ marginBottom: "20px" }}>
      {creditScoreList.map((score) => (
        <Card
          key={score.id}
          title={score.name}
          img={`/emojies/${score.id}.png`}
          onClick={() => handleUserAnswer({ credit_score: score.id })}
          imgHeight={64}
          imgWidth={64}
          isActive={quizData.credit_score === score.id}
          isDisabled={quizData.hasOwnProperty("credit_score")}
          classImg="card-emojie"
          style={{
            border: "1px solid #D2D2D2",
            backgroundColor: score.color,
          }}
        />
      ))}
    </div>
  </>
);

export const Step = ({
  step,
  handleUserAnswer,
  quizData,
  stateAbbreviation,
}) => {
  const providersList = statesProviders.find(
    (data) => data.State === stateAbbreviation
  )?.Providers || ["APS", "SRP", "TEP"];

  const renderStep = () => {
    switch (step) {
      case 2:
        return renderHomeOwnership(handleUserAnswer, quizData);
      case 3:
        return renderHomeType(handleUserAnswer, quizData);
      case 4:
        return renderRoofCondition(handleUserAnswer, quizData);
      case 5:
        return renderUtilityProvider(handleUserAnswer, quizData, providersList);
      case 6:
        return renderUtilityBills(handleUserAnswer, quizData);
      case 7:
        return renderCreditScore(handleUserAnswer, quizData);
      default:
        return <div>Unknown step</div>;
    }
  };

  return <Container className="container-with-cards">{renderStep()}</Container>;
};

import React from "react";
import BaseCard from "./BaseCard";

const DigitalCard = ({ onHoverChange }) => {
  return (
    <BaseCard
      index="03"
      category="Marketing"
      title="Digital Marketing"
      description="ROI-driven strategies to scale your brand online."
      icon="↗"
      footerLeft="[ MARKET_PRO ]"
      footerRight="ROI_DRIVEN"
      onHoverChange={onHoverChange}
    />
  );
};

export default DigitalCard;
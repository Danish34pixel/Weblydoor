import React from "react";
import BaseCard from "./BaseCard";

const DevCard = ({ onHoverChange }) => {
  return (
    <BaseCard
      index="01"
      category="Development"
      title="Web Development"
      description="High-performance web apps built with modern technologies."
      icon="</>"
      footerLeft="[ DEV_CORE ]"
      footerRight="SCALABLE"
      onHoverChange={onHoverChange}
    />
  );
};

export default DevCard;
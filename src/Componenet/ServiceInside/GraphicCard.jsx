import React from "react";
import BaseCard from "./BaseCard";

const GraphicCard = ({ onHoverChange }) => {
  return (
    <BaseCard
      index="04"
      category="Design"
      title="Graphic Design"
      description="Luxury visual branding and identity systems."
      icon="🎨"
      footerLeft="[ DESIGN_STUDIO ]"
      footerRight="PREMIUM"
      onHoverChange={onHoverChange}
    />
  );
};

export default GraphicCard;
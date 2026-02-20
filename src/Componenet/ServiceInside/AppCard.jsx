import React from "react";
import BaseCard from "./BaseCard";

const AppCard = ({ onHoverChange }) => {
  return (
    <BaseCard
      index="02"
      category="Application"
      title="App Development"
      description="Beautiful and scalable mobile applications."
      icon="📱"
      footerLeft="[ APP_CORE ]"
      footerRight="USER_FIRST"
      onHoverChange={onHoverChange}
    />
  );
};

export default AppCard;
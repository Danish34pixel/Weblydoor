import React from "react";
import { FiTrendingUp } from "react-icons/fi";
import BaseCard from "./BaseCard";

const SocialCard = ({ onHoverChange }) => {
  return (
    <BaseCard
      index="05"
      category="Social"
      title="Social Media Marketing"
      description="Boost engagement and maximize conversions."
      icon={<FiTrendingUp />}
      footerLeft="[ SOCIAL_PRO ]"
      footerRight="OPTIMIZING"
      onHoverChange={onHoverChange}
    />
  );
};

export default SocialCard;
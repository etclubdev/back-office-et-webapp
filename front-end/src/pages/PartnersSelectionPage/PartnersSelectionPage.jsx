import React from 'react';
import "./PartnersSelectionPage.css";

import { Header } from "../../components/Header";
import { PartnerCardList } from "../../components/PartnerCardList";

export const PartnersSelectionPage = () => {
  return (
    <div className="partner-selection-page">
      <Header>Lựa chọn Đối tác</Header>
      <div className="partner-list-section">
        <PartnerCardList />
      </div>
    </div>
  )
}

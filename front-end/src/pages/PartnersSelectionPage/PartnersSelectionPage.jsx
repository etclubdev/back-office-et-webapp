import React from 'react';
import "./PartnersSelectionPage.css";

import { Header } from "../../components/Header";
import { PartnerCardList } from "../../components/PartnerCardList";

export const PartnersSelectionPage = () => {
  return (
    <div className="partner-selection-page">
      <Header>Lựa chọn Đối tác</Header>
      <div className="partner-list-section">
        <span style={{ width: "100%", height: "50px", opacity: 0 }}>_</span>
        <PartnerCardList />
        <span style={{ width: "100%", height: "50px", opacity: 0 }}>_</span>
      </div>
    </div>
  )
}

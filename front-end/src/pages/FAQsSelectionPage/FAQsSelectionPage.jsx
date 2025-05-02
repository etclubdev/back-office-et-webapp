import React from 'react';
import "./FAQsSelectionPage.css";
import { Header } from "../../components/Header";
import { FAQsCardList } from "../../components/FAQsCardList"

export const FAQsSelectionPage = () => {
  return (
    <div className="faqs-selection-page">
      <Header>Lựa chọn FAQs</Header>
      <div className="faqs-list-section">
        <FAQsCardList />
      </div>
    </div>
  )
}

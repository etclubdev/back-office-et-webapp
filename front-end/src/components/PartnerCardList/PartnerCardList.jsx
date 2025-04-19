import React, { useEffect, useState } from 'react';
import "./PartnerCardList.css";
import { PartnerCard } from '../PartnerCard/PartnerCard';
import { getAllPartners } from '../../api/partner.service';
import { groupByVisibility } from '../../utils/groupByVisibilityUtil';

export const PartnerCardList = () => {
  const [partners, setPartners] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getAllPartners();

      let groupedData = {};
      Object.entries(data).map(([key]) => {
        groupedData = {...groupedData, [key]: groupByVisibility(data[key])}
      })
      setPartners(groupedData)
    }
    fetchData();
  }, [])

  const updatePartners = (category, newData) => {
    setPartners((prev) => ({
      ...prev,
      [category]: newData,
    }));
  };

  return (
    <div className="partner-card-list">
      {Object.keys(partners).map((category) => (
        <PartnerCard
          key={category}
          category={category} 
          data={partners[category]}
          setData={(newData) => updatePartners(category, newData)}
        />
      ))}
    </div>
  );
};

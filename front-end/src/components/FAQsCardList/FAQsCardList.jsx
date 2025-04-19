import React, { useEffect, useState, useRef } from 'react';
import "./FAQsCardList.css";

import { FAQsCard } from '../FAQsCard/FAQsCard';
import { getAllFAQs } from '../../api/faq.service';

export const FAQsCardList = () => {
    const [faqs, setFAQs] = useState({});
    const [filteredFAQs, setFilteredFAQs] = useState([]);
    const [activeTab, setActiveTab] = useState(0);
    const progressBarRef = useRef(null);
    const tabsRef = useRef([]);

    const handleClick = (e, index) => {
        setActiveTab(index);
        const element = e.target;
        
        if (progressBarRef.current) {
            progressBarRef.current.style.transform = `translateX(${element.offsetLeft}px)`;
            progressBarRef.current.style.width = `${element.offsetWidth}px`;
        }

        const key = Object.keys(faqs)[index];
        setFilteredFAQs(faqs[key] || []);
    }

    const updateProgressBar = () => {
        const activeTabElement = tabsRef.current[activeTab];
        if (activeTabElement && progressBarRef.current) {
            progressBarRef.current.style.transform = `translateX(${activeTabElement.offsetLeft}px)`;
            progressBarRef.current.style.width = `${activeTabElement.offsetWidth}px`;
        }
    };

    useEffect(() => {
        const handleResize = () => {
            updateProgressBar();
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [activeTab]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await getAllFAQs();
                if (data && Object.keys(data).length > 0) {
                    const [firstKey, firstValue] = Object.entries(data)[0]; 
                    setFAQs(data);
                    setFilteredFAQs(firstValue);
                    
                }
            } catch (error) {
                console.error("Error fetching FAQs:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="faq-card-list">
            <div className="tabs-container">
                {Object.keys(faqs).map((category, index) => (
                    <div 
                        ref={(el) => tabsRef.current[index] = el}
                        key={index} 
                        className={`tab-item ${activeTab === index ? "active" : ""}`} 
                        onClick={(e) => handleClick(e, index)}
                    >
                        {category}
                    </div>
                ))}
                <div className="progress-bar" ref={progressBarRef}></div>
            </div>
            <div className="faq-list-container">
                {filteredFAQs.length > 0 ? (
                    filteredFAQs.map((faq) => <FAQsCard key={faq.faq_id} {...faq} />)
                ) : (
                    <p className="no-data">Không có câu hỏi nào.</p>
                )}
                <div style={{height: "20px"}}></div>
            </div>
        </div>
    );
};

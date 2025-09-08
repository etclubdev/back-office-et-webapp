import './Tabs.css';
import React, { useEffect, useState, useRef, useCallback } from 'react';

export const Tabs = ({ categories, activeTab, setActiveTab }) => {
    const progressBarRef = useRef(null);
    const tabsRef = useRef([]);

    const handleClick = (e, index) => {
        setActiveTab(index);
    }

    useEffect(() => {
        const activeTabElement = tabsRef.current[activeTab];
        if (activeTabElement && progressBarRef.current) {
            progressBarRef.current.style.transform = `translateX(${activeTabElement.offsetLeft}px)`;
            progressBarRef.current.style.width = `${activeTabElement.offsetWidth}px`;
        }
    }, [activeTab]);

    return (
        <div className="tabs-container">
            {categories.map((category, index) => (
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
    )
}

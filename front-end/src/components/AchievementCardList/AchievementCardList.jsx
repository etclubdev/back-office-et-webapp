import React from 'react';
import { AchievementCard } from '../AchievementCard';
import "./AchievementCardList.css";

export const AchievementCardList = ({achievements, selected, setSelected}) => {
    return (
        <div className="achievement-card-list">  
            {
                <div className="achievement-card-list">  
                    {achievements?.length > 0 && achievements.map(item => (
                    <AchievementCard key={item.achievement_id} {...item} selected={selected} setSelected={setSelected} />
                    ))}
                </div>
            }
        </div>
    )
}

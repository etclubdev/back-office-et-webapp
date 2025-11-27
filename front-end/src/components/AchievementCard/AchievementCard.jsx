import React, { useState, useRef } from 'react';
import './AchievementCard.css';
import { Switch } from '@mui/material';
import { ConfirmedDialog } from '../ConfirmedDialog';
import { updateAchievementById } from '../../api/achievement.service';

import { confirmContents } from '../../config/confirmContents';

const contents = confirmContents.achievements;

export const AchievementCard = ({ achievement_id, achievement_name, highlight_number, visible, selected, setSelected }) => {
    const [checked, setChecked] = useState(visible);
    const [isOpen, setIsOpen] = useState(false);
    const cardRef = useRef(null);

    const handleClick = () => {
        cardRef.current.classList.toggle('selected');
        setSelected(prev => {
            const selectedIds = selected.includes(achievement_id) ? prev.filter(id => id !== achievement_id) : [...prev, achievement_id];
            return selectedIds;
        })
    }

    const onSwitch = () => {
        setIsOpen(true);
    }

    const onClose = () => {
        setIsOpen(false);
    }

    const onConfirm = async () => {
        setIsOpen(false);
        setChecked(!checked);
        await updateAchievementById(achievement_id, {visible: !checked});
    }

    return (
        <>
            {isOpen && <ConfirmedDialog 
                onClose={onClose}
                onConfirm={onConfirm}    
                {...contents.update}
            />}
            <div id={achievement_id} className="achievement-card" ref={cardRef} onClick={handleClick}>
                <div className="card-top">
                    <span>{highlight_number}</span>
                    <Switch 
                        checked={checked}
                        onChange={onSwitch}
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>
                <hr />
                <span>{achievement_name}</span>
            </div>
        </>
    );
};

import React, { useState } from 'react';
import "./FAQsCard.css";
import { Switch } from "@mui/material";
import { updateFAQsById } from '../../api/faq.service';
import { ConfirmedDialog } from '../ConfirmedDialog';
import { getConfirmDialogConfig } from '../../utils/confirmDialogUtil';
import { confirmContents } from "../../constants";

const contents = confirmContents.faqs;

export const FAQsCard = ({faq_id, question, answer, visible}) => {
    const [checked, setChecked] = useState(visible);
    const [isOpenDialog, setIsOpenDialog] = useState(false);

    console.log(contents);
    

    const onClose = () => {
        setIsOpenDialog(false);
    }

    const onConfirm = async () => {
        const response = await updateFAQsById(faq_id, {visible: !checked});
        setChecked(!checked);
        setIsOpenDialog(false);
    }

    const handleChange = () => {
        setIsOpenDialog(true);
    }

    return (
        <div id={faq_id} className="faq-card">
            {
                isOpenDialog && (
                    <ConfirmedDialog 
                        {...contents.update}
                        onClose={onClose}
                        onConfirm={onConfirm}
                    />
                )
            }
            <div className="faq-top">
                <span><strong>{question}</strong></span>
                <Switch 
                    checked={checked}
                    onChange={handleChange}
                    size="small"
                />
            </div>
            <p className="faq-answer">{answer}</p>
        </div>
    )
}

import { useEffect, useState } from 'react';
import "./Filter.css";
import { styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { formatChipData } from '../../utils/formatChipData';
import Button from "@mui/material/Button";

const ListItem = styled('li')(({ theme }) => ({
    margin: theme.spacing(0.5),
}));

export const Filter = ({ chipdata, setSelectedChips }) => {
    const [active, setActive] = useState(false);

    const [chipData, setChipData] = useState(formatChipData(chipdata) || []);

    const handleClickFilter = () => {
        setActive(prev => !prev);
    }

    const handleClickChip = (chip) => {
        setChipData((chips) => {
            const updatedChips = chips?.map(c =>
                c.key === chip.key ? { ...c, isSelected: !c.isSelected } : c
            );
            return updatedChips;
        });
    }

    const handleApplyFilter = () => {
        setSelectedChips(chipData.filter(chip => chip.isSelected).map(chip => chip.label));
        setActive(false);
    }

    const handleCancelFilter = () => {
        setSelectedChips([]);
        setChipData(chip => chip.map(c => ({ ...c, isSelected: false })));
        setActive(false);
    }

    return (
        <div className={`filter-container ${active ? "active" : ""}`} >
            <div className="filter-icon" onClick={handleClickFilter}>
                <FontAwesomeIcon icon={faFilter} />
            </div>
            <div className={`filter-chip-container ${active ? "active" : ""}`}>
                <Paper
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        flexWrap: 'wrap',
                        listStyle: 'none',
                        p: 0.5,
                        m: 0,
                    }}
                    component="ul"
                >
                    {chipData.map((data) => {
                        return (
                            <ListItem key={data.key}>
                                <Chip
                                    style={data.isSelected ? { backgroundColor: "#C0C0C0" } : {}}
                                    label={data.label}
                                    onClick={() => { handleClickChip(data) }}
                                />
                            </ListItem>
                        );
                    })}
                    <div className="filter-button-container">
                        <Button
                            variant="text"
                            size="small"
                            onClick={handleCancelFilter}>
                            Hủy
                        </Button>
                        <Button
                            variant="text"
                            size="small"
                            sx={{
                                backgroundColor: "#007bff",
                                color: "white",
                                "&:hover": { backgroundColor: "#0056b3" },
                            }}
                            onClick={handleApplyFilter}
                        >
                            Lọc
                        </Button>
                    </div>
                </Paper>
            </div>
        </div>

    );
}

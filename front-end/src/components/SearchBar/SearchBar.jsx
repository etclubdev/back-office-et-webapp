import React, { useState } from 'react';
import "./SearchBar.css";
import BaseButton from '../Buttons/BaseButton';
import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState("");

    const handleSearch = () => {
        if (query.length === 0) return;

        onSearch(query);
    }

    return (
        <>
            <TextField
                placeholder="Search..."
                variant="standard" 
                fullWidth
                InputProps={{
                    disableUnderline: false, 
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon style={{ color: "gray" }} />
                        </InputAdornment>
                    ),
                }}
                onChange={(e) => setQuery(e.target.value)}
            />
            <BaseButton 
                sx={{ whiteSpace: "nowrap" , paddingX: 2}}
                onClick={handleSearch}
            >
                Tìm kiếm
            </BaseButton>
        </>
    )
}

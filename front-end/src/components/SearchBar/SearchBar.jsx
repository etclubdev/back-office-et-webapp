import React, { useState } from 'react';
import "./SearchBar.css";
import BaseButton from '../Buttons/BaseButton';
import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState("");

    const handleSearch = () => {
        onSearch(query);
    }

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleSearch();
        }
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
                onKeyPress={handleKeyPress}
            />
            <BaseButton
                sx={{ whiteSpace: "nowrap", paddingX: 2, backgroundColor: "#007bff", "&:hover": { backgroundColor: "#0056b3" } }}
                onClick={handleSearch}
            >
                Tìm kiếm
            </BaseButton>
        </>
    )
}

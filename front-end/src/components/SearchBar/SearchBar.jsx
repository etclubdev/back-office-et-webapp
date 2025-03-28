import React from 'react';
import "./SearchBar.css";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";

export const SearchBar = ({ onSearch }) => {
    return (
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
            onChange={(e) => onSearch(e.target.value)}
        />
    )
}

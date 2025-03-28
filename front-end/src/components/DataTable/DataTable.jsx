import React, { useState } from "react";
import "./DataTable.css";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Checkbox,
  TablePagination,
  TableSortLabel,
} from "@mui/material";


export const DataTable = ({ data, columns, itemId, selected, setSelected }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortConfig, setSortConfig] = useState({ key: "title", direction: "asc" });

  const handleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };


  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const sortedData = [...data].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === "asc" ? -1 : 1;
    if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  const paginatedData = sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Paper sx={{ width: "100%", padding: 2, minHeight: "300px" }}>
      <TableContainer sx={{ maxHeight: "400px", overflowY: "auto" }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={selected.length > 0 && selected.length < data.length}
                  checked={selected.length === data.length}
                  onChange={() => setSelected(selected.length === data.length ? [] : data.map((row) => row[itemId]))}
                  color="primary"
                />
              </TableCell>
              {columns.map((col) => (
                <TableCell key={col.field}>
                  <TableSortLabel
                    active={sortConfig.key === col.field}
                    direction={sortConfig.key === col.field ? sortConfig.direction : "asc"}
                    onClick={() => handleSort(col.field)}
                  >
                    <strong>{col.headerName}</strong>
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((row) => {
              const isSelected = selected.includes(row[itemId]);
              return (
                (
                  <TableRow 
                    key={row[itemId]}
                    sx={{
                      backgroundColor: isSelected ? "#e3f2fd" : "inherit",
                      cursor: "pointer",
                    }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selected.includes(row[itemId])}
                        onChange={() => handleSelect(row[itemId])}
                        color="primary"
                      />
                    </TableCell>
                    {columns.map((col) => (
                      <TableCell key={col.field} sx={{ minWidth: 100 }}>
                        {col.field === "visible" ? (<>{row[col.field] ? "Có" : "Không"}</>) : row[col.field]}
                      </TableCell>
                    ))}
                  </TableRow>
                )
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

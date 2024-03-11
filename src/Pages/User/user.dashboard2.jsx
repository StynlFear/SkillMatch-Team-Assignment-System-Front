import React from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  TablePagination,
  Button,
} from "@mui/material";

const columns = [
  { id: "date", label: "Date", minWidth: 100 },
  { id: "name", label: "Name", minWidth: 100 },
  { id: "shipTo", label: "Ship To", minWidth: 100 },
  { id: "payment", label: "Payment", minWidth: 100 },
  { id: "amount", label: "Amount", minWidth: 100 },
];

const rows = [
  {
    date: "16 Mar, 2019",
    name: "Elvis Presley",
    shipTo: "Tupelo, MS",
    payment: "VISA...3719",
    amount: "$2000",
  },
  // ... other rows
];

function createData(date, name, shipTo, payment, amount) {
  return { date, name, shipTo, payment, amount };
}

const Dashboard = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ bgcolor: "#f5f5f5", p: 2 }}>
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>
        <Typography variant="body1" gutterBottom>
          Today - Sales ($)
        </Typography>
        <Typography variant="h4" gutterBottom>
          2,000 - 1,000 - 0
        </Typography>
        <Typography variant="body1" gutterBottom>
          00:00
        </Typography>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div" 
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box> 
  );
};

export default Dashboard;
          
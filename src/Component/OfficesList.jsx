import React, { useState, useEffect } from "react";
import {
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  TablePagination,
  Typography,
  Avatar,
  styled,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { accessToken } from "../service/variables";

const useStyles = styled((theme) => ({
  container: {
    margin: "20px auto",
    maxWidth: "90%",
    [theme.breakpoints.down("sm")]: {
      margin: "10px auto",
    },
  },
  table: {
    minWidth: 650,
    [theme.breakpoints.down("sm")]: {
      minWidth: "100%",
    },
  },
}));

const LeadershipTableList = () => {
  const classes = useStyles();
  const theme = useTheme();
  const navigate = useNavigate();
  const [employeeData, setEmployeeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://vkfpe87plb.execute-api.ap-south-1.amazonaws.com/production/get_all_office",

          {
            headers: {
              Authorization: accessToken(),
            },
          }
        );
        setEmployeeData(response.data["body-json"].body);
      } catch (error) {
        console.error("Error fetching employee data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const truncateString = (str, numWords) => {
    const words = str.split(" ");
    if (words.length > numWords) {
      return words.slice(0, numWords).join(" ") + "...";
    } else {
      return str;
    }
  };

  return (
    <div style={{ margin: 15 }}>
      {loading && <CircularProgress size={24} />}
      <TableContainer component={Paper} className={classes.container}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              {/* <TableCell style={{ fontWeight: "bold", fontSize: 20 }}>
                Member Id
              </TableCell> */}
              {/* <TableCell style={{ fontWeight: "bold", fontSize: 20 }}>
                Name
              </TableCell> */}

              <TableCell style={{ fontWeight: "bold", fontSize: 20 }}>
                District Office Name
              </TableCell>
              <TableCell style={{ fontWeight: "bold", fontSize: 20 }}>
                Block
              </TableCell>

              <TableCell style={{ fontWeight: "bold", fontSize: 20 }}>
                Email
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employeeData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((item) => (
                <TableRow key={item.id}>
                  {/* <TableCell>{item.employeeId}</TableCell> */}
                  {/* <TableCell>{item.name}</TableCell> */}
                  <TableCell>{item.officeName}</TableCell>

                  <TableCell>{item.block}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  {/* <TableCell>{item.contactNumber}</TableCell> */}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={employeeData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default LeadershipTableList;

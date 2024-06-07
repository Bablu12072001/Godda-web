import React, { useState, useEffect } from "react";
import axios from "axios";
import { apiUrl } from "../constants";
import Auth from "../Authentication";
import swal from "sweetalert";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Grid,
  TablePagination,
  useMediaQuery,
  Skeleton,
} from "@mui/material";

const Voting = () => {
  const { token, decoded } = Auth();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const isMobile = useMediaQuery("(max-width:600px)");
  const [polls, setPolls] = useState([]);
  const [reload, setReload] = useState(false);
  const [otherInputs, setOtherInputs] = useState({});

  let config = {
    headers: {
      Authorization: token,
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.post(
          `${apiUrl}/jmoa_voting_particular_memeber_all_data`,
          { email_id: decoded.email },
          { headers: { Authorization: token } }
        );

        if (
          res.data["body-json"]?.statusCode !== 200 ||
          !res.data["body-json"]?.body
        ) {
          throw new Error("Error fetching data!!");
        }

        setPolls(res.data["body-json"]["body"]);
      } catch (error) {
        swal({
          title: "Error!",
          text: "Error fetching data!! " + error,
          icon: "error",
          button: "Ok!",
        });
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [decoded.email, token, reload]);

  const handleVote = async (pollId, email, response) => {
    if (response === "" || !response) {
      swal({
        title: "Warning!",
        text: "Field should not be empty!",
        icon: "warning",
        button: "Ok!",
      });
      return;
    }
    let body = {
      voting_id: pollId,
      email_id: email,
      vote: response,
      name: decoded.name,
      designation: decoded.designation,
      district: decoded.district,
      role: decoded.role,
    };
    try {
      setLoading(true);
      const res = await axios.post(`${apiUrl}/joma_voting`, body, config);

      if (res.data["body-json"]?.statusCode !== 200) {
        throw new Error("Error voting!!");
      }

      swal({
        title: "Success!",
        text: "Voted Successfully!! ",
        icon: "success",
        button: "Ok!",
      });
    } catch (error) {
      swal({
        title: "Error!",
        text: "Error voting!! " + error,
        icon: "error",
        button: "Ok!",
      });
      console.error("Error:", error);
    } finally {
      setReload(!reload);
      setLoading(false);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getMargin = () => {
    return isMobile ? "8px" : "15px";
  };

  const handleInputChange = (event, pollId) => {
    //  const {name, value } = event.target;
    const {  value } = event.target;
    setOtherInputs({ ...otherInputs, [pollId]: value });
  };

  return (
    <>
      {loading ? (
        <TableContainer style={{ margin: getMargin() }}>
          <Table>
            <TableHead>
              <TableRow style={{ backgroundColor: "#f2f2f2" }}>
                <TableCell style={{ fontWeight: "bold" }}>
                  <Skeleton variant="text" width={isMobile ? 50 : 100} />
                </TableCell>
                <TableCell style={{ fontWeight: "bold" }}>
                  <Skeleton variant="text" width={isMobile ? 100 : 200} />
                </TableCell>
                <TableCell style={{ fontWeight: "bold" }}>
                  <Skeleton variant="text" width={isMobile ? 50 : 100} />
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {[...Array(rowsPerPage)].map((_, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Skeleton variant="text" />
                  </TableCell>
                  <TableCell>
                    <Skeleton variant="text" />
                  </TableCell>
                  <TableCell>
                    <Skeleton variant="text" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <>
          <TableContainer style={{ margin: getMargin() }}>
            <Table>
              <TableHead>
                <TableRow style={{ backgroundColor: "#f2f2f2" }}>
                  <TableCell style={{ fontWeight: "bold" }}>Poll ID</TableCell>
                  <TableCell style={{ fontWeight: "bold" }}>
                    Description
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold" }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? polls.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : polls
                ).map((poll) => (
                  <TableRow key={poll.voting_id}>
                    <TableCell>{poll.voting_id}</TableCell>
                    <TableCell style={{ wordWrap: "break-word" }}>
                      {poll.description}
                    </TableCell>
                    <TableCell>
                      {poll.voted === true ? (
                        <Button variant="outlined" color="primary">
                          Voted
                        </Button>
                      ) : (
                        <Grid container spacing={1} alignItems="center">
                          <Grid item>
                            <Button
                              onClick={() =>
                                handleVote(poll.voting_id, decoded.email, "yes")
                              }
                              variant="contained"
                              color="success"
                            >
                              Yes
                            </Button>
                          </Grid>
                          <Grid item>
                            <Button
                              onClick={() =>
                                handleVote(poll.voting_id, decoded.email, "no")
                              }
                              variant="contained"
                              color="error"
                            >
                              No
                            </Button>
                          </Grid>
                          <Grid item>
                            <input
                              placeholder="Other"
                              className="w-24 md:w-24"
                              style={{
                                border: "1px solid black",
                                borderRadius: "10px",
                                padding: "2px",
                              }}
                              type="text"
                              name="other"
                              value={otherInputs[poll.voting_id] || ""}
                              onChange={(e) =>
                                handleInputChange(e, poll.voting_id)
                              }
                            />
                            &nbsp;&nbsp;
                            {isMobile ? <div className="mt-[-15px]"></div> : ""}
                            <Button
                              onClick={() =>
                                handleVote(
                                  poll.voting_id,
                                  decoded.email,
                                  otherInputs[poll.voting_id]
                                )
                              }
                              variant="contained"
                              color="warning"
                            >
                              Submit
                            </Button>
                          </Grid>
                        </Grid>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={polls.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>
      )}
    </>
  );
};

export default Voting;

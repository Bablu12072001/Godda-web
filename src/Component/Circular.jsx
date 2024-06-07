import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Skeleton } from "@mui/material";
import {
  TableCell,
  TableBody,
  TableRow,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TablePagination,
} from "@mui/material";
import { apiUrl } from "../constants";
import Auth from "../Authentication";
import swal from "sweetalert";
import VisibilityIcon from "@mui/icons-material/Visibility";

export default function Circular() {
  // console.log("under circular");
  const { token } = Auth();
  let config = {
    headers: {
      Authorization: token,
    },
  };
  const rowsPerPageOptions = [5, 10, 25, 50, 100];

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangePage1 = (event, newPage) => {
    setPage1(newPage);
  };

  const handleChangeRowsPerPage1 = (event) => {
    setRowsPerPage1(parseInt(event.target.value, 10));
    setPage1(0);
  };
  const handleChangePage2 = (event, newPage) => {
    setPage2(newPage);
  };

  const handleChangeRowsPerPage2 = (event) => {
    setRowsPerPage2(parseInt(event.target.value, 10));
    setPage2(0);
  };
  // Assuming you have state variables `page` and `rowsPerPage`
  const [page, setPage] = useState(0);
  const [page1, setPage1] = useState(0);
  const [page2, setPage2] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rowsPerPage1, setRowsPerPage1] = useState(5);
  const [rowsPerPage2, setRowsPerPage2] = useState(5);

  const handleViewPDF = async (pdfLink) => {
    window.open(pdfLink, "_blank");
  };
  const [notices, setNotices] = useState([
    // "kfdkk jfdlk dkld dk jfdlk dkld dk jfdlk dkld dk",
    // "jfdlk dkld dkjfdlk dkld dkjfdlk dkld dkjfdlk dkld dkjfdlk dkld dk",
    // "jfklddfk lklj jfdlk dkld dkjfdlk dkld dkjfdlk dkld dkjfdlk dkld dkjfdlk dkld dkjfdlk dkld dk  ",
    // "kfdkk jfdlk dkld dk jfdlk dkld dk jfdlk dkld dk",
    // "jfdlk dkld dkjfdlk dkld dkjfdlk dkld dkjfdlk dkld dkjfdlk dkld dk",
    // "jfklddfk lklj jfdlk dkld dkjfdlk dkld dkjfdlk dkld dkjfdlk dkld dkjfdlk dkld dkjfdlk dkld dk  ",
    // "kfdkk jfdlk dkld dk jfdlk dkld dk jfdlk dkld dk",
    // "jfdlk dkld dkjfdlk dkld dkjfdlk dkld dkjfdlk dkld dkjfdlk dkld dk",
    // "jfklddfk lklj jfdlk dkld dkjfdlk dkld dkjfdlk dkld dkjfdlk dkld dkjfdlk dkld dkjfdlk dkld dk  ",
    // "kfdkk jfdlk dkld dk jfdlk dkld dk jfdlk dkld dk",
    // "jfdlk dkld dkjfdlk dkld dkjfdlk dkld dkjfdlk dkld dkjfdlk dkld dk",
    // "jfklddfk lklj jfdlk dkld dkjfdlk dkld dkjfdlk dkld dkjfdlk dkld dkjfdlk dkld dkjfdlk dkld dk  ",
    // "kfdkk jfdlk dkld dk jfdlk dkld dk jfdlk dkld dk",
    // "jfdlk dkld dkjfdlk dkld dkjfdlk dkld dkjfdlk dkld dkjfdlk dkld dk",
    // "jfklddfk lklj jfdlk dkld dkjfdlk dkld dkjfdlk dkld dkjfdlk dkld dkjfdlk dkld dkjfdlk dkld dk  ",
    // "kfdkk jfdlk dkld dk jfdlk dkld dk jfdlk dkld dk",
    // "jfdlk dkld dkjfdlk dkld dkjfdlk dkld dkjfdlk dkld dkjfdlk dkld dk",
    // "jfklddfk lklj jfdlk dkld dkjfdlk dkld dkjfdlk dkld dkjfdlk dkld dkjfdlk dkld dkjfdlk dkld dk  ",
  ]);
  // const [showAll, setShowAll] = useState(false);

  // useEffect(() => {
  //   fetchNotices();
  // }, []);
  const [resolution, setResolution] = useState([]);
  const [circular, setCircular] = useState([]);
  const [loadingResolution, setLoadingResolution] = useState(true);
  const [loadingCircular, setLoadingCircular] = useState(true);
  const [loadingNotices, setLoadingNotices] = useState(true);
  const skeletonArray = Array.from({ length: 5 }, (_, index) => (
    <>
      <Skeleton key={index} variant="wave" width={"100%"} height={40} />
      <br />
    </>
  ));
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${apiUrl}/jmoa_resolution_all_data`,
          config
        );
        if (
          res.data["body-json"]["statusCode"] !== 200 ||
          res.data["body-json"]["statusCode"] === undefined
        ) {
          swal({
            title: "Error!",
            text: "Error fetching data!!",
            icon: "error",
            button: "Ok!",
          });
        }
        if (
          res.data["body-json"]["body"] === undefined ||
          res.data["body-json"]["body"].length === 0
        ) {
          setResolution([]);
        } else {
          setResolution(res.data["body-json"]["body"]);
        }
      } catch (error) {
        swal({
          title: "Error!",
          text: "Error fetching data!! " + error,
          icon: "error",
          button: "Aww No!",
        });
        console.error("Error:", error);
      } finally {
        setLoadingResolution(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${apiUrl}/jmoa_notice_all_data`, config);
        if (
          res.data["body-json"]["statusCode"] !== 200 ||
          res.data["body-json"]["statusCode"] === undefined
        ) {
          swal({
            title: "Error!",
            text: "Error fetching data!!",
            icon: "error",
            button: "Ok!",
          });
        }
        if (
          res.data["body-json"]["body"] === undefined ||
          res.data["body-json"]["body"].length === 0
        ) {
          setNotices([]);
        } else {
          setNotices(res.data["body-json"]["body"]);
        }
      } catch (error) {
        swal({
          title: "Error!",
          text: "Error fetching data!! " + error,
          icon: "error",
          button: "Aww No!",
        });
        console.error("Error:", error);
      } finally {
        setLoadingNotices(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${apiUrl}/jmoa_circular_all_data`, config);
        if (
          res.data["body-json"]["statusCode"] !== 200 ||
          res.data["body-json"]["statusCode"] === undefined
        ) {
          swal({
            title: "Error!",
            text: "Error fetching data!!",
            icon: "error",
            button: "Ok!",
          });
        }
        if (
          res.data["body-json"]["body"] === undefined ||
          res.data["body-json"]["body"].length === 0
        ) {
          setCircular([]);
        } else {
          setCircular(res.data["body-json"]["body"]);
        }
      } catch (error) {
        swal({
          title: "Error!",
          text: "Error fetching data!! " + error,
          icon: "error",
          button: "Aww No!",
        });
        console.error("Error:", error);
      } finally {
        setLoadingCircular(false);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <div className="p-5 grid grid-cols-1  lg:grid-cols-3 gap-2">
        <div>
          <div
            className="max-w-md mx-auto mt-8 p-4 bg-teal-400 rounded-lg shadow-lg"
            style={{ maxHeight: "auto", overflowY: "auto" }}
          >
            <h2 className="text-xl font-bold mb-4" style={{ color: "red" }}>
              Latest Resolutions
            </h2>
            {loadingResolution ? (
              // <Skeleton variant="wave" width={400} height={300} />
              skeletonArray
            ) : (
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Date </TableCell>
                      <TableCell>Issue No.</TableCell>
                      <TableCell>Description</TableCell>
                      <TableCell>PDF</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {(rowsPerPage > 0
                      ? resolution.slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                      : resolution
                    ).map((notice, index) => (
                      <TableRow key={index}>
                        <TableCell>{notice.date}</TableCell>
                        <TableCell>{notice.issueNo}</TableCell>
                        <TableCell>{notice.title}</TableCell>
                        <TableCell>
                          <VisibilityIcon
                            style={{
                              color: "green",
                              cursor: "pointer",
                            }}
                            onClick={() => handleViewPDF(notice.link)}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <TablePagination
                  rowsPerPageOptions={rowsPerPageOptions}
                  component="div"
                  count={resolution.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </TableContainer>
            )}
          </div>
        </div>

        <div>
          <div
            className="max-w-md mx-auto mt-8 p-4 bg-gray-300 rounded-lg shadow-lg"
            style={{ maxHeight: "auto", overflowY: "auto" }}
          >
            <h2 className="text-xl font-bold mb-4" style={{ color: "blue" }}>
              Latest Notices
            </h2>
            {loadingNotices ? (
              // <Skeleton variant="wave" width={400} height={300} />
              skeletonArray
            ) : (
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Date</TableCell>
                      <TableCell>Issue No.</TableCell>
                      <TableCell>Description</TableCell>
                      <TableCell>PDF</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {(rowsPerPage1 > 0
                      ? notices.slice(
                          page1 * rowsPerPage1,
                          page1 * rowsPerPage1 + rowsPerPage1
                        )
                      : notices
                    ).map((notice, index) => (
                      <TableRow key={index}>
                        <TableCell>{notice.date}</TableCell>
                        <TableCell>{notice.issueNo}</TableCell>
                        <TableCell>{notice.title}</TableCell>
                        <TableCell>
                          <VisibilityIcon
                            style={{
                              color: "green",
                              cursor: "pointer",
                            }}
                            onClick={() => handleViewPDF(notice.link)}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <TablePagination
                  rowsPerPageOptions={rowsPerPageOptions}
                  component="div"
                  count={notices.length}
                  rowsPerPage={rowsPerPage1}
                  page={page1}
                  onPageChange={handleChangePage1}
                  onRowsPerPageChange={handleChangeRowsPerPage1}
                />
              </TableContainer>
            )}
          </div>
        </div>

        <div>
          <div
            className="max-w-md mx-auto mt-8 p-4 bg-green-400 rounded-lg shadow-lg"
            style={{ maxHeight: "auto", overflowY: "auto" }}
          >
            <h2 className="text-xl font-bold mb-4" style={{ color: "green" }}>
              Latest Circulars
            </h2>
            {loadingCircular ? (
              // <Skeleton variant="wave" width={400} height={300} />
              skeletonArray
            ) : (
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Date</TableCell>
                      <TableCell>Issue No.</TableCell>
                      <TableCell>Description</TableCell>
                      <TableCell>PDF</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {(rowsPerPage2 > 0
                      ? circular.slice(
                          page2 * rowsPerPage2,
                          page2 * rowsPerPage2 + rowsPerPage2
                        )
                      : circular
                    ).map((notice, index) => (
                      <TableRow key={index}>
                        <TableCell>{notice.date}</TableCell>
                        <TableCell>{notice.issueNo}</TableCell>
                        <TableCell>{notice.title}</TableCell>
                        <TableCell>
                          <VisibilityIcon
                            style={{
                              color: "green",
                              cursor: "pointer",
                            }}
                            onClick={() => handleViewPDF(notice.link)}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <TablePagination
                  rowsPerPageOptions={rowsPerPageOptions}
                  component="div"
                  count={circular.length}
                  rowsPerPage={rowsPerPage2}
                  page={page2}
                  onPageChange={handleChangePage2}
                  onRowsPerPageChange={handleChangeRowsPerPage2}
                />
              </TableContainer>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

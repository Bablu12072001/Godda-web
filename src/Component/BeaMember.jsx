/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import React, { useState } from "react";
import axios from "axios";
import {
  Card,
  Grid,
  Button,
  Divider,
  MenuItem,
  TextField,
  CardHeader,
  Typography,
  CardContent,
  CardActions,
  CircularProgress,
  FormControlLabel,
  Checkbox,
  Box,
} from "@mui/material";
import scanner from "../Assets/scanner1.png";

// Material Dashboard 2 React components
// import MDBox from "components/MDBox";
// import MDTypography from "components/MDTypography";
// import { accessToken } from "../Authentication";

// Import react-toastify components
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Material Dashboard 2 React example components

function BeAMemberForm() {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",

    creator_email: "raushansinghd2003@gmail.com",
    creator_role: "admin",

    password: "",

    department: "",
    designation: "",

    joiningDate: "",
    contactNumber: "",
    address: {
      village: "",
      pincode: "",
      city: "",
      state: "",
    },
    email: "",
    officeLevel: "",
    officeName: "",
    subDivision: "",
    block: "",
    lastSixDigitOfAadhar: "",
    parentalUnion: "",
    yearlyMemberFreeRemitted: "",
    district: "",
    employeeType: "",
    transactionNo: "",

    declaration: false,
    sign: {
      name: "",
      base64: "",
    },
    image: {
      name: "",
      base64: "",
    },
  });

  const handleInputChange = (prop) => (event) => {
    if (prop.includes(".")) {
      const [parentProp, childProp] = prop.split(".");
      setFormData({
        ...formData,
        [parentProp]: {
          ...formData[parentProp],
          [childProp]: event.target.value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [prop]: event.target.value,
      });
    }
  };

  const handleFileInputChange = (prop) => (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          [prop]: {
            name: file.name,
            base64: reader.result.split(",")[1], // Remove data url prefix
          },
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      // Make the POST request using Axios
      const response = await axios.post(
        "https://vkfpe87plb.execute-api.ap-south-1.amazonaws.com/production/jmoa_employee_register",
        formData
      );

      if (response.data["body-json"].statusCode === 200) {
        toast.success(response.data["body-json"].body);
        setFormData({
          name: "",
          creator_email: "raushansinghd2003@gmail.com",
          creator_role: "admin",
          password: "",
          department: "",
          designation: "",
          joiningDate: "",
          contactNumber: "",
          address: {
            village: "",
            pincode: "",
            city: "",
            state: "",
          },
          email: "",
          officeLevel: "",
          officeName: "",
          subDivision: "",
          block: "",
          lastSixDigitOfAadhar: "",
          parentalUnion: "",
          yearlyMemberFreeRemitted: "",
          district: "",
          employeeType: "",
          transactionNo: "",
          declaration: false,
          sign: {
            name: "",
            base64: "",
          },
          image: {
            name: "",
            base64: "",
          },
        });
      } else {
        toast.error(response.data["body-json"].body);
      }
    } catch (error) {
      // Handle errors
      console.error("Error:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      // Set loading to false after the API call is complete
      setLoading(false);
    }
  };
  const isSubmitDisabled = !formData.transactionNo;

  // const handleOfficeLevelChange = (event) => {
  //   const selectedOfficeLevel = event.target.value;
  //   setFormData({
  //     ...formData,
  //     officeLevel: selectedOfficeLevel,
  //     subDivision: "",
  //     block: "",
  //   });
  // };
  const handleOfficeLevelChange = (event) => {
    const selectedOfficeLevel = event.target.value;
    setFormData({
      ...formData,
      officeLevel: selectedOfficeLevel,
      subDivision: "", // Reset subDivision when officeLevel changes
      block: "",
    });
  };
  const handleCheckboxChange = (e, setState) => {
    setState(e.target.checked);
  };
  return (
    <>
      <ToastContainer />

      <div className="w-3/5 mx-auto mt-8 text-center">
        {/* <h1 className="text-3xl font-bold mb-6 border-b-2 border-gray-500 pb-2 inline-block text-blue-900">
          Membership Benefits
        </h1>
        <p className="mt-4 mb-6 " style={{ color: "#454e81" }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum quos
          possimus perspiciatis maxime repudiandae et ad voluptatem debitis unde
          tempora! Totam omnis recusandae iure exercitationem qui ratione eius
          est aperiam eligendi, ab porro excepturi? Eligendi, accusantium
          asperiores eaque aliquid perferendis dignissimos unde velit alias
        </p> */}

        <h1 className="text-3xl font-bold mb-6 border-b-2 border-gray-500 pb-2 inline-block text-blue-900">
          Be a Member
        </h1>
      </div>
      <Box sx={{ margin: 5 }} pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <Card>
                <Divider sx={{ margin: 0 }} />
                <form onSubmit={handleSubmit}>
                  <CardContent>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Name"
                          placeholder="Name"
                          value={formData.name}
                          onChange={handleInputChange("name")}
                          required
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Password"
                          placeholder="Password"
                          value={formData.password}
                          onChange={handleInputChange("password")}
                          required
                        />
                      </Grid>

                      {/* <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Creator Email"
                          placeholder="Creator Email"
                          value={formData.creator_email}
                          onChange={handleInputChange("creator_email")}
                          required
                        />
                      </Grid> */}
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Office Level"
                          select
                          value={formData.officeLevel}
                          onChange={handleOfficeLevelChange}
                          required
                        >
                          <MenuItem value="district">District</MenuItem>
                          <MenuItem value="subDivision">Sub-Division</MenuItem>
                          <MenuItem value="block">Block</MenuItem>
                        </TextField>
                      </Grid>

                      {formData.officeLevel === "subDivision" && (
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            label="Sub Division"
                            select
                            value={formData.subDivision}
                            onChange={handleInputChange("subDivision")}
                            required
                          >
                            <MenuItem value="godda sadar">Godda Sadar</MenuItem>
                            <MenuItem value="mahagama">Mahagama</MenuItem>
                          </TextField>
                        </Grid>
                      )}
                      {formData.officeLevel === "block" && (
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            label="Block"
                            select
                            value={formData.block}
                            onChange={handleInputChange("block")}
                            required
                          >
                            <MenuItem value="basantrai">Basantrai</MenuItem>
                            <MenuItem value="boarijore">Boarijore</MenuItem>
                            <MenuItem value="godda">Godda</MenuItem>
                            <MenuItem value="mahagama">Mahagama</MenuItem>
                            <MenuItem value="meharma">Meharma</MenuItem>
                            <MenuItem value="pathergama">Pathergama</MenuItem>
                            <MenuItem value="poraiyahat">Poraiyahat</MenuItem>
                            <MenuItem value="sunderpahari">
                              Sunderpahari
                            </MenuItem>
                            <MenuItem value="thakurgangti">
                              Thakurgangti
                            </MenuItem>
                          </TextField>
                        </Grid>
                      )}
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Designation"
                          placeholder="Designation"
                          value={formData.designation}
                          onChange={handleInputChange("designation")}
                          required
                        />
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Joining Date"
                          type="date"
                          value={formData.joiningDate}
                          onChange={handleInputChange("joiningDate")}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          required
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Contact Number"
                          placeholder="Contact Number"
                          type="tel"
                          value={formData.contactNumber}
                          onChange={handleInputChange("contactNumber")}
                          required
                          inputProps={{
                            pattern: "[6-9]{1}[0-9]{9}",
                            title:
                              "Contact number should start with a digit from 6 to 9 and have 10 digits in total",
                            maxLength: 10,
                          }}
                        />
                        <Typography variant="body2" color="textSecondary">
                          Format: 6-9XXXXXXXXX (e.g., 9876543210)
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Department"
                          placeholder="Department"
                          value={formData.department}
                          onChange={handleInputChange("department")}
                          required
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="District"
                          placeholder="District"
                          value={formData.district}
                          onChange={handleInputChange("district")}
                          required
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Office Name"
                          placeholder="Office Name"
                          value={formData.officeName}
                          onChange={handleInputChange("officeName")}
                          required
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="h6" sx={{ marginBottom: 1 }}>
                          Address
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Village"
                          placeholder="Village"
                          value={formData.address.village}
                          onChange={handleInputChange("address.village")}
                          required
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Pincode"
                          placeholder="Pincode"
                          type="number"
                          value={formData.address.pincode}
                          onChange={handleInputChange("address.pincode")}
                          required
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="City"
                          placeholder="City"
                          value={formData.address.city}
                          onChange={handleInputChange("address.city")}
                          required
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="State"
                          placeholder="State"
                          value={formData.address.state}
                          onChange={handleInputChange("address.state")}
                          required
                        />
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Last Six Digits of Aadhar"
                          placeholder="Last Six Digits of Aadhar"
                          value={formData.lastSixDigitOfAadhar}
                          onChange={handleInputChange("lastSixDigitOfAadhar")}
                          required
                          inputProps={{
                            pattern: "[0-9]{6}",
                            title:
                              "Aadhar number should be exactly Last 6 digits",
                            maxLength: 6,
                          }}
                        />
                        <Typography variant="body2" color="textSecondary">
                          Format: XXXXXX (e.g., 123456)
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Parent Union"
                          placeholder="Parent Union"
                          value={formData.parentalUnion}
                          onChange={handleInputChange("parentalUnion")}
                          required
                        />
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Employee Type"
                          select
                          value={formData.employeeType}
                          onChange={handleInputChange("employeeType")}
                          required
                        >
                          <MenuItem value="regular">Regular</MenuItem>
                          <MenuItem value="contractual">Contractual</MenuItem>
                          <MenuItem value="outsourced">Outsourced</MenuItem>
                          <MenuItem value="daily waged">Daily wages</MenuItem>
                        </TextField>
                      </Grid>

                      {/* <Grid item xs={12}>
                        <FormControlLabel
                          control={<Checkbox checked={formData.delcaration} onChange={handleInputChange("declaration")} />}
                          label="Declaration"
                        />
                      </Grid> */}
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Email"
                          placeholder="Email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange("email")}
                          required
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="h6" sx={{ marginBottom: 1 }}>
                          Upload Profile Image
                        </Typography>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileInputChange("image")}
                          style={{ marginBottom: "10px" }}
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <Typography variant="h6" sx={{ marginBottom: 1 }}>
                          Upload Signature
                        </Typography>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileInputChange("sign")}
                          style={{ marginBottom: "10px" }}
                        />
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography
                        variant="h6"
                        style={{ marginBottom: "10px", textAlign: "center" }}
                      >
                        Account Details and Scanner
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: { xs: "column", md: "row" }, // Stack on mobile, row on larger screens
                          alignItems: "center", // Center items horizontally
                          border: "1px solid #ccc",
                          padding: "10px",
                          marginTop: "10px",
                        }}
                      >
                        <Box
                          sx={{
                            flex: "1 1 auto",
                            paddingRight: { xs: "0", md: "10px" },
                            marginBottom: { xs: "0", md: "0" }, // Reduced marginBottom
                            textAlign: "left", // Left align text content
                          }}
                        >
                          <Typography variant="body1">
                            <strong>Bank Name:</strong> Indian Bank
                          </Typography>
                          <Typography variant="body1">
                            <strong>Branch:</strong> GODDA
                          </Typography>
                          <Typography variant="body1">
                            <strong>IFS Code:</strong> IDIB000G576
                          </Typography>
                          <Typography variant="body1">
                            <strong>Account Name:</strong> JSNGEF GODDA
                          </Typography>
                          <Typography variant="body1">
                            <strong>Account No:</strong> 7516125458
                          </Typography>
                        </Box>
                        <img
                          src={scanner} // Assuming 'scanner' is imported or defined elsewhere
                          alt="no scanner"
                          style={{
                            width: "200px",
                            height: "200px",
                            marginLeft: { xs: "0", md: "10px" }, // Added left margin for spacing
                          }}
                        />
                      </Box>
                      <Typography
                        variant="body2"
                        style={{ marginTop: "10px", textAlign: "center" }}
                      >
                        <strong>Note:</strong> If you want to become a member,
                        pay only 150 rupees for the membership.
                      </Typography>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Yearly Member Fee Remitted"
                        select
                        value={formData.yearlyMemberFreeRemitted}
                        onChange={handleInputChange("yearlyMemberFreeRemitted")}
                        required
                      >
                        <MenuItem value="yes">Yes</MenuItem>
                        <MenuItem value="no">No</MenuItem>
                      </TextField>
                      <Typography></Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} mt={4}>
                      <TextField
                        fullWidth
                        label="Transaction/Ref no"
                        placeholder="Transaction/Ref no"
                        value={formData.transactionNo}
                        onChange={handleInputChange("transactionNo")}
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={formData.declaration}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                declaration: e.target.checked,
                              })
                            }
                          />
                        }
                        label="Declaration"
                      />
                      <Typography>
                        I hereby declare that I will follow the terms and
                        conditions of the federation. I want to be a member of
                        Jharkhand State Non-Gazetted Employees Federation,
                        Godda.
                      </Typography>
                    </Grid>
                  </CardContent>
                  <Divider sx={{ margin: 0 }} />
                  <CardActions sx={{ justifyContent: "center" }}>
                    <Button
                      size="small"
                      type="submit"
                      sx={{
                        mt: 2,
                        width: 80,
                        height: 40,
                        color: "white",
                        minWidth: "auto",
                      }}
                      variant="contained"
                      disabled={loading || isSubmitDisabled}
                      style={{ color: "white", minWidth: "auto" }}
                    >
                      {loading ? (
                        <CircularProgress size={20} color="inherit" />
                      ) : (
                        "Submit"
                      )}
                    </Button>
                  </CardActions>
                </form>
              </Card>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default BeAMemberForm;

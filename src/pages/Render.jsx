import React, { useEffect } from "react";
import { Alert, Box, Typography } from "@mui/material";
import Layout from "../components/Layout";
import { Container } from "@mui/system";
import { useParams } from "react-router-dom";
import CollegeLogoURL from "../assets/logos/college-logo.png";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchApplications,
  selectApplicationById,
  selectApplicationStatus,
} from "../feature/application/applicationSlice";
import TestimonialPatternURL from "../assets/logos/testimonial-pat.jpg";

const renderResultType = (type) => {
  switch (type) {
    case "cgpaOfFour":
      return "CGPA (out of 4)";
    case "gpaOfFive":
      return "GPA (out of 5)";
    case "class":
      return "CLASS";
    case "division":
      return "DIVISION";
    default:
      return "N/A";
  }
};

const renderGroup = (group) => {
  switch (group) {
    case "sc":
      return "SCIENCE";
    case "hu":
      return "HUMANITIES";
    case "bs":
      return "BUSINESS STUDIES";
    case "ba":
      return "BACHELOR OF ARTS";
    case "bss":
      return "BACHELOR OF SOCIAL SCIENCE";
    case "bbs":
      return "BACHELOR OF BUSINESS STUDIES";
    case "pol":
      return "BACHELOR OF SOCIAL SCIENCE (HONS) IN POLITICAL SCIENCE";
    case "ban":
      return "BACHELOR OF ARTS (HONS) IN BANGLA";
    case "hrm":
      return "HUMAN RESOURCE MANAGEMENT";
    case "co":
      return "COMPUTER OPERATION";
    default:
      return "N/A";
  }
};

const Render = () => {
  const { id, type } = useParams();
  const application = useSelector(selectApplicationById(id))[0];
  const status = useSelector(selectApplicationStatus);
  const dispatch = useDispatch();
  useEffect(() => {
    if (status === "idle") dispatch(fetchApplications());
  }, [id, status, dispatch]);
  console.log(application);
  return (
    <Layout print>
      {application && application.status === "Done" ? (
        <Box>
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Box
              sx={{
                width: 1200,
                height: 730,
                p: 2,
                background: `URL(${CollegeLogoURL}) rgba(0, 0, 0, .9)`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundColor: "background.paper",
                backgroundSize: "60%",
                position: "relative",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  bottom: 0,
                  left: 0,
                  right: 0,
                  backgroundColor: "background.paper",
                  opacity: 0.97,
                  px: 4,
                  py: 4,
                  fontFamily: "monospace",
                  border: "10px solid transparent",
                  borderImage: `URL(${TestimonialPatternURL})`,
                  borderImageRepeat: "round",
                  borderImageSlice: 30,
                  borderImageWidth: 2,
                  borderRadius: 3,
                }}
              >
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Box>
                    <Typography
                      textAlign="center"
                      variant="h3"
                      sx={{ fontStyle: "italic", fontFamily: "inherit" }}
                    >
                      Jibannagar Degree College
                    </Typography>
                    <Typography
                      textAlign="center"
                      variant="h5"
                      sx={{ fontStyle: "italic", fontFamily: "inherit" }}
                    >
                      Jibannagar, Chuadanga
                    </Typography>
                    <Typography
                      textAlign="center"
                      variant="h5"
                      sx={{ fontStyle: "italic", fontFamily: "inherit" }}
                    >
                      ESTD: 1984
                    </Typography>
                    <Typography
                      textAlign="center"
                      variant="h5"
                      sx={{ fontFamily: "inherit", mt: 2 }}
                    >
                      EIIN: <strong>115461</strong>, NU-COLLEGE CODE: 0807,
                      JESSORE BOARD COLLEGE CODE: 115623, TELEPHONE:
                      +880762475047, EMAIL:{" "}
                      <strong>jdcjibannagar@gmail.com</strong>
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      mt: 6,
                      mx: 4,
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                      <Box
                        sx={{
                          backgroundColor: "primary.light",
                          p: 1,
                          borderRadius: 5,
                          color: "#fff",
                          px: 2,
                        }}
                      >
                        <Typography variant="h4" sx={{ fontWeight: 500 }}>
                          {type.toUpperCase()}
                        </Typography>
                      </Box>
                    </Box>
                    <Typography
                      textAlign="justify"
                      variant="h5"
                      sx={{ fontStyle: "italic", fontFamily: "inherit", mt: 2 }}
                    >
                      It is to certify that{" "}
                      <strong>{application.name.toUpperCase()}</strong>, father
                      name:{" "}
                      <strong>{application.fatherName.toUpperCase()}</strong>,
                      mother name:{" "}
                      <strong>{application.motherName.toUpperCase()}</strong>.
                      He/She has been passed{" "}
                      <strong>{application.lastExamName.toUpperCase()}</strong>{" "}
                      on <strong>{application.passingYear}</strong>. He/She
                      bearing roll: <strong>{application.roll}</strong>,
                      registration: <strong>{application.registration}</strong>.
                      He/She has gained <strong>{application.result}</strong>{" "}
                      {renderResultType(application.resultType)} on{" "}
                      <strong>{renderGroup(application.group)}</strong>{" "}
                      group/subject/trade.
                      <br />
                      <br />I wish your life best.
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        mt: 3,
                      }}
                    >
                      <Typography
                        variant="h5"
                        sx={{
                          fontStyle: "italic",
                          fontFamily: "inherit",
                          mt: 2,
                          textAlign: "center",
                        }}
                      >
                        Principal <br />
                        Jibannagar Degree College
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Container>
        </Box>
      ) : (
        <Alert severity="error">
          Application {id} is wrong. Please try again
        </Alert>
      )}
    </Layout>
  );
};

export default Render;

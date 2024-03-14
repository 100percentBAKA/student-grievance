import { useEffect, useState } from "react";

//* MUI components import
import {
  Box,
  Button,
  ButtonGroup,
  IconButton,
  Tooltip,
  styled,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

//* native components import
import CustomH3 from "../components/ui/CustomH3";
import ContainedButton from "../components/ui/ContainedButton";
import SubContainer from "../components/ui/SubContainer";
import BannerBG from "../components/ui/BannerBG";
import MarginTopBox from "../components/ui/MarginTopBox";
import ModalWindowLoader from "../components/ui/ModalWindowLoader";

import {
  BANNER_SIZE_DASHBOARD,
  BANNER_SIZE_DASHBOARD_MD,
  FONTSIZE_BIGGER,
  FONTSIZE_MEDIUM,
  FONTSIZE_SMALL,
  FONTSIZE_SMALL_MID,
} from "../data/constants";

//* react router dom
import { useNavigate } from "react-router-dom";

//* custom api hooks imports
import useFetchData from "../hooks/useFetchData";

//? styled components
const StyledSubCtn = styled(Box)(({ theme }) => ({
  display: "flex",
  height: "100%",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",

  [theme.breakpoints.down("md")]: {
    alignItems: "start",
    justifyContent: "center",
    flexDirection: "column",
  },
}));

const StyledBtn = styled(Button)(({ theme }) => ({
  color: theme.palette.secondary.main,
  fontSize: FONTSIZE_MEDIUM,

  [theme.breakpoints.down("md")]: {
    fontSize: FONTSIZE_SMALL,
  },
}));

const StyledBtnGrp = styled(ButtonGroup)(({ theme }) => ({
  marginTop: theme.spacing(3),
}));

const StyledMainCtn = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2.5),
  display: "flex",
  flexDirection: "column",
  borderTop: "0.5px solid black",
  color: theme.palette.secondary.main,
  fontSize: FONTSIZE_MEDIUM,
  fontWeight: 500,

  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(2),
  },
}));

const StyledSubCtnMobile = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  marginTop: theme.spacing(2),
  justifyContent: "space-between",

  [theme.breakpoints.down("md")]: {
    marginTop: theme.spacing(1),
    rowGap: theme.spacing(2.5),
    flexDirection: "column",
  },
}));

const StyledCatSpan = styled("span")(({ theme }) => ({
  cursor: "pointer",
  backgroundColor: "#ADD8E6",
  borderRadius: theme.shape.borderRadius,
  padding: "0 3px",
  transition: "background-color 0.2s ease-in-out",
  fontSize: FONTSIZE_SMALL,

  "&:hover": {
    backgroundColor: "#87CEEB",
  },
}));

const StyledCardTitle = styled(Box)(({ theme }) => ({
  // flex: 0.65,
  cursor: "pointer",
  color: theme.palette.secondary.main,
  fontSize: FONTSIZE_MEDIUM,
  textDecoration: "none",
  transition: "color 0.15s ease",

  [theme.breakpoints.down("md")]: {
    fontSize: FONTSIZE_SMALL_MID,
  },

  "&:hover": {
    color: theme.palette.primary.main,
  },
}));

const StyledCtnHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    gap: theme.spacing(2),
  },
}));

function toolTipColor(status) {
  switch (status) {
    case "RAISED":
      return "red";
    case "PENDING_ACTION":
      return "yellow";
    case "IN_PROGRESS":
      return "yellow";
    case "WITH_DRAWN":
      return "black";
    case "RESOLVED":
      return "green";
    default:
      return "white";
  }
}

export default function StudentDashboard() {
  //? useMediaQuery
  const theme = useTheme();
  const isScreenSmaller = useMediaQuery(theme.breakpoints.down("md"));

  //? states
  const [showResolved, setShowResolved] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showUnResolved, setShowUnResolved] = useState(false);
  const [grievances, setGrievances] = useState([]);
  const [modal, setModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  // ? handling programmatic navigation
  const navigate = useNavigate();

  //? handling conditional selection of api endpoint
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const usn = userDetails?.usn;
  const userAuth = userDetails?.userAuthority;
  const apiUrl =
    userAuth === "FACULTY"
      ? `https://43.204.145.104:8000/grievance/get?pageNo=${currentPage}`
      : `https://43.204.145.104:8000/student/${usn.toUpperCase()}/grievances`;

  useEffect(() => {
    const fetchData = async () => {
      setModal(true);
      try {
        const response = await fetch(apiUrl);
        const json = await response.json();

        if (userAuth === "FACULTY") {
          setGrievances(json.Content);
          setTotalPages(json.TotalPages);
        } else {
          setGrievances(json);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setModal(false);
      }
    };

    fetchData();
  }, [apiUrl, currentPage, userAuth]);

  const modelAndDelay = (to, delay = 1000) => {
    setModal(true);
    setTimeout(() => {
      setModal(false);
      navigate(to);
    }, delay);
  };

  const handleNav = () => {
    //? parameters: to, delay (default=1000)
    modelAndDelay("/forms");
  };

  const handleTitleClick = (id) => {
    //? parameters: to, delay
    modelAndDelay(`/grievance/${id}`, 1200);
  };

  const handleAllClick = () => {
    setShowResolved(false);
    setShowUnResolved(false);
  };

  const handleResBtnClick = () => {
    setShowResolved(true);
    setShowUnResolved(false);
  };

  const handleUnResBtnClick = () => {
    setShowUnResolved(true);
    setShowResolved(false);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const filterGrievances = (grievances) => {
    if (showResolved) {
      return grievances.filter(
        (grievance) => grievance.grievanceStatus === "RESOLVED"
      );
    } else if (showUnResolved) {
      return grievances.filter(
        (grievance) => grievance.grievanceStatus !== "RESOLVED"
      );
    } else {
      return grievances;
    }
  };

  // const filteredGrievances = filterGrievances(grievances).filter((grievance) =>
  //   grievance.title.toLowerCase().includes(searchQuery.toLowerCase())
  // );

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}`;
    const formattedTime = `${date.getHours()}:${date.getMinutes()}`;
    return `${formattedDate} ${formattedTime}`;
  };

  return (
    <MarginTopBox>
      <Stack>
        <BannerBG
          height={
            isScreenSmaller ? BANNER_SIZE_DASHBOARD_MD : BANNER_SIZE_DASHBOARD
          }
        >
          <SubContainer>
            <StyledSubCtn>
              <Box id="back-to-top-anchor">
                <CustomH3 fontSize={FONTSIZE_BIGGER} color="white">
                  Student Dashboard
                </CustomH3>

                {userAuth === "STUDENT" && (
                  <Box
                    sx={{ textDecoration: "none", marginTop: 2 }}
                    onClick={handleNav}
                  >
                    <ContainedButton padding="0.6rem 1rem">
                      Raise Grievance
                    </ContainedButton>
                  </Box>
                )}
              </Box>
            </StyledSubCtn>
          </SubContainer>
        </BannerBG>

        <StyledBtnGrp
          variant="outlined"
          aria-label="outlined button group"
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: FONTSIZE_MEDIUM,
          }}
        >
          <StyledBtn onClick={handleAllClick}>All</StyledBtn>
          <StyledBtn onClick={handleResBtnClick}>Resolved</StyledBtn>
          <StyledBtn onClick={handleUnResBtnClick}>Unresolved</StyledBtn>
        </StyledBtnGrp>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            marginTop: 5,
            marginBottom: 5,
          }}
        >
          {filterGrievances(grievances) &&
            filterGrievances(grievances).map((raw, index) => (
              <SubContainer key={index}>
                <StyledMainCtn>
                  <StyledCtnHeader
                    key={index}
                    onClick={() => handleTitleClick(raw.id)}
                  >
                    <StyledCardTitle>{raw.title}</StyledCardTitle>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 2,
                      }}
                    >
                      <StyledCatSpan>{raw.id}</StyledCatSpan>
                      <Tooltip title={raw.grievanceStatus}>
                        <IconButton
                          disableRipple
                          sx={{
                            width: "15px",
                            height: "15px",
                            borderRadius: "50%",
                            backgroundColor: toolTipColor(raw.grievanceStatus),
                          }}
                        ></IconButton>
                      </Tooltip>
                    </Box>
                  </StyledCtnHeader>
                  <StyledSubCtnMobile>
                    <Box sx={{ display: "flex", columnGap: 1 }}>
                      {["Academic Issues", "Career Services"].map(
                        (cat, catIndex) => (
                          <StyledCatSpan key={catIndex}>{cat}</StyledCatSpan>
                        )
                      )}
                    </Box>
                    <Box sx={{ fontSize: FONTSIZE_SMALL }}>
                      Asked: {formatDate(raw.asked)}
                    </Box>
                  </StyledSubCtnMobile>
                </StyledMainCtn>
              </SubContainer>
            ))}

          {/* {filterGrievances(data).length < 0 && (
          <Box sx={{ textAlign: "center" }}>
            <CustomH3>No grievance Data to Display</CustomH3>
          </Box>
        )} */}
        </Box>

        {/* Modal window with Loader */}
        <ModalWindowLoader modal={modal} setModal={setModal} />

        <SubContainer>
          <Box
            sx={{
              mt: 3,
              width: "100%",
              // bgcolor: "red",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* pagination counter */}
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              size="large"
              variant="outlined"
              color="primary"
            />
          </Box>
        </SubContainer>
      </Stack>
    </MarginTopBox>
  );
}

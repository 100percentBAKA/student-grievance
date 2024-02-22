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
  const [showUnResolved, setShowUnResolved] = useState(false);

  // ? handling programmatic navigation
  const navigate = useNavigate();

  const usn = JSON.parse(localStorage.getItem("userDetails"))?.usn;
  const { data, modal, setModal, error } = useFetchData(
    `http://localhost:8080/student/${usn.toUpperCase()}/grievances`
  );

  const modelAndDelay = (to, delay = 2000) => {
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
      <BannerBG
        height={
          isScreenSmaller ? BANNER_SIZE_DASHBOARD_MD : BANNER_SIZE_DASHBOARD
        }
      >
        <SubContainer>
          <StyledSubCtn>
            <CustomH3 fontSize={FONTSIZE_BIGGER} color="white">
              Student Dashboard
            </CustomH3>
            <Box
              sx={{ textDecoration: "none", marginTop: 2 }}
              id="back-to-top-anchor"
              onClick={handleNav}
            >
              <ContainedButton padding="0.6rem 1rem">
                Raise Grievance
              </ContainedButton>
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
        {filterGrievances(data) &&
          filterGrievances(data).map((raw, index) => (
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
                      // flex: 0.35,
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
    </MarginTopBox>
  );
}

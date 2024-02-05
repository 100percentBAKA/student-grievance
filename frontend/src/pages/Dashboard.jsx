import { useState } from "react";

//* MUI components import
import {
  Box,
  Button,
  ButtonGroup,
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

//* data import
import grievanceCardDisplayData from "../data/grievanceCardDisplayData";

import {
  BANNER_SIZE_DASHBOARD,
  BANNER_SIZE_DASHBOARD_MD,
  FONTSIZE_BIGGER,
  FONTSIZE_MEDIUM,
  FONTSIZE_SMALL,
  FONTSIZE_SMALL_MID,
} from "../data/constants";

//* react router dom
import { Link, useNavigate } from "react-router-dom";

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

export default function Dashboard() {
  //? useMediaQuery
  const theme = useTheme();
  const isScreenSmaller = useMediaQuery(theme.breakpoints.down("md"));

  // ? handling programmatic navigation
  const navigate = useNavigate();

  //? modal window handling
  const [modal, setModal] = useState(false);

  //! only for testing, will implement better loading animation later
  const handleNav = () => {
    console.log("clicked");
    setModal(true);

    setTimeout(() => {
      setModal(false);

      navigate("/forms");
    }, 1000);
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

            {/* //! Using Link component from 'react-router-dom' here */}
            <Box
              // component={Link}
              sx={{ textDecoration: "none", marginTop: 2 }}
              // to="/forms"
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
        {["All", "Resolved", "Unresolved"].map((buttonText) => (
          <StyledBtn>{buttonText}</StyledBtn>
        ))}
      </StyledBtnGrp>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          marginTop: 5,
          marginBottom: 5,
        }}
      >
        {grievanceCardDisplayData.map((data, index) => (
          <SubContainer>
            <StyledMainCtn key={index}>
              <StyledCardTitle component={Link} to={`/grievance/${index + 1}`}>
                {data.title}
              </StyledCardTitle>
              <StyledSubCtnMobile>
                <Box sx={{ display: "flex", columnGap: 1 }}>
                  {data.cat.map((cat, catIndex) => (
                    <StyledCatSpan key={catIndex}>{cat}</StyledCatSpan>
                  ))}
                </Box>
                <Box sx={{ fontSize: FONTSIZE_SMALL }}>
                  Asked: {data.time} ago
                </Box>
              </StyledSubCtnMobile>
            </StyledMainCtn>
          </SubContainer>
        ))}
      </Box>

      {/* Modal window with Loader */}
      <ModalWindowLoader modal={modal} setModal={setModal} />
    </MarginTopBox>
  );
}

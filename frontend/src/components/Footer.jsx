//? logo img import
import logoImg from "../assets/rnsit-logo.jpg";

import BannerBG from "./ui/BannerBG";
import CustomH3 from "./ui/CustomH3";

import { FONTSIZE_BIG, FONTSIZE_MEDIUM } from "../data/constants";

//* MUI components imports
import { Box, styled } from "@mui/material";

//* MUI icons imports
import LocationOnIcon from "@mui/icons-material/LocationOn";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import FacebookIcon from "@mui/icons-material/Facebook";
import XIcon from "@mui/icons-material/X";

import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";
import SubContainer from "./ui/SubContainer";

//? styled components
const StyledMainCtn = styled(Box)(({ theme }) => ({
  paddingTop: theme.spacing(5),
  color: "white",
  fontSize: FONTSIZE_MEDIUM,

  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",

  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    rowGap: theme.spacing(8),
  },
}));

const StyledAboutBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  width: "40%",
  rowGap: theme.spacing(3),

  [theme.breakpoints.down("md")]: {
    // alignItems: "center",
    width: "100%",
    // textAlign: "center",
  },
}));

const StyledContactUsBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  rowGap: theme.spacing(3),

  //   [theme.breakpoints.down("md")]: {
  //     alignItems: "center",
  //   },
}));

const StyledLogoImg = styled("img")(({ theme }) => ({
  maxWidth: "100%",
  height: "81px",
  width: "81px",
  transition: "height 0.3s ease-in-out",

  [theme.breakpoints.down("lg")]: {
    height: "71px",
    width: "71px",
  },

  [theme.breakpoints.down("md")]: {
    height: "61px",
    width: "61px",
  },

  [theme.breakpoints.down("sm")]: {
    height: "51px",
    width: "51px",
  },
}));

const StyledTextBox = styled(Box)(({ theme }) => ({
  marginLeft: theme.spacing(1.5),
}));

const StyledContentBox = styled(Box)(({ theme }) => ({
  textAlign: "center",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  marginTop: 1,
}));

export default function Footer() {
  return (
    <BannerBG>
      <SubContainer>
        <StyledMainCtn>
          <StyledAboutBox>
            <CustomH3 color="white" fontSize={FONTSIZE_BIG}>
              About us
            </CustomH3>
            <StyledLogoImg
              src={logoImg}
              alt="logo-footer"
              style={{ maxWidth: "100%" }}
            />
            <Box>
              RNS Institute of Technology (RNSIT) established in the year 2001,
              is the brainchild of the Group Chairman, Dr. R. N. Shetty.
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                columnGap: 1.25,
              }}
            >
              <FacebookIcon />
              <InstagramIcon />
              <XIcon />
              <YouTubeIcon />
              <LocationOnIcon />
            </Box>
          </StyledAboutBox>

          <StyledContactUsBox>
            <CustomH3 color="white" fontSize={FONTSIZE_BIG}>
              Contact Us
            </CustomH3>

            <Box>
              <CustomH3 color="white" fontSize={FONTSIZE_MEDIUM}>
                Enquiry
              </CustomH3>
              <StyledContentBox>
                <CallIcon sx={{ fontSize: FONTSIZE_MEDIUM }} />
                <StyledTextBox>+91 80286 11880 / 1 / 2</StyledTextBox>
              </StyledContentBox>

              <StyledContentBox>
                <EmailIcon sx={{ fontSize: FONTSIZE_MEDIUM }} />
                <StyledTextBox>info@rnsit.ac.in</StyledTextBox>
              </StyledContentBox>
            </Box>

            <Box>
              <CustomH3 color="white" fontSize={FONTSIZE_MEDIUM}>
                Admissions
              </CustomH3>
              <StyledContentBox>
                <CallIcon sx={{ fontSize: FONTSIZE_MEDIUM }} />
                <StyledTextBox> +91 80244 10020 / 21</StyledTextBox>
              </StyledContentBox>

              <StyledContentBox>
                <EmailIcon sx={{ fontSize: FONTSIZE_MEDIUM }} />
                <StyledTextBox>admissions@rnsit.ac.in</StyledTextBox>
              </StyledContentBox>
            </Box>

            <Box>
              <CustomH3 color="white" fontSize={FONTSIZE_MEDIUM}>
                Accounts Manager
              </CustomH3>
              <StyledContentBox>
                <CallIcon sx={{ fontSize: FONTSIZE_MEDIUM }} />
                <StyledTextBox>+91 90359 60355</StyledTextBox>
              </StyledContentBox>

              <StyledContentBox>
                <EmailIcon sx={{ fontSize: FONTSIZE_MEDIUM }} />
                <StyledTextBox>accounts@rnsit.ac.in</StyledTextBox>
              </StyledContentBox>
            </Box>
          </StyledContactUsBox>
        </StyledMainCtn>
      </SubContainer>
    </BannerBG>
  );
}

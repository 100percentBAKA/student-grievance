import bannerImg from "../assets/student-grievance-bg.jpg";

import { Box, styled } from "@mui/material";

const BannerBG = ({ children }) => {
  const StyledBanner = styled(Box)(({ theme }) => ({
    width: "100%",
    backgroundImage: `url(${bannerImg})`,
    height: "250px",
    objectFit: "cover",
  }));

  return <StyledBanner>{children}</StyledBanner>;
};

export default BannerBG;

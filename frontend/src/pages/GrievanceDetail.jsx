//* react router dom imports
import { useParams } from "react-router-dom";

//* MUI components imports
import { Box, styled } from "@mui/material";

//* native components imports
import MarginTopBox from "../components/ui/MarginTopBox";
import SubContainer from "../components/ui/SubContainer";
import CustomH3 from "../components/ui/CustomH3";

//* constants imports
import {
  FONTSIZE_BIG,
  FONTSIZE_BIG_MID,
  FONTSIZE_MEDIUM,
  FONTSIZE_SMALL,
  FONTSIZE_SMALL_MID,
} from "../data/constants";
import grievanceCardDisplayData from "../data/grievanceCardDisplayData";

//? styled components
const StyledCatSpan = styled("span")(({ theme }) => ({
  cursor: "pointer",
  backgroundColor: "#ADD8E6",
  borderRadius: theme.shape.borderRadius,
  padding: "0 3px",
  transition: "background-color 0.2s ease-in-out",
  fontWeight: 600,
  fontSize: FONTSIZE_SMALL,

  "&:hover": {
    backgroundColor: "#87CEEB",
  },
}));

const StyledMainArea = styled(Box)(({ theme }) => ({
  display: "flex",
  flex: 0.8,
  flexDirection: "column",
  rowGap: theme.spacing(2),
}));

const StyledTagCtn = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",

  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    rowGap: theme.spacing(2),
  },
}));

function GrievanceMainArea({ grievance }) {
  return (
    <MarginTopBox>
      <SubContainer>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            pt: 6,
          }}
        >
          <StyledMainArea>
            <CustomH3 color="black" fontSize={FONTSIZE_BIG_MID}>
              {grievance.title}
            </CustomH3>

            <Box sx={{ fontSize: FONTSIZE_SMALL_MID }}>{grievance.desc}</Box>

            <StyledTagCtn>
              <Box sx={{ display: "flex", columnGap: 1 }}>
                {grievance.cat.map((cat, catIndex) => (
                  <StyledCatSpan key={catIndex}>{cat}</StyledCatSpan>
                ))}
              </Box>
              {/* //! Time handling has to be performed here */}
              <Box sx={{ fontSize: FONTSIZE_SMALL }}>
                Asked: {grievance.time} ago
              </Box>
            </StyledTagCtn>
          </StyledMainArea>

          <Box>
            
          </Box>
        </Box>
      </SubContainer>
    </MarginTopBox>
  );
}

export default function GrievanceDetail() {
  const { grievanceID } = useParams();

  //? finding grievance with matching ID
  const grievance = grievanceCardDisplayData.find(
    (grievance) => grievance.id === parseInt(grievanceID)
  );

  return (
    <MarginTopBox>
      {grievance ? (
        //? if grievance found, main logic goes here
        <>
          <GrievanceMainArea grievance={grievance} grievanceID={grievanceID} />
        </>
      ) : (
        //? handle when grievance is not found
        <SubContainer>
          <Box
            sx={{
              fontSize: FONTSIZE_BIG_MID,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              padding: 20,
            }}
          >
            Grievance with ID: {grievanceID} not found
          </Box>
        </SubContainer>
      )}
    </MarginTopBox>
  );
}

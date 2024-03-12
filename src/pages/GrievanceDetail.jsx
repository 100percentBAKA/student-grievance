//* react router dom imports
import { useParams } from "react-router-dom";

//* MUI components imports
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Tooltip,
  styled,
} from "@mui/material";

//* MUI icons imports
import MoreVertIcon from "@mui/icons-material/MoreVert";

//* yup and formik
import { useFormik } from "formik";
import * as yup from "yup";

//* native components imports
import MarginTopBox from "../components/ui/MarginTopBox";
import SubContainer from "../components/ui/SubContainer";

//* constants imports
import {
  FONTSIZE_BIG_MID,
  FONTSIZE_MEDIUM,
  FONTSIZE_SMALL,
  FONTSIZE_SMALL_MID,
} from "../data/constants";
import useFetchData from "../hooks/useFetchData";
import ModalWindowLoader from "../components/ui/ModalWindowLoader";
import React, { useEffect, useState } from "react";

// * queries imports
import useMutateComment from "../queries/useMutateComment";
import { DisabledByDefault } from "@mui/icons-material";

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

const StyledTitle = styled(Box)(({ theme }) => ({
  fontWeight: 600,
  fontSize: "1.6rem",
  color: "black",

  [theme.breakpoints.down("lg")]: {
    fontSize: "1.45rem",
  },

  [theme.breakpoints.down("md")]: {
    fontSize: "1.3rem",
  },

  [theme.breakpoints.down("sm")]: {
    fontSize: "1.3rem",
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

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const formattedDate = `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()}`;
  const formattedTime = `${date.getHours()}:${date.getMinutes()}`;
  return `${formattedDate} ${formattedTime}`;
};

function GrievanceMainArea({ grievance, userAuth }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event) => {
    setAnchorEl(null);
  };

  return (
    <MarginTopBox>
      <SubContainer>
        <Box
          id="back-to-top-anchor"
          sx={{
            pt: 6,
            pb: 3,
            borderBottom: "0.5px solid black",
            width: "100%",
          }}
        >
          <StyledMainArea>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <StyledTitle>{grievance.title}</StyledTitle>
                <Tooltip title={grievance.grievanceStatus}>
                  <IconButton
                    disableRipple
                    sx={{
                      width: "20px",
                      height: "20px",
                      borderRadius: "50%",
                      backgroundColor: toolTipColor(grievance.grievanceStatus),
                    }}
                  ></IconButton>
                </Tooltip>
              </Box>

              <Box>
                <IconButton
                  id="menu-button"
                  onClick={(e) => handleClick(e)}
                  aria-controls={open ? "menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                >
                  <MoreVertIcon />
                </IconButton>

                <Menu
                  id="menu"
                  anchorEl={anchorEl}
                  open={open}
                  MenuListProps={{
                    "aria-labelledby": "menu-button",
                  }}
                  onClose={handleClose}
                >
                  {userAuth === "STUDENT" ? (
                    <>
                      <MenuItem>Mark Issue as resolved</MenuItem>
                      <MenuItem>Withdraw Issue</MenuItem>
                    </>
                  ) : (
                    <>
                      <MenuItem>Close Issue as resolved</MenuItem>
                      <MenuItem>Ask student to review the issue</MenuItem>
                      <MenuItem>Withdraw Issue</MenuItem>
                    </>
                  )}
                </Menu>
              </Box>
            </Box>

            <Box sx={{ fontSize: "1rem" }}>
              {grievance.elements[0].description}
            </Box>

            <StyledTagCtn>
              <Box sx={{ display: "flex", columnGap: 1 }}>
                {grievance.categories.map((cat, catIndex) => (
                  <StyledCatSpan key={catIndex}>{cat.category}</StyledCatSpan>
                ))}
              </Box>
              {/* //! Time handling has to be performed here */}
              <Box sx={{ fontSize: FONTSIZE_SMALL_MID }}>
                Asked: {formatDate(grievance.asked)}
              </Box>
            </StyledTagCtn>
          </StyledMainArea>
        </Box>
      </SubContainer>
    </MarginTopBox>
  );
}

function stringToColor(string) {
  let hash = 0;
  let i;

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
      fontSize: "0.65rem",
      width: "22px",
      height: "22px",
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}

function ReplyCtn({ responses }) {
  return (
    <SubContainer>
      <Box
        sx={{ textAlign: "center", my: 4, fontSize: "1.4rem", fontWeight: 600 }}
      >
        Comments
      </Box>

      {responses.length > 0 ? (
        responses.map((comment, index) => (
          <Box
            key={index}
            sx={{
              marginBottom: 1,
              display: "flex",
              flexDirection: "column",
              alignItems:
                comment.userAuthority === "STUDENT" ? "flex-start" : "flex-end",
            }}
          >
            <Box
              sx={{
                fontWeight: 600,
                marginBottom: 1,
                color: comment.userAuthority === "STUDENT" ? "blue" : "green",
                fontSize: "0.85rem",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 1,
                  alignItems: "center",
                }}
              >
                <Avatar {...stringAvatar(comment.commentedBy)} />
                {comment.commentedBy}
              </Box>
            </Box>
            <Box
              sx={{
                backgroundColor:
                  comment.userAuthority === "STUDENT" ? "#f0f0f0" : "#e6ffe6",
                padding: 1,
                borderRadius: "8px",
                width: "600px",
              }}
            >
              {comment.comment}
            </Box>
            <Box
              sx={{
                fontSize: "0.8rem",
                color: "gray",
                textAlign:
                  comment.userAuthority === "STUDENT" ? "left" : "right",
              }}
            >
              {formatDate(comment.createTimeStamp)}
            </Box>
          </Box>
        ))
      ) : (
        <Box
          sx={{
            fontSize: "1.15rem",
            fontWeight: 600,
            color: "secondary.main",
            textAlign: "center",
          }}
        >
          No Comments / Responses made yet
        </Box>
      )}
    </SubContainer>
  );
}

const StyledReplyBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "flex-start",
  marginTop: theme.spacing(6),
  flex: 0.05,

  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    gap: theme.spacing(2),
  },
}));

const StyledCommentBtn = styled(Button)(({ theme }) => ({
  color: theme.palette.common.white,
  borderRadius: "3px",
  textTransform: "none",
  backgroundColor: theme.palette.primary.main,
  boxShadow: `0 4px 10px 0 rgba(255, 101, 0, 0.3), 0 6px 20px 0 rgba(255, 101, 0, 0.19)`,
  fontSize: FONTSIZE_MEDIUM,
  width: "fit-content",
  transition: "all 0.3s ease",
  "&:hover": {
    backgroundColor: "#e63c1e",
    boxShadow: `0 8px 20px 0 rgba(255, 101, 0, 0.35), 0 12px 40px 0 rgba(255, 101, 0, 0.24)`,
  },

  [theme.breakpoints.down("md")]: {
    fontSize: FONTSIZE_SMALL,
  },
}));

//? comment schema
const COMMENT_SCHEMA = yup.object().shape({
  comment: yup.string().min(40, "Comment must be a minimum of 40 characters"),
});

function AddReply({ grievanceID }) {
  //? states to handle display of the textfield
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [modal, setModal] = useState(false);
  const mutation = useMutateComment(grievanceID);

  const [initialValues, setInitialValues] = useState(
    JSON.parse(localStorage.getItem("userDetails"))
  );

  useEffect(() => {
    setInitialValues(JSON.parse(localStorage.getItem("userDetails")));
  }, [setInitialValues]);

  //? formik form handling
  const formik = useFormik({
    initialValues: {
      comment: "",
    },

    validationSchema: COMMENT_SCHEMA,

    onSubmit: async (values) => {
      setModal(true);
      try {
        const commentData = {
          comment: values.comment,
          commentedBy: `${initialValues.firstname} ${initialValues.lastname}`,
          userAuthority: `${initialValues.userAuthority}`,
        };

        const response = await mutation.mutateAsync(commentData);
        setShowReplyBox(false);
      } catch (error) {
        throw new Error("error posting the comment");
      } finally {
        setModal(false);
      }
    },
  });

  return (
    <SubContainer>
      <StyledReplyBox>
        {showReplyBox ? (
          <StyledCommentBtn
            onClick={formik.handleSubmit}
            disabled={formik.values.comment.length < 50}
          >
            Post
          </StyledCommentBtn>
        ) : (
          <StyledCommentBtn onClick={() => setShowReplyBox(true)}>
            Add Comment
          </StyledCommentBtn>
        )}

        {showReplyBox && (
          <Box
            component="form"
            sx={{
              flex: 0.95,
              display: "flex",
              flexDirection: "column",
              gap: 2.5,
            }}
            onSubmit={formik.onSubmit}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "self-end",
              }}
            >
              <TextField
                id="comment"
                name="comment"
                label="Response"
                placeholder="Write Comments and responses. Minimum 50 characters."
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                value={formik.values.comment}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.comment && Boolean(formik.errors.comment)}
                helperText={formik.touched.comment && formik.errors.comment}
                inputProps={{ maxLength: 500 }}
              />

              {formik.values.comment.length < 50 ? (
                <Box sx={{ color: "red", fontSize: "10px" }}>
                  {`${formik.values.comment.length} / 500`}
                </Box>
              ) : (
                <Box sx={{ color: "green", fontSize: "10px" }}>
                  {`${formik.values.comment.length} / 500`}
                </Box>
              )}
            </Box>
          </Box>
        )}
      </StyledReplyBox>

      <ModalWindowLoader modal={modal} setModal={setModal} />
    </SubContainer>
  );
}

export default function GrievanceDetail() {
  const { grievanceID } = useParams();
  const { data, modal, setModal, error } = useFetchData(
    `http://localhost:8080/grievance/${grievanceID}`
  );

  const [userAuth, setUserAuth] = useState(
    JSON.parse(localStorage.getItem("userDetails")).userAuthority
  );

  useEffect(() => {
    setUserAuth(JSON.parse(localStorage.getItem("userDetails")).userAuthority);
  }, [setUserAuth]);

  return (
    <MarginTopBox>
      {data ? (
        //? if grievance found, main logic goes here
        <Box sx={{ marginBottom: 5 }}>
          <GrievanceMainArea
            grievance={data}
            grievanceID={grievanceID}
            userAuth={userAuth}
          />
          <ReplyCtn responses={data.comments} userAuth={userAuth} />
          <AddReply grievanceID={grievanceID} />
        </Box>
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

      <ModalWindowLoader modal={modal} setModal={setModal} />
    </MarginTopBox>
  );
}

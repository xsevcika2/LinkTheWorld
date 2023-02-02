import {
  Avatar,
  Box,
  CircularProgress,
  Container,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Skeleton,
  Typography,
} from "@mui/material";
import {
  CommentProps,
  PostProps,
  UserProps,
  getCommentsByPostID,
  getUser,
} from "../../api/api";
import { useStyles } from "./Post.styles";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { KeyboardArrowDown } from "@mui/icons-material";
import Comment from "../Comment/Comment";

const getUserData = async (userId: number, signal: AbortSignal) => {
  try {
    const res = await getUser(userId, { signal: signal });
    return res.data;
  } catch (err) {
    console.error(err);
  }
};

const getComments = async (postId: number, signal: AbortSignal) => {
  try {
    const res = await getCommentsByPostID(postId, { signal: signal });
    return res.data;
  } catch (err) {
    console.error(err);
  }
};

const Post = ({ userId, id, title, body }: PostProps) => {
  const classes = useStyles();
  const [userName, setUserName] = useState<string>("");
  const [comments, setComments] = useState<CommentProps[]>([]);
  const [showComments, setShowComments] = useState<boolean>(false);
  const [isLoadingComments, setIsLoadingComments] = useState<boolean>(false);
  const [isLoadingUserName, setIsLoadingUserName] = useState<boolean>(false);

  useEffect(() => {
    const controller = new AbortController();

    setIsLoadingUserName(true);
    getUserData(userId, controller.signal)
      .then((res: UserProps | undefined) => {
        if (res) {
          setUserName(res.name);
        } else {
          console.error("UserName was not loaded");
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setIsLoadingUserName(false));

    return () => {
      controller.abort();
      setIsLoadingUserName(false);
      setUserName("");
    };
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    if (comments.length === 0 && showComments) {
      setIsLoadingComments(true);
      getComments(id, controller.signal)
        .then((res) => {
          if (res) {
            setComments(res);
          }
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          setIsLoadingComments(false);
        });
    }

    return () => {
      controller.abort();
      setIsLoadingComments(false);
    };
  }, [showComments]);

  return (
    <Container>
      <Box>
        <ListItem
          key={id}
          className={classes.post}
          onClick={() => setShowComments(!showComments)}
        >
          <ListItemAvatar>
            <Avatar />
          </ListItemAvatar>
          <ListItemText
            primary={
              <Typography component="div" maxWidth={1}>
                {userName && isLoadingUserName ? (
                  <Skeleton animation="wave" />
                ) : (
                  <Box fontWeight="fontWeightBold">
                    <Link
                      key={id}
                      to={`/userProfile/${userId}`}
                      className={classes.link}
                    >
                      {userName}
                    </Link>
                  </Box>
                )}
                <Box>{title}</Box>
              </Typography>
            }
            secondary={
              <Typography maxWidth={1} fontStyle={"italic"}>
                {body}
              </Typography>
            }
          />
          <KeyboardArrowDown
            sx={{
              transform: showComments ? "rotate(-180deg)" : "rotate(0)",
              transition: "0.2s",
            }}
          />
        </ListItem>
      </Box>
      {showComments ? (
        <Container>
          {isLoadingComments ? (
            <CircularProgress />
          ) : comments.length > 0 ? (
            comments.map((comment: CommentProps) => {
              return (
                <Comment
                  key={comment.id}
                  id={comment.id}
                  body={comment.body}
                  name={comment.name}
                  email={comment.email}
                />
              );
            })
          ) : (
            <Container>
              <Typography fontStyle={"italic"} fontWeight={"bold"}>
                ... No comments found! ...
              </Typography>
            </Container>
          )}
        </Container>
      ) : null}
    </Container>
  );
};

export default Post;

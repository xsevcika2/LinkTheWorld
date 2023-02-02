import { Box, Button, Grid, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useStyles } from "./NewPost.styles";
import { useState } from "react";
import { PostProps, postNewPost } from "../../api/api";

interface NewPostProps {
  updateNewPostData({ id, userId, title, body }: PostProps): void;
}

const sendNewPost = async (data: PostProps) => {
  try {
    const res = await postNewPost(data);
    console.log(res); // Imitation of POST "Post" request
  } catch (err) {
    console.log(err);
  }
};

const NewPost = ({ updateNewPostData }: NewPostProps) => {
  const classes = useStyles();
  const [newTitle, setNewTitle] = useState<string>("");
  const [newBody, setNewBody] = useState<string>("");

  const handleShareButton = () => {
    if (newTitle.length > 0 && newBody.length > 0) {
      const newData = {
        id: Date.now(),
        userId: 1,
        title: newTitle,
        body: newBody,
      };
      updateNewPostData(newData);
      sendNewPost(newData);
      setNewTitle("");
      setNewBody("");
    }
  };

  return (
    <Grid
      container
      className={classes.anchorBottom}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Box padding={1} width={"20vw"}>
        <TextField
          size="small"
          label="Title"
          id="title"
          value={newTitle}
          onChange={(e) => {
            setNewTitle(e.target.value);
          }}
          multiline
          fullWidth
          className={classes.input}
        />
      </Box>
      <Box padding={1} width={"40vw"}>
        <TextField
          size="small"
          label="Content"
          id="body"
          value={newBody}
          onChange={(e) => {
            setNewBody(e.target.value);
          }}
          multiline
          fullWidth
          className={classes.input}
        />
      </Box>
      <Box padding={1}>
        <Button
          variant="contained"
          size="medium"
          endIcon={<SendIcon />}
          onClick={handleShareButton}
        >
          Share
        </Button>
      </Box>
    </Grid>
  );
};

export default NewPost;

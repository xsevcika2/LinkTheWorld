import { CommentProps } from "../../api/api";
import { Box, Container, Divider, ListItem, Typography } from "@mui/material";

const Comment = ({ name, email, body }: CommentProps) => {
  return (
    <Container>
      ...
      <Box paddingBottom={2}>
        <ListItem>
          <Box paddingX={3}>
            <Typography fontWeight={"bold"}>{email} </Typography>
          </Box>
          <Box>
            <Typography fontStyle={"italic"}>({name})</Typography>
          </Box>
        </ListItem>
        <ListItem>
          <Container>
            <Box paddingX={3}>{body}</Box>
          </Container>
        </ListItem>
      </Box>
      <Divider />
    </Container>
  );
};

export default Comment;

import { useEffect, useState } from "react";
import { Box, CircularProgress, Container, List } from "@mui/material";
import { PostProps, getListOfPosts } from "../../api/api";
import Post from "../../components/Post/Post";
import NewPost from "../../components/NewPost/NewPost";

const getAllPosts = async (signal: AbortSignal) => {
  try {
    const res = await getListOfPosts({ signal: signal });
    return res.data;
  } catch (err) {
    console.error(err);
  }
};

const MainPage = () => {
  const [data, setData] = useState<PostProps[]>([]);
  const [loadingData, setLoadingData] = useState<boolean>(false);
  const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false);

  const updateNewPostData = (newData: PostProps) => {
    setData([newData, ...data]);
  };

  useEffect(() => {
    const controller = new AbortController();
    if (!isDataLoaded) {
      setLoadingData(true);
      getAllPosts(controller.signal)
        .then((res: PostProps[] | undefined) => {
          if (res) {
            setData(res);
            setIsDataLoaded(true);
          } else {
            console.error("Data was not fetched");
          }
        })
        .catch((err) => console.error(err))
        .finally(() => setLoadingData(false));
    }

    return () => {
      controller.abort();
      setLoadingData(false);
      setIsDataLoaded(false);
    };
  }, []);

  return (
    <>
      <Container maxWidth="lg">
        {loadingData ? (
          <Box>
            <CircularProgress />
          </Box>
        ) : (
          <List>
            {data.map((post: PostProps) => {
              return (
                <Post
                  id={post.id}
                  key={post.id}
                  userId={post.userId}
                  title={post.title}
                  body={post.body}
                />
              );
            })}
          </List>
        )}
      </Container>
      <NewPost updateNewPostData={updateNewPostData} />
    </>
  );
};

export default MainPage;

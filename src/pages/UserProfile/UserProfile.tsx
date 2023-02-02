import { Box, CircularProgress, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  UserAlbumsProps,
  UserProps,
  getAlbumsByUserID,
  getUser,
} from "../../api/api";
import Album from "../../components/Album/Album";

const getUserData = async (userId: number, signal: AbortSignal) => {
  try {
    const res = await getUser(userId, { signal: signal });
    return res.data;
  } catch (err) {
    console.error(err);
  }
};

const getUserAlbums = async (userId: number, signal: AbortSignal) => {
  try {
    const res = await getAlbumsByUserID(userId, { signal: signal });
    return res.data;
  } catch (err) {
    console.error(err);
  }
};

const UserProfile = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState<UserProps | null>(null);
  const [userAlbums, setUserAlbums] = useState<UserAlbumsProps[]>();
  const [isLoadingUserData, setIsLoadingUserData] = useState<boolean>(false);
  const [isLoadingUserAlbums, setIsLoadingUserAlbums] =
    useState<boolean>(false);

  useEffect(() => {
    const controller = new AbortController();
    if (id) {
      setIsLoadingUserData(true);
      setIsLoadingUserAlbums(true);

      getUserData(Number(id), controller.signal)
        .then((res: UserProps | undefined) => {
          if (res) {
            setUserData(res);
          } else {
            console.error("UserName was not loaded");
          }
        })
        .catch((err) => console.error(err))
        .finally(() => setIsLoadingUserData(false));

      getUserAlbums(Number(id), controller.signal)
        .then((res: UserAlbumsProps[] | undefined) => {
          if (res) {
            setUserAlbums(res);
          } else {
            console.error("UserName was not loaded");
          }
        })
        .catch((err) => console.error(err))
        .finally(() => setIsLoadingUserAlbums(false));

      return () => {
        controller.abort();
        setIsLoadingUserData(false);
        setIsLoadingUserAlbums(false);
        setUserData(null);
      };
    }
  }, []);

  return (
    <Container>
      {isLoadingUserData ? (
        <CircularProgress size={"8vw"} />
      ) : userData ? (
        <>
          <Typography variant="h5" component="h1" gutterBottom fontWeight={800}>
            {userData.name}
          </Typography>
          <Typography variant="h6" gutterBottom fontStyle={"italic"}>
            {`${userData.address.street}, ${userData.address.suite}, ${userData.address.zipcode}, ${userData.address.city}`}
          </Typography>
          <Container>
            {isLoadingUserAlbums ? (
              <CircularProgress size={"8vw"} />
            ) : (
              <Box display={"flex"} flexWrap={"wrap"} justifyContent={"center"}>
                {userAlbums
                  ? userAlbums.map((album: UserAlbumsProps) => {
                      return (
                        <Box key={album.id}>
                          <Album id={album.id} title={album.title} />
                        </Box>
                      );
                    })
                  : null}
              </Box>
            )}
          </Container>
        </>
      ) : null}
    </Container>
  );
};

export default UserProfile;

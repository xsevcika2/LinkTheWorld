import { Box, CardMedia, Skeleton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import {
  AlbumPhotosProps,
  UserAlbumsProps,
  getAlbumPhotos,
} from "../../api/api";

const getAlbumThumbnail = async (id: number, signal: AbortSignal) => {
  try {
    const res = await getAlbumPhotos(id, { signal: signal });
    return res.data;
  } catch (err) {
    console.error(err);
  }
};

const Album = ({ id, title }: UserAlbumsProps) => {
  const [albumThumbnail, setAlbumThumbnail] = useState<string>("");
  const [isLoadingAlbumThumbnail, setIsLoadingAlbumThumbnail] =
    useState<boolean>(false);

  useEffect(() => {
    const controller = new AbortController();
    setIsLoadingAlbumThumbnail(true);
    getAlbumThumbnail(Number(id), controller.signal)
      .then((res: AlbumPhotosProps[] | undefined) => {
        if (res) {
          setAlbumThumbnail(res[0].thumbnailUrl);
        } else {
          console.error("User Album not loaded");
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setIsLoadingAlbumThumbnail(false));

    return () => {
      controller.abort();
      setIsLoadingAlbumThumbnail(false);
      setAlbumThumbnail("");
    };
  }, []);

  return (
    <Box padding={3}>
      {isLoadingAlbumThumbnail ? (
        <Skeleton variant="rounded" width={200} height={200} />
      ) : (
        <CardMedia
          component="img"
          height={200}
          width={200}
          image={albumThumbnail}
          alt={`album${id}Thumbnail`}
        />
      )}

      <Typography width={200}>{title}</Typography>
    </Box>
  );
};

export default Album;

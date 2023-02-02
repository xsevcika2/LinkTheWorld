import axios from "axios";
import type { AxiosRequestConfig, AxiosResponse } from "axios";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.params = {};

export type CommentProps = {
  postId?: number;
  id: number;
  name: string;
  email: string;
  body: string;
};

export type AlbumPhotosProps = {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
};

export type UserAlbumsProps = {
  userId?: number;
  id: number;
  title: string;
};

export type PostProps = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export type Geo = {
  lat: string;
  lng: string;
};

export type UserAdress = {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
};

export type Company = {
  name: string;
  catchPhrase: string;
  bs: string;
};

export type UserProps = {
  id: number;
  name: string;
  email: string;
  address: UserAdress;
  phone: string;
  website: string;
  company: Company;
};

export const postNewPost = <TData = AxiosResponse>(
  post: PostProps,
  options?: AxiosRequestConfig
): Promise<TData> => {
  return axios.post(`/posts`, {
    post,
    ...options,
    params: { ...options?.params },
  });
};

export const getListOfPosts = <TData = AxiosResponse<PostProps[]>>(
  options?: AxiosRequestConfig
): Promise<TData> => {
  return axios.get(`/posts`, {
    ...options,
    params: { ...options?.params },
  });
};

export const getUser = <TData = AxiosResponse<UserProps>>(
  userId: number,
  options?: AxiosRequestConfig
): Promise<TData> => {
  return axios.get(`/users/${userId}`, {
    ...options,
    params: { ...options?.params },
  });
};

export const getAlbumsByUserID = <TData = AxiosResponse<UserAlbumsProps[]>>(
  userId: number,
  options?: AxiosRequestConfig
): Promise<TData> => {
  return axios.get(`/users/${userId}/albums`, {
    ...options,
    params: { ...options?.params },
  });
};

export const getAlbumPhotos = <TData = AxiosResponse<AlbumPhotosProps[]>>(
  albumId: number,
  options?: AxiosRequestConfig
): Promise<TData> => {
  return axios.get(`albums/${albumId}/photos`, {
    ...options,
    params: { ...options?.params },
  });
};

export const getCommentsByPostID = <TData = AxiosResponse<CommentProps[]>>(
  postId: number,
  options?: AxiosRequestConfig
): Promise<TData> => {
  return axios.get(`/posts/${postId}/comments`, {
    ...options,
    params: { ...options?.params },
  });
};

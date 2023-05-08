import { AlbumRef } from "../interfaces";
import { createLocalInstance } from "./axios";

export const addFavoriteAlbum = async (
    access_token: string,
    albumInfo : AlbumRef
) => {
    try {
        const instance = createLocalInstance(access_token);
        return await instance.post("/album-favorito", albumInfo);
      } catch (error) {
        console.error(error);
      }
}

export const getFavoriteAlbumes = async (
  access_token: string,
  user_id: string
) => {
  try {
      const instance = createLocalInstance(access_token);
      return await instance.get(`/album-favorito/${user_id}`);
    } catch (error) {
      console.error(error);
    }
}

export const deleteFavoriteAlbum = async (
  access_token: string,
  user_id: string,
  id_album: string
) => {
  try {
      const instance = createLocalInstance(access_token);
      return await instance.delete(`/album-favorito/${id_album}/${user_id}`);
    } catch (error) {
      console.error(error);
    }
}

export const getDetailAlbum = async (
  access_token: string,
  id_album: string
) => {
  try {
      const instance = createLocalInstance(access_token);
      return await instance.get(`/album/${id_album}`);
    } catch (error) {
      console.error(error);
    }
}
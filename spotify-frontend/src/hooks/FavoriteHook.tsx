import { useState } from "react";
import {
  getFavoriteAlbumes,
  deleteFavoriteAlbum,
  getDetailAlbum
} from "../utils/services/localServices";
import {
  AlbumRef,
} from "../utils/interfaces";
import moment from "moment";

export const useFavoriteHook = (access_token: string) => {

    const initial_values: AlbumRef = {
        id_album: "",
        album_type: "",
        total_tracks: 0,
        artists: "",
        image_url: "",
        name: "",
        release_date: "",
        url: "",
        user_id: ""
    }

    const [favorites, setFavorites] = useState([]);
    const [detail, setDetail] = useState(initial_values);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const [responseMessage, setResponseMessage] = useState("");
  
    const deleteAlbum = (id_album: string, user_id: string) => {
      setIsLoading(true);
      setError(false);
      deleteFavoriteAlbum(access_token, user_id, id_album)
        .then((response) => {
          if (response?.status === 200) {
            setResponseMessage(response.data.descripcionMessage);
            getFavAlbumes(user_id!)
          }
          setIsLoading(false);
          setError(false);
        })
        .catch((error) => {
          console.error(error);
          setIsLoading(false);
          setError(true);
        });
    };
  
    const getFavAlbumes = (user_id: string) => {
      setIsLoading(true);
      setError(false);
      getFavoriteAlbumes(access_token!, user_id)
        .then((response) => {
          if (response?.status === 200) {
            if(response.data.data){
              const albumesRefactor = response.data.data.map((album: AlbumRef) => {
                const dataRef = {
                  id_album: album.id_album,
                  total_tracks: album.total_tracks,
                  album_type: album.album_type,
                  url: album.url,
                  image_url: album.image_url,
                  name: album.name,
                  release_date: moment(
                    album.release_date,
                    "YYYY-MM-DD"
                  ).format("DD MMMM YYYY"),
                  artists: album.artists,
                  isSaved: true
                };
                return dataRef;
              });
              setFavorites(albumesRefactor);
            }
            else{
                setFavorites([])
            }
            setResponseMessage(response.data.descripcionMessage);
          }
          setIsLoading(false);
          setError(false);
        })
        .catch((error) => {
          console.error(error);
          setIsLoading(false);
          setError(true);
        });
    };

    const getDetail = (id_album: string) => {
        setIsLoading(true);
        setError(false);
        getDetailAlbum(access_token!, id_album)
          .then((response) => {
            if (response?.status === 200) {
              if(response.data.data){
                const album = response.data.data[0];
                const albumesRefactor : AlbumRef= {
                    id_album: album.id_album,
                    total_tracks: album.total_tracks,
                    album_type: album.album_type,
                    url: album.url,
                    image_url: album.image_url,
                    name: album.name,
                    release_date: moment(
                      album.release_date,
                      "YYYY-MM-DD"
                    ).format("DD MMMM YYYY"),
                    artists: album.artists,
                  };
                setDetail(albumesRefactor);
              }
            }
            setIsLoading(false);
            setError(false);
          })
          .catch((error) => {
            console.error(error);
            setIsLoading(false);
            setError(true);
          });
      };
  
    return {
      favorites,
      detail,
      isLoading,
      error,
      responseMessage,
      deleteAlbum,
      getFavAlbumes,
      getDetail
    };
  };
  
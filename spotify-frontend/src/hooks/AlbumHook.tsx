import { useEffect, useState } from "react";
import {
  getTopAlbumes,
  getSearchedAlbumes,
} from "../utils/services/spotifyService";
import {
  addFavoriteAlbum,
  deleteFavoriteAlbum,
  getFavoriteAlbumes,
} from "../utils/services/localServices";
import {
  ItemInter,
  ArtistInter,
  AlbumRef,
  AlbumInter,
} from "../utils/interfaces";
import moment from "moment";

export const useAlbumHook = (access_token: string) => {
  const [albumes, setAlbumes] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  useEffect(() => {
    if (access_token !== "") {
      getAlbumes(false);
    }
  }, []);

  const getAlbumes = (isSearching: boolean, query: string = "") => {
    if (!isSearching) {
      setIsLoading(true);
      setError(false);
      getTopAlbumes(access_token!)
        .then((response) => {
          if (response?.status === 200) {

            const newFilter = response.data.items.filter(
              (item: ItemInter, index: number) =>{
                return !response.data.items.slice(0, index).some((element:ItemInter) => element.album.id === item.album.id)
              }
            )

            const albumesRefactor = newFilter.map(
              (item: ItemInter) => {
                const dataRef = {
                  id_album: item.album.id,
                  total_tracks: item.album.total_tracks,
                  album_type: item.album.album_type,
                  url: item.album.external_urls.spotify,
                  image_url: item.album.images[1].url,
                  name: item.album.name,
                  release_date: moment(
                    item.album.release_date,
                    "YYYY-MM-DD"
                  ).format("DD MMMM YYYY"),
                  artists: item.album.artists
                    .map((artist: ArtistInter) => artist.name)
                    .toString(),
                };
                return dataRef;
              }
            );
            setAlbumes(albumesRefactor);
          }
          setIsLoading(false);
          setError(false);
        })
        .catch((error) => {
          console.error(error);
          setIsLoading(false);
          setError(true);
        });
    } else {
      getSearchedAlbumes(access_token!, query)
        .then((response) => {
          if (response?.status === 200) {
            const albumesRefactor = response.data.albums.items.map(
              (item: AlbumInter) => {
                const dataRef = {
                  id_album: item.id,
                  total_tracks: item.total_tracks,
                  album_type: item.album_type,
                  url: item.external_urls.spotify,
                  image_url: item.images[1].url,
                  name: item.name,
                  release_date: moment(item.release_date, "YYYY-MM-DD").format(
                    "DD MMMM YYYY"
                  ),
                  artists: item.artists
                    .map((artist: ArtistInter) => artist.name)
                    .toString(),
                };
                return dataRef;
              }
            );
            setAlbumes(albumesRefactor);
          }
        })
        .catch((error) => {
          console.error(error);
          setIsLoading(false);
          setError(true);
        });
    }
  };

  const registerFavoriteAlbum = (albumInfo: AlbumRef) => {
    setIsLoading(true);
    setError(false);
    addFavoriteAlbum(access_token, albumInfo)
      .then((response) => {
        if (response?.status === 200) {
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

  const deleteAlbum = (id_album: string, user_id: string) => {
    setIsLoading(true);
    setError(false);
    deleteFavoriteAlbum(access_token, user_id, id_album)
      .then((response) => {
        if (response?.status === 200) {
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
          setResponseMessage(response.data.descripcionMessage)
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
    albumes,
    favorites,
    isLoading,
    error,
    responseMessage,
    registerFavoriteAlbum,
    getAlbumes,
    deleteAlbum,
    getFavAlbumes
  };
};

import { useEffect } from "react";
import { fetchUser } from "../../app/features/auth/userSlice";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { useAlbumHook } from "../../hooks/AlbumHook";
import { AlbumList, Spinner, TopInput } from "../../modules/components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Playlist = () => {
  const dispatch = useAppDispatch();
  const access_token = useAppSelector(
    (state) => state.persistedReducer.spotifyToken.access_token
  );

  const { albumes, isLoading, registerFavoriteAlbum, responseMessage, getAlbumes } =
    useAlbumHook(access_token!);

  const notify = () =>
    toast.success(responseMessage, { position: "bottom-right" });

  useEffect(() => {
    if (access_token !== "") {
      try {
        dispatch(fetchUser(access_token!));
      } catch (error) {
        console.error(error);
      }
    }
  }, [access_token]);

  useEffect(() => {
    notify();
  }, [responseMessage]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="p-2">
      <h1 className="mx-auto my-10 text-3xl text-center font-bold w-fit p-2">
        Álbumes recomendados para ti... 🎧
      </h1>
      <TopInput getAlbumes={getAlbumes} />
      <AlbumList
        albumes={albumes}
        registerFavoriteAlbum={registerFavoriteAlbum}
      />
      <ToastContainer />
    </div>
  );
};

export default Playlist;

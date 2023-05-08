import { useEffect, useState } from "react";
import { fetchUser } from "../../app/features/auth/userSlice";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { useFavoriteHook } from "../../hooks/FavoriteHook";
import { AlbumList, Spinner, Modal } from "../../modules/components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Favorites = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();
  const access_token = useAppSelector(
    (state) => state.persistedReducer.spotifyToken.access_token
  );
  const user_id = useAppSelector((state) => state.persistedReducer.user.id);

  const {
    favorites,
    isLoading,
    responseMessage,
    getFavAlbumes,
    deleteAlbum,
    detail,
    getDetail,
  } = useFavoriteHook(access_token!);

  const notify = () =>
    toast.success(responseMessage, { position: "bottom-right" });

  const handleModal = (id_album: string = "") => {
    if(isOpen){
      setIsOpen(false);
    }
    else{
      getDetail(id_album);
      setIsOpen(true);
    }
  };

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
    getFavAlbumes(user_id!);
  }, []);

  useEffect(() => {
    notify();
  }, [responseMessage])

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      {isOpen && <Modal handleModal={handleModal} detail={detail}/>}
      <div className="p-2">
        <h1 className="mx-auto my-10 text-3xl text-center font-bold w-fit p-2">
          Mis álbumes favoritos 🎧
        </h1>
        <AlbumList
          albumes={favorites}
          deleteAlbum={deleteAlbum}
          handleModal={handleModal}
        />
        <ToastContainer />
      </div>
    </>
  );
};

export default Favorites;

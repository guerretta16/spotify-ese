import { AlbumRef } from "../../../utils/interfaces";
import moment from "moment";
import { useAppSelector } from "../../../app/hooks";

interface AlbumCardProp {
  album: AlbumRef;
  registerFavoriteAlbum: (albumInfo: AlbumRef) => void;
  deleteAlbum: (id_album: string, user_id: string) => void;
  handleModal: (id_album: string) => void;
}

const AlbumCard = ({
  album,
  registerFavoriteAlbum,
  deleteAlbum,
  handleModal
}: AlbumCardProp) => {
  const user_id = useAppSelector((state) => state.persistedReducer.user.id);

  return (
    <div className="bg-gray-900 py-5 rounded ">
      <div className="w-4/5 m-auto">
        <img className="rounded" src={album.image_url} alt={album.name} />
        <div className="flex flex-col justify-between my-5">
          <h2 className="text-lg font-semibold mb-3 truncate w-52">
            {album.name}
          </h2>
          <small className="text-base">
            {moment(album.release_date).format("YYYY")} · {album.artists}
          </small>
        </div>
      </div>
      {!album.isSaved ? (
        <button
          onClick={() => registerFavoriteAlbum({ ...album, user_id: user_id })}
          className="block mx-auto bg-green-900 p-2 rounded hover:bg-green-700 transition"
        >
          Añadir a favoritos
        </button>
      ) : (
        <div className="flex justify-center gap-2">
          <button
            onClick={() => deleteAlbum(album.id_album, user_id!)}
            className="bg-red-900 p-2 rounded hover:bg-red-700 transition font-semibold"
          >
            Eliminar de favoritos
          </button>
          <button
            onClick={() => handleModal(album.id_album)}
            className="bg-blue-900 p-2 rounded hover:bg-blue-700 transition font-semibold"
          >
            Info
          </button>
        </div>
      )}
    </div>
  );
};

export default AlbumCard;
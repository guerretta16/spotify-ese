import { AlbumRef } from "../../../utils/interfaces";
import { AlbumCard } from "..";

interface AlbumListProp {
  albumes: Array<AlbumRef>;
  registerFavoriteAlbum?: (albumInfo: AlbumRef) => void;
  deleteAlbum?: (id_album: string, user_id: string) => void;
  handleModal?: (id_album: string) => void
}

const AlbumList = ({ albumes, registerFavoriteAlbum, deleteAlbum, handleModal }: AlbumListProp) => {
  return (
    <div className="flex flex-wrap gap-8 justify-center md:w-5/6 m-auto my-10">
      {albumes.map((album: AlbumRef) => (
        <AlbumCard
          key={album.id_album}
          album={album}
          registerFavoriteAlbum={registerFavoriteAlbum!}
          deleteAlbum={deleteAlbum!}
          handleModal={handleModal!}
        />
      ))}
    </div>
  );
};

export default AlbumList;

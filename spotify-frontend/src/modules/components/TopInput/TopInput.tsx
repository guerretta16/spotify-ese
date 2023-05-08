import {ChangeEvent} from "react";

interface TopInputProps{
    getAlbumes: (isSearching: boolean, query?: string) => void
}

const TopInput = ({getAlbumes}: TopInputProps) => {

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if(value !== ""){
            getAlbumes(true, value)
        }
        else{
            getAlbumes(false)
        }
    }

  return (
    <div className="flex justify-center">
      <input
        onChange={handleChange}
        name="query"
        className="w-3/4 md:w-3/6 rounded p-2 border-0 outline-none text-skin-alter bg-skin-top placeholder:text-skin-ph"
        type="text"
        placeholder="Busca álbumes..."
      />
    </div>
  );
};

export default TopInput;

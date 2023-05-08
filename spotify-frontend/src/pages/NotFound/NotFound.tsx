import Lottie from "lottie-react";
import notFoundAnimation from "../../assets/lottie/not-found.json";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";

const NotFound = () => {
  const style = {
    backgroundColor: "black",
    borderRadius: "5px",
  };

  const navigate = useNavigate();
  const access_token = useAppSelector(state => state.persistedReducer.spotifyToken.access_token);

  const returnTo = () => {
    if(access_token !== ""){
      navigate("/playlist")
    }
    else{
      navigate("/")
    }
  }

  return (
    <div className="h-screen flex justify-center items-center flex-col">
      <Lottie animationData={notFoundAnimation} loop style={style} />
      <button
        className="bg-green-700 p-5 rounded text-lg font-semibold hover:bg-green-900 transition my-10"
        onClick={returnTo}
      >
        Regresar al inicio
      </button>
    </div>
  );
};

export default NotFound;

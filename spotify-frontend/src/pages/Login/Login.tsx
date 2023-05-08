import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchAuth } from "../../app/features/auth/spotifyToken";
import { LoginButton, Spinner } from "../../modules/components";
import Lottie from "lottie-react";
import musicAnimation from "../../assets/lottie/music.json";


const Login = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const refreshToken = useAppSelector((state) => state.persistedReducer.spotifyToken.access_token);
  const access_token = useAppSelector(state => state.persistedReducer.spotifyToken.access_token);
  const isLoading = useAppSelector((state) => state.persistedReducer.spotifyToken.isLoading);

  const authFunction = (spotifyCode: string) => {
    if (refreshToken !== "") {
      dispatch(
        fetchAuth({
          requiredParam: { refresh_token: refreshToken },
          grant_type: "refresh_token",
        })
      );
    } else {
      dispatch(
        fetchAuth({
          requiredParam: { code: spotifyCode },
          grant_type: "authorization_code",
        })
      );
    }
    navigate('/playlist');
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const spotifyCode = urlParams.get("code");
    if (spotifyCode) authFunction(spotifyCode);
  }, [location.search]);

  useEffect(() => {
    if(access_token !== ""){
      navigate("/playlist")
    }
  }, [access_token])

  const style = {
    height: 400,
  };

  if(isLoading){
    return <Spinner />
  }

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="w-10/12 flex justify-center items-center gap-10 flex-wrap md:w-10/12 md:gap-20 ">
        <Lottie animationData={musicAnimation} loop style={style} />
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold border-b-2 w-fit mx-auto mb-10 py-2">
            SPOTIFY API ESE+
          </h1>
          <LoginButton />
        </div>
      </div>
    </div>
  );
};

export default Login;

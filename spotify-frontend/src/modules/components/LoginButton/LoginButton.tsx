import { CLIENT_ID, REDIRECT_URI, SCOPE } from "../../../utils/globalParams";

const LoginButton = () => {
  const spotifyAuthURI = `https://accounts.spotify.com/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPE}`;

  const handleClick = () => {
    window.location.replace(spotifyAuthURI);
  };

  return (
    <button
      className="bg-green-700 p-5 rounded text-xl font-semibold hover:bg-green-900 transition"
      onClick={handleClick}
    >
      Iniciar sesión
    </button>
  );
};

export default LoginButton;
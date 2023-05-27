
const LoginButton = () => {
  const spotifyAuthURI = `https://accounts.spotify.com/authorize?response_type=code&client_id=${import.meta.env.VITE_CLIENT_ID}&redirect_uri=${import.meta.env.VITE_REDIRECT_URI}&scope=${import.meta.env.VITE_SCOPE}`;

  const handleClick = () => {
    window.location.replace(spotifyAuthURI);
  };

  return (
    <button
      className="bg-skin-base p-5 rounded text-xl font-semibold hover:bg-skin-base-hover transition"
      onClick={handleClick}
    >
      Iniciar sesión
    </button>
  );
};

export default LoginButton;

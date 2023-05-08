import { persistor } from "../../app/store";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { reset as resetToken } from "../../app/features/auth/spotifyToken";
import { reset as resetUser} from "../../app/features/auth/userSlice";
import { Link } from "react-router-dom";

 const Header = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogoutClick = () => {
    persistor.purge();
    dispatch(resetToken());
    dispatch(resetUser());
    navigate('/', {replace:true});
  }

  return (
    <header className='flex justify-between items-center px-3 h-14 bg-green-700'>
      <div className="flex gap-2">
        <Link className="bg-black py-1 px-2 rounded font-semibold"  to="/playlist" replace>Inicio</Link>
        <Link className="bg-black py-1 px-2 rounded font-semibold"  to="/favorites" replace>Favoritos</Link>
      </div>
      <button
        className="bg-black py-1 px-2 rounded font-semibold" 
        onClick={handleLogoutClick}
      >
        Logout
      </button>
    </header>
  )
}

export default Header
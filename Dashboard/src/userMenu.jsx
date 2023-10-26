import {
	UserMenu,
	MenuItemLink,
	useLogout,
	useAuthState,
} from "react-admin";
import SettingsIcon from "@mui/icons-material/Settings";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useNavigate } from "react-router-dom";

const MyUserMenu = (props) => {
	const { authenticated } = useAuthState();
	return authenticated ? <AuthenticatedUserMenu {...props} /> : null;
};

const AuthenticatedUserMenu = (props) => {
	const navigate = useNavigate();

	const logout = useLogout();

	const handleLogout = () => {
		logout();
		navigate("/login", { replace: true });
	};

	return (
		<UserMenu {...props}>
			<MenuItemLink
				to="/profile"
				primaryText="Mon profil"
				leftIcon={<SettingsIcon />}
			/>
			<MenuItemLink
				to="/login"
				primaryText="Déconnexion"
				leftIcon={<ExitToAppIcon />}
				onClick={handleLogout}
			/>
		</UserMenu>
	);
};

export default MyUserMenu;

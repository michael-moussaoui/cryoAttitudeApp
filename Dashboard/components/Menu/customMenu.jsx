import { Menu, DashboardMenuItem, MenuItemLink } from "react-admin";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import DoneAllIcon from "@mui/icons-material/DoneAll";

const CustomMenu = () => (
	<Menu>
		<DashboardMenuItem />
		<span> Sessions </span>
		<MenuItemLink
			to="/scanSessions"
			primaryText="ScanSession"
			leftIcon={<FormatListBulletedIcon />}
		/>
		<MenuItemLink
			to="/sessionPictures"
			primaryText="SessionPicture"
			leftIcon={<PhotoCameraIcon />}
		/>
		<MenuItemLink
			to="/choiceSessions"
			primaryText="ChoiceSession"
			leftIcon={<DoneAllIcon />}
		/>
	</Menu>
);

export default CustomMenu;

import { Admin, Resource, Layout } from "react-admin";
import i18nProvider from "../i18n/i18nProvider";
import dataProvider from "../data/dataProvider";
import { MyAppBar } from "../components/AppBar/MyAppBar";

const MyLayout = (props) => <Layout {...props} appBar={MyAppBar} />;

//Resources
import {
	UserList,
	UserEdit,
	UserCreate,
} from "./resources/userResource";
import {
	RoleList,
	RoleEdit,
	RoleCreate,
} from "./resources/roleResource";
import {
	SessionList,
	SessionEdit,
	SessionCreate,
} from "./resources/sessionResource";
import {
	CategoryList,
	CategoryEdit,
	CategoryCreate,
} from "./resources/categoryResource";
import {
	ObjectiveList,
	ObjectiveEdit,
	ObjectiveCreate,
} from "./resources/objectiveResource";
import {
	ObjectiveChoiceList,
	ObjectiveChoiceEdit,
	ObjectiveChoiceCreate,
} from "./resources/objectiveChoiceResource";
import {
	OrientationList,
	OrientationEdit,
	OrientationCreate,
} from "./resources/orientationResource";
import {
	SessionPictureList,
	SessionPictureEdit,
	SessionPictureCreate,
} from "./resources/sessionPictureResource";

//Icons
import UserIcon from "@mui/icons-material/Group";
import NoAccountsIcon from "@mui/icons-material/NoAccounts";
import CategoryIcon from "@mui/icons-material/Category";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import DynamicFeedIcon from "@mui/icons-material/DynamicFeed";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";

import "./App.css";

function App() {
	return (
		<>
			<Admin
				dataProvider={dataProvider}
				layout={MyLayout}
				darkTheme={{ palette: { mode: "dark" } }}
				i18nProvider={i18nProvider}
			>
				<Resource
					name="users"
					list={UserList}
					edit={UserEdit}
					create={UserCreate}
					icon={UserIcon}
				/>
				<Resource
					name="sessions"
					list={SessionList}
					edit={SessionEdit}
					create={SessionCreate}
					icon={FormatListBulletedIcon}
				/>
				<Resource
					name="roles"
					list={RoleList}
					edit={RoleEdit}
					create={RoleCreate}
					icon={NoAccountsIcon}
				></Resource>
				<Resource
					name="categories"
					list={CategoryList}
					edit={CategoryEdit}
					create={CategoryCreate}
					icon={CategoryIcon}
				></Resource>
				<Resource
					name="objectives"
					list={ObjectiveList}
					edit={ObjectiveEdit}
					create={ObjectiveCreate}
					icon={CheckCircleOutlineIcon}
				></Resource>
				<Resource
					name="objectiveChoices"
					list={ObjectiveChoiceList}
					edit={ObjectiveChoiceEdit}
					create={ObjectiveChoiceCreate}
					icon={DynamicFeedIcon}
				></Resource>
				<Resource
					name="orientations"
					list={OrientationList}
					edit={OrientationEdit}
					create={OrientationCreate}
					icon={SwapVertIcon}
				></Resource>
				<Resource
					name="sessionPictures"
					list={SessionPictureList}
					edit={SessionPictureEdit}
					create={SessionPictureCreate}
					icon={PhotoCameraIcon}
				></Resource>
			</Admin>
		</>
	);
}

export default App;

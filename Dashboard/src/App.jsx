import { Admin, Resource } from "react-admin";
import {
	UserList,
	UserEdit,
	UserCreate,
} from "./resources/userResource";

//Icons
import UserIcon from "@mui/icons-material/Group";
import "./App.css";

function App() {
	return (
		<>
			<Admin darkTheme={{ palette: { mode: "dark" } }}>
				<Resource
					name="users"
					list={UserList}
					edit={UserEdit}
					create={UserCreate}
					icon={UserIcon}
				/>
			</Admin>
		</>
	);
}

export default App;

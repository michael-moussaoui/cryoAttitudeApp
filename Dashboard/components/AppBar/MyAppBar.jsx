import { AppBar, ToggleThemeButton } from "react-admin";
import MyUserMenu from "../../src/userMenu";
export const MyAppBar = () => (
	<AppBar userMenu={<MyUserMenu />} toolbar={<ToggleThemeButton />} />
);

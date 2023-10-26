import { CheckForApplicationUpdate, Layout } from "react-admin";
import { MyAppBar } from "../AppBar/MyAppBar";
import CustomMenu from "../Menu/customMenu";

export const MyLayout = ({ ...props }) => (
	<Layout {...props}>
		<CheckForApplicationUpdate />
		<MyAppBar />
		<CustomMenu />
	</Layout>
);

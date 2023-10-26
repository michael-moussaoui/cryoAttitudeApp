import {
	List,
	Datagrid,
	TextField,
	TextInput,
	Edit,
	SimpleForm,
	EditButton,
	ShowButton,
	Create,
} from "react-admin";

export const OrientationList = (props) => (
	<List {...props}>
		<Datagrid rowClick="show">
			<TextField source="id" />
			<TextField source="name" label="Nom" />
			<EditButton label="Modifier" />
			<ShowButton label="Voir" />
		</Datagrid>
	</List>
);

export const OrientationEdit = (props) => (
	<Edit {...props}>
		<SimpleForm>
			<TextInput disabled label="Id" source="id" />
			<TextInput source="name" label="Nom de l'orientation" />
		</SimpleForm>
	</Edit>
);
export const OrientationCreate = (props) => (
	<Create {...props}>
		<SimpleForm>
			<TextInput disabled label="Id" source="id" />
			<TextInput source="name" label="Nom de l'orientation" />
		</SimpleForm>
	</Create>
);

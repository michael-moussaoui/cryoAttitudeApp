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

export const RoleList = (props) => (
	<List {...props}>
		<Datagrid rowClick="show">
			<TextField source="id" />
			<TextField source="name" label="Nom" />
			<EditButton label="Modifier" />
			<ShowButton label="Voir" />
		</Datagrid>
	</List>
);

export const RoleEdit = (props) => (
	<Edit {...props}>
		<SimpleForm>
			<TextInput disabled label="Id" source="id" />
			<TextInput source="name" label="Nom du role" />
		</SimpleForm>
	</Edit>
);
export const RoleCreate = (props) => (
	<Create {...props}>
		<SimpleForm>
			<TextInput disabled label="Id" source="id" />
			<TextInput source="name" label="Nom du role" />
		</SimpleForm>
	</Create>
);

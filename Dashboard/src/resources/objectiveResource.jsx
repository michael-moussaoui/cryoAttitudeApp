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

export const ObjectiveList = (props) => (
	<List {...props}>
		<Datagrid rowClick="show">
			<TextField source="id" />
			<TextField source="description" label="Description" />
			<EditButton label="Modifier" />
			<ShowButton label="Voir" />
		</Datagrid>
	</List>
);

export const ObjectiveEdit = (props) => (
	<Edit {...props}>
		<SimpleForm>
			<TextInput disabled label="Id" source="id" />
			<TextInput source="description" label="Description" />
		</SimpleForm>
	</Edit>
);
export const ObjectiveCreate = (props) => (
	<Create {...props}>
		<SimpleForm>
			<TextInput disabled label="Id" source="id" />
			<TextInput source="description" label="Description" />
		</SimpleForm>
	</Create>
);

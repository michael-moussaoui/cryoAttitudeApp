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

export const CategoryList = (props) => (
	<List {...props}>
		<Datagrid rowClick="show">
			<TextField source="id" />
			<TextField source="name" label="Nom" />
			<EditButton label="Modifier" />
			<ShowButton label="Voir" />
		</Datagrid>
	</List>
);

export const CategoryEdit = (props) => (
	<Edit {...props}>
		<SimpleForm>
			<TextInput disabled label="Id" source="id" />
			<TextInput source="name" label="nom de la catégorie" />
		</SimpleForm>
	</Edit>
);
export const CategoryCreate = (props) => (
	<Create {...props}>
		<SimpleForm>
			<TextInput source="name" label="nom de la catégorie" />
		</SimpleForm>
	</Create>
);

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
	PasswordInput,
	SelectInput,
	Filter,
	TopToolbar,
	PrevNextButtons,
	SearchInput,
	ReferenceInput,
} from "react-admin";

const UserFilter = (props) => (
	<Filter {...props}>
		<SearchInput
			placeholder="nom du client"
			source="lastname"
			resettable
			alwaysOn
		/>
	</Filter>
);

export const UserList = (props) => (
	<List {...props} filters={<UserFilter />}>
		<Datagrid rowClick="show">
			<TextField source="id" />
			<TextField source="firstname" label="Prénom" />
			<TextField source="lastname" label="Nom" />
			<TextField source="username" label="Pseudo" />
			<TextField source="email" />
			<TextField source="role" />
			<EditButton label="Modifier" />
			<ShowButton label="Voir" />
		</Datagrid>
	</List>
);

export const UserEdit = (props) => (
	<Edit
		{...props}
		actions={
			<TopToolbar>
				<PrevNextButtons />
				<ShowButton />
			</TopToolbar>
		}
	>
		<SimpleForm>
			<TextInput disabled label="Id" source="id" />
			<TextInput label="firstname" source="firstname" />
			<TextInput label="lastname" source="lastname" />
			<TextInput label="username" source="username" />
			<TextInput label="email" source="email" />
			<ReferenceInput label="Role" source="RoleId" reference="roles">
				<SelectInput optionText="name" />
			</ReferenceInput>
		</SimpleForm>
	</Edit>
);
export const UserCreate = (props) => (
	<Create {...props}>
		<SimpleForm>
			<TextInput source="firstname" />
			<TextInput source="lastname" />
			<TextInput source="username" />
			<TextInput source="email" />
			<ReferenceInput label="Role" source="RoleId" reference="roles">
				<SelectInput optionText="name" />
			</ReferenceInput>
			<PasswordInput source="password" />
		</SimpleForm>
	</Create>
);

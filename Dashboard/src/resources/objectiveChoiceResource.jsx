// import { useState, useEffect } from "react";
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
	ReferenceField,
	SelectInput,
	ReferenceInput,
} from "react-admin";

export const ObjectiveChoiceList = (props) => (
	<List {...props}>
		<Datagrid rowClick="show">
			<TextField source="id" />
			<TextField source="description" />
			<ReferenceField
				label="objectifs"
				source="id_objective"
				reference="objectives"
			/>
			<ReferenceField
				label="choix de séance"
				source="id_orientation"
				reference="orientations"
			/>
			<EditButton label="Modifier" />
			<ShowButton label="Voir" />
		</Datagrid>
	</List>
);

export const ObjectiveChoiceEdit = (props) => {
	<Edit {...props}>
		<SimpleForm>
			<TextInput disabled label="Id" source="id" />
			<TextInput label="description" source="description" />
			<ReferenceInput
				label="Objectif"
				source="id_objective"
				reference="objectives"
			>
				<SelectInput optionText="title" />
			</ReferenceInput>
			<ReferenceInput
				label="Choix de séance"
				source="id_orientation"
				reference="orientations"
			>
				<SelectInput optionText="name" />
			</ReferenceInput>
		</SimpleForm>
	</Edit>;
};

export const ObjectiveChoiceCreate = (props) => (
	<Create {...props}>
		<SimpleForm>
			<TextInput source="description" />

			<ReferenceInput
				label="Objectif"
				source="id_objective"
				reference="objectives"
			>
				<SelectInput optionText="title" />
			</ReferenceInput>
			<ReferenceInput
				label="Choice de séance"
				source="id_orientation"
				reference="orientations"
			>
				<SelectInput optionText="name" />
			</ReferenceInput>
		</SimpleForm>
	</Create>
);

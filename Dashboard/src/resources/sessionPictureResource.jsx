import { useState, useEffect } from "react";
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
	ReferenceInput,
	ImageInput,
	ImageField,
	SelectInput,
	ReferenceField,
} from "react-admin";

export const SessionPictureList = (props) => (
	<List {...props}>
		<Datagrid rowClick="show">
			<TextField source="id" />
			<ImageField source="imagePath" title="image" />
			<ReferenceField source="id_sessionId" reference="sessions" />
			<ReferenceField source="userId" reference="users" />
			<EditButton label="Modifier" />
			<ShowButton label="Voir" />
		</Datagrid>
	</List>
);

export const SessionPictureEdit = (props) => {
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetch(
			"https://api-for-test.michael-moussaoui.com/api/scanSessions"
		)
			.then((response) => {
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				return response.json();
			})
			.then(() => {
				setLoading(false);
			})
			.catch((error) => {
				console.error(
					"Erreur lors de la récupération des Scansessions :",
					error
				);
				setLoading(false);
			});
	}, []);
	useEffect(() => {
		fetch("https://api-for-test.michael-moussaoui.com/api/users")
			.then((response) => {
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				return response.json();
			})
			.then(() => {
				setLoading(false);
			})
			.catch((error) => {
				console.error(
					"Erreur lors de la récupération des utilisateurs :",
					error
				);
				setLoading(false);
			});
	}, []);

	return (
		<div>
			{loading ? (
				<p>Chargement en cours...</p>
			) : (
				<Edit {...props}>
					<SimpleForm encType="multipart/form-data">
						<TextInput disabled label="Id" source="id" />
						<ImageField source="imagePath" title="image" />
						<ImageInput
							label="Image"
							source="imagePath"
							accept="image/*"
						>
							<ImageField source="imagePath" title="image" />
						</ImageInput>
						<ReferenceInput
							label="Séance scannée"
							source="id_sessionId"
							reference="scanSessions"
						>
							<SelectInput optionText="name" />
						</ReferenceInput>
						<ReferenceInput
							label="Utilisateur"
							source="userId"
							reference="users"
						>
							<SelectInput optionText="lastname" />
						</ReferenceInput>
					</SimpleForm>
				</Edit>
			)}
		</div>
	);
};

export const SessionPictureCreate = (props) => (
	<Create {...props}>
		<SimpleForm encType="multipart/form-data">
			<ImageInput label="Image" source="imagePath" accept="image/*">
				<ImageField source="imagePath" title="image" />
			</ImageInput>
			<ReferenceInput
				label="Séance"
				source="id_session_id"
				reference="sessions"
			>
				<SelectInput optionText="name" />
			</ReferenceInput>
			<ReferenceInput
				label="Nom de l'utilisateur"
				source="userId"
				reference="users"
			>
				<SelectInput optionText="lastname" />
			</ReferenceInput>
		</SimpleForm>
	</Create>
);

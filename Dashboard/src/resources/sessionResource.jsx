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
	DateField,
	BooleanInput,
	ReferenceInput,
} from "react-admin";

export const SessionList = (props) => (
	<List {...props}>
		<Datagrid rowClick="show">
			<TextField source="id" />
			<TextField source="comment" label="Commentaire" />
			<DateField
				source="createdAt"
				label="Date"
				format="DD/MM/YYYY"
			/>
			<TextField source="rate" label="évaluation" />
			<TextField source="isRating" label="évaluée" />

			<ReferenceField
				source="userId"
				label="ID utilisateur"
				reference="users"
			/>
			<ReferenceField
				source="categoryId"
				label="ID catégorie"
				reference="categories"
			/>
			<EditButton label="Modifier" />
			<ShowButton label="Voir" />
		</Datagrid>
	</List>
);

export const SessionEdit = (props) => {
	// const [categories, setCategories] = useState([]);
	// const [users, setUsers] = useState([]);
	// const [loading, setLoading] = useState(true);

	// useEffect(() => {
	// 	fetch("https://api-for-test.michael-moussaoui.com/api/categories")
	// 		.then((response) => {
	// 			if (!response.ok) {
	// 				throw new Error("Network response was not ok");
	// 			}
	// 			return response.json();
	// 		})
	// 		.then((data) => {
	// 			setCategories(data);
	// 			setLoading(false);
	// 		})
	// 		.catch((error) => {
	// 			console.error(
	// 				"Erreur lors de la récupération des catégories :",
	// 				error
	// 			);
	// 			setLoading(false);
	// 		});
	// }, []);
	// useEffect(() => {
	// 	fetch("https://api-for-test.michael-moussaoui.com/api/users")
	// 		.then((response) => {
	// 			if (!response.ok) {
	// 				throw new Error("Network response was not ok");
	// 			}
	// 			return response.json();
	// 		})
	// 		.then((data) => {
	// 			setUsers(data);
	// 			console.log(data);
	// 			setLoading(false);
	// 		})
	// 		.catch((error) => {
	// 			console.error(
	// 				"Erreur lors de la récupération des utlisateurs :",
	// 				error
	// 			);
	// 			setLoading(false);
	// 		});

	// 	// const firstnames = data.map((objet) => objet.lastname);
	// }, []);

	// return (
	// 	<div>
	// 		{loading ? (
	// 			<p>Chargement en cours...</p>
	// 		) : (
	<Edit {...props}>
		<SimpleForm>
			<TextInput disabled label="Id" source="id" />
			<TextInput source="comment" label="Commentaire" />
			<BooleanInput source="isRating" label="évaluée" />
			<ReferenceInput label="utilisateurs" source="userId">
				<SelectInput optionText="lastname" />
			</ReferenceInput>
			<ReferenceInput label="Categories" source="categoryId">
				<SelectInput optionText="name" />
			</ReferenceInput>
		</SimpleForm>
	</Edit>;
	// 		)}
	// 	</div>
	// );
};

export const SessionCreate = (props) => (
	<Create {...props}>
		<SimpleForm>
			<TextInput source="comment" label="Commentaire" />
			<TextInput source="rate" label="évaluation" />
			<BooleanInput source="isRating" label="évaluée" />

			<ReferenceInput
				source="userId"
				label="ID utilisateur"
				reference="users"
			/>
			<ReferenceInput
				source="categoryId"
				label="ID catégorie"
				reference="categories"
			/>
		</SimpleForm>
	</Create>
);

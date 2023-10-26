import { fetchUtils } from "react-admin";

const isLocalhost = Boolean(
	window.location.hostname === "localhost" ||
		window.location.hostname.match(
			/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
		)
);

const apiUrl = isLocalhost
	? "http://localhost:8087/api"
	: "https://api-for-test.michael-moussaoui.co";

const httpClient = fetchUtils.fetchJson;

const dataProvider = {
	getList: (resource) => {
		const url = `${apiUrl}/${resource}`;
		return httpClient(url).then(({ json, headers }) => {
			let total = 0;
			const contentRange = headers.get("content-range");
			if (contentRange) {
				total = parseInt(contentRange.split("/").pop(), 10);
			}
			return {
				data: json,
				total,
			};
		});
	},

	getOne: (resource, params) => {
		const url = `${apiUrl}/${resource}/${params.id}`;
		return httpClient(url).then(({ json }) => ({
			data: json,
		}));
	},

	getMany: (resource, params) => {
		const url = `${apiUrl}/${resource}?ids=${params.ids.join(",")}`;
		return httpClient(url).then(({ json }) => ({
			data: json,
		}));
	},

	getManyReference: (resource, params) => {
		const { page, perPage } = params.pagination;
		const { field, order } = params.sort;
		const query = {
			...params.filter,
			[params.target]: params.id,
		};
		const url = `${apiUrl}/${resource}?page=${page}&perPage=${perPage}&sort=${field}&order=${order}&${JSON.stringify(
			query
		)}`;
		return httpClient(url).then(({ headers, json }) => ({
			data: json,
			total: parseInt(
				headers.get("content-range").split("/").pop(),
				10
			),
		}));
	},

	create: (resource, params) => {
		if (resource === "sessionsPicture" && params.data.file) {
			const formData = new FormData();
			formData.append("imagePath", params.data.file.rawFile);

			return httpClient(`${apiUrl}/${resource}`, {
				method: "POST",
				body: formData,
			}).then(({ json }) => ({
				data: { ...params.data, id: json.id },
			}));
		}

		return httpClient(`${apiUrl}/${resource}`, {
			method: "POST",
			body: JSON.stringify(params.data),
		}).then(({ json }) => ({
			data: { ...params.data, id: json.id },
		}));
	},

	update: (resource, params) => {
		if (resource === "sessionsPicture" && params.data.file) {
			const formData = new FormData();
			formData.append("imagePath", params.data.file.rawFile);

			formData.append("title", params.data.title);

			return httpClient(`${apiUrl}/${resource}/${params.id}`, {
				method: "PUT",
				body: formData,
			}).then(() => ({
				data: { ...params.data, id: params.id },
			}));
		}

		return httpClient(`${apiUrl}/${resource}/${params.id}`, {
			method: "PUT",
			body: JSON.stringify(params.data),
		}).then(() => ({
			data: { ...params.data, id: params.id },
		}));
	},

	updateMany: (resource, params) => {
		const url = `${apiUrl}/${resource}`;
		return httpClient(url, {
			method: "PUT",
			body: JSON.stringify(params.data),
		}).then(({ json }) => ({
			data: json,
		}));
	},

	delete: (resource, params) => {
		const url = `${apiUrl}/${resource}/${params.id}`;
		return httpClient(url, {
			method: "DELETE",
		}).then(({ json }) => ({
			data: json,
		}));
	},

	deleteMany: (resource, params) => {
		const url = `${apiUrl}/${resource}`;
		return httpClient(url, {
			method: "DELETE",
			body: JSON.stringify(params.ids),
		}).then(({ json }) => ({
			data: json,
		}));
	},
};

export default dataProvider;

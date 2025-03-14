import api from "../utils/api";


export const register = async (firstname, lastname, email, password, adresse) => {
	let res = await api.post("/api/account/register", { 
		"prenomCli": firstname,
		"nomCli": lastname,
		"email": email,
		"mdp": password,
		"adresse": [adresse]
	 });
	return res.status == 200;
}

export const getCompte = async (idCli) => {
	try {
		let res = await api.get("/api/admin/account/get-compte-admin", { params: { idCli: idCli } });
        return res.data;
      } catch (error) {
        return null;
      }
}

export const unsubNewletters = async () => {
	api.post("/api/client/account/remove-newsletter");
}

export const subNewsletters = async (mail) => {
	return api.post("/api/client/account/add-newsletter", {
		mail: mail
	})
		.then((res) => {
			if (res.status == 200 || res.status == 201) return true;
			return null;
		})
		.catch((err) => {
			return null;
		})
}
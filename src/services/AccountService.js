import axios from "axios"

export const getProfilCurrentSession = async () => {
	let res = await axios.get("/api/client/account/get-compte");
	if ( res.status != 200 ) return null;
	return res.data;
}

export const disableMyAccount = async () => {
	let res = await axios.post("/api/client/account/disable-account");
	if ( res.status != 200 ) return false;
	return true;
}

export const updateUserDetailsApi = async (firstname, lastname, address) => {
    try {
        const data = await axios
            .post('/api/client/account/update-nom-prenom' , {
                nom : firstname,
                prenom : lastname,
                adresse: address
            });
        return data.status == 200 || data.status == 201;
    } catch (err) {
        return false;
    }
}
import { apiClient } from "../../../api/apiClient";


export async function postRegisterUser(userData) {

    const response = await apiClient.post("/auth/register/", userData);
    return response.data;
    
}
import axios from "axios";
import { Account } from "../../../domain/model/account";


export const createAccount = async (email: string, password: string): Promise<Account | undefined> => {
    try {
        const response = await axios.post<{ id: string; email: string, password: string }>('http://localhost:6666/register', {
            email,
            password
        });
        console.log("response.data:", response.data)
        return response.data;
    } catch (err) {
        console.error(err)
        return undefined
    }
};

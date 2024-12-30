import axios from "axios";
import { AppError, ERROR_MESSAGES } from "./errorHandling";

interface Company {
    name: string
}

interface Address {
    street: string,
    suite: string,
    city: string,
}

export interface User {
    id: number;
    name: string;
    email: string;
    phone?: string;
    website?: string;
    company: Company;
    username: string;
    address: Address;
}

export const fetchUsers = async <T>(url: string, retries = 3): Promise<T> => {
    while (retries > 0) {
        try {
            const response = await axios.get<T>(url);
            return response.data;
        } catch (error) {
            retries -= 1;
            console.log(`Retrying... ${retries} attempt(s) remaining.`);
            if (retries === 0) {
                throw new AppError(ERROR_MESSAGES.DATA_LOAD_ERROR);
            }
        }
    }
    throw new AppError(ERROR_MESSAGES.UNKNOWN_ERROR);
};

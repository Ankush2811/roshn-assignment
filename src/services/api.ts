import axios from "axios";

interface Company {
    name: string
}
export interface User {
    id: number;
    name: string;
    email: string;
    phone?: string;
    website?: string;
    company: Company;
    username: string;
}

export const fetchUsers = async <T>(url: string, retries = 3): Promise<T> => {
    while (retries > 0) {
        try {
            const response = await axios.get<T>(url);
            return response.data;
        } catch (error) {
            retries -= 1;
            if (retries === 0) {
                throw new Error("Failed to fetch data after 3 attempts.");
            }
        }
    }
    throw new Error("Unexpected error.");
};

import React, { createContext, useReducer, ReactNode, Dispatch } from "react";
import { User } from "../services/api"; // Assuming you have the User type defined

// Define action types
type UserAction =
    | { type: "FETCH_USERS_REQUEST" }
    | { type: "FETCH_USERS_SUCCESS"; payload: User[] }
    | { type: "FETCH_USERS_FAILURE"; payload: string }
    | { type: "SELECT_USER"; payload: User };

// Define the state structure
interface UserState {
    users: User[];
    loading: boolean;
    error: string | null;
    selectedUser: User | null;
}

// Initial state
const initialState: UserState = {
    users: [],
    loading: false,
    error: null,
    selectedUser: null,
};

// Reducer function
const userReducer = (state: UserState, action: UserAction): UserState => {
    switch (action.type) {
        case "FETCH_USERS_REQUEST":
            return { ...state, loading: true, error: null };
        case "FETCH_USERS_SUCCESS":
            return { ...state, loading: false, users: action.payload };
        case "FETCH_USERS_FAILURE":
            return { ...state, loading: false, error: action.payload };
        case "SELECT_USER":
            return { ...state, selectedUser: action.payload };
        default:
            return state;
    }
};

// Create context
export const UserContext = createContext<{
    state: UserState;
    dispatch: Dispatch<UserAction>;
}>({
    state: initialState,
    dispatch: () => undefined,
});

// Context provider
export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(userReducer, initialState);

    return (
        <UserContext.Provider value={{ state, dispatch }}>
            {children}
        </UserContext.Provider>
    );
};

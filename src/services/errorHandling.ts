export class AppError extends Error {
    public code?: string;

    constructor(message: string, code?: string) {
        super(message);
        this.name = "AppError";
        this.code = code;
    }
}

export const ERROR_MESSAGES = {
    NETWORK_ERROR: "There seems to be a network issue. Please check your connection and try again.",
    DATA_LOAD_ERROR: "Failed to load data. Please try again later.",
    UNKNOWN_ERROR: "An unexpected error occurred. Please try again.",
};

export const handleError = (error: unknown): string => {
    if (error instanceof AppError) {
        return error.message;
    } else if (error instanceof Error) {
        return ERROR_MESSAGES.UNKNOWN_ERROR;
    } else {
        return ERROR_MESSAGES.UNKNOWN_ERROR;
    }
};

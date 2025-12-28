

export interface IUserPopulated {
    _id: string;
    name: string;
    email: string;
    role: "admin" | "user" | "subadmin";
}


export interface ITransactionPopulated {
    _id: string;
    amount: number;
    date: string; // ISO string (from backend JSON)
    year: number;
    sender: IUserPopulated;
    receiver: IUserPopulated;
    createdBy: string;
    medium: string;
    transactionId: string;
    __v: number;
}



export interface ITransactionApiResponse {
    success: boolean;
    count: number;
    source: "MongoDB" | "Google Sheet";
    data: ITransactionPopulated[];
}

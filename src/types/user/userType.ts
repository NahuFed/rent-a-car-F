export interface Role {
    name: string;
}

export interface User {
    id: number;
    firstName: string;
    lastName: string;
    dob: string;
    email: string;
    address: string;
    country: string;
    createdAt: string;
    updatedAt: string;
    role: Role;
}
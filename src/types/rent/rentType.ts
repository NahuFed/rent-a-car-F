export interface Role {
    name: string;
}

export interface Car {
    id: number;
    brand: string;
    model: string;
    color: string;
    passengers: number;
    ac: boolean;
    pricePerDay: number;
    createdAt: string; // Nota: en el JSON aparece "craetedAt", asumiendo que es "createdAt"
    updatedAt: string;
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

export interface RentType {
    id: number;
    pricePerDay: number;
    acceptedDated: string | null;
    rejected: boolean;
    startingDate: string;
    dueDate: string;
    endDate: string | null;
    createdAt: string;
    updatedAt: string;
    car: Car;
    user: User;
    admin: User;
}
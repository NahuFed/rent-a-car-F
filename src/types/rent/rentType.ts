import {User} from '../user/userType';

export interface Car {
    id: number;
    brand: string;
    model: string;
    color: string;
    passengers: number;
    ac: boolean;
    pricePerDay: number;
    createdAt: string; 
    updatedAt: string;
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
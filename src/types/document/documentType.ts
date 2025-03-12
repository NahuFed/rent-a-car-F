import { User } from '../user/userType';

export interface DocumentType {
    id: number;
    url: string;
    src: string;
    description: string;
    title: string;
    createdAt: string;
    updatedAt: string;
    user: User;
}
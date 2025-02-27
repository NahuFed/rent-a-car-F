import { CarPictureType } from './carPictureType';

export interface CreatePictureDto {
    car: number;
    src: string;
    description: string;
    title: string;
    type:{name: CarPictureType} ; 
    date: Date;
    createdAt?: Date;
    updatedAt?: Date;
}
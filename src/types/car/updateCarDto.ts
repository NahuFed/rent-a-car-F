export interface UpdateCarDto {
    id?: number;
    brand?: string;
    model?: string;
    color?: string;
    passengers?: number;
    ac?: boolean;
    pricePerDay?: number;
    createdAt?: Date;
    updatedAt?: Date;
}
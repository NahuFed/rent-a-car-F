export interface CreateRentDTO {
    id: number;
    carId: number;
    pricePerDay: number;
    userId: number;
    adminId: number | null;
    startingDate: string;
    dueDate: string;
    acceptedDated: string | null;
    rejected: boolean;
    endDate: string | null;
    createdAt: string;
    updatedAt: string;
}
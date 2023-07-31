export interface IProduct {
    name?: string;
    price?: number;
    image?: {
        url?: string;
        publicId?: string;
    };
    description?: string;
    reQuantity?: number;
    categoryId?: string;
    _id?: string;
    createdAt?: string;
    updatedAt?: string;
}

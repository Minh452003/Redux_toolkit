export interface IProduct {
    id?: string
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
export interface ProductResponse {
    docs: IProduct[];
    totalDocs: number;
    limit: number;
    totalPages: number;
    page: number;
    pagingCounter: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
    prevPage: number | null;
    nextPage: number | null;
}
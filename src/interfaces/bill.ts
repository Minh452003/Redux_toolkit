export interface Product {
    productId: string;
    name: string;
    price: number;
    image: object;
    quantity: number;
}

export interface IBill {
    _id: string;
    userId: string;
    products: Product[];
    total: number;
    status: string;
    address: string;
    phone: string;
    notes: string;
    createdAt: string;
    updatedAt: string;
}

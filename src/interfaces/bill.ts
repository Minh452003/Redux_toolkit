export interface Product {
    productId: string;
    name: string;
    price: number;
    image: any;
    quantity: number;
}

export interface IBill {
    _id: string;
    userId: string;
    products: Product[];
    total: number;
    status: any;
    address: string;
    phone: string;
    notes: string;
    createdAt: string;
    updatedAt: string;
}

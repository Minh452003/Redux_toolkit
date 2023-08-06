export interface IUser {
    id?: string,
    user?: any
    _id?: number | string;
    name?: string;
    email?: string;
    password?: string
    confirmpassword?: string
    address?: string
    image?: IImage | any
    role?: string,
    phone?: string
}
export interface IImage {
    url: string;
    publicId: string;
}
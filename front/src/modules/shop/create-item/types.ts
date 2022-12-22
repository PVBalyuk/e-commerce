export interface ICreateItemSchema {
    image?: FileList | null;
    title: string;
    description: string;
    price: string;
}
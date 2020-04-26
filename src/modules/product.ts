export class Product {
    id: number;
    title: string;
    image: string;
    type: string;
    price: number;
    quantity: number;

    constructor(id: number, title: string, image: string, description: string, price: number, quantity: number) {
        this.id = id;
        this.title = title;
        this.image = image;
        this.type = description;
        this.price = price;
        this.quantity = quantity;
    }
}
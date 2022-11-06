import { OrderItem } from "./order-item";
export declare class Order {
    id: number;
    transaction_id: string;
    user_id: number;
    code: string;
    ambassador_email: string;
    first_name: string;
    last_name: string;
    email: string;
    address: string;
    country: string;
    city: string;
    zip: string;
    complete: boolean;
    order_items: OrderItem[];
    get name(): string;
    get total(): number;
}

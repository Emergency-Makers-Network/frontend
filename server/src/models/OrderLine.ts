// Class Definition for PPEOrderLine

// Placeholder for eventual ORM to Postgres

export class OrderLine {
    constructor(id?: string, product_id: string, qty: number) {
        this.id = id;
        this.product_id = product_id;
        this.qty = qty;
    }
}

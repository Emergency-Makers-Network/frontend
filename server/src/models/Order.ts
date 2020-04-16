// Class Definition for PPEOrder

// Placeholder for eventual ORM to Postgres

export class Order {
	constructor(
		id?: string,
		first_name: string,
		last_name: string,
		phone: string,
		created_at?: string,
		updated_at?: string,
		email: string,
		address_id?: string,
		order_line_ids: array
	)
	{
		this.id = id;
		this.first_name = first_name;
		this.last_name = last_name;
		this.phone = phone;
		this.created_at = created_at;
		this.updated_at = updated_at;
		this.email = email;
		this.address_id = address_id;
		this.order_line_ids = order_line_ids;
	}
}

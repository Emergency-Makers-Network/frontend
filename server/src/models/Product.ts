// Class Definition for an Product

// Placeholder for eventual ORM to Postgres

export class Product {
	constructor(
		id?: string,
		name: string,
		description: string,
		image_url: string
	)
	{
		this.id = id;
		this.name = name;
		this.description = description;
		this.image_url = image_url;
	}
}

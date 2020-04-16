// Class Definition for PPERequest

export class PPERequest {
	constructor(id?: string,
		first_name: string,
		last_name: string,
		phone: string,
		created_at?: string,
		updated_at?: string,
		email: string
	)
	{
		this.id = id;
		this.first_name = first_name;
		this.last_name = last_name;
		this.phone = phone;
		this.created_at = created_at;
		this.updated_at = updated_at;
		this.email = email;
	}
}

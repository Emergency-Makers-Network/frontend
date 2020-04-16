import { GraphQLResolveInfo } from 'graphql';
import { IResolvers } from 'graphql-tools';

import { Xometry } from './integrations/Xometry';

// Models
import { Order } from './models/Order';
import { Product } from './models/Product';

const resolverMap: IResolvers = {
	Query: {
    	getOrder({id}): Order {
    		let order: Order = {
    			id: 'id',
    			first_name: 'fname',
    			last_name: 'lname',
    			phone: 'phone',
    			email: 'email',
    			address_id: 'address_id',
    			order_line_ids: [ '123' ]
    		};
    		return order;
    	},
    	products(): [Product] {
    		let product: Product = {
    			id: 'id',
    			name: 'name',
    			description: 'desc',
    			image_url: 'image_url'
    		}
    		return [ product ];
    	}
    },
    Mutation: {
    	setOrder({input}): string {
    		return 'id';
    	}
    }
};

export default resolverMap;
import { GraphQLResolveInfo } from 'graphql';
import { IResolvers } from 'graphql-tools';

import { Xometry } from './integrations/Xometry';

// Models
import { PPERequest } from './models/PPERequest';

const resolverMap: IResolvers = {
	Query: {
    	getPPERequest({id}): PPERequest {
    		let ppe: PPERequest = {
    			id: 'id',
    			first_name: 'fname',
    			last_name: 'lname',
    			phone: 'phone',
    			enmai: 'email'
    		};
    		return ppe;
    	}
    },
    Mutation: {
    	setPPERequest({PPERequest}): string {
    		return 'id';
    	}
    }
};

export default resolverMap;
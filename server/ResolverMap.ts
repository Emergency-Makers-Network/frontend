// resolverMap.ts
import { IResolvers } from 'graphql-tools';
const resolverMap: IResolvers = {
  Query: {
    xometry(_: void, args: void): string {
    	console.log("resolver");
		return 'Hello world!';
    },
  },
};
export default resolverMap;
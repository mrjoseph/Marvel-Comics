import { IResolvers } from 'graphql-tools';

const resolverMap: IResolvers = {
  Query: {
    characters: async (source: void, args: void, { dataSources }): Promise<object> => {
      return await dataSources.personalizationAPI.getCharacters()
    }
  },
};

export default resolverMap;
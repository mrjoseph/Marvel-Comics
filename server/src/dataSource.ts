import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';
var md5 = require('md5');

interface IMarvelAPI {
    getMovie(id: string): any;
  };

export interface IDataSources {
	marvelApi: IMarvelAPI;
}

interface ICharacterParams {
    offset: number
}

class PersonalizationAPI extends RESTDataSource {
    baseURL = `http://gateway.marvel.com/v1/public/`;
    willSendRequest(request: RequestOptions) {
        const { ts, privateKey, apikey } = this.context

        const hash = md5(`${ts}${privateKey}${apikey}`);
        request.params.set('ts', ts);
        request.params.set('apikey', apikey);
        request.params.set('hash', hash);
    }

    async getCharacters(args:ICharacterParams) {
        const { offset } = args;
        return await this.get('characters', {
            offset
        })
    }
    async getCharacter(id:string) {
        return await this.get(`characters/${id}`)
    }
  }

  export default PersonalizationAPI;
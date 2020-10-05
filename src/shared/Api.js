const TOKEN_KEY = 'access-token';
const ENDPOINT = 'https://apttussdk-taxandaccounting.cs125.force.com/store';

export class ApiService{

    async get(endpoint){
        return this.doFetch(endpoint, 'GET');
    }

    async post(endpoint, payload){
        return this.doFetch(endpoint, 'POST', payload)
    }

    async del(endpoint){
        return this.doFetch(endpoint, 'DELETE');
    }

    async put(endpoint, payload){
        return this.doFetch(endpoint, 'PUT', payload);
    }

    async patch(endpoint, payload){
        return this.doFetch(endpoint, 'PATCH', payload);
    }

    async getToken(){
        if(localStorage.getItem(TOKEN_KEY) != null)
            return localStorage.getItem(TOKEN_KEY);
        else{
            const userData = await this.doFetch(`/user/token`, 'POST', null, true);
            localStorage.setItem(TOKEN_KEY, userData.accessToken);
            return userData.accessToken;
        }
    }

    async doFetch(path, method, payload, anonymous, retry){
            
        const url = `${ENDPOINT}/services/apexrest/Apttus_WebStore/apttus/v2${path}`;

        const headers = new Headers({
            'x-storefront': 'ECommerce',
            'Content-Type': 'application/json'
        });

        if(!anonymous){
            const token = await this.getToken();
            headers.set('Authorization', `Bearer ${token}`)
        }

        const request = new Request(url, {
            method: method,
            cache: 'default',
            headers: headers,
            body: (payload != null) ? JSON.stringify(payload) : null
        });

        return fetch(request)
            .then(res => res.json())
            .then(res => res.data)
            .catch(e => {
                if(e.name === 'TypeError' && !retry){
                    localStorage.removeItem(TOKEN_KEY);
                    return this.doFetch(path, method, payload, anonymous, true);
                }
            });
    }

}
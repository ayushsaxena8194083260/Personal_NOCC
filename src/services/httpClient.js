import axios from 'axios';


const getClientAxios = () => {
    //const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const options = {
        // baseURL: 'http://elb-testing-145040556.us-east-1.elb.amazonaws.com/api/',
        // baseURL: 'http://localhost:8080/api/',
        // baseURL: 'http://creditbricksbackend-env.eba-w7pqwbpz.us-east-1.elasticbeanstalk.com/',
        baseURL: 'http://noccwebstaging-env.eba-sutf6wep.us-east-1.elasticbeanstalk.com/',
        headers: {
            Accept: 'application/json',
        }
    };

    /*    if (currentUser) {
            options.headers.Authorization = 'Bearer ' + currentUser.token;
            options.headers.role = '' + currentUser.role === '0' ? 'admin' : 'editor';
        }
    */
    const clientAxios = axios.create(options);
    return clientAxios;
};


export class HttpClient {

    constructor() {
        this.client = getClientAxios();
    }


    get(url, conf = {}) {
        return this.client.get(url, conf)
            .then(response => Promise.resolve(response.data))
            .catch(error => Promise.reject(error));
    }

    delete(url, conf = {}) {
        return this.client.delete(url, conf)
            .then(response => Promise.resolve(response))
            .catch(error => Promise.reject(error));
    }

    head(url, conf = {}) {
        return this.client.head(url, conf)
            .then(response => Promise.resolve(response))
            .catch(error => Promise.reject(error));
    }

    options(url, conf = {}) {
        return this.client.options(url, conf)
            .then(response => Promise.resolve(response))
            .catch(error => Promise.reject(error));
    }

    post(url, data = {}, conf = {}) {
        return this.client.post(url, data, conf)
            .then(response => Promise.resolve(response.data))
            .catch(error => Promise.reject(error));
    }

    put(url, data = {}, conf = {}) {
        return this.client.put(url, data, conf)
            .then(response => Promise.resolve(response))
            .catch(error => Promise.reject(error));
    }

    patch(url, data = {}, conf = {}) {
        return this.client.patch(url, data, conf)
            .then(response => Promise.resolve(response))
            .catch(error => Promise.reject(error));
    }

}

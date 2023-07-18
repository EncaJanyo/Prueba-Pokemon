import axios from 'axios'
axios.defaults.baseURL = window.location.origin;

// api routes to exclude the notification error
//const excludeErrorNotification = ['auth/login']

/**
 * @author Johann Chaparro
 * @class Api
 */
export default class Api {

    constructor() {

    }

    /**
     *
     * @param {Function} callback
     * @param {String} path
     * @param {Object} payload
     * @returns
     */
    async request(callback, path, payload) {
        try {
            return await callback(path, payload);
        } catch (error) {
            return error;
        }
    }

    /**
     * @param  {string} path
     * @param  {object} params
     */
    get(path, params = {}) {
        return this.request(axios.get, path, { params })
    }

    /**
     * @param  {string} path
     * @param  {object} payload
     */
    post(path, payload = {}) {
        return this.request(axios.post, path, payload)
    }

    /**
    * @param  {string} path
    * @param  {object} payload
    */
    put(path, payload = {}) {
        return this.request(axios.put, path, payload)
    }

    /**
     * @param  {string} path
     */
    delete(path, params = {}) {
        return this.request(axios.delete, path, { params })
    }

}

import Api from '../api'

export async function Register(payload) {
    return await new  Api().post('api/register', payload)
}

export async function Login(payload) {
    return await new  Api().post('api/login', payload)
}

export async function User() {
    return await new  Api().get('api/user')
}

export async function Logout() {
    return await new  Api().post('api/logout')
}

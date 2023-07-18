import { ElNotification } from 'element-plus'

export function Notify(status, title, message) {
    let type = 'error';
    if (status === 200 || status === 201 || status === 202) {
        type = 'success'
    } else if (status === 400 || status === 401) {
        type = 'warning'
    } else if (status === 403 || status === 404 || status === 405 || status === 406) {
        type = 'info'
    }
    else if (status === 501 || status === 502 || status === 503 || status === 504) {
        type = 'error'
    }

    setTimeout(() => {

        ElNotification({
            type: type,
            title: title,
            message: message,
            position: 'top-right',
            duration: 2000
        });

    }, 1000);
}

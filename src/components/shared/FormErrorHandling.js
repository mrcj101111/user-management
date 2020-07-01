function errorHandling(data) {
    switch (data[0]) {
        case 'email':
            const validEmailRegex = (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
            return validEmailRegex.test(data[1]) ? '' : 'Please provide a vaid email';
        default:
            return '';
    }
}

export default errorHandling;

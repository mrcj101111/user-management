//Add form type based on data received
function formInputType(data) {
    switch (data) {
        case 'email':
            return 'email';
        default:
            return 'text';
    }
}

export default formInputType;

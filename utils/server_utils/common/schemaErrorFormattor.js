export const schemaErrorFormatter = error =>{
    // Users validation failed: hashed_password: Please provide a strong password, email: Email is required
    const errors = {};
    const allSchemaErrors = error.substring(error.indexOf(':') + 1).trim();
    const allErrorsInArray = allSchemaErrors.split(',').map(err => err.trim());
    allErrorsInArray.forEach(er =>{
        const [key,value] = er.split(':').map(err=>err.trim());
        errors[key] = value;
    })

    return errors;
}
const errorHandler = (err, req, res, next) => {
    // console.log(validationHandle, "<<<<<");
    let status = 500
    let message = "Internal Services Error"
    switch (err.message) {
        case "Authentication Error in Data":
            status = 401
            message = err.message
            break;
        case "Authentication Error in Access Token":
            status = 401
            message = err.message
            break;
        case "Authorization Error in Access":
            status = 403
            message = err.message
            break;
        case "Authorization Error in Data":
            status = 403
            message = err.message
            break;
        case "invalid token":
            status = 401
            message = err.message
            break;
        case "User not Found":
            status = 404
            message = err.message
            break;
        case "Invalid Account":
            status = 401
            message = err.message
            break;
        case "Validation error":
            status = 400
            message = err.message
            break;
        case "Data not Found":
            status = 400
            message = err.message
            break;
        default:
            break;
    }
    // let validationHandle = err.errors[0].type || err.errors
    // if(validationHandle) {
    //     message = err.errors.map(e => {
    //         return {message: e.message}
    //     })
    //     status = 400    
    // }
    res.status(status).json({message})
}

module.exports = errorHandler

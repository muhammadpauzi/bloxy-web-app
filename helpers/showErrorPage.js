const showErrorPage = (res = {}, error = '', message = 'Something went wrong, please check again later.', statusCode = 500
) => {
    if (process.env.NODE_ENV === 'development') {
        console.log(error);
    }
    res.render('errors/error', {
        statusCode,
        message
    });
}

module.exports = showErrorPage;
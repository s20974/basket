exports.mainPage = (req, res, next) => {
    res.render('index', {})
}

exports.error = (req, res, next) => {
    res.render('error', {})
}
    
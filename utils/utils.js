const errorHandler = (res, error) => {
    console.error(error)
    res.status(500).json({
        error:'Internal Server error'
    })
}

module.exports = {errorHandler}
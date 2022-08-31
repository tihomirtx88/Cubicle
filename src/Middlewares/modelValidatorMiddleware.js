exports.modelValidator = (Model) => async (req,res,next) => {
    try {
        const isValid = Model.validate(req.body);

        next();
    } catch (error) {
        res.status(400).send(Object.values(error)[0]);
    }
}
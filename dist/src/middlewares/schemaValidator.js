export default function schemaValidator(schema) {
    return function (req, res, next) {
        var body = req.body;
        var bodyValidation = schema.validate(body);
        if (bodyValidation.error) {
            console.log(bodyValidation.error.details);
            return res.status(422).send(bodyValidation.error.details);
        }
        next();
    };
}

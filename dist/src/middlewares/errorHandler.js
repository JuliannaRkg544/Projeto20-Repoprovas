export default function errorHandler(error, req, res, next) {
    console.log(error);
    if (error.type === 'not_found')
        return res.status(404).send(error.type.message);
    if (error.type === 'forbidden')
        return res.status(403).send(error.type.message);
    if (error.type === 'conflict')
        return res.status(409).send(error.type.message);
    if (error.type === 'unauthorized')
        return res.status(401).send(error.message);
    if (error.type === 'unprocessable_entity')
        return res.status(422).send(error.message);
    return res.sendStatus(500);
}

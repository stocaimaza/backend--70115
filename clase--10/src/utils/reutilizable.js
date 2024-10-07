export const respuesta = (res, status, message) => {
    res.status(status).json({message}); 
}
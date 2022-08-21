const Mensaje = require('../models/mensaje');

const obtenerChat = async (req, res) => {

    const myId = req.uid;
    const mensajesDe = req.params.de;

    const last30 = await Mensaje.find({
        $or: [ {de: myId}, {para: mensajesDe}, {de: mensajesDe}, {para: myId} ]
    })
    .sort({ createAt: 'desc' })
    .limit(30);
    
    res.json({
        ok : true,
        mensajes : last30
    });
}

module.exports = {
    obtenerChat
}
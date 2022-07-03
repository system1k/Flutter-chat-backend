/*
    path: /api/login
*/

const { Router } = require('express');
const { check } = require('express-validator');

const { creandoUsuarios, login, renewToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.post(
    '/new', 
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'La contraseña es obligatoria').not().isEmpty(),
        check('email', 'El correo es obligatorio').isEmail(),
        validarCampos
    ], 
    creandoUsuarios
);

router.post(
    '/',
    [
        check('password', 'La contraseña es obligatoria').not().isEmpty(),
        check('email', 'El correo es obligatorio').isEmail(),
    ],
    login
);

//Validar JWT
router.get('/renew', validarJWT, renewToken);

module.exports = router;
import { UserModel } from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import messages from "../utils/messages.js";

const { messageGeneral } = messages;

const userCtrl = {};

userCtrl.register = async(req, res) => {
    try {
        //obtenemos lo que el usuario nos envía
        const data = req.body;

        //validamos que llegue la data
        if(!data.name || !data.email || !data.password) {
            return messageGeneral(res, 400, false, '', 'Todos los campos son obligaotrios')
        }

        //validamos si el correo existe
        const userExist = await UserModel.findOne({email: data.email});
        if(userExist) {
            return messageGeneral(res, 400, false, '', 'El correo ya está registrado');
        }

        //encryptamos la contraseña
        data.password = await bcrypt.hash(data.password, 10);

        //creamos el usuario
        const newUser = await UserModel.create(data);

        //generamo e token 
        const token = jwt.sign({_id: newUser._id}, 'secreta');

        //enviamos el mensaje de bienvenida
        messageGeneral(res, 201, true, {...newUser._doc, password:null, token}, 'Usuario creado correctamente');
        
    } catch (error) {
        messageGeneral(res, 500, false, '', error.message)
    }
}


userCtrl.login = async(req, res) => {
    try {
        const data = req.body;

        //comprobamos que la data llegue completa
        if(!data.email || !data.password) {
            return messageGeneral(res, 400, false, '', 'Todos los campos son obligatorios')
        }

        //validamos si el correo existe
        const userExist = await UserModel.findOne({email: data.email});
        if(!userExist) {
            return messageGeneral(res, 400, false, '', 'El correo no está registrado')
        }

        //comparamos las contraseñas
        const compare = await bcrypt.compare(data.password, userExist.password);
        if(compare) {
            //generamos el token
            const token = jwt.sign({_id: userExist._id}, 'secreta');

            //enviamos el mensaje de bienvenida
            return messageGeneral(res, 200, true, {...userExist._doc, password:null, token}, 'Bienvenido');
        }
        messageGeneral(res, 400, false, '', 'La contraseña es incorrecta')
        
    } catch (error) {
        messageGeneral(res, 500, false, '', error.message);
    }
}



export default userCtrl;
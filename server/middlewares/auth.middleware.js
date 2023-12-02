import jwt from 'jsonwebtoken'
import { UserModel } from '../models/user.model.js'
import messages from '../utils/messages.js'
const { messageGeneral } = messages

export const verifyToken = (req, res, next) => {
    //comprobamos si nos mandan la cabecera de autenticación
  if (!req.headers.authorization) {
    return messageGeneral(
      res,
      401,
      false,
      null,
      'Usted no está autorizado 1'
    );
  }
  console.log(req.headers.authorization);

  //extraemos el token
  const token = req.headers.authorization.split(" ")[1];
  if(!token) {
    return messageGeneral(
        res,
        401,
        false,
        null,
        'Usted no está autorizado 2'
      );
  }
  //decodificamos el token
  jwt.verify(token, 'secreta', async(error, payload) => {
    if(error) {
        return messageGeneral(
            res,
            401,
            false,
            null,
            'Usted no está autorizado 3'
          );
    }
    //extraemos el id
    const { _id } = payload;

    //buscamos al jefe eb la base de datos
    const resp = await UserModel.findById(_id);
    if(!resp) {
        return messageGeneral(
            res,
            401,
            false,
            null,
            'Usted no está autorizado 4'
          );
    }

    //creamos una variable en el req-userid que va a almecenar el id
    req.userid = _id;
    next();
  })

}

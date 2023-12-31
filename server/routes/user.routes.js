import { Router } from "express";
import userCtrl from "../controllers/user.controllers.js";

const route = Router();

route.post('/register', userCtrl.register);
route.post('/login', userCtrl.login);

export default route;

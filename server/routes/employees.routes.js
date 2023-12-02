import { Router } from "express";
import employeeCtrl from "../controllers/employee.controllers.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const route = Router();
route.get('/', verifyToken, employeeCtrl.listAllEmployees);
route.post('/create', verifyToken, employeeCtrl.createEmployee);
route.get('/listid/:id', verifyToken, employeeCtrl.listById);
route.get('/listboss', verifyToken, employeeCtrl.listEmployeeBoss);
route.delete('/delete/:id', verifyToken, employeeCtrl.deleteEmployee);
route.put('/update/:id', verifyToken, employeeCtrl.updateEmployee);
route.get('/search', verifyToken, employeeCtrl.searchEmployee);

export default route;
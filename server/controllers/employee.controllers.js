import { EmployeeModel } from '../models/employee.model.js'
import messages from '../utils/messages.js'

const { messageGeneral } = messages

const employeeCtrl = {}

//listar todos los empleados
employeeCtrl.listAllEmployees = async (req, res) => {
  try {
    const resp = await EmployeeModel.find().populate({
      path: 'user',
      select: '-password'
    })
    messageGeneral(res, 200, true, resp, 'Estos son todos los empleados')
  } catch (error) {
    messageGeneral(res, 500, false, '', error.message)
  }
}

employeeCtrl.createEmployee = async (req, res) => {
  try {
    const data = req.body

    const resp = await EmployeeModel.create({...data, user:req.userid})

    messageGeneral(res, 201, true, resp, 'Empleado creado')
  } catch (error) {
    messageGeneral(res, 500, false, '', error.message)
  }
}

employeeCtrl.listById = async (req, res) => {
  try {
    const { id } = req.params

    const resp = await EmployeeModel.findById(id)
    if (!resp) {
      return messageGeneral(res, 404, false, '', 'Empleado no encontrado')
    }

    messageGeneral(res, 200, true, resp, '')
  } catch (error) {
    messageGeneral(res, 500, false, '', error.message)
  }
}

employeeCtrl.listEmployeeBoss = async (req, res) => {
  try {
    // const { id } = req.params //lo eliminamos porque en el middleware ya definimos el id

    const resp = await EmployeeModel.find({ user: req.userid }).populate({
      path: 'user',
      select: '-password'
    })

    messageGeneral(res, 200, true, resp, '')
  } catch (error) {
    messageGeneral(res, 500, false, '', error.message)
  }
}

employeeCtrl.deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params

    const resp = await EmployeeModel.findById(id)
    if (!resp) {
      return messageGeneral(res, 404, false, '', 'Empleado no encontrado')
    }

    await resp.deleteOne()

    messageGeneral(res, 200, true, '', 'Empleado eliminado')
  } catch (error) {
    messageGeneral(res, 500, false, '', error.message)
  }
}

employeeCtrl.updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    const resp = await EmployeeModel.findById(id)
    if (!resp) {
      return messageGeneral(res, 404, false, '', 'Empleado no encontrado')
    }

    await resp.updateOne(req.body)

    messageGeneral(res, 200, true, '', 'Empleado actualizado')
  } catch (error) {
    messageGeneral(res, 500, false, '', error.message)
  }
}

employeeCtrl.searchEmployee = async (req, res) => {
  try {
    const {  query } = req.query;
    console.log(query);
    const resp = await EmployeeModel.find({
      names: { $regex: '.*' + query + '.*' },
      user:req.userid,
    });
    messageGeneral(res, 200, true, resp, '');

  } catch (error) {
    messageGeneral(res, 500, false, '', error.message)
  }
}

export default employeeCtrl

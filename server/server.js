import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import UserRoutes from './routes/user.routes.js'
import EmployeesRoutes from './routes/employees.routes.js'
import { connectDB } from './connection/db.js';
connectDB();

const app = express();
const port = 5011;

//middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended:true}));

//routes
app.use('/api', UserRoutes);
app.use('/api/employee', EmployeesRoutes)

//listen
app.listen(port, () => {
    console.log(`Escuchando al servidor en el puerto ${port}`);
})

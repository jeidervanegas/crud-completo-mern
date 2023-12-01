import mongoose from "mongoose";

const URLMONGO = 'mongodb://127.0.0.1:27017/crud-completo';

export const connectDB = async() => {
    try {
        const db = await mongoose.connect(URLMONGO);
        console.log(`CONECTADO A LA BASE DE DATOS ${db.connection.name}`);
    } catch (error) {
        console.log(`No se pudo conectar a la base de datos ${error.message}`);
    }
}
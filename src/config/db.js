const mongoose = require("mongoose")
const dns = require("dns")

// El error "querySrv ECONNREFUSED" ocurre cuando el DNS del sistema/ISP
// rechaza las consultas SRV que requiere el esquema "mongodb+srv://".
// Forzamos el uso de resolutores DNS públicos para evitarlo.
dns.setServers(["8.8.8.8", "1.1.1.1"])

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_DB)
        console.log(`Conexión con MongoDB establecida: ${conn.connection.host}`)
    }
    catch (error) {
        console.log(error)
        process.exit(1)
    }
}

module.exports = connectDB
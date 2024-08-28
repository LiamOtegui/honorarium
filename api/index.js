const sequelize = require('./database/db')
const app = require('./src/app')
require('dotenv').config()

const PORT = process.env.PORT

const server = async () => {
    try {
        await sequelize.sync({ force: false });
        console.log('Connection has been established successfully.');

        app.listen(PORT, () => {
            console.log(`App listening port: ${PORT}`);
        })

    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

server()
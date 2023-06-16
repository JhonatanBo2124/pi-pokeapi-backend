require('dotenv').config();
const server = require('./src/app')
const { sequelize } = require('./src/db')
const PORT = process.env.PORT || 3001

server.listen(PORT, async() => {
    await sequelize.sync({force: true});
    console.log('server listening in ', PORT)
});
const Sequelize = require('sequelize');
const config = require('./config.js');

let sequelize;

if (process.env.JAWSDB_URL) {
    sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
    const env = process.env.NODE_ENV || 'development';
    const { database, username, password, host, dialect, port } = config[env];
    sequelize = new Sequelize(database, username, password, {
        host: localhost,
        dialect: mysql,
        port: 3306
    });
}

module.exports = sequelize;

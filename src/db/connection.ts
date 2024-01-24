import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('rrhh', 'root', '1555', {
    host: 'localhost',
    dialect: 'mysql',
});

export default sequelize;
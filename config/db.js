import { Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env' });

const sequelize = new Sequelize('dtu_blog', 'root', `${process.env.PASSWORD}`, {
    dialect: 'mysql',
    host: 'localhost'
});

export default sequelize;
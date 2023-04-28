import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Image = sequelize.define('image', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4, // Or DataTypes.UUIDV1
        primaryKey: true,
    },
    url: {
        type: Sequelize.STRING,
        allowNull: false
    },
})

export default Image;
import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Category = sequelize.define('category', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4, // Or DataTypes.UUIDV1
        primaryKey: true,
    },
    name: {
        unique: true,
        type: Sequelize.STRING,
        allowNull: false
    },
})

export default Category;
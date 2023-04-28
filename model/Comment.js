import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Comment = sequelize.define('comment', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4, // Or DataTypes.UUIDV1
        primaryKey: true,
    },
    content: {
        type: Sequelize.STRING,
        allowNull: false
    },
})

export default Comment;
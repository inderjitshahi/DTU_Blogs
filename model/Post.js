import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Post = sequelize.define('post', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4, // Or DataTypes.UUIDV1
        primaryKey: true,
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT('tiny'),
    },
    content: {
        type: Sequelize.TEXT('long'),
        allowNull: false,
    },
})

export default Post;
import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Like = sequelize.define('like', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4, // Or DataTypes.UUIDV1
        primaryKey: true,
    },
})

export default Like;
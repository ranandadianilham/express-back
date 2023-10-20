const { DataTypes } = require('sequelize');
const sequelize = require('../configs/sequelize'); // Adjust the path to your Sequelize configuration

const userSchema = sequelize.define('user', {
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password_hash: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  }
}, {
    timestamps: true,
    freezeTableName: true,
});

(async () => {
    try {
        await sequelize.sync({ alter: true});
        console.log('Table is created or altered if necessary');

    }catch(err) {
        console.error('Error creating or altering table:', err);
    }
}) ();

module.exports = userSchema;
const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class User extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

User.init(
    // Initialize User attributes
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4], // CHANGE BACK TO 8
      },
    },
  },
  {
    hooks: { // Hooks (also known as lifecycle events), are functions which are called before 
             // and after calls in sequelize are executed.
      beforeCreate: async (newUserData) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      beforeUpdate: async (updatedUserData) => {
        updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
        return updatedUserData;
      },
    },
    sequelize, // Pass the connection instance
    timestamps: false,
    freezeTableName: true, // Stop the auto-pluralization performed by Sequelize using the freezeTableName: true option
    // This way, all tables will use the same name as the Model name.
    underscored: true,
    modelName: 'user', // The name of the model
  }
);

module.exports = User;

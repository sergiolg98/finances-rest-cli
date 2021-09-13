'use strict';
module.exports = (sequelize, DataTypes) => {

  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: {
            args: ["^[a-zA-Z ]*$",'i'],
            msg: "Solo debe contener letras y espacios."
        },
        notNull: {
            msg: "El campo no puede ser nulo."
        }
      }
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: {
            args: ["^[a-zA-Z ]*$",'i'],
            msg: "Solo debe contener letras y espacios."
        },
        notNull: {
            msg: "El campo no puede ser nulo."
        }
      }
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: {
            args: ["^[a-zA-Z ]*$",'i'],
            msg: "Solo debe contener letras y espacios."
        },
        notNull: {
            msg: "El campo no puede ser nulo."
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    photo: {
      type: DataTypes.STRING,
      allowNull: true
    },
  }, {
    tableName: "users"
  });

  User.associate = function(models) {
    // associations can be defined here
    
  };
  
  return User;
};
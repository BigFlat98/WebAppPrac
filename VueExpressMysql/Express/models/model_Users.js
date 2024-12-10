const Sequelize = require('sequelize');

class Users extends Sequelize.Model {
  static initiate(sequelize) {
    Users.init({
      name: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      gender: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      email: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      number: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      address: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      record_ct_time: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      password: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
    }, {
      sequelize,
      timestamps: false,
      underscored: false,
      modelName: 'Users',
      tableName: 'Users',
      paranoid: false,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }

  // static associate(db) {
  //   db.Users.hasMany(db.Comments, { foreignKey: 'commenter', sourceKey: 'id' });
  // }
};

module.exports = Users;

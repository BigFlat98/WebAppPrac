const Sequelize = require('sequelize');

class Comments extends Sequelize.Model {
  static initiate(sequelize) {
    Comments.init({
      comment: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      record_ct_time: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      record_mf_time: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.NOW,
      },
    }, {
      sequelize,
      timestamps: false,
      underscored: false,
      modelName: 'Comments',
      tableName: 'Comments',
      paranoid: false,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }

  // static associate(db) {
  //   db.Comments.belongsTo(db.Users, { foreignKey: 'commenter', targetKey: 'id' });
  // }
};

module.exports = Comments;
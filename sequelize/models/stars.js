'use strict';
module.exports = (sequelize, DataTypes) => {
  var Stars = sequelize.define('Stars', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING
  }, {});
  Stars.associate = function (models) {
    Stars.belongsToMany(models.Films,{through:models.StarsFilms,foreignKey:'starId',as:'films'})

    Stars.createOrUpdate = async function (newStar,transaction) {
      let star = await Stars.findOne({
        where: {
          firstName: newStar.firstName,
          lastName: newStar.lastName
        }
      },transaction)
      if (!star) {
        star = await Stars.create({
          ...newStar
        },transaction)
      }

      return star;

    }
    // associations can be defined here
  };
  return Stars;
};
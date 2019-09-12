'use strict';
module.exports = (sequelize, DataTypes) => {
  var StarsFilms = sequelize.define('StarsFilms', {
    starId: DataTypes.INTEGER,
    filmId: DataTypes.INTEGER
  }, {});
  StarsFilms.associate = function(models) {
    // StarsFilms.belongsTo(models.Stars,{foreignKey:'starId',as:'starFilms'})
    StarsFilms.belongsTo(models.Films,{foreignKey:'filmId',as:'star'})
    // associations can be defined here
  };
  return StarsFilms;
};
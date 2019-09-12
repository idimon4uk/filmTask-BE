'use strict';
module.exports = (sequelize, DataTypes) => {
  var Films = sequelize.define('Films', {
    title: DataTypes.STRING,
    releaseDate: DataTypes.INTEGER,
    format: DataTypes.ENUM('VHS', 'DVD', 'Blu-Ray')
  }, {});
  Films.associate = function (models) {
    Films.belongsToMany(models.Stars, { through: models.StarsFilms, foreignKey: 'filmId', as: 'stars' })
    Films.upload = async function (object) {
      return sequelize.transaction(t1 => {
        let uploadedFilm = {};
        return Films.create({
          ...object
        }, { transaction: t1 }).then(film => {
          uploadedFilm = film;
          return Promise.all(
            object.stars.map(star => {
              let name = star.split(' ');
              return models.Stars.createOrUpdate({
                firstName: name[0],
                lastName: name[1]
              }, { transaction: t1 })
            })
          )
        }
        ).then(starsList => {
          return Promise.all(
            starsList.map(star => {
              return models.StarsFilms.create({
                starId: star.id,
                filmId: uploadedFilm.id
              }, { transaction: t1 })
            })
          )
        }).then(result => {
          return uploadedFilm;
          // return t1.commit();
        }).catch(err => {
          return t1.rollback();
        })

      })
    }

    Films.edit = function (id, object) {
      return sequelize.transaction(t1 => {
        return Films.update(
          { ...object },
          {
            where: {
              id:parseInt(id)
            }
          },
          { transaction: t1 }
        ).then(film => {
          return models.StarsFilms.destroy({
            where: {
              filmId: id
            }
          },
            { transaction: t1 })
        }).then(() => {
          return Promise.all(
            object.stars.map(star => {
              let name = star.split(' ');
              return models.Stars.createOrUpdate({
                firstName: name[0],
                lastName: name[1]
              }, { transaction: t1 })
            })
          )
        }
        ).then(starsList => {
          return Promise.all(
            starsList.map(star => {
              return models.StarsFilms.create({
                starId: star.id,
                filmId: id
              }, { transaction: t1 })
            })
          )
        }).then(result => {
          return object;
          // return t1.commit();
        }).catch(err => {
          return t1.rollback();
        })
      })
    }
    // associations can be defined here
  };
  return Films;
};
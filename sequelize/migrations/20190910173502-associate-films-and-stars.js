'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.changeColumn('StarsFilms','starId',{
      type:Sequelize.INTEGER,
      allowNull:false
    })
    queryInterface.addConstraint('StarsFilms',['starId'],{
      type:'FOREIGN KEY',
      name:'FK_Stars_starsFilms',
      references:{
        table:'Stars',
        field:'id'
      },
      onDelete:'cascade',
      onUpdate:'no action'
    })

    queryInterface.changeColumn('StarsFilms','filmId',{
      type:Sequelize.INTEGER,
      allowNull:false
    })
    queryInterface.addConstraint('StarsFilms',['filmId'],{
      type:'FOREIGN KEY',
      name:'FK_Films_starsFilms',
      references:{
        table:'Films',
        field:'id'
      },
      onDelete:'cascade',
      onUpdate:'no action'
    })

  },

  down: (queryInterface, Sequelize) => {
    queryInterface.changeColumn('StarsFilms','starId',{
      type:Sequelize.INTEGER,
      allowNull:false
    })

    queryInterface.removeConstraint('StarsFilms','FK_Stars_starsFilms')

    queryInterface.changeColumn('StarsFilms','filmId',{
      type:Sequelize.INTEGER,
      allowNull:false
    })

    queryInterface.removeConstraint('StarsFilms','FK_Films_starsFilms')
  }
  
};

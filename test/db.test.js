var expect = require('chai').expect;
const Sequelize = require('sequelize')
const { Films, Stars } = require('../sequelize/models')

const film = {
    Title:`Test ${Math.random()}`,
    ReleaseYear:"2019",
    Format: "DVD",
    Stars:['firstName1 lastName1','firstName2 lastName2','firstName3 lastName3']
}

const filmInDb = {
    title:film.Title,
    releaseDate:parseInt(film.ReleaseYear),
    format:film.Format,
    stars:['firstName1 lastName1','firstName2 lastName2','firstName3 lastName3']
}

describe('Database', () => {
    it("Connection", (done) => {
        const sequelize = new Sequelize("PFfSgCsbgA", 'PFfSgCsbgA', 'XRbrkVQGqc', {
            dialect: 'mysql',
            username: "PFfSgCsbgA",
            password: "XRbrkVQGqc",
            database: "PFfSgCsbgA",
            host: "remotemysql.com",
        })

        sequelize.authenticate()
            .then(done)
            .catch(err => {
                console.error('Unable to connect to the database:', err);
            });

    })

    it("Upload file", function (done){
        Films.upload(
            {
                title: film.Title,
                releaseDate: parseInt(film.ReleaseYear),
                format: film.Format,
                stars: film.Stars
              }
        ).then(data=>{
            filmInDb['id'] = data.id
        }).then(done).catch(err=>{
            console.log(err)
        });
    })

    it("Check data",async  ()=>{
        let uploadedFilm = await Films.findOne({
            where:{
                id:filmInDb.id
            },
            include: [
                {
                    model: Stars,
                    as: 'stars',
                    // attributes:['id','firstName','lastName']
                }
            ]
        })
        // console.log(uploadedFilm)
        expect(uploadedFilm.id).to.eql(filmInDb.id);
        expect(uploadedFilm.title).to.eql(filmInDb.title);
        expect(uploadedFilm.format).to.eql(filmInDb.format);
        expect(uploadedFilm.releaseDate).to.eql(filmInDb.releaseDate);
    })
})


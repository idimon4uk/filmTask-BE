const { Films, Stars } = require('../sequelize/models')
const file = require('../helpers/parser')

function* iteration(arr) {
    yield* arr;
}

module.exports = {
    async findAll(req, res) {
        try {
            let params = req.query
            let film = await Films.findAll({
                where: {
                    ...params
                }, include: [
                    {
                        model: Stars,
                        as: 'stars'
                    }
                ]
            })
            res.status(200).json(film)
        }
        catch (err) {
            res.status(500).json({ error: err.message })
        }
    },
    async add(req, res) {
        try {
            let result = await Films.upload(req.body);
            res.status(200).json(result);
        }
        catch (err) {
            res.status(500).json({ error: err.message })
        }
    },
    async delete(req, res) {
        try {
            let { id } = req.params;
            let result = Films.destroy({ where: { id } })
            res.status(200).json(result)

        }
        catch (err) {
            res.status(500).json({ error: err.message })
        }
    },
    async edit(req, res) {
        try {
            let { id } = req.params;
            let object = req.body;
            let film = await Films.edit(id, object);
            res.status(200).json(film);
        }
        catch (err) {
            res.status(500).json({
                error: err.message
            })
        }
    },
    async getOne(req, res) {
        try {
            let { id } = req.params;
            let film = await Films.findOne({
                where: {
                    id
                },
                include: [
                    {
                        model: Stars,
                        as: 'stars'
                    }
                ]
            });
            if (film) {
                res.status(200).json(film)
            }
            else {
                res.status(403).json({ Error: `Film by ${id} not found (403)` })
            }

        }
        catch (err) {
            res.status(500).json({ error: err.message })
        }
    },
    async import(req, res) {
        try {
            let filmsObj = file.parse(req.file.buffer.toString());
            let filmsList = iteration(filmsObj);
            let film = filmsList.next();
            let films = [];
            while (film.value) {
                let uploadedFilms = await Films.upload(
                    {
                        title: film.value.Title,
                        releaseDate: parseInt(film.value.ReleaseYear),
                        format: film.value.Format,
                        stars: film.value.Stars
                      }
                );
                films.push(uploadedFilms)
                film = filmsList.next();
            }
            res.status(200).json(films)
        }
        catch (err) {
            res.status(500).json({ error: err.message })
        }
    }

}
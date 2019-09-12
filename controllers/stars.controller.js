const { Films, Stars } = require('../sequelize/models')
module.exports = {
    async getById(req, res) {
        try {
            const { id } = req.params
            let star = await Stars.findOne({
                where: {
                    id
                },
                include: [
                    {
                        model: Films,
                        as: 'films'
                    }
                ]
            })
            if (star) {
                res.status(200).json(star)
            }
            else {
                res.status(403).json({ message: `User by ${id} not found (403)` })
            }
        }
        catch (err) {
            res.status(500).json({ error: err.message })
        }
    },
    async getAll(req, res) {
        try {
            let params = req.query;
            let star = await Stars.findAll({
                where: { ...params },
                include: [
                    {
                        model: Films,
                        as: 'films'
                    }
                ]
            })
            res.status(200).json(star);
        }
        catch (err) {
            res.status(500).json({
                error: err.message
            })
        }
    },
    async getByName(req, res) {
        try {
            let params = req.query;
            let star = await Stars.findOne({
                where: {
                    ...params
                },
                include: [
                    {
                        model: Films,
                        as: 'films'
                    }
                ]
            })

            if (star) {
                res.status(200).json(star)
            }
            else {
                res.status(403).json({ message: `User not found (403)` })
            }
        }
        catch (err) {
            res.status(500).json({ error: err.message })
        }
    }
}
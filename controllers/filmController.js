const connection = require('../data/db');



//index
const index = (req, res) => {
    const sql = 'SELECT * FROM movies';

    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: 'Query not found' })
        const imgPath = 'http://localhost:3000/'
        const movies = results.map(movie => {
            return {
                ...movie,
                image: imgPath + movie.image
            }
        })
        res.json(movies)
    })
}

//show
const show = (req, res) => {
    const id = req.params.id;
    const sql = `SELECT *
    FROM movies
    WHERE movies.id = ?`

    connection.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({ error: 'Query not found' });
        if (results.length === 0) return res.status(404).json({ error: 'Film non trovato' })


        res.json(results[0])


    })

}

const postReview = (req, res) => {
    const id = req.params.id
    const { text, vote, name } = req.body;
    const sql = 'INSERT INTO reviews (text, vote, name, movie_id) VALUES (?,?,?,?)'

    connection.query(sql, [text, vote, name, id], (err, results) => {
        if (err) return res.status(500).json({ error: 'Query not found' })
        res.status(201)
        res.json({ message: 'Review added', id: results.insertId })
    })
}

module.exports = {
    index,
    show,
    postReview
}
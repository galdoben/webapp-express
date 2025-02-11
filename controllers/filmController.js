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
    const sql = `SELECT movies.*, ROUND(AVG(reviews.vote)) AS average_vote
    FROM movies
    LEFT JOIN reviews ON movies.id = reviews.movie_id
    WHERE movies.id = ?
    GROUP BY movies.id`

    const sqlReviews = `SELECT * 
    FROM reviews
    WHERE reviews.movie_id = ?
    `

    connection.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({ error: 'Query not found' });
        if (results.length === 0) return res.status(404).json({ error: 'Film non trovato' })

        //recensioni
        connection.query(sqlReviews, [id], (err, resultsReviews) => {
            if (err) return res.status(500).json({ error: 'Query not found' });


            const movie = (results[0])
            res.json({
                ...movie,
                image: req.imgPath + movie.image,
                reviews: resultsReviews
            })

        })


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

const postMovie = (req, res) => {

    const { title, director, abstract } = req.body;
    const imageName = req.file ? req.file.filename : null;
    const sql = 'INSERT INTO movies (title, director, abstract, image) VALUES (?,?,?,?)'

    connection.query(
        sql,
        [title, director, abstract, imageName],
        (err, results) => {
            if (err) return res.status(500).json({ error: 'Query not found' })
            res.status(201).json({ status: 'success', message: 'Film Aggiunto' })
        }
    )


    // res.json({ message: 'Aggiungo film' })
}

module.exports = {
    index,
    show,
    postReview,
    postMovie
}
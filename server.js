const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 3000;
const filmsRouter = require('./routers/films')


app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send('Entry Point')
})

app.use('/movies', filmsRouter)

app.use((req, res, next) => {
    res.status(404).json({
        error: "ERROR 404",
        message: "Resource not found",
    });
});

app.listen(port, () => {
    console.log(`Sono in ascolto sulla porta ${port}`);

})
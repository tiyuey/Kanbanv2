const app = require('./app')

const {db} = require('./utils/mongoConnection');

db()

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log('RUNNING ON PORT: ' + PORT);
})
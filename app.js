const express = require('express')
const settings = require('./config/settings')
// const passport = require('passport')
const path = require('path')
const port = settings.development.port

const app = express()
app.use('/public', express.static(path.join(__dirname, './public')))
require('./config/server')(app)
require('./config/database')(settings)
require('./config/passport')(app)
require('./config/routes')(app)
// app.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {
//   console.log(req)
// })
app.listen(port, () => console.log(`Server listening on port: ${port}`))

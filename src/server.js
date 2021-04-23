'use strict';
require('./config/config');
const express = require('express');
const bodyParser = require('body-parser');
const models = require('./models');
const passport = require('passport');
const auth_routes = require('./routes/auth');
const user_routes = require('./routes/user');
const job_routes = require('./routes/job');
const cors = require('cors');
const app = express();

app.use(cors())
app.use(bodyParser.json());

app.use(passport.initialize());

require('./config/passport')(passport);

app.use('/api/v1/auth', auth_routes);

app.use('/api/v1/user', passport.authenticate('jwt', { session: false }), user_routes);

app.use('/api/v1/job', passport.authenticate('jwt', { session: false }), job_routes);

models.database.sync().then(resp => {
	app.listen(__.PORT, () => {
		if (__.DEBUG) console.log(__);
	});
}).catch(error => {
	console.error(error);
});
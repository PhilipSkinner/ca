const 
    express         = require('express'),
    swagger         = require('swagger-ui-express'),
    apiDefinition   = require('./api-definition.json'),
    config          = require('./lib/config')(),
    cors            = require('cors'),
    bodyParser      = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended : false }));
app.use(bodyParser.json());
app.use(cors());
app.use('/', (req, res, next) => {
    res.header('Access-Control-Expose-Headers', 'Location');
    res.header('Access-Control-Allow-Headers', 'Location');
    next();
});
app.use('/docs', swagger.serve, swagger.setup(apiDefinition));

const port = process.env.PORT || 3000;

const controllers = {
    ca : {
        list    : require('./controllers/ca/list')(app),
        create  : require('./controllers/ca/create')(app),
        details : require('./controllers/ca/details')(app),
        delete  : require('./controllers/ca/delete')(app),
    },
    int : {
        create  : require('./controllers/intermediate/create')(app),
        list    : require('./controllers/intermediate/list')(app),
        details : require('./controllers/intermediate/details')(app)
    },
    cert : {
        create  : require('./controllers/certs/create')(app),
        list    : require('./controllers/certs/list')(app)
    }
};

controllers.ca.list.setup('/ca');
controllers.ca.create.setup('/ca');
controllers.ca.details.setup('/ca/:id');
controllers.ca.delete.setup('/ca/:id');
controllers.int.create.setup('/ca/:id/intermediate');
controllers.int.list.setup('/ca/:id/intermediate');
controllers.int.details.setup('/ca/:id/intermediate/:intermediate');
controllers.cert.create.setup('/ca/:id/intermediate/:intermediate/cert');
controllers.cert.list.setup('/ca/:id/intermediate/:intermediate/cert');

app.listen(port, () => {
    console.log(`CA listening on port ${port}`);
});
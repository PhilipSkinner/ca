const 
    express         = require('express'),
    swagger         = require('swagger-ui-express'),
    apiDefinition   = require('./api-definition.json'),
    config          = require('./lib/config')(),
    bodyParser      = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended : false }));
app.use(bodyParser.json());
app.use('/docs', swagger.serve, swagger.setup(apiDefinition));

const port = process.env.PORT || 3000;

const controllers = {
    ca : {
        list : require('./controllers/ca/list')(app),
        create : require('./controllers/ca/create')(app),
    }
};

controllers.ca.list.setup('/ca');
controllers.ca.create.setup('/ca');

app.listen(port, () => {
    console.log(`CA listening on port ${port}`);
});
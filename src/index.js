const express = require(`express`);

const routes = require(`./routes`);
const {initiallizeDatabase} = require(`./config/database`);

const app = express();
require(`./config/handlebars`)(app);

app.use(`/static`, express.static(`src/public`));
app.use(express.urlencoded({extended: false}));

app.use(routes);

initiallizeDatabase()
    .then(()=>{
        app.listen(5000, ()=> console.log(`App is listening on port 5000`));
    })
    .catch((err)=>{
        console.log(`Cannot connect to db:`, err);
    });


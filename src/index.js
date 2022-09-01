const express = require(`express`);
const cookieParser = require(`cookie-parser`);

const routes = require(`./routes`);
const {initiallizeDatabase} = require(`./config/database`);
const {auth} = require(`./Middlewares/authMiddleware`);
const {errorHander} = require(`./Middlewares/errorHandlerMiddleware`);
const app = express();
require(`./config/handlebars`)(app);

app.use(`/static`, express.static(`src/public`));
app.use(cookieParser());
app.use(express.urlencoded({extended: false}));
app.use(auth);
app.use(routes);
app.use(errorHander);

initiallizeDatabase()
    .then(()=>{
        app.listen(5000, ()=> console.log(`App is listening on port 5000`));
    })
    .catch((err)=>{
        console.log(`Cannot connect to db:`, err);
    });


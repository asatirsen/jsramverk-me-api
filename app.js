const express = require("express");
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require("body-parser");
const index = require('./routes/index');
const reports = require('./routes/reports');
const register = require('./routes/register')
const login = require('./routes/login')


const port = 1337;

const app = express();

app.use(cors());
app.use(express.json());

app.use('/', index);
app.use('/reports', reports);
app.use('/register', register);
app.use('/login', login);


app.use((req, res, next) => {
    next();
});

// don't show the log when it is test
if (process.env.NODE_ENV !== 'test') {
    // use morgan to log at command line
    app.use(morgan('combined')); // 'combined' outputs the Apache style LOGs
}
// Add a route
// app.get("/", (req, res) => {
//     const data = {
//         data: {
//             msg: "Hello World"
//         }
//     };
//
//     res.json(data);
// });

// Testing routes with method
// app.get("/user", (req, res) => {
//     res.json({
//         data: {
//             msg: "Got a GET request, sending back default 200"
//         }
//     });
// });
//
// app.post("/register", (req, res) => {
//     res.status(201).json({
//         data: {
//             msg: "Got a POST request, sending back 201 Created"
//         }
//     });
// });
//
// app.put("/user", (req, res) => {
//     res.status(204).send();
// });

// app.delete("/user", (req, res) => {
//     res.status(204).send();
// });
//
// app.get("/hello/:msg", (req, res) => {
//     const data = {
//         data: {
//             msg: req.params.msg
//         }
//     };
//
//     res.json(data);
// });


app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


// app.use((err, req, res, next) => {
//     if (res.headersSent) {
//         return next(err);
//     }
//
//     res.status(err.status || 500).json({
//         "errors": [
//             {
//                 "status": err.status,
//                 "title":  err.message,
//                 "detail": err.message
//             }
//         ]
//     });
// });

// Start up server
app.listen(port, () => console.log(`Example API listening on port ${port}!`));
// Add routes for 404 and error handling
// Catch 404 and forward to error handler
// Put this last
app.use((req, res, next) => {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
});

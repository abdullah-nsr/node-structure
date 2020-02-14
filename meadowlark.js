// below are our module
var fortune = require('./lib/fortune.js');
// below are npm module
var express = require('express');
var app = express();

var app = express();
// set up handlebars view engine
var handlebars = require('express3-handlebars')
    .create({
        defaultLayout: 'main'
    });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);
// for root directory 
app.use(express.static(__dirname + '/public'));
// for test 
app.use(function(req, res, next){
    res.locals.showTests = app.get('env') !== 'production' &&
    req.query.test === '1';
    next();
});
// SP 
app.disable('x-powered-by');
// routes go here....
app.get('/', function (req, res) {
    res.render('home');
});
app.get('/about', function (req, res) {
    res.render('about', {
        fortune:fortune.getFortune(),
        pageTestScript: '/qa/tests-about.js'
    });
});

        // // //
        const bodyParser = require('body-parser');
        app.use(bodyParser.json()); // for parsing application/json
        app.use(bodyParser.urlencoded({
        extended: true
        })); // for parsing application/x-www-form-urlencoded

        app.post('/process-contact', function(req, res){
            console.log('Received contact from ' + req.body.name +
            ' <' + req.body.email + '>');
            // save to database....
            // res.render({success: true})
            // res.redirect(303, '/greeting?message=welcome' + '&style=done' + '&username=' + req.body.username);
            res.redirect(303, '/greeting?style=welcome to redirecting this is coming from redirecting ' + req.body.name);
            // res.render('greeting')
        });
        // #DAANA 30.01.20 
        // last think working: no-layout till text-plain
        // stop: passing info to greeting page using url and test if it will detect plase holder coming from redirect .. now it works
        // 
        // // //        
        app.get('/about/test', function (req, res) {
            res.render('about');
        });
        app.get('/error', function(req, res){
            res.status(500).render('error');
        });
        app.get('/greeting', function(req, res){
            res.render('greeting', {
            message: 'welcome',
            style: req.query.style,
            userid: req.cookie,
            username: req.session,
            });
        });
        app.get('/no-layout', function(req, res){
            res.render('no-layout', { layout: null });
            });
        // the layout file views/layouts/custom.handlebars will be used
        app.get('/custom-layout', function(req, res){
            res.render('custom-layout', { layout: 'custom' });
            });
        app.get('/test', function(req, res){
            res.type('text/plain');
            res.send('this is a test');
        });
        app.get('/text-plain', function(req, res){
            res.type('text/plain');
            res.send('this is a test for text/plain');
        });
        // // // 

// 
app.get('/tours/hood-river', function(req, res){
    res.render('tours/hood-river');
    });
    app.get('/tours/request-group-rate', function(req, res){
    res.render('tours/request-group-rate');
    });
// req res
app.get('/headers', function(req,res){
    res.set('Content-Type','text/plain');
    var s = '';
    for(var name in req.headers) s += name + ': ' + req.headers[name] + '\n';
    res.send(s);
});    
// 404 catch-all handler (middleware)
app.use(function (req, res, next) {
    res.status(404);
    res.render('404');
});
// 500 error handler (middleware)
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), function () {
    console.log('Express started on http://localhost:' +
        app.get('port') + '; press Ctrl-C to terminate.');
});

var fortunes = [
    "Conquer your fears or they will conquer you.",
    "Rivers need springs.",
    "Do not fear what you don't know.",
    "You will have a pleasant surprise.",
    "Whenever possible, keep it simple.",
];
// 

if( app.thing == null ) console.log( 'bleat!' );
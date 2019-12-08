const bodyParser = require('body-parser')

module.exports = (app, Vote) => {
    
    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: false }))

    // parse application/json
    app.use(bodyParser.json())

    //let votes = [];
    //let last_id = 1;

    app.get('/', (req, res) => {
        return res.render('index.html');
      })
    
    app.get('/test', (req, res) => {
        return res.render('Make.html');
    })

    app.get('/list', (req, res) => {
        return res.render('List.html');
    })

    /*post*/
    app.post('/vote_list', function(req, res) {
        const newvote = new Vote();
        //newvote.resetCount((err) => {
            newvote.question = req.body.question;
            newvote.option = req.body.option;
            const jsonData = JSON.parse(req.body.answers);
            for (var i = 0; i < jsonData.length; i++) {
                newvote.answers.push({ answer: jsonData[i].answer, number: jsonData[i].number });
            }
            newvote.save((error, result) => {
                console.log("dkanakf");
                res.status(200);
                res.end();
            });
        //});
    });

    /*get*/
    app.get('/vote_list', function(req, res) {
        res.status(200);
        Vote.find({}, (err, docs) => {
            res.json(docs);
        });
    });


    /*put*/
    app.put('/vote_list/:id', function(req, res) {
        /*votes.forEach(vote => {
            if (vote.id.toString() === req.params.id) {
                vote.content = req.body.content;
                res.status(200);
                res.end();
            }
        })*/
        Vote.findByIdAndUpdate(req.params.id, {content: req.body.content});
        res.status(200);
        res.end();
    });

    /*delete*/ 
    app.delete('/vote_list/:id', function(req, res) {
        //votes = votes.filter(vote => vote.id.toString() !== req.params.id);
        Vote.findByIdAndDelete(req.params.id);
        res.status(200);
        res.end();
    });

    /*결과 요청 */
    /*app.get('/vote_list/please_result/:id', function(req, res) {
        return res.redirect('/result/:id');
    });*/

    /*A, B 선택*/
    app.post('/vote_list/my_opinion', function(req, res) {
        Vote.findOne({id: req.body.id}, (err, vote) => {
            console.log(vote);
            if(req.body.option == "only") {
                const ind = req.body.choice.toString();
                console.log(vote.answers[parseInt(ind)]);
                vote.answers[parseInt(ind)].number++;
                vote.save(err => {
                    res.status(200);
                    res.end();
                });
            }
            else {
                //console.log(req.body.choice)
                const indarray = req.body.choice.toString().split(',');
                console.log(indarray)
                for(let i = 0; i < indarray.length - 1; i++){
                    console.log(vote.answers[parseInt(indarray[i])]);
                    vote.answers[parseInt(indarray[i])].number++;
                }
                vote.save(err => {
                    res.status(200);
                    res.end();
                });
            }
            
        })
        res.status(200);
        res.end();
    });

    /*결과 발표*/
    app.get('/result/:id', function(req, res) {
        Vote.findOne({id : req.params.id}, (err, vote) => {
            console.log("what");
            res.json(vote.answers)
        })
    });
}
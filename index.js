var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
var body = require('body-parser');
var http = require('http');
var path = require('path');
//var bodyParser = require('body-parser')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('addAnnoucement', { title: 'Express' });
});



router.get('/newstudent', function(req, res){
	res.render('newstudent', {title: 'Add Student' });
});

router.get('/annlist', function(req, res){
	res.render('annlist', {title: 'Add Student' });
});


router.post('/addann', function(req, res){

	var MongoClient = mongodb.MongoClient;

	var url = 'mongodb://localhost:27017/finalproj';

	MongoClient.connect(url, function(err, db){ // Connect to the server

		if (err) {

			console.log('Unable to connect to the Server:', err);

		} else {

			console.log('Connected to Server');

			var collection = db.collection('annoucements'); // Get the documents collection

			var newann = {title: req.body.title, content: req.body.content, author: req.body.author, date: req.body.date}; // Get the student data
      console.log(newann);

					collection.insert([newann], function (err, result){
					// Insert the student data

  					if (err) {

  						console.log(err);

  					} else {
              res.redirect('list');
  						// Redirect to the updated student list
            //  console.log("C");
  					db.close();
  		      }
	       });
      }
});
});



router.get('/list', function(req, res){

  // Get a Mongo client to work with the Mongo server
  var MongoClient = mongodb.MongoClient;

  // Define where the MongoDB server is
  var url = 'mongodb://localhost:27017/finalproj';

  // Connect to the server
  MongoClient.connect(url, function (err, db) {
  if (err) {
    console.log('Unable to connect to the Server', err);
  } else {
    // We are connected
    console.log('Connection established to', url);

    // Get the documents collection
    var collection = db.collection('annoucements');

    // Find all students
    collection.find({}).toArray(function (err, result) {
      if (err) {
        res.send(err);
      } else if (result.length) {
        res.render('annlist',{

          // Pass the returned database documents to Jade
          "annlist" : result
        });
      } else {
        res.send('No documents found');
      }
      //Close connection
      db.close();
    });
  }
  });
});





router.post('/deleteann', function(req, res){

  // var title = document.getElementById("table").rows[1].cells[0].innerHTML;
  // var content = document.getElementById("table").rows[1].cells[1].innerHTML;
  // var author = document.getElementById("table").rows[1].cells[2].innerHTML;
  // var date = document.getElementById("table").rows[1].cells[3].innerHTML;


  console.log("variables");

	var MongoClient = mongodb.MongoClient;

	var url = 'mongodb://localhost:27017/finalproj';

	MongoClient.connect(url, function(err, db){ // Connect to the server

		if (err) {

			console.log('Unable to connect to the Server:', err);

		} else {

			console.log('Connected to Server');
      console.log(req.body.title);

			var collection = db.collection('annoucements'); // Get the documents collection

      // var anntodelete = {"title": title, "content":content, "author":author, "date":date}
      var anntodelete = {"title": req.body.title}


      collection.deleteOne(anntodelete, function(err, obj) {
        if (err) throw err;
        console.log("1 document deleted");
        res.redirect('list');
        db.close();
      });


       }
});
});



 module.exports = router;

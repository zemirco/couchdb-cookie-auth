
// let PouchDB act as a client
var db = new PouchDB('http://localhost:5984/cookie-auth');

// handle button click
document.getElementById('button').onclick = function(){

  // save a doc to db
  db.post({
    title: 'Heroes'
  }, function(err, res) {
    if (err) console.log(err);
    console.log(res)
  });
  
};

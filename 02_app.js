const express = require('express');
const fs = require('fs');
const app = express();
app.use(express.static('public'));

const transforme_en_tableau = (collection) =>{
    let chaine = '<table>'
    for(elm of collection){
        for(p in elm){
             chaine += '<tr><td>' + p + '</td><td>' + collection[p] + '</td></tr>'; 
        }
    }
    chaine += '</table>'
    return chaine
}
//////////////////////////////////////////////////////////////////////
app.get('/formulaire', function (req, res) { 
 console.log(__dirname);
 res.sendFile( __dirname + "/html/" + "01_form.htm" );
})
//////////////////////////////////////////////////////////////////////
app.get('/', (req, res) => {
 console.log('accueil')
 res.end('<h1>Accueil</h1>')
})
//////////////////////////////////////////////////////////////////////
app.get('/traiter_get', function (req, res) {
 // Preparer l'output en format JSON

console.log('la route /traiter_get')

// on utilise l'objet req.query pour récupérer les données GET
 let reponse = {
 prenom:req.query.prenom,
 nom:req.query.nom
 };
console.log(reponse);
res.end(JSON.stringify(reponse));

fs.appendFile('unfichier.txt', ',' + JSON.stringify(reponse), function(err){
    if(err) throw err;
    console.log('Sauvegarder');
    
});


})
//////////////////////////////////////////////////////////////////////
app.get('membres', (req, res) => {
    fs.readFile('... membres.txt', 'utf8', function (err, data){
        if(err) throw err;
        let collection = JSON.parse('[' + data + ']');
        res.end(transforme_en_tableau(collection))
    });

})
    var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Exemple l'application écoute sur http://%s:%s", host, port);
})
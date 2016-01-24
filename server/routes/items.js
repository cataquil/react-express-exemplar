module.exports = function (app){

 var GroceryItem = require('./../models/GroceryItem.js');
    
    app.route('/api/items')
    .get(function(req,res){
        //console.log("sending items",GroceryItem);
        //res.send(items);
        GroceryItem.find(function(error,doc){
            res.send(doc);
        })      
    })
    .post(function(req, res){ 
        var item = req.body; 
        console.log("Adding item...", item); 
        var groceryItem = new GroceryItem(item); 
        groceryItem.save(function(err, data) { 
            res.status(201).send(data); 
        }) 
    });
    
    app.route('/api/items/:id')
    .delete(function(req,res){
        console.log("removing...",req.params.id);
        GroceryItem.findOne({
            _id:req.params.id
        }).remove(function(x){
            console.log("removed.",JSON.stringify(x));
        });
    })
    .patch(function(req,res){
        GroceryItem.findOne({
            _id:req.body._id
        },function(error,doc){
            console.log('error:'+error);
            console.log('reqbody:'+JSON.stringify(req.body));
            
            if (doc!=null) {   
                for (var key in req.body){
//                    if (doc[key])
//                    {
                        console.log('key:'+key+' dockey:'+doc[key]);
                        doc[key] = req.body[key];                    
//                    }
                }
                doc.save();                
            }

            res.status(200).send();
        })
    })    
}
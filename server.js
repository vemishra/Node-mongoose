var express = require('express');  
var bodyParser = require('body-parser');  
var cors = require('cors');  
var app = express();  
var mongoose = require('mongoose');  
var product = require('./product'); 

app.use(bodyParser.urlencoded({ extended: true }));  
app.use(bodyParser.json());  
var port = process.env.PORT || 8090;  
var router = express.Router(); 


mongoose.connect('mongodb://localhost:27017/products'); 

router.use(function (req, res, next) {  
    // do logging   
    // do authentication   
    console.log('Logging of request will be done here');  
    next(); // make sure we go to the next routes and don't stop here  
});
router.route('/products').post(function (req, res) {  
    var p = new product();  
    	p.name = req.body.name;  
    	p.price = req.body.price;  
    	p.imageUrl = req.body.imageUrl;  
    	p.servedOnFriday = req.body.servedOnFriday; 
	p.servedOnThursday = req.body.servedOnThursday;
	p.servedOnWednesday= req.body.servedOnWednesday;
	p.servedOnTuesday= req.body.servedOnTuesday;
	p.servedOnMonday= req.body.servedOnMonday;
	p.category= req.body.category;
	p.isVeg= req.body.isVeg;
	p.description=req.body.description;
	p.formattedImage=req.body.formattedImage;
    p.save(function (err) {  
        if (err) {  
            res.send(err);  
        }  
        res.send({ message: 'Product Created !' })  
    })  
});  
router.route('/products').get(function (req, res) {  
    product.find(function (err, products) {  
        if (err) {  
            res.send(err);  
        }  
        res.send(products);  
    });  
}); 
router.route('/products/:product_id').put(function (req, res) {  
  
    product.findById(req.params.product_id, function (err, prod) {  
        if (err) {  
            res.send(err);  
	console.log(err);
        }  
    
    	prod.name = req.body.name;  
    	prod.price = req.body.price;  
    	prod.imageUrl = req.body.imageUrl;  
    	prod.servedOnFriday = req.body.servedOnFriday; 
	prod.servedOnThursday = req.body.servedOnThursday;
	prod.servedOnWednesday= req.body.servedOnWednesday;
	prod.servedOnTuesday= req.body.servedOnTuesday;
	prod.servedOnMonday= req.body.servedOnMonday;
	prod.category= req.body.category;
	prod.isVeg= req.body.isVeg;
	prod.description=req.body.description;
	prod.formattedImage=req.body.formattedImage;  
        prod.save(function (err) {  
            if (err)  {
                res.send(err);  
		console.log(err);
		}
  
            res.json({ message: 'Product updated!' });  
		console.log('product updated');
        });  
  
    });  
});
router.route('/products/:product_id').delete(function (req, res) {  
  
    product.remove({ _id: req.params.product_id }, function (err, prod) {  
        if (err) {  
            res.send(err);  
        }  
        console.log(req.param.product_id + " document(s) deleted");
        res.json({ message: 'Successfully deleted' });  
    })  
  
});  
app.use(cors());  
app.use('/api', router);  
app.listen(port);  
console.log('REST API is runnning at ' + port);   

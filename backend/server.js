import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import Product from './models/Product';


const app = express();
const PORT = 3000;
const router = express.Router();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1/products', { useNewUrlParser: true });

const connection = mongoose.connection;

connection.once('open', () => {
  console.log('MongoDB connected successfully');
});


router.route('/products').get((req, res) => {
  Product.find((err, products) => {
    if (err)
      console.log(err);
    else
    console.log(products);
      res.json(products);
  });
});

router.route('/products/:id').get((req, res) => {
  Product.findById(req.params.id, (err, product) => {
    if (err)
      console.log(err);
    else {
      res.json(product);
    }
  });
});

router.route('/products/add').post((req, res) => {
  let product = new Product(req.body);
  product.save()
    .then(product => {
      res.status(200).json({'product': 'Added successfully'});
    })
    .catch(err => {
      res.status(400).send('Failed to create the product');
    });
});

router.route('/products/update/:id').post((req, res) => {
  Product.findById(req.params.id, (err, product) => {
    if (!product)
      return next(new Error('Cannot find the product'));
    else {
      product.title = req.body.title;
      product.image = req.body.image;
      product.description = req.body.description;
      product.price = req.body.price;
      product.quantity = req.body.quantity;

      product.save().then(product => {
        res.json('The product is updated');
      })
        .catch(err => {
          res.status(400).send('The product failed to update');
        });
    }
  });
});

router.route('/products/delete/:id').get((req, res) => {
  Product.findByIdAndRemove({_id: req.params.id}, (err, product) => {
    if (err)
      res.json(err);
    else
      res.json('The product is removed');
  });
});


app.use('/', router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

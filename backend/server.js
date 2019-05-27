import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import Product from './models/Product';
import nodeMailer from 'nodeMailer';
import fs from 'fs';
import request from 'request';


let hbs = require('handlebars');

const app = express();
const PORT = 3000;
const HOST = '127.0.0.1';
const router = express.Router();
const url = require('url');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(`mongodb://${HOST}/products`, { useNewUrlParser: true });

const connection = mongoose.connection;

connection.once('open', () => {
  console.log('MongoDB connected successfully');
});


router.route('/products').get((req, res) => {
  Product.find((err, products) => {
    if (err)
      console.log(err);
    else
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

router.route('/cart').get((req, res) => {
  Product.find((err, products) => {
    if (err)
      console.log(err);
    else
      res.json(products);
  });
});

router.route('/cart').post((req, res) => {
  Product.findById(req.params.id, (err, product) => {
    if (!product)
      return next(new Error('Cannot find the product'));
    else {
      product._id = req.body._id;
      product.title = req.body.title;
      product.image = req.body.image;
      product.description = req.body.description;
      product.price = req.body.price;
      product.quantity = req.body.quantity;

      product.save().then(product => {
        res.json('The product is added to cart');
      })
        .catch(err => {
          res.status(400).send('The product cannot be added to cart');
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


router.route('/send-email').post((req, res) => {
  console.log('Send email request received');
  let user = req.body;

  let readHTMLFile = function(path, callback) {
    fs.readFile(path, { encoding: 'utf-8' }, function (err, html) {
      if (err) {
        callback(err);
        throw err;
      } else {
        callback(null, html);
      }
    });
  };

  let transporter = nodeMailer.createTransport({
    host: "smtp.mail.ru",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: { // sender email credentials
      user: 'acmeshop@list.ru',
      pass: '2254924q'
    }
  });

  readHTMLFile('../frontend/src/app/components/send-email/send-email-template.html', function(err, html) {
    // let template = hbs.compile(html);
    // let htmlToSend = template(replacements);

    let string = '<table>';
    let total = 0;
    let generateHTML = function(){
      user.order.forEach((item) => {
        string +=
        `


          <tr>
            <td style="width: 120px;"><img src='${item.image}' style='width: 50px; border-radius: 5px;' /></td>
            <td style="width: 120px;"><span style='margin: 10px;'>${item.title}</span></td>
            <td style="width: 120px;"><span style='margin: 10px;'>\$${item.price}</span></td>
          </tr>
        `;
        total += item.price;
      });
        string += `

        <tr>
          <td style="width: 120px;"></td>
          <td style="width: 120px;"><strong>   Total = </strong></td>
          <td style="width: 120px;"><strong>\$${total}</strong></td>
        </tr>
      </table>

        `;
      return string;
    };

    let generatedHTML = generateHTML();


    let mailOptions = {
      from: '"ACME Shop"<acmeshop@list.ru>', // sender email address
      to: user.email, // receiver email address
      subject: "Your order from ACME", // email subject
      html: `
      <h3>
        <img width="50" alt="ACME Logo" style="padding: 10px;" src="https://www.acmediecast.com/assets/images/ACME_logo_200.png">
        Greetings from ACME Shop!
      </h3>
      <h4>Thank you for shopping with us.</h4>
      <br>
      <p><strong>Here is what you purchased:</strong></p>
      ${generatedHTML}
      <h4><i>Come back soon!</i></h4>
      `, // email html template

    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log(`E-mail is sent to ${user.email}, message id is ${info.messageId}`);
    });
  });

});


app.use('/', router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

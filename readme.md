# README

## Development

1. clone
2. npm install
3. create file '.env' in roo dir
4. add Mongo DB User and password to .env file (https://www.npmjs.com/package/dotenv)
5. run 'npm start'

## 

## Contents

* **Nozama version 1.0 6/19/15 by group McCarthy.**

- This is the README file for the back end of the single page aplication "Nozama e-commerce" visible at: http://www..
- The goal of the app is to create an e-commerce website where users can purchase items through Stripe
- The API, the resourse feeding the data, is hosted on HEROKU at this address: https://

* **Overview and Example usage**

- The API feeds the results fulfilling the principles of the CRUD.

* **Detailed Usage and Developer Info**

- Further development:

* **Colophon**

- This app was developed by Valeria Graffeo, Amy Goldberg, Peter White and Alex Zito-Wolf as third project assignment in the Web Develoment Immersive Course at General Assembly Boston in June 2015.

##User Stories

- allow customers to see all product
- add items to shopping cart
- purchase products using stripe
- login and auth
- look at past orders
- user goes to nozama.com and sees a page with all the items.
- user can browse and scroll to see all items (no sign in necessary)
- user clicks on one item and sees a detail page that has: item image on the left, item name, description, price and a button “add to cart"
- user can add to cart before sign in or sign up.
- user adds item to cart. >> new page shows the cart situation, and gives buttons to continue shopping, or checkout or update quantity (removing item from cart either with button ‘remove’ or by setting qty to 0)
- back to points 2, 3, 4, 5 until user is ready for checkout.
- user is prompted to sign up or sign in (if returning customer and has a profile)
- user sign up:form with required info > first and last name, shipping address, email address, billing address...
- wait when do we add a credit card? Stripe will take that info, we store only the card token. Actually Max told me that by integrating Stripe with Express we only care about one-time charges. So users will enter the card number every time….need to think this step better.
- checkout has a recap of the items user wants to order, shipping address, shipping cost, tax, and total that will be charged to the credit card.
- users enters card and pays. He will receive an email notification with the order confirmation/invoice, order number, items.
- will the email have a format that we can build with jade template??? Also enclose an email/phone number for customer support about the order.

todo: 

1. rebuild grunt file 
2. seed new db (mongodbatlas)  

 https://gist.github.com/bradtraversy/f407d642bdc3b31681bc7e56d95485b6
 https://www.digitalocean.com/community/tutorials/nodejs-crud-operations-mongoose-mongodb-atlas


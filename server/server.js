const mongoose = require('mongoose');
const dotenv = require('dotenv');
//Configure dotenv
dotenv.config({ path: './config.env' });

// Set strictQuery to false to prepare for Mongoose 7
mongoose.set('strictQuery', false);
//If any exception occurs, it will be caught here
process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION Shutting Down...😓');
  console.log(err.name, err.message);
  process.exit(1);
});

//Connection to the database
mongoose.connect(process.env.DATABASE).then(() => {
  console.log('DB connection successful');
});

const app = require('./app');
const port = process.env.PORT || 5000;
const server = app.listen(port, () =>
  console.log(`App running on port ${port}...`)
);
//If any promise rejection occurs, it will be caught here
process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION 💥 Shutting Down...😓');
  console.log(err.name, err.message);
  server.close(() => process.exit(1));
});

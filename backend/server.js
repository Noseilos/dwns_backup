const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cloudinary = require('cloudinary');

process.on('uncaughtException', (err) => {
  console.log('UNHANDLER EXCEPTION');
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: './config.env' });
const app = require('./app');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose.connect(DB).then(() => console.log('DB Connection Successful'));

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App is listening to port: ${port}...`);
});

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLER REJECTION');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

import express, { Application } from 'express';
import { connect as MyDBConnection } from 'mongoose';
import { CustomRoutes } from './api';
import cors from 'cors';

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(CustomRoutes);

MyDBConnection(
  'mongodb://localhost:27017/crud-app',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (!err) {
      app.listen(8080, (err) => {
        if (!err) {
          console.log('Server started');
        }
      });
    } else {
      console.error('Mongoose Error', err);
    }
  }
);

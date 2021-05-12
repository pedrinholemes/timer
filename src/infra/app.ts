import express from 'express';
import morgan from 'morgan';
import path from 'path';

export const app = express()

app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname,'..', 'views'))
app.use('/public',express.static(path.resolve(__dirname, '..', '..' , 'public')))
app.use(morgan('dev'))

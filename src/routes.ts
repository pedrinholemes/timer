import { Router } from 'express'

export const routes = Router()

routes.get('/',(req, res) => res.render('home.ejs'))
routes.get('/admin',(req, res) => res.render('admin.ejs'))
routes.get('/timer',(req, res) => res.render('timer.ejs'))

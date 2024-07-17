import { Router } from 'express'
import { searchContacts } from '../controllers/ContactsController.js'
import { verifyToken } from '../middlewares/AuthMiddleware.js'

const ContactsRoutes = Router()

ContactsRoutes.post('/search-contacts', verifyToken, searchContacts)

export default ContactsRoutes
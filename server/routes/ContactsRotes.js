import { Router } from 'express'
import { searchContacts, getAllContacts } from '../controllers/ContactsController.js'
import { verifyToken } from '../middlewares/AuthMiddleware.js'

const ContactsRoutes = Router()

ContactsRoutes.post('/search-contacts', verifyToken, searchContacts)
ContactsRoutes.get('/get-all-contacts', getAllContacts)

export default ContactsRoutes
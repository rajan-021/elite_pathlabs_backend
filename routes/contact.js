import express from 'express'
import { contactMessage } from '../controllers/contactController.js';

const router = express.Router();
router.post('/', contactMessage)
export default router
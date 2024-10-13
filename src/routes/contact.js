import express from "express";
import ContactController from '../controller/contact.js';
import verifyAuth from "../middleware/verifyAuth.js";
import verifyAdmin from "../middleware/verifyAdmin.js";

const router = express.Router()

router.post('/addcontact',verifyAuth,ContactController.addContact);

export default router
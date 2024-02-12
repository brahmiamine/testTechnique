import { Router } from 'express'
import { MessageController } from '../controllers/message.controller'
import { verifyJwt } from '../../middleware/jwt.middleware';

const router: Router = Router();

router.post('/', verifyJwt, MessageController.saveMessage);
router.get('/', verifyJwt, MessageController.getAllMessages);
router.get('/:id', verifyJwt, MessageController.getMessageById);
router.get('/owner/:email', verifyJwt, MessageController.getMyMessages);
router.delete('/:id', verifyJwt, MessageController.deleteMessageById);
router.put('/:id', MessageController.setMessageReadById);


export default router;
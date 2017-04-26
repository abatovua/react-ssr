import { Router } from 'express';
import categoryEndpoints from './categories';
import productEndpoints from './products';

const router = Router();

router.use('/category', categoryEndpoints);
router.use('/product', productEndpoints);

export default router;
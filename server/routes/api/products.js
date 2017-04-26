import { Router } from 'express';
import Product from '../../models/product';

const router = Router();

router.post('/', async (req, res, next) => {
	try {
		const product = await new Product(req.body).save();
		res.json({ success: true, product });
	} catch(e) {
		next(e);
	}
});

router.delete('/', async (req, res, next) => {
	try {
		const { id } = req.body;

		const deleted = await Product.findByIdAndRemove(id).exec();
		res.json({ success: true, deleted: deleted._id });

	} catch(e) {
		next(e);
	}
});

router.put('/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const { data } = req.body;

		const updated = await Product.findByIdAndUpdate(id, data, { new: true }).exec();

		res.json({ success: true, updated });
	} catch(e) {
		next(e);
	}
});

export default router;

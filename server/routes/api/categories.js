import { Router } from 'express';
import Category from '../../models/category';
import Product from '../../models/product';

const router = Router();

router.post('/', async (req, res, next) => {
  try {
    const category = await new Category(req.body).save();
    res.json({ success: true, category });
  } catch (e) {
    next(e);
  }
});

router.delete('/', async (req, res, next) => {
  try {
    const { id } = req.body;

    const deleted = await Category.findByIdAndRemove(id).exec();
    await Product.update({ category: deleted._id }, { category: null }, { multi: true }).exec();

    res.json({ success: true, deleted: deleted._id });

  } catch (e) {
    next(e);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { data } = req.body;

    const updated = await Category.findByIdAndUpdate(id, data, { new: true }).exec();

    res.json({ success: true, updated });

  } catch (e) {
    next(e);
  }
});

export default router;
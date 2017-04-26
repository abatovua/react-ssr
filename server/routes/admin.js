import { Router } from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { StaticRouter } from 'react-router';

import { configureStore } from '../../admin/store/index';
import { AdminApp } from '../../admin/components/AdminApp';

import adminHtml from '../utils/html-admin';

import Category from '../models/category';
import Product from '../models/product';

import { normalizeArray } from '../utils/normalize-data';

const router = Router();

router.get('/*', async (req, res, next) => {
  try {
    const categories = await Category.find({}).lean().exec();
    const products = await Product.find({}).lean().exec();

    const { result: categoryIds, entities: { data: categoryMap } } = normalizeArray(categories);
    const { result: productIds, entities: { data: productMap } } = normalizeArray(products);

    const initialState = {
      categories: {
        result: categoryIds,
        data: categoryMap || {},
        orderBy: 'name',
        markedForDeletion: null,
        query: ''
      },
      products: {
        result: productIds,
        data: productMap || {},
        filter: 'all',
        query: '',
        markedForDeletion: null
      }
    };

    const store = configureStore(initialState);
    const muiTheme = getMuiTheme({ userAgent: req.headers['user-agent'] });
    const context = {};

    const App = renderToString(
      <Provider store={store}>
        <MuiThemeProvider muiTheme={muiTheme}>
          <StaticRouter location={`/admin${req.url}`} context={context}>
            <AdminApp/>
          </StaticRouter>
        </MuiThemeProvider>
      </Provider>
    );

    const html = adminHtml(App, initialState);

    res.send(html);
  } catch (e) {
    console.log(e);
    next(e);
  }

});

export default router;
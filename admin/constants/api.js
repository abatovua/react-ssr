export default class API {
  static addCategory(data) {
    return fetch('/api/category', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(data)
    })
    .then(res => {
      if (res.status === 200) {
        return res.json();
      }
      return Promise.reject();
    });
  }

  static deleteCategory(id) {
    return fetch('/api/category', {
      method: 'DELETE',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ id })
    })
    .then(res => {
      if (res.status === 200) {
        return res.json();
      }
      return Promise.reject();
    });
  }

  static updateCategory(id, data) {
    return fetch(`/api/category/${id}`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ data })
    })
    .then(res => {
      if (res.status === 200) {
        return res.json();
      }
      return Promise.reject();
    });
  }

  static addProduct(data) {
    return fetch('/api/product', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(data)
    })
    .then(res => {
      if (res.status === 200) {
        return res.json();
      }
      return Promise.reject();
    });
  }

  static deleteProduct(id) {
    return fetch('/api/product', {
      method: 'DELETE',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ id })
    })
    .then(res => {
      if (res.status === 200) {
        return res.json();
      }
      return Promise.reject();
    });
  }

  static updateProduct(id, data) {
    return fetch(`/api/product/${id}`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ data })
    })
    .then(res => {
      if (res.status === 200) {
        return res.json();
      }
      return Promise.reject();
    });
  }
}
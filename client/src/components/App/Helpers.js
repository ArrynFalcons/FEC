import axios from 'axios';

const getRouteData = (route, page, count, sort, Id, endParam) => {
  const params = {
    page,
    count,
    sort,
    product_id: Id,
  };
  if (route === 'products') {
    return (Id ? axios.get(`/products/${Id}/${endParam}`)
      : axios.get('/products', { params }));
  }
  if (route === 'qa/questions') {
    return (endParam ? axios.get(`/qa/questions/${Id}/${endParam}`)
      : axios.get('/qa/questions', { params }));
  }
  return axios.get(`/reviews/${endParam}`, { params });
};

// example of how to use helper function
// getRouteData('reviews', 1, 10, '', '65651', '')
//   .then((data) => {
//     console.log('Example', data);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

export default getRouteData;

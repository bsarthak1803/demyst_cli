const axios = require("axios");
// const nodeCache = require("node-cache");

//promise or response caching can also be implemented using the commented code - not required in this scenario
// const cache = new nodeCache();

const getTodosController = async (num) => {
  try {
    const firstNEvenNumberedTodos = [];
    let firstNEvenNumberedTodosRequestPromises = [];
    for (let i = 1; i <= num; i++) {
      const url = `https://jsonplaceholder.typicode.com/todos/${i * 2}`;
      // let cachedPromise = cache.get(url);
      // if (cachedPromise) {
      //   firstNEvenNumberedTodosRequestPromises.push(cachedPromise);
      // } else {
      let urlPromise = axios.get(url); //making request to external api to fetch the promise

      // cache.set(url, JSON.parse(JSON.stringify(urlPromise))); //cache the url promise --- ttl -> 5 mins

      firstNEvenNumberedTodosRequestPromises.push(urlPromise);
      // }
    }
    await Promise.all(firstNEvenNumberedTodosRequestPromises)
      .then((responses) => {
        responses.forEach((response) => {
          const todo = response?.data;
          firstNEvenNumberedTodos.push({
            title: todo?.title,
            isCompleted: todo?.completed,
          });
          console.log(firstNEvenNumberedTodos);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    console.log(err);
  }
};

exports.getTodos = getTodosController;

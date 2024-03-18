#!/usr/bin/env node

const inquirer = require("inquirer");
const { getTodos } = require("./src/controllers/todos");

const userPrompt = inquirer.createPromptModule();
userPrompt([
  {
    type: "input",
    name: "showResult",
    message: "Enter the num of first even todos to be fetched and displayed?",
    default: 20,
  },
])
  .then((answers) => {
    const showResult = answers.showResult;
    getTodos(showResult);
  })
  .catch((err) => {
    console.log(err);
  });

exports.userPrompt = userPrompt;

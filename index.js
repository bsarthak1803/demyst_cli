#!/usr/bin/env node

const inquirer = require("inquirer");
const { getTodos } = require("./src/controllers/todos");

const userPrompt = inquirer.createPromptModule();
try {
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
      if (!isNaN(showResult)) getTodos(showResult);
      else throw new Error("Input provided is not a number");
    })
    .catch((err) => {
      console.log(err);
    });
} catch (err) {
  console.log(err);
}

exports.userPrompt = userPrompt;

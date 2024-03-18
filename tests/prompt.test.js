const inquirer = require("inquirer");
const getTodos = require("../src/controllers/todos").getTodos;

jest.mock("inquirer"); //mocking inquirer
const userPrompt = jest.fn(() => inquirer.createPromptModule());
const log = jest.spyOn(console, "log"); //mocking console
jest.mock("../src/controllers/todos");
getTodos.mockImplementation(() => {
  //mocking implementation of getTodos
  let mockTodoResponses = [
    {
      title: "TodoTitle1",
      isCompleted: true,
    },
    { title: "TodoTitle2", isCompleted: false },
  ];
  log(mockTodoResponses);
});

describe("userPrompt", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  const userPromptArgs = [
    {
      type: "input",
      name: "showResult",
      message: "Enter the num of first even todos to be fetched and displayed?",
      default: 20,
    },
  ];

  it("should return the number of first even todos to be fetched", async () => {
    const userInput = 2;
    const mockAnswers = { showResult: userInput };
    userPrompt.mockResolvedValueOnce(mockAnswers); //mocking userPrompt promise resolution

    await userPrompt(userPromptArgs);

    expect(userPrompt).toHaveBeenCalledWith(userPromptArgs);
  });

  it("should handle exception", async () => {
    const mockedExpection = new Error("Mocked Exception");
    //mocking userPrompt response promise to reject once with mockederror
    userPrompt.mockRejectedValue(mockedExpection);

    await userPrompt(userPromptArgs);

    expect(userPrompt).toHaveBeenCalledTimes(1);
    expect(userPrompt).toRejectWith(mockedExpection);
  });

  it("should call getTodos function and log the expected ouput", async () => {
    await getTodos();
    expect(getTodos).toHaveBeenCalledWith();
    expect(log).toHaveBeenCalledWith([
      {
        title: "TodoTitle1",
        isCompleted: true,
      },
      { title: "TodoTitle2", isCompleted: false },
    ]);
  });
});

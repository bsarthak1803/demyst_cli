const axios = require("axios");
const getTodos = require("../src/controllers/todos").getTodos;

jest.mock("axios"); //mocking axios
const log = jest.spyOn(console, "log"); //mocking console

describe("getTodos", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch todos", async () => {
    const mockedResponse = {
      data: {
        title: "Mocked Todo",
        completed: false,
      },
    };
    const num = 5;
    const expectedTodos = Array.from({ length: num }, (_, i) => ({
      title: "Mocked Todo",
      isCompleted: false,
    }));

    for (let i = 0; i < 5; i++) axios.get.mockResolvedValueOnce(mockedResponse);

    await getTodos(num);

    expect(axios.get).toHaveBeenCalledTimes(5);
    for (let i = 1; i <= 5; i++) {
      const todoInd = i * 2;
      expect(axios.get).toHaveBeenNthCalledWith(
        i,
        `https://jsonplaceholder.typicode.com/todos/${todoInd}`
      );
    }
    expect(log).toHaveBeenCalledWith(expectedTodos);
  });

  it("should handle exception", async () => {
    const mockedExpection = new Error("Mocked Error");
    //mocking axios response promise to reject once with mockederror
    axios.get.mockRejectedValueOnce(mockedExpection);

    await getTodos(1);

    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(log).toHaveBeenCalledWith(mockedExpection);
  });
});

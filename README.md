# ABOUT THIS APP
A Next.js app created to be able to learn and practice **Unit testing**, with the **React Testing Libaray(RTL)** and the **Jest** testing framework.

## Content
It consist of a Next.js app which has Jest framweork and RTL installed, a couple of local modules created as test subjects, a markdown file which contains useful definitions and methods used frequently in RTL and Jest, and test files available in the `__tests__` folder.

***Content of the markdown file within the app folder is given below, for rapid access :*** 
---
---
---
# React Testing Library(RTL) and Jest-Dom

## RTL methods :
- `render()` method takes an element/React component as it's parameter
- `screen.X` method
- `screen.getByX` queries are used to determine if an element is present in the DOM
- `userEvent` 
- `screen.queryByRole` is used to determine if an element is NOT rendered(if not found/present in the DOM). The `screen.queryByX` methods will return null if the element is not found.
- `screen.findByX` is used to asynchronously find an element and the `async await` keywords should be used in the callback function of the parent `it` method.
`async` on the callback, and `await` on the `screen.findByX` method.
- `screen.getAllByX` , `screen.queryAllByX` , `screen.findAllByX` which gives an array of all elements that match the description provided
- `waitFor` method is used alongside the `expect` method from Jest-dom library. It takes a callback function as it's parameter and an optional object which contains options on how the callback function should be called. Inside the callback function, should live the `expect` method which itself is the asynchronously executed function.
- `beforeEach` method is a emthod that takes a callack funcntion as it's parameter and it's used inside of the callback of the `it` method to state that the code inside it should run before each test in the `it` method's callback function.

### Tips :
- the p tag cannot be gotten by `getByRole("paragraph)`, in stead get it by using `getByTestId("sometestid")`. Before you do this, you have to give the p tag a property `data-testid` and the value should be your desired test id "sometestid".

## Jest-Dom Matcher methods
- `expect` method takes the html element/component as it's parameter
Note that we can add `not.` before the assertion methods to inverse it
- `toBeInTheDocument`
- `toBeVisible`
- `toHaveValue`
- `toHaveStyle`
- `toHaveTextContent`
- `toHaveClass`
- `toBeNull`
- `toBeDisabled`
- `toHaveClass`
- `toEqual`
- `toBe`
- `toBeTruthy`
- `toContain`
- `toBeDefined`

e.g `expect(header).toBeInTheDocument()`

## Jest npm commands
- `npm test -- --coverage` : This coverage flag allows us to get a report of the lines in our code that was actually tested. This report then becomes available in a directory called `coverage/` that is created at runtime.
- `npm test -- --silent` : Used to not print out results of the test in the console.
- `jest --help` : Used to print out all the jest CLI options and their definitions, e.g coverage,silent e.t.c.


## Jest Mock Function
- `jest.fn()` is the function used to create functions mocked by jest. It is used inside the `__mock__` folder, placed inside the same directory as the module we want to mock. However, inside of our test file, we use `jest.mock(./module)` to mock the implementation of the real module and return our data from the mocked file in our `__mocks__` folder.
Note : The `jest.mock` method accepts the file path to the function being mocked as it's only parameter. This is only used for local modules, and not needed for modules inside the `node_modules` folder.

### Mocked function test example : 
`// import the actual module
import apiRequest from './api-request.js';

// then, tell Jest to mock the implementation!
jest.mock('./api-request.js');

it("Gets the full recipe for a dish", async () => {
  // arrange  
  const dish = "Pesto";
  const expectedValue = { "Magical Deliciousness": "3 cups" };

  // set the resolved value for the next call to apiRequest  
  const mockResponse = {
    status: "mock",
    data: { "Magical Deliciousness": "3 cups" }
  }
  apiRequest.mockResolvedValueOnce(mockResponse);

  // act  
  const actualRecipe = await findRecipe(dish);
 
  // assert
  expect(actualRecipe).toEqual(expectedValue);
});`

Note : `const MockResponse` is set as the expected resolved data that the `apiRequest` method is expected to resolve to.
`mockResolvedValueOnce` accepts our mocked returned data `mockedResponse` and assigns the result to the 


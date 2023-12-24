# How to setup the project

use below commands and procedure to setup the project (if you don't have installed node.js and npm in local machine then install those first)

1. goto terminal and enter following command.

   ### `git clone https://github.com/chiransiriwardhana/todo-app.git`

2. open project folder using VS code

3. goto VS code terminal and enter below command to install all dependencies.
   
   ###  `npm install`  

4. then enter following command to start application

   ### `npm start`

5. After entering these commands open your favourite browser and enter http://localhost:3000/

6. Then you can see Application 

# Features of application

1. Redux Toolkit has been used for state management
2. Plain CSS has been used for styling the application.
3. There are two seperate tabs for completed and not completed/active tasks. Not completed tasks are in 'todo' tab and completed tasks are in 'completed' tab. you can delete tasks if they are completed in both tabs. Also you can send completed tasks to 'completed' tab after finishing. Then within completed tab also you can delete completed tasks if needed.
4. changes are note deleted after page refresh.
5. you can drag and drop high priority task to top to show them as first todos. 

# Redux Toolkit's role in this project

1. In this project we used redux thunk to fetch data from backend server. As Redux toolkit comes with createAsyncThunk. This enables us to perform async operations.
2. use Redux hooks like useSelector and useDispatch int this project. The useSelector hooks allow us to extract data or the state from the Redux store using a selector function. useDispatch allows us to send or dispatch an action to the redux store by giving the action as an argument to the dispatch variable.
3. Redux Store was used to store completed and not completed tasks globaly through out the process of application. We used array of json objects as global variable. which is looks like { todoComp: [{},{},...], todoNotComp: [{},{},...] }. Then use todoComp when we need to access or manimpulate completed tasks, and todoNotComp was used to manipulate not completed tasks.


import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { combineReducers } from "@reduxjs/toolkit"
export const completedToDos = []

export const getTodosAsyncNotCompleted = createAsyncThunk(
    'todoNotComp/getTodosAsyncNotCompleted',
    async () => {

        const response = await fetch('https://jsonplaceholder.typicode.com/todos')
        if (response.ok) {
            const todos = await response.json();

            const todos_not_completed = todos.filter(obj => {
                return obj.completed === false;
            });
            console.log("todo_not_completed", todos_not_completed)
            return { todos_not_completed }
        }
    }
)

export const getTodosAsyncCompleted = createAsyncThunk(
    'todoComp/getTodosAsyncCompleted',
    async () => {

        const response = await fetch('https://jsonplaceholder.typicode.com/todos')
        if (response.ok) {
            const todos = await response.json();
            console.log("^^^^", todos)
            const todos_completed = todos.filter(obj => {
                return obj.completed === true;
            });
            return { todos_completed }
        }
    }
)

const todoSlice = createSlice({
    name: "todoComp",
    initialState: [],

    reducers: {
        addTodo: (state, action) => {
            const newToDo = {
                id: state.length + 1,
                title: action.payload.title,
                completed: false
            };

            state.push(newToDo)
        },
        toggleComplete: (state, action) => {

            let temp = { ...action.payload.item }
            temp.completed = true
            state.push(temp)
        },

        deleteTodo: (state, action) => {
            return state.filter((todo) => todo.id !== action.payload.id)
        },

        setItem: (state, action) => {
            state.filter(val => val !== action.payload);
            return action.payload.todos

        }
    },

    extraReducers: (builder) => {

        builder
            .addCase(getTodosAsyncCompleted.fulfilled, (state, action) => {
                return action.payload.todos_completed
            })
    }
})


const todoNotSlice = createSlice({
    name: "todoNotComp",
    initialState: [],

    reducers: {
        addTodoNotCompleted: (state, action) => {
            const newToDo = {
                id: state.length + 1,
                title: action.payload.title,
                completed: false
            };

            state.push(newToDo)
        },
        toggleCompleteNotCompleted: (state, action) => {

            const index = state.findIndex(
                (todo) => todo.id === action.payload.id
            );
            state[index].completed = action.payload.completed
            state.splice(index, 1);
        },

        deleteTodoNotCompleted: (state, action) => {
            return state.filter((todo) => todo.id !== action.payload.id)
        },

        setItemNotCompleted: (state, action) => {
            state.filter(val => val !== action.payload);
            return action.payload.todos
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(getTodosAsyncNotCompleted.fulfilled, (state, action) => {
                return action.payload.todos_not_completed
        })
    }
})


export const { addTodo, toggleComplete, deleteTodo, setItem } = todoSlice.actions;
export const { addTodoNotCompleted, toggleCompleteNotCompleted, deleteTodoNotCompleted, setItemNotCompleted } = todoNotSlice.actions;

export const initialState = todoSlice.initialState;
export default combineReducers({
    todoNotComp: todoNotSlice.reducer,
    todoComp: todoSlice.reducer
});


import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { CompletedToDos } from './CompletedToDos'
import { NotCompletedToDos } from './NotCompletedToDos';
import { useSelector } from 'react-redux';
import './App.css';
import { getTodosAsyncNotCompleted } from './redux/todoSlice';
import { getTodosAsyncCompleted } from './redux/todoSlice';
import store from './redux/store.js'
import { addTodoNotCompleted } from './redux/todoSlice';

function App() {

  const [isCompleteScreen, setIsCompleteScreen] = useState(false)
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [completed, setCompleted] = useState("")

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(
      addTodoNotCompleted({
        title: title,
        completed: completed
      })
    )
  }

  const todoComp = useSelector((state) => state.todoComp)
  const todoNotComp = useSelector((state) => state.todoNotComp)
  
  useEffect(() => {
    if (store.getState()["todoComp"].length == 0) {
      dispatch(getTodosAsyncCompleted())
    }

    if (store.getState()["todoNotComp"].length == 0) {
      dispatch(getTodosAsyncNotCompleted())
    }
  }, [])


  return (
    <div className="App">
      <h1>Todos List</h1>
      <div className='todo-wrapper'>
        <div className='todo-input'>
          <div className='todo-input-item'>
            <label> Title </label>
            <input
              type="text"
              placeholder="What's the task title?"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </div>

          <div className='todo-input-item-btn'>
            <button type='submit' onClick={onSubmit} className='primaryBtn'>Add</button>
          </div>
        </div>

        <div className='btn-area'>
          <button
            className={`secondaryBtn ${isCompleteScreen === false && 'active'}`}
            onClick={() => setIsCompleteScreen(false)}
          >
            Todo
          </button>
          <button className={`secondaryBtn ${isCompleteScreen === true && 'active'}`}
            onClick={() => setIsCompleteScreen(true)} >
            Completed
          </button>
        </div>
        <div className='todo-list'>
          <div>
            {isCompleteScreen ? <CompletedToDos /> : <NotCompletedToDos />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

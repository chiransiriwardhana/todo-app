import { toggleCompleteNotCompleted } from "./redux/todoSlice";
import { deleteTodoNotCompleted } from "./redux/todoSlice";
import { toggleComplete } from "./redux/todoSlice";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaCheckSquare } from "react-icons/fa";
import { useDispatch } from "react-redux";
import store from './redux/store.js'
import React from "react";
import './App.css';

export const ItemNotCompleted = ({ id, title, completed }) => {
    const state = store.getState();
    const dispatch = useDispatch();

    const handleDeleteClick = () => {
        dispatch( deleteTodoNotCompleted({ id: id }))
    }

    const handleCompleteClick = () => {
        var todo_items = state["todoNotComp"]   
        const index = todo_items.findIndex(
            (todo) => todo.id === id
        );
        let todo_id = todo_items[index]
        dispatch(toggleCompleteNotCompleted(  { id: id, completed: true }))
        dispatch(toggleComplete({item: todo_id}))
    }

    return (
        <div className='todo-list-item'>
            <h6>{title}</h6>
            <div className="icons">
                <RiDeleteBin5Line className='icon' onClick={handleDeleteClick} />
                {!completed && <FaCheckSquare className="check-icon" onClick={handleCompleteClick} />}
            </div>
        </div>
    )
}

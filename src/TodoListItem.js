import { FaCheckSquare } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { deleteTodo } from "./redux/todoSlice";
import { RiDeleteBin5Line } from "react-icons/ri";
import React from "react";
import './App.css';

export const ItemCompleted = ({ id, title, completed }) => {

    const dispatch = useDispatch();

    const handleDeleteClick = () => {
        dispatch(deleteTodo({ id: id }))
    }

    return (
        <div className='todo-list-item'>
            <h6>{title}</h6>
            <div className="icons">
                <RiDeleteBin5Line className='icon-completed' onClick={handleDeleteClick} />
                {!completed && <FaCheckSquare className="check-icon" />}
            </div>
        </div>
    )
}

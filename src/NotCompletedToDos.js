import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { ItemNotCompleted } from './TodoListItemNotCompleted';
import { setItemNotCompleted } from "./redux/todoSlice";
import { useDispatch } from 'react-redux';
import store from './redux/store.js'
import './App.css'

export const NotCompletedToDos = () => {

    const state = store.getState();
    var todo_items = state["todoNotComp"]
    const dispatch = useDispatch();
    const setItemReducerCall = (myToDo) => {
        dispatch(setItemNotCompleted({ todos: myToDo }))
    }

    const onDragEnd = (result) => {

        if (!result.destination) return;

        const items_s = todo_items.filter(obj => {
            return obj.completed === false;
        });

        const items = Array.from(items_s);

        // swapping destination and source items when drag and dropping occure
        var tmp = items[result.destination.index];
        items[result.destination.index] = items[result.source.index];
        items[result.source.index] = tmp;
        setItemReducerCall(items) // save to state
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div>
                <div>
                    <Droppable droppableId='chraracters'>
                        {(provided) => (
                            <div className='characters' {...provided.droppableProps} ref={provided.innerRef}>
                                {todo_items.map(({ id, title, completed }, index_) => (
                                    <Draggable key={id} draggableId={id.toString()} index={index_}>
                                        {(provided) => (
                                            <div className='todo' {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                                <ItemNotCompleted id={id} title={title} completed={completed} />
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </div>
            </div>
        </DragDropContext>
    )
}

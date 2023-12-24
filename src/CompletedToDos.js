import './App.css'
import { ItemCompleted } from './TodoListItem'
import store from './redux/store.js'
import { setItem } from './redux/todoSlice.js';
import { useDispatch } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

export const CompletedToDos = () => {
    const state = store.getState();
    var todo_items = state["todoComp"]
    const dispatch = useDispatch();
    const setItemReducerCall = (myToDo) => {
        dispatch(setItem({ todos: myToDo }))
    }

    const onDragEnd = (result) => {
        if (!result.destination) return;
        const items = Array.from(todo_items);

        // swapping destination and source elements when dragging occur

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
                                                {
                                                    completed
                                                        ?
                                                        <ItemCompleted id={id} title={title} completed={completed} />
                                                        :
                                                        <></>
                                                }
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

import React, { useState } from 'react';
import { useTodo } from '../../context';
import { Draggable } from 'react-beautiful-dnd';


const TodoItem = ({todo,index,category}) => {
    const [isTodoEditable, setIsTodoEditable] = useState(false);
    const [todoMsg, setTodoMsg] = useState(todo.todo);
    const [priority, setPriority] = useState(todo.priority);
    const {editTodo, deleteTodo} = useTodo();

    const updateTodo = () => {
        editTodo(todo.id,{...todo,todo: todoMsg});
        setIsTodoEditable(false);
    }

    function getStyle(style, snapshot) {
      if (!snapshot.isDropAnimating) {
        return style;
      }
      const { moveTo, curve, duration } = snapshot.dropAnimation;
  
      const translate = `translate(${moveTo.x}px, ${moveTo.y}px)`;

      return {
        ...style,
        transform: `${translate}`,

        transition: `all ${curve} ${duration}s`,

      };
    }

    return (
      <Draggable draggableId={`${todo.id}`} key={todo.id} index={index} >
        {(provided, snapshot) => (
          <div
        className={`flex flex-start items-start flex-col rounded-lg px-4 py-3 mb-2
           cursor-pointer  text-black ${
            todo.completed ? "bg-[#c6e9a7]" : " bg-gray-200" } ${snapshot.isDragging ? 'bg-gray-400' : 'bg-gray-200'}` 
            }
            
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={provided.innerRef}
        isDragging={snapshot.isDragging && !snapshot.isDropAnimating}
        style={getStyle(provided.draggableProps.style, snapshot)}
        >
       
          {/* Text */}
          <input
              type="text "
              className={`border break-words outline-none w-full bg-transparent rounded-lg text-lg mb-4 font-semibold ${
                  isTodoEditable ? "border-black/10 px-2" : "border-transparent"
              } ${todo.completed ? "line-through" : ""}`}
              value={todoMsg}
              onChange={(e) => setTodoMsg(e.target.value)}
              readOnly={!isTodoEditable}
          />
        
          <span
              className={` outline-none rounded-full mb-4 font-semibold px-4 py-1 
              ${priority == 'Low' ? ' text-white bg-gray-500' : priority == 'Medium' ? ' text-white bg-orange-500' : priority == 'High'? ' text-white bg-red-500' : '' }`}
          >{todo.priority}</span>
          <div className='flex gap-x-5 '>
          {/* Edit, Save Button */}
          <button
              className="inline-flex w-8 h-8 rounded-lg text-sm justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
              onClick={() => {
                  if (todo.completed) return;

                  if (isTodoEditable) {
                      updateTodo();
                  } else setIsTodoEditable((prev) => !prev);
              }}
              disabled={todo.completed}
          >
              {isTodoEditable ? "📁" : "✏️"}
          </button>   
          {/* Delete Todo Button */}
          <button
              className="inline-flex w-8 h-8 
                      rounded-lg text-sm 
                      border border-black/10 
                      justify-center items-center 
                      bg-gray-50 hover:bg-gray-100 "
              onClick={() => deleteTodo(todo.id,category)}
          >
              ❌
          </button>
          </div>
        </div>
        )}
      </Draggable>

      
    );
}

export default TodoItem;

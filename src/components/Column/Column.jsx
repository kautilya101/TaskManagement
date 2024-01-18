import React, { useEffect } from 'react';
import { TodoItem } from '../Tasks';
import { Droppable } from 'react-beautiful-dnd';


const Column = ({title,todos,id,category}) => {
  
  
  return (
    <div className='w-full flex flex-col bg-slate-50 p-2 shadow-xl rounded-lg'>
      <div className={`flex flex-row items-center justify-start mx-1 mb-5 ${id == '0' ? 'border-b-blue-700' : id == '1' ? 'border-b-orange-500' : id == '2' ? 'border-b-green-400' : ''} border border-b-2  `}>
        <h1 className=' text-xl font-semibold  text-gray-700 mb-4 uppercase'>{title}</h1>
        <h1 className=' text-lg mb-4 text-slate-400 rounded-full ml-5 px-4 border border-solid border-slate-400'>{todos.length}</h1>
      </div>
    <Droppable droppableId={id} key={id}>
      {(provided, snapshot) => (
        <div className='flex-grow-1
        w-full h-full overflow-scroll no-scrollbar'
          ref={provided.innerRef}
          {...provided.droppableProps}
          isDraggingOver={snapshot.isDraggingOver}
        >
          {todos.map((todo,index) => (
            <div key={todo.id}>
              <TodoItem todo={todo} index={index} category={category} />
            </div>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
    </div>
  );
}

export default Column;

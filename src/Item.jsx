import React from 'react';
import { TodoItem } from './components/Tasks';

const Item = ({todos}) => {
  return (
    <div className="flex flex-wrap gap-y-3">
        {todos.map((todo) => (
          <div key={todo.id} className=' w-full'>
            <TodoItem todo={todo}/>
          </div>
        ))}
    </div>
  );
}

export default Item;

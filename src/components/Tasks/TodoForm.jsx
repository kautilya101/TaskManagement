import React, { useState } from 'react';
import { useTodo } from '../../context';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

const TodoForm = () => {
   const options = ['Low','Medium','High']
    const [todo,setTodo] = useState("");
    const [title,setTitle] = useState("");
    const [dueDate,setDueDate] = useState("");
    const [priority,setPriority] = useState(options[0]);
    const {addTodo} = useTodo();

    const todoAdd = (e) => {
        e.preventDefault();
        if(!todo) return;
        console.log(todo);
        addTodo({priority,todo,completed: false})
        setTodo("")
    }

 

    const handleSubmit = (e) => {
      e.preventDefault();
      console.log(title)
    }

    return (
      <div className="p-4 py-8 ml-10 drop-shadow-lg">
        <form  onSubmit={todoAdd} className='flex justify-between gap-x-2  p-2 w-full' >
            <input
                type="text"
                required
                placeholder="Write Todo..."
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
                className=" border basis-2/3 border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 "
            />
             <Dropdown options={options}
              required
              placeholder='Priority'
              onChange={(e) => setPriority(e.value)}
              className='rounded-md border basis-1/6 border-[#e0e0e0] bg-white text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md cursor-pointer z-10 '
             />
            <button type="submit" className="rounded-lg basis-1/6 px-4 text-lg bg-green-600 text-white hover:bg-green-500">
                ADD
            </button>
        </form>
      </div>
    );
}

export default TodoForm;

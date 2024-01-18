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
      <div className="p-4 py-8">
        <form  onSubmit={todoAdd} className='flex gap-x-2' >
            <input
                type="text"
                required
                placeholder="Write Todo..."
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
                className=" border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 "
            />
             <Dropdown options={options}
              required
              placeholder='Priority'
              onChange={(e) => setPriority(e.value)}
              className='rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md cursor-pointer z-10 '
             />
            <button type="submit" className="rounded-lg px-4 text-lg bg-green-600 text-white">
                ADD
            </button>
        </form>
      </div>
    );
}

export default TodoForm;

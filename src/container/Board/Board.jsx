import React, { useEffect, useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { TodoContextProvider } from '../../context'
import Column from '../../components/Column/Column';
import { TodoForm, TodoItem } from '../../components/Tasks';
import { Link, useNavigate } from 'react-router-dom'
import Header from '../Header/Header';
const Board = () => {

  const [todos, setTodos] = useState([]);
  const [progressTodos, setProgressTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);
  const categories = ['todos','progress','completed'];
  const addTodo = (todo) => {
    console.log("add todo",todo);
    setTodos((prev) => [{id:Date.now(),...todo},...prev])
  }

  const editTodo = (id,todo) => {
    setTodos((prev) => prev.map((prevTodo) => prevTodo.id === id ? todo : prevTodo )) 
  }

  const deleteTodo = (id,category) => {
    if(category == categories[0]){
      setTodos(
        (prev) => prev.filter((prevTodo) => prevTodo.id !== id)
      ) 
    }
    if(category == categories[1]){
      setProgressTodos(
        (prev) => prev.filter((prevTodo) => prevTodo.id !== id)
      ) 
    }
    if(category == categories[2]){
      setCompletedTodos(
        (prev) => prev.filter((prevTodo) => prevTodo.id !== id)
      ) 
    }
    
  }

  const toggleComplete = (id) =>{
      setTodos(
        (prev) => prev.map((prevTodo) => prevTodo.id === id ? {...prevTodo, completed: !prevTodo.completed } : prevTodo)
      )
  }

  const findItemById = (id, array) => {
    const arr = array.find((item) => item.id == id );
    return arr;
  }

  const removeItemById = (id, array) => {
    return array.filter((item) => item.id != id);
  }

  const handleDragEnd = (result) => {
    const {destination,source, draggableId} = result;

    if(!destination) return;
    if(source.droppableId == destination.droppableId && destination.index == source.index) return;

    if(source.droppableId == destination.droppableId){
      if(source.droppableId == 0){
        const task = findItemById(draggableId,todos);
        const arr = todos;
        arr.splice(source.index,1);
        arr.splice(destination.index,0,task);
        setTodos(arr);
      }
      if(source.droppableId == 1){
        const task = findItemById(draggableId,progressTodos);
        const arr = progressTodos;
        arr.splice(source.index,1);
        arr.splice(destination.index,0,task);
        setProgressTodos(arr);
      }
      if(source.droppableId == 2){
        const task = findItemById(draggableId,completedTodos);
        const arr = completedTodos;
        arr.splice(source.index,1);
        arr.splice(destination.index,0,task);
        setCompletedTodos(arr);
      }
    }
    else{
      const task = findItemById(draggableId, [...todos,...progressTodos,...completedTodos]);

      if(source.droppableId == 1){
        setProgressTodos(removeItemById(draggableId, progressTodos));
      }else if(source.droppableId == 2){
        setCompletedTodos(removeItemById(draggableId, completedTodos));
      }else{
        setTodos(removeItemById(draggableId, todos));
      }

      if(destination.droppableId == 1){
        progressTodos.splice(destination.index,0,task);
        setProgressTodos(progressTodos);
      }else if(destination.droppableId == 2){
        completedTodos.splice(destination.index,0,task);
        setCompletedTodos(completedTodos);
      }else{
        todos.splice(destination.index,0,task);
        setTodos(todos);
      }
    }

  }

  useEffect(() => {
    const localTodos = JSON.parse(localStorage.getItem("todos"));
    const localProgressTodos = JSON.parse(localStorage.getItem("progress"));
    const localCompletedTodos = JSON.parse(localStorage.getItem("completed"));
    if(localTodos && localTodos.length > 0){
      setTodos(localTodos);
    }
    if(localProgressTodos && localProgressTodos.length > 0){
      setProgressTodos(localProgressTodos);
    }
    if(localCompletedTodos && localCompletedTodos.length > 0){
      setCompletedTodos(localCompletedTodos);
    }
    // console.log(localTodos);
  },[])

  useEffect(() => {
    localStorage.setItem("todos",JSON.stringify(todos));
  });
  
  useEffect(() => {
    localStorage.setItem("progress",JSON.stringify(progressTodos))
  });

  useEffect(() => {
    localStorage.setItem("completed",JSON.stringify(completedTodos));
  });

  

  // console.log(newTodos);
  return (
    <TodoContextProvider value={{todos,addTodo,editTodo,deleteTodo,toggleComplete}}>
    <div className=' min-h-screen py-8 bg-slate-200'> 
    <Header/> 
    {/* <div className='flex ml-20 '> */}
      <TodoForm/>
    {/* </div> */}
    <DragDropContext onDragEnd={handleDragEnd}>
        <div className='flex h-[34rem] my-10 mx-20 gap-2'>
          <Column title={'To do'} todos={todos} id={'0'} category={categories[0]}/>
          <Column title={'Progress'} todos={progressTodos} id={'1'} category={categories[1]} />
          <Column title={'Completed'} todos={completedTodos} id={'2'} category={categories[2]} /> 
        </div>
    </DragDropContext>
      </div>
    </TodoContextProvider>
  );
}

export default Board;

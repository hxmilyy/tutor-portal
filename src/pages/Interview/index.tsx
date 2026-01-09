import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import { usePrev } from "../../hooks/usePrevious";
import type { Task } from "../../types";

type TodoResponse = {
  limit: number,
  skip: number,
  todos: Array<Task>,
  total: number
}

export function Interview() {
  const [newTodo, setNewToDo, oldRef] = usePrev<string>("");
  const [filterValue, setFilterValue] = useState<string>("All");
  const [list, setList] = useState<Task[]>([]);

  // request data
  async function test_fetch() {
    const resp = await fetch("https://dummyjson.com/todos");
    const json = await resp.json() satisfies TodoResponse;
    setList(json.todos)
  }

  // update list when todo completed changed
  function handleCompleteChange(id: number, checked: boolean) {
    setList(list.map(l => l.id == id ? { ...l, completed: checked } : l))
  }

  // update list after delete one
  function handleDelete(id: number) {
    setList(list.filter(l => l.id !== id))
  }

  // set new todo value
  function handleNewTodoChange(value: string) {
    setNewToDo(value);
  }

  // create new todo
  function handleAddNewTodo() {
    if (!newTodo.trim()) { return }

    setList([{
      id: Math.max(...list.map(l => l.id).filter(l => !isNaN(l))) + 1,
      userId: 1,
      todo: newTodo.trim(),
      completed: false
    }, ...list]);
    // setNewToDo("");
  }

  // set filterValue
  function handleFilterChange(value: string) {
    setFilterValue(value);
  }

  // request data when component loaded
  useEffect(() => {
    test_fetch();
  }, []);

  // set newTodo as empty after new created
  useEffect(() => {
    if (newTodo.trim() && newTodo !== oldRef.current) {
      console.log(`newTodo: [${newTodo}], oldRef.current: [${oldRef.current}]`)
      setNewToDo("")
    }
    oldRef.current = newTodo
  }, [list])

  return <div className="p-6">
    <section className="space-y-4">
      <div className="flex items-center max-w-sm gap-4">
        <Input type="text" name="new_todo" size={200} placeholder="new todo" value={newTodo} onChange={e => handleNewTodoChange(e.target.value)} />
        <Button variant={"default"} size={"sm"} onClick={handleAddNewTodo}>submit</Button>
      </div>
      <div>
        <Select value={filterValue} onValueChange={value => handleFilterChange(value)}>
          <SelectTrigger className="w-[280px]">
            <SelectValue placeholder="Select a timezone" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="All">All</SelectItem>
            <SelectItem value="Active">Active</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <ul>
        {
          (filterValue == "All" ? list : filterValue == "Active" ? list.filter(l => !l.completed) : filterValue == "Completed" ? list.filter(l => l.completed) : []).map(o => <li key={o.id} className="flex justify-start items-center gap-4">
            <input type="checkbox" checked={o.completed} onChange={(e) => { handleCompleteChange(o.id, e.target.checked) }} />
            <span>{o.completed ? <del>{o.todo}</del> : o.todo}</span>
            <Button variant={"link"} size={"sm"} onClick={() => { handleDelete(o.id) }}>delete</Button>
          </li>)
        }
      </ul>
    </section>
  </div>
}
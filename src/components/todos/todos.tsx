'use client'

import { Table } from '@/components/ui/table';
import { trpc } from '@/lib/trpc-clients/client'
import { trpcServer } from '@/lib/trpc-clients/server';

import TodoItem from './todo-item';

export default function Todos({
  initialTodos
}: {
  initialTodos: Awaited<ReturnType<(typeof trpcServer)['getTodos']>>
}){
  const todos = trpc.getTodos.useQuery(undefined, {
    // TODO: trpc is inferring wrong data type for getTodos. Temporarily marking as 'any' type
    initialData: initialTodos as any,
    refetchOnMount: false,
    refetchOnReconnect: false
  })?.data as Awaited<ReturnType<(typeof trpcServer)['getTodos']>>;


  return (
    <>
      <Table>
        <caption>Todo List</caption>
        <thead>
          <tr>
            <th scope="col">Status</th>
            <th scope="col">Description</th>
            <th scope="col">Deadline</th>
          </tr>
        </thead>
        <tbody>
          {todos?.map(todo =>
            <TodoItem key={todo.id} todo={todo} />
          )}
        </tbody>
      </Table>
    </>
  )
}
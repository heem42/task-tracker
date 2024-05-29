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
  const getTodos = trpc.getTodos.useQuery(undefined, {
    initialData: initialTodos,
    refetchOnMount: false,
    refetchOnReconnect: false
  });

  return (
    <>
      <Table>
        <caption>Todo List</caption>
        <thead>
          <tr>
            <th scope="col">Description</th>
            <th scope="col">Status</th>
            <th scope="col">Deadline</th>
          </tr>
        </thead>
        <tbody>
          {getTodos?.data?.map(todo => 
            <TodoItem key={todo.id} todo={todo} />
          )}
        </tbody>
      </Table>
    </>
  )
}
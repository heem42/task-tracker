'use client'

import { trpc } from '@/lib/trpc-clients/client'
import { trpcServer } from '@/lib/trpc-clients/server';

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
      {getTodos?.data?.map(todo => <div key={todo.id}>{todo.description}</div>)}
    </>
  )
}
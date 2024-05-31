import { unstable_noStore as noStore } from 'next/cache';

import CreateTodo from '@/components/todos/create-todo';
import Todos from '@/components/todos/todos';
import { trpcServer } from '@/lib/trpc-clients/server';

export default async function Home() {
  noStore();
  const todos = await trpcServer.getTodos();

  return (
    <>      
      <CreateTodo />
      <Todos initialTodos={todos} />
    </>
  );
}

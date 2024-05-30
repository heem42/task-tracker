import CreateTodo from '@/components/todos/create-todo';
import Todos from '@/components/todos/todos';
import { trpcServer } from '@/lib/trpc-clients/server';

export default async function Home() {
  const todos = await trpcServer.getTodos();

  return (
    <>      
      <CreateTodo />
      <Todos initialTodos={todos} />
    </>
  );
}

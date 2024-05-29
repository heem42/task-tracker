import Todos from '@/components/todos/todos';
import { Button } from '@/components/ui/button';

import { trpcServer } from '@/lib/trpc-clients/server';

export default async function Home() {
  const todos = await trpcServer.getTodos();

  return (
    <>
      <Button className="float-right">Add +</Button>
      <Todos initialTodos={todos} />
    </>
  );
}

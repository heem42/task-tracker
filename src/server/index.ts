import { addDoc, collection, getDocs, getFirestore } from 'firebase/firestore';

import { FirebaseApp } from '@/firebase/config';
import { TodoSchema, TodoType } from '@/schema/todo';

import { publicProcedure, router } from './trpc';
import { TODOS_COLLECTION } from './constants';

const db = getFirestore(FirebaseApp)
 
export const appRouter = router({
  getTodos: publicProcedure
    .query(async () => {
      try {
        const querySnapshot = await getDocs(collection(db, TODOS_COLLECTION));
        return querySnapshot.docs.map(doc => {
          const data = doc.data() as Omit<TodoType, "id">;
          const todo = {
            id: doc.id,
            ...data
          }
          return TodoSchema.parse(todo);
        });
      } catch (e) {
        console.error("Error getting list of todos: ", e);
      }
    }),
  createTodo: publicProcedure
    .input(TodoSchema)
    .mutation(async (opts) => {
      try {
        const { input } = opts;
        await addDoc(collection(db, TODOS_COLLECTION), input);
      } catch (e) {
        console.error("Error adding a todo: ", e);
      }
    })
});

export type AppRouter = typeof appRouter;

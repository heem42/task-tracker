import { collection, getDocs, getFirestore } from 'firebase/firestore';

import { FirebaseApp } from '@/firebase/config';
import { TodoSchema, TodoType } from '@/schema/todo';

import { publicProcedure, router } from './trpc';
 
export const appRouter = router({
  getTodos: publicProcedure
    .query(async () => {
      const db = getFirestore(FirebaseApp)
      const querySnapshot = await getDocs(collection(db, "todo"));
      return querySnapshot.docs.map(doc => {
        const data = doc.data() as Omit<TodoType, "id">;
        const todo = {
          id: doc.id,
          ...data
        }
        return TodoSchema.parse(todo);
      });
    }),
});

export type AppRouter = typeof appRouter;

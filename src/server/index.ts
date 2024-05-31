import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore, updateDoc } from 'firebase/firestore';

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
    }),
  updateTodo: publicProcedure
    .input(TodoSchema)
    .mutation(async (opts) => {
      try {
        const { input } = opts;
        const docRef = input.id && doc(db, TODOS_COLLECTION, input.id);
        if (docRef) {
          await updateDoc(docRef, input);
        }
      } catch (e) {
        console.error('Error updating a todo', e);
      }
    }),
  deleteTodo: publicProcedure
    .input(TodoSchema.pick({ id: true }))
    .mutation(async (opts) => {
      try {
        const { input } = opts;
        const docRef = input.id && doc(db, TODOS_COLLECTION, input.id);
        if (docRef) {
          await deleteDoc(docRef);
        }
      } catch (e) {
        console.error('Error deleting a todo', e);
      }
    })
});

export type AppRouter = typeof appRouter;

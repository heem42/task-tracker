'use client';

import moment from 'moment';

import { TodoType } from '@/schema/todo'
import { useState } from 'react';
import { Checkbox } from '../ui/checkbox';
import { trpc } from '@/lib/trpc-clients/client';
import UpdateTodo from './update-todo';
import DeleteTodoButton from './delete-todo-btn';

interface Props {
  todo: TodoType
}

export default function TodoItem({ todo }: Props) {
  const [isComplete, setIsComplete] = useState(todo.isComplete);
  const updateMutation = trpc.updateTodo.useMutation();

  const onCheckedChange = (isChecked: boolean) => {
    updateMutation.mutate({ ...todo, isComplete: isChecked }, {
      onSuccess: () => {
        setIsComplete(isChecked);
      }
    });
  }

  return (
    <tr key={todo.id}>
      <td scope="row" data-label="Status">
        <Checkbox checked={isComplete} onCheckedChange={onCheckedChange} />
      </td>
      <td scope="row" data-label="Description">{todo.description}</td>
      <td data-label="Deadline">{moment(todo.date).fromNow()}</td>
      <td className="w-full">
        <DeleteTodoButton todo={todo} />
        <UpdateTodo todo={todo} />
      </td>
    </tr>
  )
}
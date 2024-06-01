'use client';

import { useState } from 'react';

import { Checkbox } from '@/components/ui/checkbox';
import { trpc } from '@/lib/trpc-clients/client';
import { TodoType } from '@/schema/todo'

import DeleteTodoButton from './delete-todo-btn';
import UpdateTodo from './update-todo';
import { getDeadlineString } from '@/lib/utils';

interface Props {
  todo: TodoType
}

export default function TodoItem({ todo }: Props) {
  const [isComplete, setIsComplete] = useState(todo.isComplete);
  const utils = trpc.useUtils();
  const updateMutation = trpc.updateTodo.useMutation();

  const onCheckedChange = (isChecked: boolean) => {
    updateMutation.mutate({ ...todo, isComplete: isChecked }, {
      onSuccess: () => {
        setIsComplete(isChecked);
        utils.getTodos.invalidate();
      }
    });
  }

  return (
    <tr key={todo.id}>
      <td scope="row" data-label="Status">
        <Checkbox checked={isComplete} onCheckedChange={onCheckedChange} />
      </td>
      <td scope="row" data-label="Description">{todo.description}</td>
      <td data-label="Deadline">{getDeadlineString(todo.date)}</td>
      <td className="w-full">
        <DeleteTodoButton todo={todo} />
        <UpdateTodo todo={todo} />
      </td>
    </tr>
  )
}
'use client'

import DeleteIcon from '@/components/svg/delete.svg';
import { trpc } from '@/lib/trpc-clients/client';
import { TodoType } from '@/schema/todo';

interface Props {
  todo: Pick<TodoType, 'id'>
}

export default function DeleteTodoButton({ todo }: Props) {
  const deleteMutation = trpc.deleteTodo.useMutation();
  const utils = trpc.useUtils();

  const onClickDelete = () => {
    deleteMutation.mutate({ id: todo.id }, {
      onSuccess: () => {
        utils.getTodos.invalidate();
      }
    });
  }

  return (
    <span role='button'>
      <DeleteIcon onClick={onClickDelete} className="w-25 h-25 mx-2 inline-block" />
    </span>
  )
}
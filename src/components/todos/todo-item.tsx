import { TodoType } from '@/schema/todo'

interface Props {
  todo: TodoType
}

export default function TodoItem({ todo }: Props) {
  return (
    <tr key={todo.id}>
      <td scope="row" data-label="Description">{todo.description}</td>
      <td data-label="Status">Completed</td>
      <td data-label="Deadline">Today</td>
    </tr>
  )
}
'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import DatePicker from '@/components/ui/date-picker';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import EditIcon from '@/components/svg/edit.svg';
import { trpc } from '@/lib/trpc-clients/client';
import { getISODate } from '@/lib/utils';

import { onUserSelectDateType } from './types';
import { TodoType } from '@/schema/todo';
import moment from 'moment';
import { LoaderIcon } from 'lucide-react';

interface Props {
  todo: TodoType
}

export default function UpdateTodo({ todo }: Props) {
  const [date, setDate] = useState<Date>(moment(todo.date).toDate());
  const [description, setDescription] = useState(todo.description);
  const [isBeingUpdated, setIsBeingUpdated] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const utils = trpc.useUtils();
  const updateMutation = trpc.updateTodo.useMutation();
  

  const onUserSelectDate: onUserSelectDateType = (selectedDate) => {
    selectedDate && setDate(selectedDate);
  }

  const onUpdateTodo = () => {
    setIsBeingUpdated(true);
    updateMutation.mutate({ id: todo.id, description, date: getISODate(date) }, {
      onSuccess: () => {
        utils.getTodos.invalidate();
        setIsBeingUpdated(false);
        setIsDialogOpen(false);
      },
    });
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger>
        <EditIcon className="w-25 h-25 inline-block" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='mb-5'>Update Todo</DialogTitle>
          <Label htmlFor="description">
            Description
          </Label>
          <Input
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder='description...'
          />
          <Label>
            Deadline
          </Label>
          <DatePicker date={date} onUserSelectDate={onUserSelectDate} />
        </DialogHeader>
        <DialogFooter>
          <Button disabled={isBeingUpdated} onClick={onUpdateTodo}>
            {isBeingUpdated ? (
              <>
                <LoaderIcon className="" />
              </>
            ) : (
              <>Update</>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
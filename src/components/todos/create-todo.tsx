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
import { trpc } from '@/lib/trpc-clients/client';
import { getISODate } from '@/lib/utils';

import { onUserSelectDateType } from './types';

export default function CreateTodo() {
  const [date, setDate] = useState<Date>(new Date());
  const [description, setDescription] = useState('');
  const utils = trpc.useUtils();
  const todoMutation = trpc.createTodo.useMutation({ onSuccess: () => utils.getTodos.invalidate() });

  const onUserSelectDate: onUserSelectDateType = (selectedDate) => {
    selectedDate && setDate(selectedDate);
  }

  const onCreateTodo = () => {
    todoMutation.mutate({ description, date: getISODate(date) });
  }

  return (
    <Dialog>
      <DialogTrigger className="bg-black text-white px-5 py-1 rounded-md fixed right-5 bottom-5 md:static md:float-right">Add +</DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>Add New Todo</DialogTitle>
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
          <Button type="submit" onClick={onCreateTodo}>Submit</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
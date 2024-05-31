'use client';

import { useState } from 'react';
import { LoaderIcon } from 'lucide-react';

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
  const [isBeingSubmitted, setIsBeingSubmitted] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const utils = trpc.useUtils();
  const todoMutation = trpc.createTodo.useMutation();

  const onUserSelectDate: onUserSelectDateType = (selectedDate) => {
    selectedDate && setDate(selectedDate);
  }

  const onCreateTodo = () => {
    setIsBeingSubmitted(true);
    todoMutation.mutate({ description, date: getISODate(date) }, {
      onSuccess: () => {
        utils.getTodos.invalidate()
        setIsBeingSubmitted(false);
        setIsDialogOpen(false);
      }
    });
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger className="bg-black text-white px-5 py-1 rounded-md fixed right-5 bottom-5 md:static md:float-right">Add +</DialogTrigger>
      <DialogContent className="fixed top-60">
        <DialogHeader>
          <DialogTitle className="mb-5">Add New Todo</DialogTitle>
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
          <Button onClick={onCreateTodo}>
            {isBeingSubmitted ? (
              <LoaderIcon />
            ) : (
              <>Submit</>
            )
            }
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
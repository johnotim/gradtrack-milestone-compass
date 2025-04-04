
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { DialogFooter } from '@/components/ui/dialog';
import { PROGRAMS } from './ProgramsTable';

// Form validation schema
const formSchema = z.object({
  name: z.string().min(2, { message: 'Program name must be at least 2 characters' }),
  code: z.string().min(2, { message: 'Program code must be at least 2 characters' }),
  faculty: z.string().min(2, { message: 'Faculty name must be at least 2 characters' }),
  duration: z.string().min(1, { message: 'Program duration is required' }),
});

interface AddProgramFormProps {
  onSuccess: () => void;
}

export const AddProgramForm: React.FC<AddProgramFormProps> = ({ onSuccess }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      code: '',
      faculty: '',
      duration: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // In a real app, this would be an API call
    console.log('Adding new program:', values);
    
    // Simulate adding a program
    const newProgram = {
      id: Math.max(...PROGRAMS.map(p => p.id)) + 1,
      ...values
    };
    
    PROGRAMS.push(newProgram);
    
    // Notify success
    setTimeout(() => {
      onSuccess();
      form.reset();
    }, 500);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Program Name</FormLabel>
              <FormControl>
                <Input placeholder="Bachelor of Computer Science" {...field} />
              </FormControl>
              <FormDescription>
                The full name of the academic program
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Program Code</FormLabel>
              <FormControl>
                <Input placeholder="BCS" {...field} />
              </FormControl>
              <FormDescription>
                A short code for the program
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="faculty"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Faculty</FormLabel>
              <FormControl>
                <Input placeholder="Faculty of Science" {...field} />
              </FormControl>
              <FormDescription>
                The faculty offering this program
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="duration"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Duration</FormLabel>
              <FormControl>
                <Input placeholder="4 years" {...field} />
              </FormControl>
              <FormDescription>
                Expected time to complete the program
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <DialogFooter>
          <Button type="submit" className="mt-4">Add Program</Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

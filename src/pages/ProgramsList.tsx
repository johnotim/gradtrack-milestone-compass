
import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogTrigger 
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { ProgramsTable } from '@/components/programs/ProgramsTable';
import { AddProgramForm } from '@/components/programs/AddProgramForm';

const ProgramsList = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Programs Management</h1>
            <p className="text-gray-500">Manage academic programs offered by the university</p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Program
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Program</DialogTitle>
                <DialogDescription>
                  Enter program details to add to the system
                </DialogDescription>
              </DialogHeader>
              <AddProgramForm 
                onSuccess={() => {
                  setDialogOpen(false);
                  toast({
                    title: "Program added",
                    description: "The new program has been successfully added.",
                  });
                }} 
              />
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Programs List</CardTitle>
          </CardHeader>
          <CardContent>
            <ProgramsTable />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ProgramsList;

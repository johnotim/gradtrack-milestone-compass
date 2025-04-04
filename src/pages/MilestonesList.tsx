
import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { MilestoneTable } from '@/components/milestones/MilestoneTable';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { AddMilestoneForm } from '@/components/milestones/AddMilestoneForm';

const MilestonesList = () => {
  const { toast } = useToast();

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Milestones</h1>
            <p className="text-muted-foreground">
              Manage and track academic progress milestones
            </p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Milestone
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Milestone</DialogTitle>
                <DialogDescription>
                  Create a new milestone to track academic progress.
                </DialogDescription>
              </DialogHeader>
              <AddMilestoneForm onSuccess={() => {
                toast({
                  title: "Milestone created",
                  description: "Your milestone has been created successfully.",
                });
              }} />
            </DialogContent>
          </Dialog>
        </div>
        <MilestoneTable />
      </div>
    </DashboardLayout>
  );
};

export default MilestonesList;

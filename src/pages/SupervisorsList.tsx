
import { useState } from 'react';
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { SupervisorsTable } from "@/components/supervisors/SupervisorsTable";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import { AddSupervisorForm } from '@/components/supervisors/AddSupervisorForm';

export default function SupervisorsList() {
  const [isAddingNew, setIsAddingNew] = useState(false);

  // Mock function to handle adding a new supervisor
  const handleAddSupervisor = (values: any) => {
    console.log("Adding new supervisor:", values);
    // In a real application, this would add the supervisor to the database
    setIsAddingNew(false);
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Supervisors</h1>
            <p className="text-muted-foreground">
              Manage university supervisors and their assignments
            </p>
          </div>
          <Button onClick={() => setIsAddingNew(true)} className="gap-1">
            <PlusCircle size={16} />
            <span>Add Supervisor</span>
          </Button>
        </div>
        
        <SupervisorsTable />

        <Dialog open={isAddingNew} onOpenChange={setIsAddingNew}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Supervisor</DialogTitle>
              <DialogDescription>
                Fill in the details to add a new supervisor to the system.
              </DialogDescription>
            </DialogHeader>
            <AddSupervisorForm 
              onSubmit={handleAddSupervisor}
              onCancel={() => setIsAddingNew(false)}
            />
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}

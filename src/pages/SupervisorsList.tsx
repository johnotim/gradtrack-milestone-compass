
import { useState } from 'react';
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { SupervisorsTable } from "@/components/supervisors/SupervisorsTable";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export default function SupervisorsList() {
  const [isAddingNew, setIsAddingNew] = useState(false);

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
      </div>
    </DashboardLayout>
  );
}

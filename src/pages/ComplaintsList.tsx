
import { useState } from 'react';
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { ComplaintsTable } from "@/components/complaints/ComplaintsTable";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export default function ComplaintsList() {
  const [isAddingNew, setIsAddingNew] = useState(false);

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Complaints</h1>
            <p className="text-muted-foreground">
              View and manage student complaints
            </p>
          </div>
          <Button onClick={() => setIsAddingNew(true)} className="gap-1">
            <PlusCircle size={16} />
            <span>Add Complaint</span>
          </Button>
        </div>
        
        <ComplaintsTable />
      </div>
    </DashboardLayout>
  );
}


import { useState } from 'react';
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { ResourcesTable } from "@/components/resources/ResourcesTable";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export default function ResourcesList() {
  const [isAddingNew, setIsAddingNew] = useState(false);

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Resources</h1>
            <p className="text-muted-foreground">
              Access recommended books, journals and materials for students
            </p>
          </div>
          <Button onClick={() => setIsAddingNew(true)} className="gap-1">
            <PlusCircle size={16} />
            <span>Add Resource</span>
          </Button>
        </div>
        
        <ResourcesTable />
      </div>
    </DashboardLayout>
  );
}

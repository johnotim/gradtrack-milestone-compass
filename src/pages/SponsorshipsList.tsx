
import { useState } from 'react';
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { SponsorshipsTable } from "@/components/sponsorships/SponsorshipsTable";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export default function SponsorshipsList() {
  const [isAddingNew, setIsAddingNew] = useState(false);

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Sponsorships</h1>
            <p className="text-muted-foreground">
              Manage student sponsorships and funding opportunities
            </p>
          </div>
          <Button onClick={() => setIsAddingNew(true)} className="gap-1">
            <PlusCircle size={16} />
            <span>Add Sponsorship</span>
          </Button>
        </div>
        
        <SponsorshipsTable />
      </div>
    </DashboardLayout>
  );
}

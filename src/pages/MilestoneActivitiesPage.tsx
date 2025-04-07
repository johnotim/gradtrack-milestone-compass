
import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useLocation, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { MilestoneActivitiesTable } from '@/components/milestones/MilestoneActivitiesTable';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { AddMilestoneActivityForm } from '@/components/milestones/AddMilestoneActivityForm';

const MilestoneActivitiesPage = () => {
  const { milestoneId } = useParams<{ milestoneId: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Get milestone title from location state or use a default
  const milestoneTitle = location.state?.milestoneTitle || 'Milestone';

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <div className="flex items-center space-x-2 mb-4">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => navigate('/milestones')}
            className="flex items-center gap-1"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Milestones
          </Button>
        </div>
        
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{milestoneTitle} Activities</h1>
            <p className="text-muted-foreground">
              Manage activities for this milestone
            </p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Activity
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Activity</DialogTitle>
                <DialogDescription>
                  Create a new activity for {milestoneTitle}.
                </DialogDescription>
              </DialogHeader>
              <AddMilestoneActivityForm 
                milestoneId={Number(milestoneId)} 
                onSuccess={() => {
                  toast({
                    title: "Activity created",
                    description: "The activity has been created successfully.",
                  });
                }}
              />
            </DialogContent>
          </Dialog>
        </div>
        
        <MilestoneActivitiesTable milestoneId={Number(milestoneId)} />
      </div>
    </DashboardLayout>
  );
};

export default MilestoneActivitiesPage;

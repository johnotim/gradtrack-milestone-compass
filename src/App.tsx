
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import StudentsList from "./pages/StudentsList";
import MilestonesList from "./pages/MilestonesList";
import MilestoneActivitiesPage from "./pages/MilestoneActivitiesPage";
import ProgramsList from "./pages/ProgramsList";
import SupervisorsList from "./pages/SupervisorsList";
import SupervisorAllocatePage from "./pages/SupervisorAllocatePage";
import SupervisorPerformancePage from "./pages/SupervisorPerformancePage";
import ComplaintsList from "./pages/ComplaintsList";
import ResourcesList from "./pages/ResourcesList";
import SponsorshipsList from "./pages/SponsorshipsList";
import CalendarPage from "./pages/CalendarPage";
import NotFound from "./pages/NotFound";

const App = () => {
  // Create a new QueryClient instance within the component
  const queryClient = new QueryClient();
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/students" element={<StudentsList />} />
            <Route path="/milestones" element={<MilestonesList />} />
            <Route path="/milestones/:milestoneId/activities" element={<MilestoneActivitiesPage />} />
            <Route path="/programs" element={<ProgramsList />} />
            
            {/* Supervisor routes */}
            <Route path="/supervisors" element={<SupervisorsList />} />
            <Route path="/supervisors/allocate" element={<SupervisorAllocatePage />} />
            <Route path="/supervisors/performance" element={<SupervisorPerformancePage />} />
            <Route path="/supervisors/schedule" element={<NotFound />} />
            
            {/* Complaint routes */}
            <Route path="/complaints" element={<ComplaintsList />} />
            <Route path="/complaints/new" element={<NotFound />} />
            <Route path="/complaints/review" element={<NotFound />} />
            <Route path="/complaints/resolved" element={<NotFound />} />
            
            {/* Resources route */}
            <Route path="/resources" element={<ResourcesList />} />
            
            {/* Sponsorship routes */}
            <Route path="/sponsorships" element={<SponsorshipsList />} />
            <Route path="/sponsorships/grants" element={<NotFound />} />
            <Route path="/sponsorships/partners" element={<NotFound />} />
            <Route path="/sponsorships/applications" element={<NotFound />} />
            
            {/* Calendar route */}
            <Route path="/calendar" element={<CalendarPage />} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;


import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import StudentsList from "./pages/StudentsList";
import MilestonesList from "./pages/MilestonesList";
import ProgramsList from "./pages/ProgramsList";
import SupervisorsList from "./pages/SupervisorsList";
import ComplaintsList from "./pages/ComplaintsList";
import ResourcesList from "./pages/ResourcesList";
import SponsorshipsList from "./pages/SponsorshipsList";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/students" element={<StudentsList />} />
          <Route path="/milestones" element={<MilestonesList />} />
          <Route path="/programs" element={<ProgramsList />} />
          
          {/* Supervisor routes */}
          <Route path="/supervisors" element={<SupervisorsList />} />
          <Route path="/supervisors/allocate" element={<NotFound />} />
          <Route path="/supervisors/performance" element={<NotFound />} />
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
          
          {/* Other existing routes */}
          <Route path="/calendar" element={<NotFound />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

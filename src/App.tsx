import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Results from "./pages/Results";
import StartupDetail from "./pages/StartupDetail";
import InvestorTypes from "./pages/InvestorTypes";
import TRLPhase from "./pages/TRLPhase";
import WhatAreSubsidies from "./pages/WhatAreSubsidies";
import SubsidieFinder from "./pages/SubsidieFinder";
import Contact from "./pages/Contact";
import HowItWorks from "./pages/HowItWorks";
import AdviceReport from "./pages/AdviceReport";
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
          <Route path="/results" element={<Results />} />
          <Route path="/startup/:id" element={<StartupDetail />} />
          <Route path="/soorten-investeerders" element={<InvestorTypes />} />
          <Route path="/mijn-trl-fase" element={<TRLPhase />} />
          <Route path="/wat-zijn-subsidies" element={<WhatAreSubsidies />} />
          <Route path="/subsidie-finder" element={<SubsidieFinder />} />
          <Route path="/hoe-werkt-het" element={<HowItWorks />} />
          <Route path="/advies-rapport" element={<AdviceReport />} />
          <Route path="/contact" element={<Contact />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

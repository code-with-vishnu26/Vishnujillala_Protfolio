import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import OceanSurface from "./pages/OceanSurface";
import BelowSurface from "./pages/BelowSurface";
import MidOcean from "./pages/MidOcean";
import OceanFloor from "./pages/OceanFloor";
import TwilightZone from "./pages/TwilightZone";
import MidnightZone from "./pages/MidnightZone";
import Abyss from "./pages/Abyss";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange={false}
    >
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<OceanSurface />} />
              <Route path="/below-surface" element={<BelowSurface />} />
              <Route path="/mid-ocean" element={<MidOcean />} />
              <Route path="/ocean-floor" element={<OceanFloor />} />
              <Route path="/twilight-zone" element={<TwilightZone />} />
              <Route path="/midnight-zone" element={<MidnightZone />} />
              <Route path="/abyss" element={<Abyss />} />
              <Route path="/portfolio" element={<Index />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;

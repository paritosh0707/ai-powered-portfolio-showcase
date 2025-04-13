
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { ErrorBoundary } from "react-error-boundary";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import BlogArticle from "./pages/BlogArticle";

const queryClient = new QueryClient();

// Fallback component for ErrorBoundary
const ErrorFallbackComponent = ({ error }: { error: Error }) => (
  <div className="flex min-h-screen flex-col items-center justify-center p-4 text-center">
    <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
    <p className="mb-4">We're sorry, but there was an error loading this page.</p>
    <pre className="bg-secondary/20 p-4 rounded-md overflow-auto max-w-full text-sm mb-4">
      {error.message}
    </pre>
    <button 
      onClick={() => window.location.reload()}
      className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
    >
      Try again
    </button>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <ErrorBoundary FallbackComponent={ErrorFallbackComponent}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/blog/:slug" element={<BlogArticle />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </ErrorBoundary>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;

// src/App.tsx
import { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

import { useTranslation } from "react-i18next";

const queryClient = new QueryClient();

/* ---------- optional floating language switcher ---------- */
const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const langs = ["en", "ka", "ru"];

  return (
    <div className="fixed top-4 right-4 z-[9999] flex gap-2">
      {langs.map((lng) => (
        <button
          key={lng}
          onClick={() => i18n.changeLanguage(lng)}
          className={`px-2 py-1 text-xs rounded-md border
            ${
              i18n.resolvedLanguage === lng
                ? "bg-amber-500 text-white border-amber-500"
                : "bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700"
            }`}
        >
          {lng.toUpperCase()}
        </button>
      ))}
    </div>
  );
};
/* -------------------------------------------------------- */

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />

      {/* Suspense lets react‑i18next wait for JSON files the first time */}
      <Suspense fallback={null}>
        {/* optional global language switch */}
        <LanguageSwitcher />

        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH‑ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </Suspense>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

"use client";

import React from 'react';
import { LanguageSelector } from '@/components/language-selector';
import { useLanguage } from '@/hooks/use-language';
import { Truck } from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
        <div className="container flex h-16 max-w-screen-2xl items-center justify-between px-4 md:px-8">
          <div className="flex items-center space-x-3">
            <Truck className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-primary tracking-tight">
              {t('dashboardTitle')}
            </h1>
          </div>
          <LanguageSelector />
        </div>
      </header>
      <main className="flex-1 container max-w-screen-2xl mx-auto p-4 md:p-8">
        {children}
      </main>
      <footer className="py-6 md:px-8 md:py-0 border-t border-border/40 bg-background/95">
        <div className="container flex flex-col items-center justify-center gap-4 md:h-16 md:flex-row">
          <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
            © {new Date().getFullYear()} LinguaTruck. Professional Aftersales Analytics.
          </p>
        </div>
      </footer>
    </div>
  );
}

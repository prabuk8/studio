"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { DashboardLayout } from '@/components/dashboard-layout';
import { KpiCard } from '@/components/kpi-card';
import { RegionalFailureChart } from '@/components/regional-failure-chart';
import { DashboardFilters } from '@/components/dashboard-filters';
import { useLanguage } from '@/hooks/use-language';
import type { TruckPart, DateRange, TranslatedString } from '@/types';
import { sampleTruckParts, partCategories as defaultPartCategories, regions as defaultRegions } from '@/lib/sample-data';
import { FileText, Clock, DollarSign, LayoutGrid, BarChartHorizontalBig } from 'lucide-react';
import { parseISO, isWithinInterval } from 'date-fns';

export function DashboardPageClient() {
  const { t, language } = useLanguage();
  const [isLoading, setIsLoading] = useState(true);

  // Filter states
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedDateRange, setSelectedDateRange] = useState<DateRange>({ from: undefined, to: undefined });
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // Simulate 1 second loading time
    return () => clearTimeout(timer);
  }, []);


  const filteredData = useMemo(() => {
    return sampleTruckParts.filter(part => {
      const categoryMatch = !selectedCategory || part.category.en === selectedCategory; // Filter by English key for stability
      const regionMatch = !selectedRegion || part.region.en === selectedRegion; // Filter by English key for stability
      
      let dateMatch = true;
      if (selectedDateRange.from && selectedDateRange.to) {
        const failureDate = parseISO(part.failureDate);
        dateMatch = isWithinInterval(failureDate, { start: selectedDateRange.from, end: selectedDateRange.to });
      } else if (selectedDateRange.from) {
        const failureDate = parseISO(part.failureDate);
        dateMatch = failureDate >= selectedDateRange.from;
      }

      return categoryMatch && regionMatch && dateMatch;
    });
  }, [selectedCategory, selectedDateRange, selectedRegion, sampleTruckParts]);

  const kpis = useMemo(() => {
    if (filteredData.length === 0 && !isLoading) {
      return {
        totalClaims: 0,
        averageServiceTime: 0,
        totalServiceCost: 0,
      };
    }
    const totalClaims = filteredData.reduce((sum, part) => sum + part.warrantyClaims, 0);
    const totalServiceTime = filteredData.reduce((sum, part) => sum + part.serviceTime, 0);
    const averageServiceTime = filteredData.length > 0 ? (totalServiceTime / filteredData.length) : 0;
    const totalServiceCost = filteredData.reduce((sum, part) => sum + part.serviceCost, 0);
    return {
      totalClaims,
      averageServiceTime: parseFloat(averageServiceTime.toFixed(1)),
      totalServiceCost,
    };
  }, [filteredData, isLoading]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Filters Section */}
        <DashboardFilters
          partCategories={defaultPartCategories}
          regions={defaultRegions}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          selectedDateRange={selectedDateRange}
          onDateRangeChange={setSelectedDateRange}
          selectedRegion={selectedRegion}
          onRegionChange={setSelectedRegion}
        />

        {/* KPIs Section */}
        <section>
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-primary">
            <LayoutGrid className="h-5 w-5"/>
            {t('kpis')}
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            <KpiCard title={t('totalClaims')} value={kpis.totalClaims} Icon={FileText} isLoading={isLoading} />
            <KpiCard title={t('averageServiceTime')} value={kpis.averageServiceTime} unit={t('hours')} Icon={Clock} isLoading={isLoading} />
            <KpiCard title={t('totalServiceCost')} value={`$${kpis.totalServiceCost.toLocaleString()}`} Icon={DollarSign} isLoading={isLoading} />
          </div>
        </section>

        {/* Charts Section */}
        <section>
           <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-primary">
            <BarChartHorizontalBig className="h-5 w-5"/>
            {t('regionalFailures')}
          </h2>
          <RegionalFailureChart data={filteredData} isLoading={isLoading} />
        </section>
      </div>
    </DashboardLayout>
  );
}

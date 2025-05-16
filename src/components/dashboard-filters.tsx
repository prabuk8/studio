"use client";

import type React from 'react';
import { useLanguage } from '@/hooks/use-language';
import type { Language, TruckPart, DateRange, TranslatedString } from '@/types';
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, MapPin, Filter, Wrench } from "lucide-react";
import { format } from "date-fns";
import { cn } from '@/lib/utils';
import { partCategories as defaultPartCategories, regions as defaultRegions } from '@/lib/sample-data';

interface DashboardFiltersProps {
  partCategories: TranslatedString[];
  regions: TranslatedString[];
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
  selectedDateRange: DateRange;
  onDateRangeChange: (dateRange: DateRange) => void;
  selectedRegion: string | null;
  onRegionChange: (region: string | null) => void;
}

export function DashboardFilters({
  partCategories,
  regions,
  selectedCategory,
  onCategoryChange,
  selectedDateRange,
  onDateRangeChange,
  selectedRegion,
  onRegionChange,
}: DashboardFiltersProps) {
  const { language, t } = useLanguage();

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg font-semibold text-primary">
          <Filter className="h-5 w-5" />
          {t('filters')}
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Part Category Filter */}
        <div className="space-y-1.5">
          <label htmlFor="part-category-filter" className="text-sm font-medium text-muted-foreground flex items-center gap-1.5">
            <Wrench className="h-4 w-4"/>
            {t('partCategory')}
          </label>
          <Select
            value={selectedCategory || "all"}
            onValueChange={(value) => onCategoryChange(value === "all" ? null : value)}
          >
            <SelectTrigger id="part-category-filter" className="w-full bg-card border-border shadow-sm">
              <SelectValue placeholder={t('allCategories')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('allCategories')}</SelectItem>
              {partCategories.map((category, index) => (
                <SelectItem key={index} value={category.en}> {/* Use 'en' as a stable key */}
                  {category[language]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Date Range Filter */}
        <div className="space-y-1.5">
          <label htmlFor="date-range-filter" className="text-sm font-medium text-muted-foreground flex items-center gap-1.5">
            <CalendarDays className="h-4 w-4"/>
            {t('dateRange')}
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date-range-filter"
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal bg-card border-border shadow-sm",
                  !selectedDateRange.from && "text-muted-foreground"
                )}
              >
                {selectedDateRange.from ? (
                  selectedDateRange.to ? (
                    <>
                      {format(selectedDateRange.from, "LLL dd, y")} -{" "}
                      {format(selectedDateRange.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(selectedDateRange.from, "LLL dd, y")
                  )
                ) : (
                  <span>{t('selectDateRange')}</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={selectedDateRange.from}
                selected={{ from: selectedDateRange.from, to: selectedDateRange.to }}
                onSelect={(range) => onDateRangeChange({ from: range?.from, to: range?.to })}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Region Filter */}
        <div className="space-y-1.5">
          <label htmlFor="region-filter" className="text-sm font-medium text-muted-foreground flex items-center gap-1.5">
            <MapPin className="h-4 w-4"/>
            {t('region')}
          </label>
          <Select
            value={selectedRegion || "all"}
            onValueChange={(value) => onRegionChange(value === "all" ? null : value)}
          >
            <SelectTrigger id="region-filter" className="w-full bg-card border-border shadow-sm">
              <SelectValue placeholder={t('allRegions')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('allRegions')}</SelectItem>
              {regions.map((region, index) => (
                <SelectItem key={index} value={region.en}> {/* Use 'en' as a stable key */}
                  {region[language]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}

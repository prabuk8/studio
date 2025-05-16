
"use client";

import React, { useState } from 'react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { ChartContainer, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { TruckPart, Language } from "@/types";
import { useLanguage } from "@/hooks/use-language";
import { AlertTriangle } from 'lucide-react';
import { RegionDetailsModal } from './region-details-modal'; // Import the new modal

interface RegionalFailureChartProps {
  data: TruckPart[];
  isLoading?: boolean;
}

// Base chartConfig, label will be dynamically set by dynamicChartConfig
const chartConfigBase = {
  failures: {
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;


export function RegionalFailureChart({ data, isLoading = false }: RegionalFailureChartProps) {
  const { language, t } = useLanguage();

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRegionName, setSelectedRegionName] = useState<string | null>(null);
  const [partsForModal, setPartsForModal] = useState<TruckPart[]>([]);

  const processedData = data.reduce((acc, part) => {
    const regionName = part.region[language];
    if (!acc[regionName]) {
      acc[regionName] = { region: regionName, failures: 0 };
    }
    acc[regionName].failures += part.warrantyClaims; // Using warrantyClaims as a proxy for failures
    return acc;
  }, {} as Record<string, { region: string; failures: number }>);

  const chartData = Object.values(processedData);

  const handleBarClick = (dataItem: { region: string; failures: number }) => {
    if (dataItem && dataItem.region) {
      const clickedRegionTranslatedName = dataItem.region;
      setSelectedRegionName(clickedRegionTranslatedName);

      const partsInClickedRegion = data.filter(part => part.region[language] === clickedRegionTranslatedName);
      setPartsForModal(partsInClickedRegion);
      setModalOpen(true);
    }
  };
  
  const dynamicChartConfig: ChartConfig = {
    failures: {
      label: t('totalClaims'), // Using totalClaims as label for failures in tooltip and legend
      color: "hsl(var(--primary))",
    },
  };


  if (isLoading) {
    return (
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>{t('regionalFailures')}</CardTitle>
          <CardDescription>{t('loadingData')}</CardDescription>
        </CardHeader>
        <CardContent className="h-[350px] flex items-center justify-center">
          <div className="w-full h-full bg-muted animate-pulse rounded-md"></div>
        </CardContent>
      </Card>
    );
  }
  
  if (chartData.length === 0 && !isLoading) {
    return (
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>{t('regionalFailures')}</CardTitle>
          <CardDescription>{t('failuresByRegion')}</CardDescription>
        </CardHeader>
        <CardContent className="h-[350px] flex flex-col items-center justify-center text-muted-foreground">
          <AlertTriangle className="w-12 h-12 mb-4 text-accent" />
          <p>{t('noData')}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>{t('regionalFailures')}</CardTitle>
          <CardDescription>{t('failuresByRegion')}</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={dynamicChartConfig} className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                data={chartData} 
                margin={{ top: 5, right: 20, left: -20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="region"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => value.slice(0, 15) + (value.length > 15 ? "..." : "")}
                />
                <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                <Tooltip
                  cursor={{ fill: "hsl(var(--accent) / 0.3)" }}
                  content={<ChartTooltipContent />}
                />
                <Bar 
                  dataKey="failures" 
                  fill="var(--color-failures)" 
                  radius={4} 
                  onClick={handleBarClick}
                  cursor="pointer" 
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
      <RegionDetailsModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        regionName={selectedRegionName}
        parts={partsForModal}
        language={language}
        t={t}
      />
    </>
  );
}

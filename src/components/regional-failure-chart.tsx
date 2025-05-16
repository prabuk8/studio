"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { ChartContainer, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { TruckPart, Language } from "@/types";
import { useLanguage } from "@/hooks/use-language";
import { AlertTriangle } from 'lucide-react';

interface RegionalFailureChartProps {
  data: TruckPart[];
  isLoading?: boolean;
}

const chartConfig = {
  failures: {
    label: "Failures", // This will be dynamically translated
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

export function RegionalFailureChart({ data, isLoading = false }: RegionalFailureChartProps) {
  const { language, t } = useLanguage();

  const processedData = data.reduce((acc, part) => {
    const regionName = part.region[language];
    if (!acc[regionName]) {
      acc[regionName] = { region: regionName, failures: 0 };
    }
    acc[regionName].failures += part.warrantyClaims; // Using warrantyClaims as a proxy for failures
    return acc;
  }, {} as Record<string, { region: string; failures: number }>);

  const chartData = Object.values(processedData);

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
  
  const dynamicChartConfig: ChartConfig = {
    failures: {
      label: t('totalClaims'), // Using totalClaims as label for failures in tooltip
      color: "hsl(var(--primary))",
    },
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>{t('regionalFailures')}</CardTitle>
        <CardDescription>{t('failuresByRegion')}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={dynamicChartConfig} className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
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
              <Bar dataKey="failures" fill="var(--color-failures)" radius={4} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

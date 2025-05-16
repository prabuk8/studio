
"use client";

import type React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { TruckPart, Language } from '@/types';
import type { TranslationKey } from '@/lib/translations';

interface RegionDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  regionName: string | null; // Translated region name
  parts: TruckPart[];
  language: Language;
  t: (key: TranslationKey, params?: Record<string, string | number>) => string;
}

export function RegionDetailsModal({
  isOpen,
  onClose,
  regionName,
  parts,
  language,
  t,
}: RegionDetailsModalProps) {
  if (!isOpen || !regionName) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>
            {t('regionDetailsModalTitle', { regionName })}
          </DialogTitle>
          <DialogDescription>
            {t('regionDetailsModalDescription', { count: parts.length, regionName })}
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[400px] pr-4 rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('partNumberColumn')}</TableHead>
                <TableHead>{t('descriptionColumn')}</TableHead>
                <TableHead>{t('failureDateColumn')}</TableHead>
                <TableHead className="text-right">{t('serviceCostColumn')}</TableHead>
                <TableHead className="text-right">{t('warrantyClaimsColumn')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {parts.length > 0 ? (
                parts.map((part) => (
                  <TableRow key={part.id}>
                    <TableCell className="font-medium">{part.partNumber}</TableCell>
                    <TableCell>{part.description[language]}</TableCell>
                    <TableCell>{new Date(part.failureDate).toLocaleDateString(language === 'jp' ? 'ja-JP' : language)}</TableCell>
                    <TableCell className="text-right">${part.serviceCost.toLocaleString()}</TableCell>
                    <TableCell className="text-right">{part.warrantyClaims}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center h-24">
                    {t('noData')}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </ScrollArea>
        <DialogFooter>
          <Button onClick={onClose} variant="outline">
            {t('closeButton')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

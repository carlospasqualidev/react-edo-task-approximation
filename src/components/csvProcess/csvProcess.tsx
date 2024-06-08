/* eslint-disable no-continue */
import CSVReader from 'react-csv-reader';
import { cn } from '@/lib/utils';

export interface IProcessedData {
  task: string;
  estimate: number;
  actual: string;
  adjustedPoints: number;
}

interface ICSVProcess {
  onFileLoaded: (data: {
    processedData: IProcessedData[];
    client: string;
  }) => void;
  className?: string;
}

function applyFibonacci(value: number) {
  if (value > 0 && value <= 1) return 1;
  if (value > 1 && value <= 2) return 2;
  if (value > 2 && value <= 3) return 3;
  if (value > 3 && value <= 5) return 5;
  if (value > 5 && value <= 8) return 8;
  if (value > 8 && value <= 13) return 13;
  if (value > 13 && value <= 21) return 21;
  if (value > 21 && value <= 34) return 34;
  if (value > 34 && value <= 55) return 55;
  if (value > 55 && value <= 89) return 89;
  if (value > 89 && value <= 144) return 144;
  return 233;
}

function transform(csv: string[][]) {
  const processedData: IProcessedData[] = [];

  for (let index = 1; index < csv.length; index++) {
    if (!csv[0] || csv[index][0] === '') continue;

    const estimate = csv[index][9] ? Number(csv[index][9]) : 0;
    const actual = csv[index][10]
      ? Number(csv[index][10].replace(',', '.')) / 3
      : 0;

    const adjustedPoints = estimate > 0 ? estimate * (actual / estimate) : 0;

    if (actual <= 0) continue;

    processedData.push({
      task: csv[index][0],
      estimate,
      actual: actual.toFixed(2),
      adjustedPoints: applyFibonacci(adjustedPoints),
    });
  }

  processedData.sort((a, b) => b.adjustedPoints - a.adjustedPoints);

  return { processedData, client: csv[1][1] };
}

export function CSVProcess({ onFileLoaded, className }: ICSVProcess) {
  return (
    <CSVReader
      onFileLoaded={(data) => onFileLoaded(transform(data))}
      cssInputClass={cn(`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-muted-foreground
      placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer transition-all duration-300 ease-in-out hover:border-primary hover:bg-foreground/10  ${className}`)}
    />
  );
}

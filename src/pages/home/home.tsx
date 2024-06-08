import { useState } from 'react';

import { CSVProcess } from '@/components/csvProcess';
import { IProcessedData } from '@/components/csvProcess/csvProcess';
import { CSVTable } from './components';

export type Payment = {
  id: string;
  amount: number;
  status: 'pending' | 'processing' | 'success' | 'failed';
  email: string;
};

export function Home() {
  const [CSV, setCSV] = useState<IProcessedData[]>();
  const [clientName, setClientName] = useState<string>('');

  return CSV ? (
    <CSVTable initialValue={CSV} client={clientName} />
  ) : (
    <div className="flex h-screen items-center justify-center">
      <CSVProcess
        onFileLoaded={({ processedData, client }) => {
          setClientName(client);
          setCSV(processedData);
        }}
        className="flex cursor-pointer rounded-lg border-4 border-dashed p-44 text-3xl font-bold "
      />
    </div>
  );
}

/* eslint-disable react/no-unstable-nested-components */
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../../../components/ui/button';

import { Input } from '../../../components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { CSVProcess, IProcessedData } from '@/components/csvProcess/csvProcess';
import { InfoCard } from './card';
import { TogleTheme } from '@/components/togleTheme';

interface ICSVTable {
  initialValue: IProcessedData[];
  client: string;
}

function BRLFomatter(value: string) {
  return (Number(value.replace(/[^0-9]*/g, '')) / 100)
    .toLocaleString('pt-br', {
      style: 'currency',
      currency: 'BRL',
    })
    .substring(0, 30);
}

export function CSVTable({ initialValue, client }: ICSVTable) {
  const [CSV, setCSV] = useState<IProcessedData[]>(initialValue);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  // #region TABLE

  const columns: ColumnDef<IProcessedData>[] = [
    {
      accessorKey: 'task',
      header: 'Task',
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue('task')}</div>
      ),
    },
    {
      accessorKey: 'estimate',
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Estimado
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue('estimate')}</div>
      ),
    },
    {
      accessorKey: 'actual',
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Decorrido
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue('actual')}</div>
      ),
    },
    {
      accessorKey: 'adjustedPoints',
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Ajustado
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue('adjustedPoints')}</div>
      ),
    },
  ];

  const table = useReactTable({
    data: CSV,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),

    state: {
      sorting,
      columnFilters,
    },
  });
  // #endregion

  // #region CARDS
  const totalEstimate = CSV.reduce(
    (acc, curr) => acc + Number(curr.estimate),
    0,
  );
  const totalActual = Math.round(
    CSV.reduce((acc, curr) => acc + Number(curr.actual), 0),
  );
  const totalAdjusted = Math.round(
    CSV.reduce((acc, curr) => acc + Number(curr.adjustedPoints), 0),
  );

  const totalReceived = BRLFomatter(String(totalEstimate * 3 * 150 * 100));

  const totalError = Math.round(totalAdjusted - totalEstimate);

  const totalErrorPercentage = Math.round((totalError / totalEstimate) * 100);

  const totalErrorValue = BRLFomatter(String(totalError * 3 * 150 * 100));

  // #endregion

  return (
    <div className="flex h-screen w-full flex-col p-8">
      <div className="flex justify-between">
        <h1 className="mb-8 text-4xl font-semibold leading-none tracking-tight">
          Estimativas de Tarefas - {client}
        </h1>
        <TogleTheme />
      </div>

      <div className="flex flex-col justify-center gap-4">
        <div className="flex gap-4">
          <InfoCard title="Total Estimado" description={totalEstimate} />

          <InfoCard title="Total Decorrido" description={totalActual} />

          <InfoCard title="Total Ajustado" description={totalAdjusted} />

          <InfoCard title="Total de Erro" description={totalError} />

          <InfoCard
            title="Total de erro (%)"
            description={`${totalErrorPercentage}%`}
          />

          <InfoCard title="Valor do erro" description={totalErrorValue} />

          <InfoCard title="Valor recebido" description={totalReceived} />
        </div>

        <div className="h-full rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="p-48 text-center text-2xl"
                  >
                    Sem Resultados.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      <div className="flex h-full justify-between">
        <div className="mt-auto flex justify-end space-x-2">
          <Input
            placeholder="Busque por tasks ..."
            value={(table.getColumn('task')?.getFilterValue() as string) ?? ''}
            onChange={(event) =>
              table.getColumn('task')?.setFilterValue(event.target.value)
            }
            className="w-96"
          />

          <CSVProcess
            onFileLoaded={({ processedData }) => setCSV(processedData)}
          />
        </div>

        <div className="flex items-end justify-end space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Próximo
          </Button>
        </div>
      </div>
    </div>
  );
}

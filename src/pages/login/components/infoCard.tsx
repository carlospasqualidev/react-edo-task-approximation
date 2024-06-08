import { twMerge } from 'tailwind-merge';
import { Images } from '@/assets';

interface IInfoCard {
  switchPosition: boolean;
}

export function InfoCard({ switchPosition }: IInfoCard) {
  return (
    <div
      className={twMerge(
        'h-full flex-col bg-card p-10 text-card-foreground',
        switchPosition ? 'rounded-e-md border-l' : 'rounded-s-md border-r',
      )}
    >
      <div className="relative z-20 flex items-center text-lg font-medium">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-2 h-6 w-6"
        >
          <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
        </svg>
        Ada Software House
      </div>
      <div className="m-auto">
        <img src={Images.mascot} alt="mascote e-duzca" />
        <blockquote className="space-y-2">
          <p className="text-lg">
            &ldquo;Esta aplicação está em fase de testes. Seu objetivo é
            utilizar Equações Diferenciais Ordinárias (EDO) para melhorar a
            assertividade na estimativa da duração de tarefas. Os resultados
            apresentados podem não refletir a versão final do produto.&rdquo;
          </p>
          <footer className="text-sm">Ada Software House</footer>
        </blockquote>
      </div>
    </div>
  );
}

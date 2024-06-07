import { toast } from 'react-toastify';

interface ICatchHandler extends Error {
  response?: {
    data?: {
      message?: string;
    };
    status?: number;
  };
}

export function catchHandler(err: ICatchHandler) {
  if (!err.response?.data) {
    toast.error('Erro de comunicação');
    return;
  }

  if (err.response?.status === 401) {
    toast.warn('Sessão expirada');
    window.location.href = '/login';
    return;
  }

  if (err.response?.data?.message) toast.error(err.response.data.message);
  else toast.error(`Erro ${err.response?.status}`);
}

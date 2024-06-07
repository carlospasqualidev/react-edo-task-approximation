import { ToastContainer, Slide } from 'react-toastify';
import { useTheme } from '@/contexts/theme/themeProvider';

const Toaster = () => {
  const { theme = 'system' } = useTheme();

  return (
    <ToastContainer
      position="bottom-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme={theme as any}
      transition={Slide}
    />
  );
};

export { Toaster };

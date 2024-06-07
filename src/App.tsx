import { ErrorBoundary } from 'react-error-boundary';
import { Toaster } from '@/components/ui/toastify';

import { ThemeProvider } from './contexts/theme/themeProvider';
import { AppRouter } from './routes';
import { errorHandler } from './utils/error';
import { ErrorFallback } from './components/errorFallback';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={(error) => {
        errorHandler({ error });
      }}
    >
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <AppRouter />
        <Toaster />
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;

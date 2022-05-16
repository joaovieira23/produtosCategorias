import React from 'react';
import { QueryClientProvider, QueryClient, QueryCache } from 'react-query';
import AppNavigator from './src/navigators/App.navigator';

export default function App() {
  const queryCache = new QueryCache();

  const queryClient = new QueryClient({
    queryCache,
    defaultOptions: {
      queries: {
        staleTime: Infinity,
        retry: 2
      }
    }
  });

  return (
    <QueryClientProvider client={queryClient}>
      <AppNavigator />
    </QueryClientProvider>

  );
}

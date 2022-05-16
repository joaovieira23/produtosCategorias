import React from 'react';

import { QueryClientProvider, QueryClient, QueryCache } from 'react-query';

const queryCache = new QueryCache();

export const queryClient = new QueryClient({
  queryCache,
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      retry: 2
    }
  }
});

const AppProvider: React.FC = ({ children }) => (
  <QueryClientProvider client={queryClient}>
  </QueryClientProvider>
);

export default AppProvider;

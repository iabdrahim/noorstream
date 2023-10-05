// Create a Providers component to wrap your application with all the components requiring 'use client', such as next-nprogress-bar or your different contexts...
"use client";

import MovieProvider from "@/context/providers";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { QueryClient, QueryClientProvider } from "react-query";

const Providers = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <MovieProvider>
        {children}
        <ProgressBar
          height="5px"
          color="#ffffff"
          options={{ showSpinner: false }}
          shallowRouting
        />
      </MovieProvider>
    </QueryClientProvider>
  );
};

export default Providers;

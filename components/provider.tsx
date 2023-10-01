// Create a Providers component to wrap your application with all the components requiring 'use client', such as next-nprogress-bar or your different contexts...
"use client";

import MovieProvider from "@/context/providers";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { useState, useEffect } from "react";

const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <MovieProvider>
            {children}
            <ProgressBar
                height="5px"
                color="#ffffff"
                options={{ showSpinner: false }}
                shallowRouting
            />
        </MovieProvider>
    );
};

export default Providers;

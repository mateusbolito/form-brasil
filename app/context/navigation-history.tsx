"use client";

import { createContext, useContext, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

type NavigationHistoryContextType = {
  goBack: () => string;
};

const NavigationHistoryContext = createContext<
  NavigationHistoryContextType | undefined
>(undefined);

export function NavigationHistoryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const historyRef = useRef<string[]>([]);

  useEffect(() => {
    const last = historyRef.current[historyRef.current.length - 1];
    if (pathname !== last) {
      historyRef.current.push(pathname);
    }
  }, [pathname]);

  const goBack = () => {
    historyRef.current.pop(); // remove atual
    return historyRef.current[historyRef.current.length - 1] || "/";
  };

  return (
    <NavigationHistoryContext.Provider value={{ goBack }}>
      {children}
    </NavigationHistoryContext.Provider>
  );
}

export const useNavigationHistory = () => {
  const context = useContext(NavigationHistoryContext);
  if (!context) {
    throw new Error(
      "useNavigationHistory precisa estar dentro do NavigationHistoryProvider"
    );
  }
  return context;
};

"use client";

import { useRouter } from "next/navigation";

export default function useRouterBack(pathname: string) {
  const router = useRouter();

  return () => {
    if (pathname === "/busca") {
      router.push("/");
    } else if (pathname === "/formulario") {
      router.push("/busca");
    } else if (pathname === "/perfil") {
      router.push("/");
    } else if (pathname === "/senha") {
      router.push("/perfil");
    } else {
      router.push("/");
    }
  };
}

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

const notifications = [
  { title: "Carregamento" },
  { title: "Inspeção" },
  { title: "Formulário" },
];

export default function OptionsPainel({ ...props }) {
  return (
    <>
      {notifications.slice(0, 3).map((notification, index) => {
        const isDisabled = index !== 0;

        return (
          <Card
            key={index}
            className={cn(
              `w-[360px] bg-[#F1F1F1] border-0 mt-4 sm:mt-0 h-[350px] sm:h-[476px]`,
              isDisabled && "opacity-50 pointer-events-none"
            )}
            {...props}
          >
            <CardHeader>
              <CardTitle className="text-center">
                <h2 className="text-[#1D4D19] font-bold text-2xl">
                  {notification.title}
                </h2>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col flex-grow items-center justify-center">
              <div className="flex items-center justify-center">
                <Image src="/lock-open.svg" width={23} height={23} alt="" />
              </div>

              <CardDescription className="text-center mt-24">
                <h2>
                  Realizar o Registro dos
                  <br /> Lotes Carregados
                </h2>
              </CardDescription>
            </CardContent>
            <CardFooter className="flex items-center justify-center mt-auto">
              <Link href="/busca">
                <Button
                  className="w-[126px] h-[39px] bg-[#1D4D19] text-white cursor-pointer"
                  disabled={isDisabled}
                >
                  ADICIONAR
                </Button>
              </Link>
            </CardFooter>
          </Card>
        );
      })}
    </>
  );
}

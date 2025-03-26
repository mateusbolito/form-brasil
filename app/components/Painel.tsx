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
import { Check } from "lucide-react";
import Image from "next/image";

export default function Painel({ ...props }) {
  return (
    <main>
      <div className="flex items-center justify-center  font-semibold mt-5">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-semibold text-[#1D4D19] ">
          O que você quer fazer ?
        </h2>
      </div>
      <Card
        className={cn("w-[266px] h-[476px] bg-[#F1F1F1] border-0 ml-12 ")}
        {...props}
      >
        <CardHeader>
          <CardTitle className="text-center">Carregamento</CardTitle>
        </CardHeader>
        <CardContent className="   items-center justify-center block">
          <div className="flex items-center justify-center">
            <Image
              src="/lock-open.svg"
              width={23}
              height={23}
              alt=""
              className=""
            ></Image>
          </div>

          <CardDescription>
            Realizar o Registro dos Lotes Carregados
          </CardDescription>
        </CardContent>
        <CardFooter>
          <Button className="w-full">
            <Check /> Mark all as read
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}

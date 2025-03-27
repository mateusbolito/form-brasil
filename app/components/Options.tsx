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

const notifications = [
  {
    title: "Carregamento",
  },
  {
    title: "inspeçao",
  },
  {
    title: "Formulario",
  },
];

export default function OptionsPainel({ ...props }) {
  return (
    <>
      {notifications.slice(0, 3).map((notification, index) => (
        <Card
          key={index}
          className={cn(
            "w-[360px]  bg-[#F1F1F1] border-0 ml-12 mt-4 sm:mt-0 h-[350px] sm:h-[476px]"
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
          <CardContent className=" flex flex-col flex-grow items-center justify-center">
            <div className="flex items-center justify-center">
              <Image
                src="/lock-open.svg"
                width={23}
                height={23}
                alt=""
                className=""
              ></Image>
            </div>

            <CardDescription className="text-center mt-24">
              <h2 className="">
                Realizar o Registro dos<br></br> Lotes Carregados
              </h2>
            </CardDescription>
          </CardContent>
          <CardFooter className="flex items-center justify-center mt-auto">
            <Button className="w-[126px] h-[39px] bg-[#1D4D19] text-white cursor-pointer">
              ADICIONAR
            </Button>
          </CardFooter>
        </Card>
      ))}
    </>
  );
}

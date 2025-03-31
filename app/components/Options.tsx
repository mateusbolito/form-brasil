"use client";

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
import {} from "@/components/ui/carousel";
import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const notifications = [
  { title: "Carregamento" },
  { title: "Inspeção" },
  { title: "Formulário" },
];

export default function OptionsPainel({ ...props }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [emblaRef, embla] = useEmblaCarousel({ loop: false, align: "center" });

  const scrollPrev = useCallback(() => {
    if (embla && embla.canScrollPrev()) {
      embla.scrollPrev();
    }
  }, [embla]);

  const scrollNext = useCallback(() => {
    if (embla && embla.canScrollNext()) {
      embla.scrollNext();
    }
  }, [embla]);

  useEffect(() => {
    if (!embla) return;

    const onSelect = () => {
      setActiveIndex(embla.selectedScrollSnap());
    };

    embla.on("select", onSelect);
    onSelect();

    return () => {
      embla.off("select", onSelect);
    };
  }, [embla]);

  return (
    <>
      <div className="relative w-full sm:hidden flex flex-col items-center">
        <button
          onClick={scrollPrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md"
        >
          <ChevronLeft className="w-6 h-6 text-[#1D4D19]" />
        </button>

        <div ref={emblaRef} className="overflow-hidden w-72">
          <div className="flex">
            {notifications.map((notification, index) => {
              const isDisabled = index !== 0;
              return (
                <div key={index} className="flex-none w-72  ">
                  <Card
                    className={cn(
                      `w-full  bg-[#F1F1F1] border-0 h-[300px] `,
                      isDisabled && "opacity-50 pointer-events-none"
                    )}
                    {...props}
                  >
                    <CardHeader>
                      <CardTitle className="text-center">
                        <h2 className="text-[#1D4D19] font-bold text-xl">
                          {notification.title}
                        </h2>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col flex-grow items-center justify-center">
                      <div className="flex items-center justify-center">
                        <Image
                          src="/lock-open.svg"
                          width={23}
                          height={23}
                          alt=""
                        />
                      </div>

                      <CardDescription className="text-center mt-16">
                        <h2>
                          Realizar o Registro dos
                          <br /> Lotes Carregados
                        </h2>
                      </CardDescription>
                    </CardContent>
                    <CardFooter className="flex items-center justify-center mt-auto">
                      <Link href="/busca">
                        <Button
                          className="w-[126px] h-[39px] bg-[#1D4D19] text-white cursor-pointer font-bold rounded-[2px]"
                          disabled={isDisabled}
                        >
                          ADICIONAR
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>

        <button
          onClick={scrollNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md"
        >
          <ChevronRight className="w-6 h-6 text-[#1D4D19]" />
        </button>

        <div className="flex mt-4 space-x-2">
          {notifications.map((_, index) => (
            <span
              key={index}
              className={`h-2 w-2 rounded-full transition-all ${
                activeIndex === index ? "bg-[#1D4D19]" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Grid para Desktop */}
      <div className="hidden sm:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {notifications.map((notification, index) => {
          const isDisabled = index !== 0;

          return (
            <Card
              key={index}
              className={cn(
                `w-[350px] bg-[#F1F1F1] border-0 h-[450px]`,
                isDisabled && "opacity-50 pointer-events-none"
              )}
              {...props}
            >
              <CardHeader>
                <CardTitle className="text-center">
                  <h2 className="text-[#1D4D19] font-bold text-xl">
                    {notification.title}
                  </h2>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col flex-grow items-center justify-center">
                <div className="flex items-center justify-center">
                  <Image src="/lock-open.svg" width={23} height={23} alt="" />
                </div>

                <CardDescription className="text-center mt-16">
                  <h2>
                    Realizar o Registro dos
                    <br /> Lotes Carregados
                  </h2>
                </CardDescription>
              </CardContent>
              <CardFooter className="flex items-center justify-center mt-auto">
                <Link href="/busca">
                  <Button
                    className="w-[126px] h-[39px] bg-[#1D4D19] text-white cursor-pointer font-bold rounded-[2px]"
                    disabled={isDisabled}
                  >
                    ADICIONAR
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </>
  );
}

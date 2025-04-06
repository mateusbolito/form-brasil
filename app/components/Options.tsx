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
  const [emblaRef, embla] = useEmblaCarousel({
    align: "center",
    containScroll: "trimSnaps",
    dragFree: true
  });

  const scrollPrev = useCallback(() => {
    if (embla) embla.scrollPrev();
  }, [embla]);

  const scrollNext = useCallback(() => {
    if (embla) embla.scrollNext();
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
    <div className="w-full max-w-7xl mx-auto px-4">
      <div className="relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10">
          <button
            onClick={scrollPrev}
            className="bg-white p-3 rounded-full shadow-md hover:bg-gray-50"
          >
            <ChevronLeft className="w-6 h-6 text-[#1D4D19]" />
          </button>
        </div>

        <div ref={emblaRef} className="overflow-hidden">
          <div className="flex gap-4 py-4">
            {notifications.map((notification, index) => {
              const isDisabled = index !== 0;
              return (
                <div key={index} className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_50%] lg:flex-[0_0_33.33%]">
                  <Card
                    className={cn(
                      "mx-auto bg-[#F1F1F1] border-0 h-[350px] max-w-[350px]",
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

        <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10">
          <button
            onClick={scrollNext}
            className="bg-white p-3 rounded-full shadow-md hover:bg-gray-50"
          >
            <ChevronRight className="w-6 h-6 text-[#1D4D19]" />
          </button>
        </div>
      </div>

      <div className="flex justify-center mt-4 space-x-2">
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
  );
}

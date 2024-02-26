"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { useQuery, useIsFetching } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";

type CountryData = {
  flags: {
    svg: string;
  };
  name: {
    official: string;
  };
  timezones: string;

  population: number;
  region: string;
  capital: string;
  subregion: string;
  languages: string;
  borders: string;
};

export default function Page({ params }: { params: { id: string } }) {
  const [current, setCurrent] = useState(params.id);

  const { isPending, error, data, isLoading } = useQuery<CountryData[]>({
    queryKey: ["countryList"],
    queryFn: () =>
      fetch(
        `https://restcountries.com/v3.1/name/${current}?fullText=true`
      ).then((res) => res.json()),
  });

  return (
    <div>
      <div className="md:mx-[5vw] my-10 mx-2">
        <Link href={"/"}>
          <button className="border-2 shadow-sm border-solid px-8 py-1 ">
          <span className="flex"> <span><ArrowLeft/></span> <span className="bolder">Back</span>  </span>
          </button>
        </Link>
      </div>
      {data ? (
        <div className=" md:grid grid-cols-2 gap-x-10 md:mx-[5vw] mx-2">
          <div>
            <Image
              alt="s"
              src={data[0].flags.svg + ""}
              width={500}
              height={1000}
            />
          </div>
          <div className="h-full grid content-center ">
            <span className="font-black">{data[0].name.official}</span> <br />
            <div className="md:flex justify-between">
              <div className="">
                <span className="font-semibold">Capital:</span>{" "}
                {data[0].capital} <br />
                <span className="font-semibold">Population:</span>{" "}
                {data[0].population.toLocaleString()} <br />
                <span className="font-semibold">Region</span>
                {data[0].region} <br />
                <span className="font-semibold">Sub Region</span>{" "}
                {data[0].subregion} <br />
                <span className="font-semibold">Capital</span> {data[0].capital}
              </div>

              <div className="mt-3 md:mt-0">
                <span className="font-semibold">Top Level Domain:</span>{" "}
                {data[0].timezones} <br />
                <span className="font-semibold">Region:</span>
                {data[0].region} <br />
                <span className="font-semibold">Languages:</span>{" "}
                {data[0].languages.length > 1
                  ? Object.values(data[0].languages).map((val) => {
                      return <span key={val}>{val + ","}</span>;
                    })
                  : Object.values(data[0].languages) + ""}{" "}
                <br />
              </div>
            </div>
            <div className="py-8 gap-11">
              <span className="font-semibold me-5">Border countries: </span>{" "}
              {data[0].borders?.length > 1 ? (
                Object.values(data[0].borders).map((val) => {
                  return (
                    <span key={val}>
                      {" "}
                      <button className="border-2 shadow-sm border-solid px-8 py-1">
                        {val}
                      </button>
                    </span>
                  );
                })
              ) : (
                <button className="border-2 shadow-sm border-solid px-8 py-1">
                  {data[0].borders}
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className=" md:grid grid-cols-2 gap-x-10 md:mx-[5vw] mx-2 animate-pulse">
          <div>
            <div className="h-80 bg-gray-200 rounded-md"></div>
          </div>
          <div className="h-full grid content-center ">
            <span className="font-black bg-gray-200 w-[160px] my-2 h-10 rounded-md"></span>{" "}
            <br />
            <div className="md:flex justify-between">
              <div className="w-full bg-gray-200">
                <span className="font-semibold  bg-slate-200  "></span> <br />
                <span className="font-semibold bg-gray-200"></span> <br />
                <span className="font-semibold bg-gray-200"></span>
                <br />
                <span className="font-semibold bg-gray-200"></span> <br />
                <span className="font-semibold bg-gray-200"></span>
              </div>
            </div>
            <div className="py-8 gap-11"></div>
          </div>
        </div>
      )}
    </div>
  );
}

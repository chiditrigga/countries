"use client";

import Link from "next/link";
import no1 from "../public/photo-6.png";
import Image from "next/image";
import { ModeToggle } from "@/components/theme";
import Load from '../public/loader.svg'

import { useQuery, useIsFetching } from "@tanstack/react-query";
import { useState } from "react";

type CountryData = {
  flags: {
    svg: string;
  };
  name: {
    official: string;
    common: string;
  };
  population: number;
  region: string;
  capital: string;
};

export default function Page() {
  const {
    isPending,
    error,
    data: countries,
    isLoading,
  } = useQuery<CountryData[]>({
    queryKey: ["country"],
    queryFn: () =>
      fetch("https://restcountries.com/v3.1/all").then((res) => res.json()),
  });
  const [filt, setFilt] = useState("");
  const [search, setSearch] = useState("");

  const filter = () => {
    if (filt === "") {
      return countries;
    } else if (filt === "Africa") {
      return countries?.filter((list) => list.region == "Africa");
    } else if (filt === "Asia") {
      return countries?.filter((list) => list.region == "Asia");
    } else if (filt === "Europe") {
      return countries?.filter((list) => list.region == "Europe");
    } else if (filt === "Americas") {
      return countries?.filter((list: any) => list.region == "Americas");
    } else if (filt === "Oceania") {
      return countries?.filter((list: any) => list.region == "Oceania");
    }
  };

  return (
    <>
      <div className="">
        <div className="md:mx-[5vw] px-3 pt-8 ">
          <div className="md:flex justify-between ">
            <div className="">
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="p-4 w-full my-1 md:my-0 border-2"
                name=""
                id=""
                placeholder="Search for a country"
              />
            </div>
            <div>
              <div>
                <select
                  onChange={(e) => setFilt(e.target.value)}
                  className="p-4 rounded-sm border-2"
                >
                  <option className="mt-5" value="">
                    Find By Region
                  </option>
                  <option value="Africa">Africa</option>
                  <option value="Asia">Asia</option>
                  <option value="Europe">Europe</option>
                  <option value="Oceania">Oceania</option>
                  <option value="Americas">America</option>
                </select>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 xl:grid-cols-4 mt-7  gap-x-2 gap-y-5 fo ">
            {countries &&
              filter()
                ?.filter((val) => {
                  if (search == "") {
                    return val;
                  } else if (
                    val.name.official
                      .toLowerCase()
                      .includes(search.toLowerCase())
                  ) {
                    return val;
                  }
                })
                .map((dat) => {
                  return (
                    <div key={dat.name.common} className="lg:max-w-[20vw] hover:shadow-2xl hover:shadow-red-900 shadow-md  rounded-lg">
                      <Link
                        href={`/${dat.name.common}`}
                        
                      >
                        <Image
                          alt="blogs"
                          width={1000}
                          height={1000}
                          src={dat.flags.svg + ""}
                          className=" xl:min-h-[23vh] lg:min-h-[20vh] lg:max-h-[20vh] md:min-h-[20vh] md:max-h-[20vh] xl:max-h-[20vh] min-w-full"
                        />
                        <div className=" p-3">
                          <div className="font-black py-4">
                            <h1>{dat.name.official}</h1>
                          </div>
                          <span className="font-semibold">Population:</span>
                          <span>{dat.population.toLocaleString()} </span> <br />
                          <span className="font-semibold">Region: </span>
                          {dat.region} <br />
                          <span className="font-semibold"> Capital:</span>
                          {dat.capital}
                        </div>
                      </Link>
                    </div>
                  );
                })}
                
          </div>
        </div>
        {isPending && <div ><Image className="mx-auto" alt="loading..." src={Load}/></div> }
      </div>
    </>
  );
}

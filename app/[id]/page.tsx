"use client"


import Image from "next/image";
import { useEffect, useState } from "react"

type CountryData = {
    flags: {
      svg: string;
    };
    name: {
      official:string
    };
    currencies: {
        name:string
    };
       
    population: number;
    region: string;
    capital: string;
    subregion:string;
    languages:string;
    borders:string
  }

export default function Page({ params }: { params: { id: string } }) {
    const [data, setData] = useState<CountryData[]>()
  const [isLoading, setLoading] = useState(true)
  const [current,setCurrent] = useState(params.id)
 
 

    useEffect(() => {
        fetch(`https://restcountries.com/v3.1/name/${current}?fullText=true`)
          .then((res) => res.json())
          .then((data) => {
            setData(data)
            setLoading(false)
           
             
           console.log(data)
          })
      }, [current])
      
     
    return(
        <div>
                <div className="md:mx-[5vw] my-10 mx-2">
                    <button className="border-2 shadow-sm border-solid px-8 py-1">Back</button>
                </div>
                {data? <div className=" md:grid grid-cols-2 gap-x-10 md:mx-[5vw] mx-2">
                    <div>
                        <Image alt="s" src={data[0].flags.svg +""} width={500} height={1000}/>
                    </div>
                    <div className="h-full grid content-center ">
                        <span className="font-black">{data[0].name.official}</span> <br />
                        <div className="flex justify-between">
                            <div className="">
                                <span className='font-semibold'>Native Name:</span> <br />
                                <span className='font-semibold'>Population:</span> {data[0].population.toLocaleString()} <br />
                                <span className='font-semibold'>Region</span>{data[0].region} <br/>
                                <span className='font-semibold'>Sub Region</span> {data[0].subregion} <br />
                                <span className='font-semibold'>Capital</span> {data[0].capital}
                            </div>


                            <div>
                                  <span className='font-semibold'>Top Level Domain:</span> <br />
                                <span className='font-semibold'>Currencies:</span>  { Object.values(data[0].currencies).map( val => {
                            return(
                               <span key={val}>{val.name + ","}</span> 
                            )
                        })} <br />
                                <span className='font-semibold'>Region:</span>{data[0].region} <br/>
                                <span className='font-semibold'>Currencies:</span>  {Object.values(data[0].languages).map( val => {
                            return(
                               <span key={val}>{val + ","}</span> 
                            )
                        })}
                            </div>
                             
                        </div>
                     <div className="py-8 gap-11"> 
                     <span className='font-semibold me-5'>Border countries:</span>
                      {data[0].borders.length> 0? Object.values(data[0].borders).map( bod => {
                        return (
                             <button key={bod} onClick={ ()=> setCurrent('NIGERIA')} className="border-2 shadow-sm border-solid px-8 py-1 me-5">{bod}</button>
                        )
                     }) :"hhh"}
                    
                     </div>
                    </div>
                 
                </div>:"loading"}
                 
              </div>
    ) 


    
  }

  

  

  
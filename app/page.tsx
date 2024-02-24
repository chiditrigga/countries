

import Link from 'next/link';
import no1 from '../public/photo-6.png'
import Image from 'next/image'
import { ModeToggle } from '@/components/theme';



type CountryData = {
  flags: {
    svg: string;
  };
  name: {
    official:string,
    common:string
  };
  population: number;
  region: string;
  capital: string;
}


async function getData() {
  const res = await fetch('https://restcountries.com/v3.1/all')
 
 
  if (!res.ok) {
  
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}
 
export default async function Page() {
  const data:CountryData[] = await getData()


  return (
    <>
     
<div >


    <div className="md:mx-[5vw] px-3 pt-8 ">


     <div className="md:flex justify-between">
          <div className="">
            <input type="search" className="p-4 w-full" name="" id="" placeholder="Search for a country"/>
          </div>
          <div>
          <div> <select className="p-4 rounded-sm">
            
    <option  value="All mt-4">Find By Region</option>
 <option value="Africa">Africa</option>
 <option value="America">America</option>
 <option value="Asia">Asia</option>
 <option value="Europe">Europe</option>
 <option value="Oceania">Oceania</option>


</select></div>
          </div>
     </div>




       <div className='grid md:grid-cols-3 xl:grid-cols-4 mt-7  gap-x-2 gap-y-5 fo '>
        { data.map( dat =>{
          return(
            <Link href={`/${dat.name.common}`} key={dat.name.official}>
            <div className='lg:max-w-[20vw] '  >
                    <Image alt='blogs' width={1000} height={1000} src={dat.flags.svg + ""} className=' xl:min-h-[23vh] lg:min-h-[20vh] lg:max-h-[20vh] md:min-h-[20vh] md:max-h-[20vh] xl:max-h-[20vh] min-w-full'/>
                    <div className=" p-3">
                 <div className='font-black py-4'>
                  <h1>{dat.name.official}</h1>    
                 </div>
                   <span className='font-semibold'>Population:</span><span>{dat.population.toLocaleString()} </span>  <br />
                   <span className='font-semibold'>Region: </span>{dat.region} <br />
                   <span className='font-semibold'> Capital:</span>{dat.capital}

                </div>
                </div>
                </Link>
          )
        })
       
                }
       
      
                
      
      
      
                
       </div>







    </div>
    
    
    </div>
    
    
  </>
  )
}
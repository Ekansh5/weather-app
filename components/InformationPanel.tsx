import { MoonIcon, SunIcon } from "@heroicons/react/solid"
import weatherCodeToString from "@/lib/weatherCodeToString";

type Props = {
    city: string;
    results: Root;
    lat: string;
    long: string;
}

function InformationPanel({ city, lat, long, results}: Props) {
  return (
    <div className="bg-gradient-to-b lg:w-1/4 from-[#0094C6] to-[#005E76] text-white p-10 lg:fixed right-0 z-20 h-screen overflow-auto no-scrollbar">
      <div className="flex items-center justify-between">
        <div>
        <h1 className="text-3xl font-bold pb-2">{decodeURI(city)}</h1>
        </div>
        <div className="mt-5 flex items-center justify-between space-x-10 mb-5">
        <p className="text-xl font-bold uppercase">
            {new Date().toLocaleTimeString("en-GB", {
                hour: "numeric",
                minute: "numeric",
                hour12: true,
            })}
        </p>
      </div>
      
      </div>
      <p className="text-md text-slate-300">Lat/Long: {lat}, {long} </p>

      <hr className="my-10" />
      <div className="flex items-center justify-between">
        <div className="flex flex-row-reverse flex-1 justify-between">

            <div className="flex items-center flex-1 justify-between space-x-10">
                <p className="text-5xl font-semibold">{results.current_weather.temperature.toFixed(0)}°C</p>

                <p className="text-right font-extralight text-lg">
                    {weatherCodeToString[results.current_weather.weathercode].label}
                </p>
            </div>
        </div>
      </div>
      <hr className="my-10" />
      <div>
        <h1 className="text-xl font-bold">Chances of Rain</h1>

      </div>
      <div className="space-y-2 py-5">
        <div className="flex items-center space-x-2 px-4 py-3 border border-[#6F90CD] rounded-md bg-white text-black md:hover:shadow-xl transition-all duration-200 cursor-pointer">
          <SunIcon className="h-10 w-10 text-yellow-400 hover:animate-pulse" />
          <div className="flex-1 flex justify-between items-center">
            <p className="font-bold">Sunrise</p>
            <p className="uppercase text-2xl">{new Date(results.daily.sunrise[0]).toLocaleTimeString("en-GB", {
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            })}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 px-4 py-3 border-none rounded-md bg-[#000022] md:hover:shadow-xl transition-all duration-200 cursor-pointer">
          <MoonIcon className="h-10 w-10 text-white  hover:animate-pulse" />
          <div className="flex-1 flex justify-between items-center">
            <p className="font-bold">Sunset</p>
            <p className="uppercase text-2xl">{new Date(results.daily.sunset[0]).toLocaleTimeString("en-GB", {
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            })}</p>
          </div>
        </div>
        
      </div>
    </div>
  )
}

export default InformationPanel

import { getClient } from '@/apollo-client';
import CalloutCard from '@/components/CalloutCard';
import HumidityChart from '@/components/HumidityChart';
import InformationPanel from '@/components/InformationPanel';
import RainChart from '@/components/RainChart';
import StatCard from '@/components/StatCard';
import TempChart from '@/components/TempChart';
import fetchWeatherQuery from '@/graphql/queries/fetchWeatherQueries';
import Header from '@/components/Header';

export const revalidate = 60;

type Props = {
    params: {
        city: string;
        lat: string;
        long: string;
        country: string
    }
}

async function WeatherPage({params: {city, lat, long}}: Props) {
  const client = getClient();
  const { data } = await client.query({
    query: fetchWeatherQuery,
    variables: {
      current_weather: "true",
      longitude: long,
      latitude: lat,
      timezone: 'GMT',
    } 
  })

  const results: Root = data.myQuery;

  return (
    <div className='font-quicksand flex flex-col bg-white min-h-screen'>
      <InformationPanel 
      city={city}
      long={long}
      lat={lat}
      results={results}
      />
      {/* Header */}
      <Header />
        <div className='flex-1 px-5 lg:w-3/4'>
          <div className=''>
            <div className='pb-5 flex flex-1 justify-between items-center'>
              <div>
              <h2 className='text-xl font-bold text-black'>Today's Overview</h2>
              <p className='text-sm text-gray-400'>Last Updated at: {" "}
              {new Date(results.current_weather.time).toLocaleString()} ({results.timezone})
              </p>
              </div>
            </div>

            <div className='grid grid-cols-1 xl:grid-cols-2 gap-5'>
              <StatCard 
                title="Maximum Temperature"
                metric={`${results.daily.temperature_2m_max[0].toFixed(1)}°`}
                color="yellow"
              />

              <StatCard 
                title="Minimum Temperature"
                metric={`${results.daily.temperature_2m_min[0].toFixed(1)}°`}
                color="green"
              />
              <div>
              <StatCard 
                title="UV Index"
                metric={`${results.daily.uv_index_max[0].toFixed(1)}`}
                color="rose"
              />
              {Number(results.daily.uv_index_max[0].toFixed(1)) > 5 && (
                <CalloutCard
                  message={"The UV Index is high today, be sure to wear SPF!"}
                  warning
                />
              )}
              </div>
              <div className='flex space-x-3'>
              <StatCard 
                title="Wind Speed"
                metric={`${results.current_weather.windspeed.toFixed(1)} m/s`}
                color="cyan"
              />
              <StatCard 
                title="Wind Direction"
                metric={`${results.current_weather.winddirection.toFixed(1)}°`}
                color="violet"
              />
              </div>
            </div>
          </div>
          <hr className='mb-5' />
          <div className='space-y-3'>
                <TempChart results={results} />
                <RainChart results={results} />
                <HumidityChart results={results} />
          </div>
        </div>
    </div>
  )
}

export default WeatherPage

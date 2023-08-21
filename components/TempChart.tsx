'use client'
import { AreaChart, Card, Title } from '@tremor/react';
import React from 'react'

type Props = {
    results: Root;
}

function TempChart({ results }: Props) {
    const hourly = results?.hourly.time.map(time => new Date(time).toLocaleString('en-US', {
        hour: 'numeric',
        hour12: false,
    })).slice(0, 24);

    const data = hourly.map((hour, i) => ({
        time: hour,
        "UV Index": results.hourly.uv_index[i],
        "Temperature (C)": results.hourly.temperature_2m[i]
    }))

    const dataFormatter = (number: number) => `${number}`

  return (
    <Card className='bg-gray-100 shadow-none ring-white'>
        <Title className='font-bold'>Temperature & UV Index</Title>
        <AreaChart
            className='mt-6'
            data={data}
            showLegend
            index='time'
            categories={[ "Temperature (C)", "UV Index"]}
            colors={["yellow", "rose"]}
            minValue={0}
            valueFormatter={dataFormatter}
            yAxisWidth={40}
        />
    </Card>
  )
}

export default TempChart

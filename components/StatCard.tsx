;'use client'
import { Card, Color, Metric, Text } from "@tremor/react"

type Props = {
  title: string;
  metric: string;
  color?: Color;
}

function StatCard({ title, metric, color }: Props) {
  return (
    <Card decoration="top" decorationColor={color} className="md:hover:shadow-xl transition-shadow duration-300 cursor-pointer">
      <Text>{title}</Text>
      <Metric>{metric}</Metric>
    </Card>
  )
}

export default StatCard

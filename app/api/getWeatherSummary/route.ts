import { NextResponse } from "next/server";
import openai from "@/openai"

export async function POST(request: Request){
    const { weatherData } = await request.json()

    const response = await openai.createChatCompletion({
        model: 'gpt-4',
        temperature: 0.8,
        n: 1,
        stream: false,
        messages: [
            {
                role: "system",
                content: `Pretend you are a weather news reporter and you are presenting the LIVE weather information on tv. Be full of energy and hook the reader. Introduce yourself as Ekansh. State the city you are providing the summary for. Then give a summary of todays weather only. Make it easy to understand so that the viewer knows and understands what to do to prepare for those weather conditions such as Wear SPF if the UV is high etc. use the uv_index data provided to provide UV advice. Provide a joke regarding the weather. Assume the data came from your team at the news office not the user.`,
            }, {
                role: "user",
                content: `Hi there, can I get a summary of todays weather, use the following information to get the weather data: ${JSON.stringify(
                    weatherData
                )}`,
            },
        ],
    });

    const {data} = response;
    return NextResponse.json(data.choices[0].message)
}
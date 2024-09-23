import React from 'react';
import { ResponsiveLine } from '@nivo/line';
import { PressureReading } from "../models/pressure-reading.ts";


type LineChartProps = {
    readings: PressureReading[];

}

const LineChart: React.FC<LineChartProps> = ({ readings }) => {

    const currentYear = readings.length > 0
        ? new Date(readings[0].dateTime).getFullYear()
        : new Date().getFullYear();

    const data1 = [
        { id: 'Bpm', data: readings.map(reading => ({
                x: new Date(reading.dateTime).toISOString().split('T')[0],
                y: reading.bpm,
            }))},
        { id: 'Diastolic', data: readings.map(reading => ({
                x: new Date(reading.dateTime).toISOString().split('T')[0],
                y: reading.diastolic,
            }))},
        { id: 'Systolic', data: readings.map(reading => ({
                x: new Date(reading.dateTime).toISOString().split('T')[0],
                y: reading.systolic,
            }))},
    ];

   /* const data2 = [
        { id: 'gfr', data: bloodWorkValues.map(bloodwork => ({
                x: new Date(bloodwork.dateTime).toISOString().split('T')[0],
                y:bloodwork.gfr
            }))},
        { id: 'crp', data: bloodWorkValues.map(bloodwork => ({
                x: new Date(bloodwork.dateTime).toISOString().split('T')[0],
                y: bloodwork.crp,
            }))},
    ];*/

    return (
        <div>
            <div style={{ height: '400px' }}>
                <ResponsiveLine
                    data={data1}
                    xScale={{
                        type: 'time',
                        format: '%Y-%m-%d',
                        precision: 'day',
                    }}
                    xFormat="time:%Y-%m-%d"
                    yScale={{
                        type: 'linear',
                        min: 0,
                        max: 200,
                    }}
                    axisBottom={{
                        format: '%b %d',
                        tickValues: 'every 1 month',
                        legend: currentYear.toString(),
                        legendPosition: 'middle',
                        legendOffset: 40,
                    }}
                    axisLeft={{
                        tickValues: 10,
                        legend: '',
                        legendPosition: 'middle',
                        legendOffset: -40,
                    }}
                    colors={{ scheme: 'nivo' }}
                    lineWidth={2}
                    pointSize={10}
                    pointColor={{ theme: 'background' }}
                    pointBorderWidth={2}
                    pointBorderColor={{ from: 'serieColor' }}
                    useMesh={true}
                    margin={{ top: 50, right: 90, bottom: 60, left: 50 }}
                    legends={[
                        {
                            anchor: 'top-right',
                            direction: 'column',
                            translateX: 120,
                            translateY: -30,
                            itemsSpacing: 2,
                            itemWidth: 100,
                            itemHeight: 20,
                            symbolSize: 12,
                            symbolShape: 'circle',
                            effects: [
                                {
                                    on: 'hover',
                                    style: {
                                        itemOpacity: 1,
                                    },
                                },
                            ],
                        },
                    ]}
                />
            </div>

          {/*  <div style={{ height: '400px' }}>
                <ResponsiveLine
                    data={data2}
                    xScale={{
                        type: 'time',
                        format: '%Y-%m-%d',
                        precision: 'day',
                    }}
                    xFormat="time:%Y-%m-%d"
                    yScale={{
                        type: 'linear',
                        min: 0,
                        max: 200,
                    }}
                    axisBottom={{
                        format: '%b %d',
                        tickValues: 'every 1 month',
                        legend: currentYear.toString(),
                        legendPosition: 'middle',
                        legendOffset: 40,
                    }}
                    axisLeft={{
                        tickValues: 10,
                        legend: '',
                        legendPosition: 'middle',
                        legendOffset: -40,
                    }}
                    colors={{ scheme: 'nivo' }}
                    lineWidth={2}
                    pointSize={10}
                    pointColor={{ theme: 'background' }}
                    pointBorderWidth={2}
                    pointBorderColor={{ from: 'serieColor' }}
                    useMesh={true}
                    margin={{ top: 50, right: 90, bottom: 60, left: 50 }}
                    legends={[
                        {
                            anchor: 'top-right',
                            direction: 'column',
                            translateX: 120,
                            translateY: -30,
                            itemsSpacing: 2,
                            itemWidth: 100,
                            itemHeight: 20,
                            symbolSize: 12,
                            symbolShape: 'circle',
                            effects: [
                                {
                                    on: 'hover',
                                    style: {
                                        itemOpacity: 1,
                                    },
                                },
                            ],
                        },
                    ]}
                />
            </div>*/}
        </div>
    );
};

export default LineChart;

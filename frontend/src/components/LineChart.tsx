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

    const averageBpm = readings.length > 0
        ? (readings.reduce((sum, reading) => sum + reading.bpm, 0) / readings.length).toFixed(2)
        : 0;

    const averageSystolic = readings.length > 0
        ? (readings.reduce((sum, reading) => sum + reading.systolic, 0) / readings.length).toFixed(2)
        : 0;

    const averageDiastolic = readings.length > 0
        ? (readings.reduce((sum, reading) => sum + reading.diastolic, 0) / readings.length).toFixed(2)
        : 0;

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

    const data2 = [
        { id: 'CRP',
            data: [
                { x: '2024-09-12', y: 3 },
                { x: '2024-08-20', y: 2 },
                { x: '2024-07-04', y: 1 },
                { x: '2024-06-11', y: 1 },
            ],
        },
        {
            id: 'GFR',
            data: [
                { x: '2024-09-12', y: 55 },
                { x: '2024-08-20', y: 64 },
                { x: '2024-07-04', y: 70 },
                { x: '2024-06-11', y: 60 },
            ],
        },
    ];

    return (
        <div >
            <div style={{height: '400px', marginBottom: '10px'}}>
                <div style={{fontWeight: 'bold', marginBottom: '30px'}}>Blood Pressure</div>
                <div style={{fontSize: '0.9em', marginBottom: '0px'}}>
                    Average BPM: {averageBpm} | Average Systolic: {averageSystolic} | Average
                    Diastolic: {averageDiastolic}
                </div>
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
                    colors={{scheme: 'nivo'}}
                    lineWidth={2}
                    pointSize={10}
                    pointColor={{theme: 'background'}}
                    pointBorderWidth={2}
                    pointBorderColor={{from: 'serieColor'}}
                    useMesh={true}
                    margin={{top: 50, right: 90, bottom: 60, left: 50}}
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

            <div style={{height: '400px'}}>
                <div style={{fontWeight: 'bold', marginBottom: '10px'}}>Bloodwork</div>
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
                        max: 100,
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
        </div>
    );
};

export default LineChart;

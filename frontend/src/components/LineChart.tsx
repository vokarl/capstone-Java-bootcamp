


import React from 'react';
import { ResponsiveLine } from '@nivo/line';

const LineChart: React.FC = () => {const data = [
    {
        id: 'Systolic',
        data: [
            { x: new Date('2023-09-01'), y: 120 },
            { x: new Date('2023-09-02'), y: 130 },
            { x: new Date('2023-09-03'), y: 150 },
            { x: new Date('2023-09-04'), y: 150 }
        ],
    },
    {
        id: 'Diastolic',
        data: [
            { x: new Date('2023-09-01'), y: 90 },
            { x: new Date('2023-09-02'), y: 100 },
            { x: new Date('2023-09-03'), y: 110 }
        ],
    },
    {
        id: 'Bpm',
        data: [
            { x: new Date('2023-09-01'), y: 180 },
            { x: new Date('2023-09-02'), y: 160 },
            { x: new Date('2023-09-03'), y: 170 }
        ],
    }
];


    return (
        <div style={{ height: '400px' }}>
            <ResponsiveLine
                data={data}
                xScale={{
                    type: 'time',  // Skalierung der X-Achse als Datum
                    format: '%Y-%m-%d',  // Datumsformat
                    precision: 'day',  // Präzision bis zum Tag
                }}
                xFormat="time:%Y-%m-%d"  // Formatierung der X-Achse
                yScale={{
                    type: 'linear',
                    min: 0,
                    max: 200,  // Begrenzung der Y-Achse auf 0 bis 200
                }}
                axisBottom={{
                    format: '%b %d',  // Format für das Datum auf der X-Achse (Monat Tag)
                    tickValues: 'every 1 day',  // Ticks für jeden Tag
                    legend: 'Date',  // Label der X-Achse
                    legendPosition: 'middle',
                    legendOffset: 36,
                }}
                axisLeft={{
                    tickValues: 10,  // Teilung der Y-Achse in 10 Einheiten
                    legend: 'Values',  // Label der Y-Achse
                    legendPosition: 'middle',
                    legendOffset: -40,
                }}
                colors={{ scheme: 'nivo' }}  // Farbpalette für die Linien
                lineWidth={2}  // Breite der Linien
                pointSize={10}  // Größe der Punkte
                pointColor={{ theme: 'background' }}
                pointBorderWidth={2}
                pointBorderColor={{ from: 'serieColor' }}
                useMesh={true}  // Ermöglicht das Interagieren mit den Punkten
                //Margin
                margin={{ top: 50, right: 90, bottom: 60, left: 50 }}
                legends={[
                    {
                        anchor: 'top-right',  // Legende außerhalb der Chart
                        direction: 'column',  // Legende in Spalten anordnen
                        translateX: 120,
                        translateY: -30,
                        itemsSpacing: 2,
                        itemWidth: 100,
                        itemHeight: 20,
                        symbolSize: 12,
                        symbolShape: 'circle',  // Form der Symbole
                        effects: [
                            {
                                on: 'hover',  // Interaktion bei Hover
                                style: {
                                    itemOpacity: 1
                                }
                            }
                        ]
                    }
                ]}
            />
        </div>
    );
};

export default LineChart;





/*
import React from 'react';
import { ResponsiveLine } from '@nivo/line';

const LineChart: React.FC = () => {const data = [
    {
        id: 'Lie 1',
        data: [
            { x: new Date('2023-09-01'), y: 120 },
            { x: new Date('2023-09-02'), y: 130 },
            { x: new Date('2023-09-03'), y: 150 }
        ],
    },
    {
        id: 'Line 2',
        data: [
            { x: new Date('2023-09-01'), y: 90 },
            { x: new Date('2023-09-02'), y: 100 },
            { x: new Date('2023-09-03'), y: 110 }
        ],
    },
    {
        id: 'Line 3',
        data: [
            { x: new Date('2023-09-01'), y: 180 },
            { x: new Date('2023-09-02'), y: 160 },
            { x: new Date('2023-09-03'), y: 170 }
        ],
    }
];


    return (
        <div style={{ height: '400px' }}>
            <ResponsiveLine
                data={data}
                xScale={{
                    type: 'time',  // Skalierung der X-Achse als Datum
                    format: '%Y-%m-%d',  // Datumsformat
                    precision: 'day',  // Präzision bis zum Tag
                }}
                xFormat="time:%Y-%m-%d"  // Formatierung der X-Achse
                yScale={{
                    type: 'linear',
                    min: 0,
                    max: 200,  // Begrenzung der Y-Achse auf 0 bis 200
                }}
                axisBottom={{
                    format: '%b %d',  // Format für das Datum auf der X-Achse (Monat Tag)
                    tickValues: 'every 1 day',  // Ticks für jeden Tag
                    legend: 'Date',  // Label der X-Achse
                    legendPosition: 'middle',
                    legendOffset: 36,
                }}
                axisLeft={{
                    tickValues: 10,  // Teilung der Y-Achse in 10 Einheiten
                    legend: 'Values',  // Label der Y-Achse
                    legendPosition: 'middle',
                    legendOffset: -40,
                }}
                colors={{ scheme: 'nivo' }}  // Farbpalette für die Linien
                lineWidth={2}  // Breite der Linien
                pointSize={10}  // Größe der Punkte
                pointColor={{ theme: 'background' }}
                pointBorderWidth={2}
                pointBorderColor={{ from: 'serieColor' }}
                useMesh={true}  // Ermöglicht das Interagieren mit den Punkten
                margin={{ top: 50, right: 60, bottom: 60, left: 80 }}
                legends={[
                    {
                        anchor: 'top-right',  // Legende außerhalb der Chart
                        direction: 'column',  // Legende in Spalten anordnen
                        translateX: 120,
                        translateY: -30,
                        itemsSpacing: 2,
                        itemWidth: 100,
                        itemHeight: 20,
                        symbolSize: 12,
                        symbolShape: 'circle',  // Form der Symbole
                        effects: [
                            {
                                on: 'hover',  // Interaktion bei Hover
                                style: {
                                    itemOpacity: 1
                                }
                            }
                        ]
                    }
                ]}
            />
        </div>
    );
};

export default LineChart;


*/

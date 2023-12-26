import React, { useEffect, useState } from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { toyService } from '../services/toy.service';

export function Dashboard() {
    const [priceChartData, setPriceChartData] = useState({
        labels: [],
        datasets: [
            {
                label: 'Price per Label',
                data: [],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                ],
                borderWidth: 1,
            },
        ],
    });

    const [inventoryChartData, setInventoryChartData] = useState({
        labels: [],
        datasets: [
            {
                label: 'Inventory by Label',
                data: [],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(54, 42, 235, 0.2)',
                    'rgba(12, 59, 235, 0.2)',
                    'rgba(12, 100, 100, 0.2)',
                    'rgba(128, 250, 40, 0.2)',
                ],
                hoverOffset: 4,
            },
        ],
    });

    useEffect(() => {
        toyService.query()
            .then(toys => {
                const labelSums = {};
                const labelCounts = {};
                const inventoryCounts = {};
                const totalPerLabel = {};

                toys.forEach(toy => {
                    toy.labels.forEach(label => {
                        if (!labelSums[label]) {
                            labelSums[label] = 0;
                            labelCounts[label] = 0;
                            inventoryCounts[label] = 0;
                            totalPerLabel[label] = 0;
                        }
                        labelSums[label] += toy.price;
                        labelCounts[label]++;
                        totalPerLabel[label]++;

                        if (toy.inStock) {
                            inventoryCounts[label]++;
                        }
                    });
                });

                const averagePricePerLabel = {};
                const inventoryPercentagePerLabel = {};

                Object.keys(labelSums).forEach(label => {
                    averagePricePerLabel[label] = labelSums[label] / labelCounts[label];
                    inventoryPercentagePerLabel[label] = (inventoryCounts[label] / totalPerLabel[label]) * 100;
                });

                setPriceChartData({
                    labels: Object.keys(averagePricePerLabel),
                    datasets: [{
                        ...priceChartData.datasets[0],
                        data: Object.values(averagePricePerLabel),
                    }],
                });

                setInventoryChartData({
                    labels: Object.keys(inventoryPercentagePerLabel),
                    datasets: [{
                        ...inventoryChartData.datasets[0],
                        data: Object.values(inventoryPercentagePerLabel),
                    }],
                });
            })
            .catch(err => console.log('Error getting data for chart', err));
    }, []);

    const options = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div>
            <h1>Dashboard</h1>
            <Bar data={priceChartData} options={options} />
            <Doughnut data={inventoryChartData} />
        </div>
    );
}

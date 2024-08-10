import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import '../styles/FactSlideShow.css';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const facts = [
    {
        text: "Research shows that people who track their expenses are 60% more likely to stick to their budgets. This is because tracking creates awareness of spending habits, helping individuals identify areas where they may overspend.",
        chartData: {
            datasets: [
                {
                    data: [60, 40],
                    backgroundColor: ['#BFD3C1', '#E3B2B2'],
                },
            ],
        },
    },
    {
        text: "On average, individuals who actively track their spending can reduce their monthly expenses by about 20%. This reduction often comes from identifying unnecessary purchases.",
        chartData: {
            datasets: [
                {
                    data: [20, 80],
                    backgroundColor: ['#F3C6C9', '#C6E2D3'],
                },
            ],
        },
    },
    {
        text: "People who monitor their expenses tend to save 15-20% more of their income compared to those who do not track their spending.",
        chartData: {
            datasets: [
                {
                    data: [20, 80],
                    backgroundColor: ['#E2C8C8', '#C6DCE2'],
                },
            ],
        },
    },
    {
        text: "Approximately 70% of people without a budget report not having an emergency fund, which is crucial for financial security.",
        chartData: {
            datasets: [
                {
                    data: [70, 30],
                    backgroundColor: ['#D0E4C9', '#F5B5B5'],
                },
            ],
        },
    },
    {
        text: "Research indicates that 50% of household budgets typically go toward fixed expenses, while the remaining 30-40% is discretionary spending.",
        chartData: {
            datasets: [
                {
                    data: [50, 50],
                    backgroundColor: ['#C4E1E0', '#F2D2C2'],
                },
            ],
        },
    },
    {
        text: "Studies suggest that individuals who write down their goals and track their progress are 42% more likely to achieve those goals.",
        chartData: {
            datasets: [
                {
                    data: [42, 58],
                    backgroundColor: ['#B8E0D2', '#F7B2B2'],
                },
            ],
        },
    },
    {
        text: "Setting specific financial goals increases the likelihood of success by up to 90%.",
        chartData: {
            datasets: [
                {
                    data: [90, 10],
                    backgroundColor: ['#C6E2F0', '#F4B8B8'],
                },
            ],
        },
    },
    {
        text: "Individuals who regularly review their financial goals are **80% more likely to stay on track.",
        chartData: {
            datasets: [
                {
                    data: [80, 20],
                    backgroundColor: ['#B0D9B0', '#F4B8B8'],
                },
            ],
        },
    },
    {
        text: "Using financial apps can enhance adherence to financial plans by about **30% compared to traditional methods.",
        chartData: {
            datasets: [
                {
                    data: [30, 70],
                    backgroundColor: ['#D6E3F2', '#F2B0B0'],
                },
            ],
        },
    },
    {
        text: "About 70% of individuals with long-term goals feel more secure about their financial future.",
        chartData: {
            datasets: [
                {
                    data: [70, 30],
                    backgroundColor: ['#B2D9E0', '#F5C6C6'],
                },
            ],
        },
    },
];

const FactSlideshow = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % facts.length);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    const handleDotClick = (index) => {
        setCurrentIndex(index);
    };

    return (
        <div className="FactSlideshow">
            <div className="heading-wrapper">
                <h2 id='heading'>Why You Need Us?</h2>
                <p id='facttag'>Here are some facts so you understand.</p>
            </div>
            <div className="Slide">
                <div className="PieChart">
                    <Pie
                        data={facts[currentIndex].chartData}
                        options={{
                            plugins: {
                                tooltip: {
                                    enabled: false,
                                },
                                legend: {
                                    display: false,
                                },
                            },
                            interaction: {
                                mode: 'nearest',
                                intersect: false,
                            },
                        }}
                    />
                </div>
                <div className="FactText">
                    <p>{facts[currentIndex].text}</p>
                </div>
            </div>
            <div className="Dots">
                {facts.map((_, index) => (
                    <span
                        key={index}
                        className={`Dot ${index === currentIndex ? 'active' : ''}`}
                        onClick={() => handleDotClick(index)}
                    ></span>
                ))}
            </div>
        </div>
    );    
};

export default FactSlideshow;

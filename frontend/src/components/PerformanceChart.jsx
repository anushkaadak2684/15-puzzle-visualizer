import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function PerformanceChart({ data }) {
  const labels = Object.keys(data);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Time (seconds)",
        data: labels.map((l) => data[l].time),
        backgroundColor: "#ff3cac", // neon pink
        borderRadius: 6,
      },
      {
        label: "Nodes Expanded",
        data: labels.map((l) => data[l].nodesExpanded),
        backgroundColor: "#00ff9c", // neon green
        borderRadius: 6,
      },
      {
        label: "Memory Used",
        data: labels.map((l) => data[l].memory),
        backgroundColor: "#eaff00", // neon yellow
        borderRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#ffffff",
          font: {
            size: 14,
            weight: "600",
          },
        },
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#eaeaea",
          font: {
            size: 13,
          },
        },
        grid: {
          color: "rgba(255,255,255,0.08)",
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: "#eaeaea",
        },
        grid: {
          color: "rgba(255,255,255,0.08)",
        },
      },
    },
  };

  return (
    <div className="chart-wrapper">
      <Bar data={chartData} options={options} />
    </div>
  );
}

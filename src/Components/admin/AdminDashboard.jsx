import { useEffect, useState } from "react";
import NavbarComp from "../NavbarComp";
import ApexCharts from "apexcharts";
import AdminSidebar from "./AdminSidebar";
import { HiOutlineBars3 } from "react-icons/hi2";

function AdminDashboard() {
  const [visible, setVisible] = useState(false);
  // Chart options
  const options = {
    series: [
      {
        name: "Bookings",
        data: [10, 41, 35, 51, 49, 62, 69, 91, 148, 98, 78, 88],
      },
    ],
    chart: {
      height: 350,
      type: "line",
      zoom: {
        enabled: false,
      },
      foreColor: "#ffffff",
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: true,
    },
    stroke: {
      curve: "smooth",
    },
    grid: {
      row: {
        colors: ["transparent", "transparent"],
        opacity: 1,
      },
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
    tooltip: {
      theme: "dark", // Set the tooltip theme to light
      style: {
        fontSize: "12px",
        color: "#000000", // Change tooltip text color to black
      },
    },
  };

  var options2 = {
    series: [
      {
        name: "Profit",
        data: [23, 45, 12, 56, 33, 27, 55, 69, 56, 44, 38, 42],
      },
    ],
    chart: {
      height: 350,
      type: "bar",
      foreColor: "#ffffff",
      toolbar: {
        show: false, // Hide the toolbar
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 10,
        dataLabels: {
          position: "top", // top, center, bottom
        },
      },
    },

    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return val + "K";
      },
      offsetY: -20,
      style: {
        fontSize: "12px",
        fonWeight: "thin",
        colors: ["#ffffff"],
      },
    },

    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      position: "bottom",
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      crosshairs: {
        fill: {
          type: "gradient",
          gradient: {
            colorFrom: "#D8E3F0",
            colorTo: "#BED1E6",
            stops: [0, 100],
            opacityFrom: 0.4,
            opacityTo: 0.5,
          },
        },
      },
      tooltip: {
        enabled: false,
      },
    },
    yaxis: {
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: true,
        formatter: function (val) {
          return val + "K";
        },
      },
    },
    title: {
      floating: true,
      offsetY: 330,
      align: "center",
      style: {
        color: "#444",
      },
    },
    tooltip: {
      theme: "dark", // Set the tooltip theme to light
      style: {
        fontSize: "12px",
        color: "#000000", // Change tooltip text color to black
      },
    },
  };
  var options3 = {
    series: [
      {
        name: "Cinepolis: Nexus Seawoods",
        data: [39, 47, 29, 54, 41, 90, 67, 76, 68, 58, 65, 77],
      },
      {
        name: "INOX: Raghuleela Mall",
        data: [12, 28, 42, 35, 46, 50, 49, 39, 53, 60, 48, 55],
      },
    ],
    chart: {
      height: 350,
      type: "area",
      foreColor: "#ffffff",
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
    tooltip: {
      theme: "dark", // Set the tooltip theme to light
      style: {
        fontSize: "12px",
        color: "#000000", // Change tooltip text color to black
      },
    },
  };
  useEffect(() => {
    // Create a new chart instance
    const chart = new ApexCharts(document.querySelector("#chart"), options);

    // Render the chart
    chart.render();

    var chart2 = new ApexCharts(document.querySelector("#chart2"), options2);
    chart2.render();
    var chart3 = new ApexCharts(document.querySelector("#chart3"), options3);
    chart3.render();

    // Cleanup function to destroy the chart instance
    return () => {
      chart.destroy();
      chart2.destroy();
      chart3.destroy();
    };
  }, []); // Empty dependency array ensures this runs only once

  return (
    <div className="bg-[#161a2b] flex w-full min-h-[100vh]">
      <AdminSidebar
        className="md:w-[20%]"
        selected="Dashboard"
        visible={visible}
        setVisible={setVisible}
      />
      <div className="p-4 sm:p-8 lg:p-10 !pt-0 md:w-[80%] md:ml-[20%]">
        <div className="flex gap-3 items-center mt-8">
          <HiOutlineBars3
            className="w-6 h-6 md:hidden cursor-pointer"
            onClick={() => setVisible(!visible)}
          />
          <h2 className="text-2xl font-bold">Admin Dashboard</h2>
        </div>
        <div className="bg-[#1f263c] p-2 rounded-lg w-full mt-8">
          <h1 className="text-left px-4 py-1 text-xl text-white font-bold">
            Theater Bookings
          </h1>
          <div id="chart3"></div>
        </div>
        <div className="flex flex-wrap justify-between gap-5">
          <div className="bg-[#1f263c] p-2 rounded-lg w-full md:w-[48%] mt-4 md:mt-8">
            <h1 className="text-left px-4 py-1 text-xl text-white font-bold">
              Bookings
            </h1>
            <div id="chart"></div>
          </div>
          <div className="bg-[#1f263c] p-2 rounded-lg w-full md:w-[48%] mt-4 md:mt-8">
            <h1 className="text-left px-4 py-1 text-xl text-white font-bold">
              Profit
            </h1>
            <div id="chart2"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;

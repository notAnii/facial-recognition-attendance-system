import React from "react";
import {
  PieChart,
  Pie,
  Tooltip,
  BarChart,
  XAxis,
  YAxis,
  Legend,
  CartesianGrid,
  Bar,
} from "recharts";

const Chart = () => {
  const data = [
    { month: "Week1", Days: 100 },
    { month: "Week2", Days: 75 },
    { month: "Week3", Days: 50 },
    { month: "Week4", Days: 25 },
    { month: "Week5", Days: 100 },
    { month: "Week6", Days: 78 },
    { month: "Week7", Days: 50 },
    { month: "Week8", Days: 25 },
    { month: "Week9", Days: 100 },
    { month: "Week10", Days: 75 },
  ];

  return (
    <div style={{ textAlign: "center" }}>

      <div className="Chart" >

        <BarChart
          width={750}
          height={270}
          data={data}
          margin={{
            top: 5,
            right: 90,
            left: 30,
            bottom: 5,
          }}
          barSize={13}
        >
          <XAxis
            dataKey="month"
            fontSize={10}
            fontWeight="bold"
            fontFamily={"Open Sans"}
            scale="point"
            padding={{ left: 10, right: 10 }}
          />
          <YAxis 
           fontSize={10}
           fontWeight="bold"
           fontFamily={"Open Sans"}
          />
          <Tooltip />
          <CartesianGrid strokeDasharray="4 4" />
          <Bar dataKey="Days" fill="black" radius={10}/>
        </BarChart>
      </div>
    </div>
  );
};

export default Chart;
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
    { month: "JAN", Days: 100 },
    { month: "FEB", Days: 75 },
    { month: "MAR", Days: 50 },
    { month: "APR", Days: 25 },
    { month: "MAY", Days: 100 },
    { month: "JUN", Days: 78 },
    { month: "JUL", Days: 50 },
    { month: "AUG", Days: 25 },
    { month: "SEP", Days: 100 },
    { month: "OCT", Days: 75 },
    { month: "NOV", Days: 50 },
    { month: "DEC", Days: 25 },
  ];

  return (
    <div style={{ textAlign: "center" }}>

      <div className="Chart" >

        <BarChart
          
          width={650}
          height={200}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 80,
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
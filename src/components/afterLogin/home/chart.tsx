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
    { Day: "Monday", Classes: 4 },
    { Day: "Tuesday", Classes: 2 },
    { Day: "Wednesday", Classes: 3 },
    { Day: "Thursday", Classes: 5 },
    { Day: "Friday", Classes: 1},
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
            dataKey="Day"
            fontSize={13}
            fontWeight="bold"
            fontFamily={"Open Sans"}
            scale="point"
            padding={{ left: 20, right: 20 }}
          />
          <YAxis 
           fontSize={13}
           fontWeight="bold"
           fontFamily={"Open Sans"}
          />
          <Tooltip />
          <CartesianGrid strokeDasharray="4 4" />
          <Bar dataKey="Classes" fill="black" radius={10}/>
        </BarChart>
      </div>
    </div>
  );
};

export default Chart;
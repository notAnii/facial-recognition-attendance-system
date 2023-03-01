import axios from "axios";
import React, { useEffect, useState } from "react";
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

  
  const [dataa, setData] = useState<Array<{ 
    day: string; 
    num_sessions: number; 
  }>>([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('http://127.0.0.1:5000/api/v1/class-counts', {withCredentials:true});
      console.log(result.data)
      setData(result.data);
    };

    fetchData();
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
        <div className="Chart" >
          <BarChart
            width={750}
            height={270}
            data={dataa}
            margin={{
              top: 5,
              right: 90,
              left: 30,
              bottom: 5,
            }}
            barSize={13}
          >
            <XAxis
              dataKey="day"
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
            <Bar dataKey="num_sessions" fill="black" radius={10}/>
          </BarChart>
        </div>
      </div>
  );
};

export default Chart;
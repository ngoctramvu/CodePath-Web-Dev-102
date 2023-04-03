import { ScatterChart, Scatter, LineChart, Line, Legend, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";

const Charts = ({data}) => {
  return (
    <div className="Charts">
      <div className="Chart">
        <ScatterChart width={450} height={300}
          margin={{ top: 10, right: 20, bottom: 10, left: 10}}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="highest_price" type="number" name="Highest Price" unit="USD"/>
          <YAxis dataKey="popularity" type="number" name="Popularity" />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} />
          <Scatter data={data} fill="#8884d8" />
        </ScatterChart>
      </div>
      <div className="Chart">
        <LineChart width={450} height={300}  data={data}
          margin={{ top: 10, right: 20, bottom: 10, left: 10}}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="venue"/>
          <YAxis/>
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="highest_price" name="Highest Price" stroke="#8884d8" unit="USD"/>
          <Line type="monotone" dataKey="lowest_price" name="Lowest Price" stroke="#82ca9d" unit="USD"/>
          <Line type="monotone" dataKey="average_price" name="Average Price" stroke="#ff7300" unit="USD"/>
        </LineChart>
      </div>
    </div>
  )
};

export default Charts;
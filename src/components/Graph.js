import React, { PureComponent } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

export default class Graph extends PureComponent {
  render() {
    return (
      <div style={{ height: 300 }}>
        <ResponsiveContainer>
          <AreaChart
            data={this.props.weekData}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={this.props.XAxisDatakey} />
            <YAxis />
            <Tooltip />

            <Area
              strokeWidth={2}
              type="monotone"
              dataKey={this.props.AreaDataKey}
              stroke="#2768e9"
              fill={this.props.fill}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
  }
}
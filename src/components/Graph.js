import React, { PureComponent } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Line,
  LineChart,
  Legend
} from "recharts";


class Graph extends PureComponent {
  render() {
    return (
      Array.isArray(this.props.weekData) && (
        <div style={{ height: 300 }}>
          <ResponsiveContainer>
            <AreaChart
              data={this.props.weekData}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0
              }}
            >
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey={this.props.XAxisDatakey} />
              <YAxis />
              <Tooltip />
              <Area
                name={this.props.name}
                strokeWidth={2}
                type='monotone'
                dataKey={this.props.AreaDataKey}
                stroke='#2768e9'
                fill={this.props.fill}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )
    );
  }
}

class LineGraph extends PureComponent { 
  render(){
    return(
      Array.isArray(this.props.weekData) && (
      <div style={{ height: 400 }}>
        <ResponsiveContainer>
          <LineChart width={600} height={300} data={this.props.weekData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <XAxis dataKey={this.props.XAxisDatakey} />
            <YAxis type="number" domain={[0, 'dataMax']}  />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey={this.props.Key1} name={this.props.Name1} stroke="#c81912" fill="#c81912" strokeWidth={2.5} />
            <Line type="monotone" dataKey={this.props.Key2} name={this.props.Name2} stroke="#2768e9" fill="#2768e9" strokeWidth={2.5} />
            <Line type="monotone" dataKey={this.props.Key3} name={this.props.Name3} stroke="#6c757d"  fill="#6c757d" strokeWidth={2.5}/>
            <Line type="monotone" dataKey={this.props.Key4} name={this.props.Name4} stroke="#28a745"  fill="#28a745" strokeWidth={2.5}/>
          </LineChart>
        </ResponsiveContainer>
      </div>
      )
    )
  }
}

class CompareLineGraph extends PureComponent { 
  render(){
    return(
      Array.isArray(this.props.data) && (
      <div style={{ height: 400 }}>
        <ResponsiveContainer>
          <LineChart width={600} height={300} data={this.props.data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <XAxis dataKey={this.props.XAxisDatakey} />
            <YAxis type="number" domain={[0, 'dataMax']}  />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <CustomizedDot/>
            <Line type="monotone" dot={<CustomizedDot color="#c81912"/>} dataKey={this.props.Key1} name={this.props.Name1} 
            stroke="#c81912" fill="#c81912" strokeWidth={2.5} />
            <Line type="monotone" dot={<CustomizedDot color="#2768e9"/>} dataKey={this.props.Key2} name={this.props.Name2} 
            stroke="#2768e9" fill="#2768e9" strokeWidth={2.5} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      )
    )
  }
}

class CustomizedDot extends React.Component {
  render() {
      const { cx, cy } = this.props;
      return (
          <circle cx={cx} cy={cy} r={2} stroke={this.props.color} strokeWidth={1} fill={this.props.color} />
      );
  }
};

export {Graph, LineGraph, CompareLineGraph};
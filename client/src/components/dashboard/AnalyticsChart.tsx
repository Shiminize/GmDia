import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';

// Type cast the icons
const FaChartLine = FaIcons.FaChartLine as unknown as React.FC<React.ComponentProps<'svg'>>;
const FaChartBar = FaIcons.FaChartBar as unknown as React.FC<React.ComponentProps<'svg'>>;
const FaArrowUp = FaIcons.FaArrowUp as unknown as React.FC<React.ComponentProps<'svg'>>;
const FaArrowDown = FaIcons.FaArrowDown as unknown as React.FC<React.ComponentProps<'svg'>>;

interface ChartData {
  label: string;
  value: number;
  change?: {
    value: number;
    isPositive: boolean;
  };
}

interface AnalyticsChartProps {
  title: string;
  data: ChartData[];
  type?: 'line' | 'bar';
  period?: 'week' | 'month' | 'quarter' | 'year';
  loading?: boolean;
  height?: number;
  showTrend?: boolean;
  valuePrefix?: string;
  valueSuffix?: string;
}

const AnalyticsChart: React.FC<AnalyticsChartProps> = ({
  title,
  data,
  type = 'line',
  period = 'month',
  loading = false,
  height = 300,
  showTrend = true,
  valuePrefix = '$',
  valueSuffix = ''
}) => {
  const [chartType, setChartType] = useState<'line' | 'bar'>(type);
  const [selectedPeriod, setSelectedPeriod] = useState(period);

  // Calculate chart dimensions and scaling
  const maxValue = Math.max(...data.map(d => d.value));
  const minValue = Math.min(...data.map(d => d.value));
  const range = maxValue - minValue;
  const chartHeight = height - 80; // Reserve space for labels
  const chartWidth = 100; // Percentage

  // Generate chart points for line chart
  const generateLinePoints = () => {
    return data.map((item, index) => {
      const x = (index / (data.length - 1)) * chartWidth;
      const y = chartHeight - ((item.value - minValue) / range) * chartHeight;
      return `${x},${y}`;
    }).join(' ');
  };

  // Calculate trend for the entire dataset
  const calculateOverallTrend = () => {
    if (data.length < 2) return null;
    const firstValue = data[0].value;
    const lastValue = data[data.length - 1].value;
    const change = ((lastValue - firstValue) / firstValue) * 100;
    return {
      value: Math.abs(change),
      isPositive: change >= 0
    };
  };

  const overallTrend = calculateOverallTrend();

  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-champagne p-6 mb-6">
        <div className="flex justify-between items-center mb-6">
          <div className="h-6 w-48 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-9 w-28 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="w-full rounded-lg bg-gray-200 animate-pulse" style={{ height: `${height}px` }}></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-champagne p-6 mb-6">
      {/* Chart Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="m-0 font-primary text-graphite text-xl">
            {title}
          </h3>
          {showTrend && overallTrend && (
            <div className="flex items-center gap-2 mt-2">
              <span className={`flex items-center gap-1 text-sm font-medium 
                ${overallTrend.isPositive ? 'text-emerald-600' : 'text-rose-600'}`}>
                {overallTrend.isPositive ? <FaArrowUp className="w-3 h-3" /> : <FaArrowDown className="w-3 h-3" />}
                {overallTrend.value.toFixed(1)}%
              </span>
              <span className="text-xs text-warm-gray">
                vs last {selectedPeriod}
              </span>
            </div>
          )}
        </div>
        
        <div className="flex gap-2 items-center">
          {/* Period Selector */}
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value as any)}
            className="px-3 py-2 rounded-lg border border-champagne bg-white text-sm text-graphite 
              focus:outline-none focus:ring-2 focus:ring-champagne focus:border-transparent"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
          
          {/* Chart Type Selector */}
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setChartType('line')}
              className={`p-2 rounded transition-all duration-200 ${
                chartType === 'line' 
                  ? 'bg-secondary text-secondary-foreground' 
                  : 'text-warm-gray hover:bg-secondary/10'
              }`}
            >
              <FaChartLine className="w-4 h-4" />
            </button>
            <button
              onClick={() => setChartType('bar')}
              className={`p-2 rounded transition-all duration-200 ${
                chartType === 'bar' 
                  ? 'bg-secondary text-secondary-foreground' 
                  : 'text-warm-gray hover:bg-secondary/10'
              }`}
            >
              <FaChartBar className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Chart Container */}
      <div className="relative w-full" style={{ height: `${height}px` }}>
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-warm-gray">
          {[...Array(6)].map((_, i) => {
            const value = maxValue - (i * (range / 5));
            return (
              <div key={i} className="flex items-center h-6">
                {valuePrefix}{Math.round(value).toLocaleString()}{valueSuffix}
              </div>
            );
          })}
        </div>

        {/* Chart Area */}
        <div className="ml-20 h-full">
          {chartType === 'line' ? (
            // Line Chart
            <svg className="w-full h-full" viewBox={`0 0 ${chartWidth} ${chartHeight}`}>
              {/* Grid Lines */}
              {[...Array(6)].map((_, i) => (
                <line
                  key={i}
                  x1="0"
                  y1={i * (chartHeight / 5)}
                  x2={chartWidth}
                  y2={i * (chartHeight / 5)}
                  className="stroke-champagne/30"
                  strokeWidth="1"
                  strokeDasharray="4"
                />
              ))}

              {/* Data Line */}
              <polyline
                points={generateLinePoints()}
                fill="none"
                className="stroke-lavender"
                strokeWidth="2"
              />

              {/* Data Points */}
              {data.map((item, index) => {
                const x = (index / (data.length - 1)) * chartWidth;
                const y = chartHeight - ((item.value - minValue) / range) * chartHeight;
                return (
                  <circle
                    key={index}
                    cx={x}
                    cy={y}
                    r="4"
                    className="fill-white stroke-lavender"
                    strokeWidth="2"
                  />
                );
              })}
            </svg>
          ) : (
            // Bar Chart
            <div className="flex items-end justify-between h-full gap-2">
              {data.map((item, index) => {
                const height = ((item.value - minValue) / range) * 100;
                return (
                  <div key={index} className="flex-1 flex flex-col items-center gap-2">
                    <div 
                      className="w-full bg-lavender/20 rounded-t-lg relative group"
                      style={{ height: `${height}%` }}
                    >
                      <div className="absolute inset-x-0 bottom-0 bg-lavender rounded-t-lg transition-all duration-300 
                        group-hover:h-full" style={{ height: `${height * 0.6}%` }}></div>
                    </div>
                    <span className="text-xs text-warm-gray">{item.label}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsChart; 
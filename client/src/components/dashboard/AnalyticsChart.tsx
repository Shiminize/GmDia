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
      <div className="analytics-chart">
        <div className="chart-header">
          <div className="skeleton skeleton-text" style={{ width: '200px', height: '24px' }}></div>
          <div className="skeleton skeleton-text" style={{ width: '120px', height: '36px' }}></div>
        </div>
        <div className="chart-container" style={{ height: `${height}px` }}>
          <div className="skeleton" style={{ 
            width: '100%', 
            height: '100%',
            borderRadius: 'var(--radius-medium)'
          }}></div>
        </div>
      </div>
    );
  }

  return (
    <div className="analytics-chart" style={{
      background: 'var(--pure-white)',
      borderRadius: 'var(--radius-large)',
      border: '1px solid var(--champagne-beige)',
      padding: '1.5rem',
      marginBottom: '1.5rem'
    }}>
      {/* Chart Header */}
      <div className="chart-header" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1.5rem'
      }}>
        <div>
          <h3 style={{
            margin: 0,
            fontFamily: 'var(--font-primary)',
            color: 'var(--graphite-black)',
            fontSize: '1.25rem'
          }}>
            {title}
          </h3>
          {showTrend && overallTrend && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginTop: '0.5rem'
            }}>
              <span style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem',
                fontSize: '0.9rem',
                fontWeight: '500',
                color: overallTrend.isPositive ? 'var(--pale-sage)' : 'var(--error-color)'
              }}>
                {overallTrend.isPositive ? <FaArrowUp /> : <FaArrowDown />}
                {overallTrend.value.toFixed(1)}%
              </span>
              <span style={{
                fontSize: '0.8rem',
                color: 'var(--warm-gray)'
              }}>
                vs last {selectedPeriod}
              </span>
            </div>
          )}
        </div>
        
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          {/* Period Selector */}
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value as any)}
            style={{
              padding: '0.5rem',
              borderRadius: 'var(--radius-medium)',
              border: '1px solid var(--champagne-beige)',
              background: 'var(--pure-white)',
              fontSize: '0.8rem',
              color: 'var(--graphite-black)'
            }}
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
          
          {/* Chart Type Selector */}
          <div style={{ 
            display: 'flex', 
            background: 'var(--light-gray)',
            borderRadius: 'var(--radius-medium)',
            padding: '0.25rem'
          }}>
            <button
              onClick={() => setChartType('line')}
              style={{
                background: chartType === 'line' ? 'var(--digital-lavender)' : 'transparent',
                color: chartType === 'line' ? 'var(--pure-white)' : 'var(--warm-gray)',
                border: 'none',
                padding: '0.5rem',
                borderRadius: 'var(--radius-small)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                transition: 'all 0.2s ease'
              }}
            >
              <FaChartLine />
            </button>
            <button
              onClick={() => setChartType('bar')}
              style={{
                background: chartType === 'bar' ? 'var(--digital-lavender)' : 'transparent',
                color: chartType === 'bar' ? 'var(--pure-white)' : 'var(--warm-gray)',
                border: 'none',
                padding: '0.5rem',
                borderRadius: 'var(--radius-small)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                transition: 'all 0.2s ease'
              }}
            >
              <FaChartBar />
            </button>
          </div>
        </div>
      </div>

      {/* Chart Container */}
      <div className="chart-container" style={{
        height: `${height}px`,
        position: 'relative',
        background: 'var(--light-gray)',
        borderRadius: 'var(--radius-medium)',
        padding: '1rem',
        overflow: 'hidden'
      }}>
        {/* Chart Area */}
        <div style={{
          position: 'relative',
          height: '100%',
          width: '100%'
        }}>
          {/* Y-axis labels */}
          <div style={{
            position: 'absolute',
            left: 0,
            top: 0,
            height: chartHeight,
            display: 'flex',
            flexDirection: 'column-reverse',
            justifyContent: 'space-between',
            width: '50px',
            fontSize: '0.8rem',
            color: 'var(--warm-gray)'
          }}>
            {[0, 0.25, 0.5, 0.75, 1].map((ratio, index) => (
              <span key={index} style={{ 
                display: 'block',
                textAlign: 'right',
                paddingRight: '0.5rem'
              }}>
                {valuePrefix}{Math.round(minValue + (range * ratio)).toLocaleString()}{valueSuffix}
              </span>
            ))}
          </div>

          {/* Chart SVG */}
          <svg
            style={{
              position: 'absolute',
              left: '60px',
              top: 0,
              width: 'calc(100% - 80px)',
              height: chartHeight,
              overflow: 'visible'
            }}
            viewBox={`0 0 ${chartWidth} ${chartHeight}`}
            preserveAspectRatio="none"
          >
            {/* Grid lines */}
            {[0, 0.25, 0.5, 0.75, 1].map((ratio, index) => (
              <line
                key={index}
                x1="0"
                y1={chartHeight - (ratio * chartHeight)}
                x2={chartWidth}
                y2={chartHeight - (ratio * chartHeight)}
                stroke="var(--champagne-beige)"
                strokeWidth="0.5"
                opacity="0.5"
              />
            ))}

            {chartType === 'line' ? (
              <>
                {/* Line chart */}
                <polyline
                  points={generateLinePoints()}
                  fill="none"
                  stroke="var(--digital-lavender)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {/* Data points */}
                {data.map((item, index) => {
                  const x = (index / (data.length - 1)) * chartWidth;
                  const y = chartHeight - ((item.value - minValue) / range) * chartHeight;
                  return (
                    <g key={index}>
                      <circle
                        cx={x}
                        cy={y}
                        r="4"
                        fill="var(--digital-lavender)"
                        stroke="var(--pure-white)"
                        strokeWidth="2"
                      />
                      {/* Hover area */}
                      <circle
                        cx={x}
                        cy={y}
                        r="8"
                        fill="transparent"
                        style={{ cursor: 'pointer' }}
                      >
                        <title>{item.label}: {valuePrefix}{item.value.toLocaleString()}{valueSuffix}</title>
                      </circle>
                    </g>
                  );
                })}
              </>
            ) : (
              <>
                {/* Bar chart */}
                {data.map((item, index) => {
                  const barWidth = chartWidth / data.length * 0.8;
                  const x = (index / data.length) * chartWidth + (chartWidth / data.length - barWidth) / 2;
                  const barHeight = ((item.value - minValue) / range) * chartHeight;
                  const y = chartHeight - barHeight;
                  
                  return (
                    <g key={index}>
                      <rect
                        x={x}
                        y={y}
                        width={barWidth}
                        height={barHeight}
                        fill="var(--digital-lavender)"
                        rx="2"
                        style={{ cursor: 'pointer' }}
                      >
                        <title>{item.label}: {valuePrefix}{item.value.toLocaleString()}{valueSuffix}</title>
                      </rect>
                    </g>
                  );
                })}
              </>
            )}
          </svg>

          {/* X-axis labels */}
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: '60px',
            width: 'calc(100% - 80px)',
            height: '40px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '0.8rem',
            color: 'var(--warm-gray)'
          }}>
            {data.map((item, index) => (
              <span key={index} style={{
                textAlign: 'center',
                maxWidth: `${100 / data.length}%`,
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis'
              }}>
                {item.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Data Summary */}
      <div style={{
        marginTop: '1rem',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
        gap: '1rem',
        padding: '1rem',
        background: 'var(--light-gray)',
        borderRadius: 'var(--radius-medium)'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            fontSize: '1.2rem', 
            fontWeight: 'bold', 
            color: 'var(--graphite-black)',
            marginBottom: '0.25rem'
          }}>
            {valuePrefix}{maxValue.toLocaleString()}{valueSuffix}
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--warm-gray)' }}>
            Peak
          </div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            fontSize: '1.2rem', 
            fontWeight: 'bold', 
            color: 'var(--graphite-black)',
            marginBottom: '0.25rem'
          }}>
            {valuePrefix}{Math.round(data.reduce((sum, item) => sum + item.value, 0) / data.length).toLocaleString()}{valueSuffix}
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--warm-gray)' }}>
            Average
          </div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            fontSize: '1.2rem', 
            fontWeight: 'bold', 
            color: 'var(--graphite-black)',
            marginBottom: '0.25rem'
          }}>
            {valuePrefix}{data.reduce((sum, item) => sum + item.value, 0).toLocaleString()}{valueSuffix}
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--warm-gray)' }}>
            Total
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsChart; 
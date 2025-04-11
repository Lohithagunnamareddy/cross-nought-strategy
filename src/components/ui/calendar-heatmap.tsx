
import React from 'react';
import { format, eachDayOfInterval, isSameDay } from 'date-fns';

interface CalendarHeatmapProps {
  data: Array<{ date: string; count: number }>;
  startDate: Date;
  endDate: Date;
  colorScale?: string[];
  emptyColor?: string;
  cellSize?: number;
  cellMargin?: number;
}

export const CalendarHeatmap: React.FC<CalendarHeatmapProps> = ({
  data,
  startDate,
  endDate,
  colorScale = ['#f3f4f6', '#dbeafe', '#93c5fd', '#3b82f6', '#1d4ed8'],
  emptyColor = '#f3f4f6',
  cellSize = 12,
  cellMargin = 2
}) => {
  // Generate all days between start and end dates
  const days = eachDayOfInterval({ start: startDate, end: endDate });

  // Days of the week
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Function to get the color for a specific day
  const getColorForDay = (day: Date) => {
    const dayData = data.find(d => isSameDay(new Date(d.date), day));
    
    if (!dayData || dayData.count === 0) return emptyColor;
    
    // Determine color based on count value
    const maxCount = Math.max(...data.map(d => d.count));
    const step = maxCount / (colorScale.length - 1);
    const colorIndex = Math.min(
      Math.floor(dayData.count / step),
      colorScale.length - 1
    );
    
    return colorScale[colorIndex];
  };

  // Group days by week
  const weeks: Date[][] = [];
  let currentWeek: Date[] = [];

  days.forEach((day, index) => {
    currentWeek.push(day);
    
    // If it's the last day of the week (Saturday) or the last day overall
    if (day.getDay() === 6 || index === days.length - 1) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  });

  return (
    <div className="w-full overflow-auto">
      <div className="flex mb-1">
        <div style={{ width: `${cellSize * 2}px` }}></div>
        {daysOfWeek.map((day, i) => (
          <div 
            key={i}
            className="text-xs text-muted-foreground text-center"
            style={{ 
              width: `${cellSize}px`, 
              marginRight: `${cellMargin}px` 
            }}
          >
            {day[0]}
          </div>
        ))}
      </div>
      
      {weeks.map((week, weekIndex) => (
        <div key={weekIndex} className="flex mb-1 items-center">
          <div 
            className="text-xs text-muted-foreground mr-1"
            style={{ width: `${cellSize * 2}px`, textAlign: 'right' }}
          >
            {week.length > 0 && format(week[0], 'MMM d')}
          </div>
          
          {Array(7).fill(0).map((_, dayOfWeek) => {
            const day = week.find(d => d.getDay() === dayOfWeek);
            
            return (
              <div
                key={dayOfWeek}
                title={day ? `${format(day, 'MMM d')}: ${data.find(d => isSameDay(new Date(d.date), day))?.count || 0} contributions` : 'No data'}
                style={{
                  width: `${cellSize}px`,
                  height: `${cellSize}px`,
                  backgroundColor: day ? getColorForDay(day) : 'transparent',
                  marginRight: `${cellMargin}px`,
                  borderRadius: '2px'
                }}
              ></div>
            );
          })}
        </div>
      ))}
      
      <div className="flex items-center justify-end mt-2">
        <span className="text-xs text-muted-foreground mr-2">Less</span>
        {colorScale.map((color, i) => (
          <div
            key={i}
            style={{
              width: `${cellSize}px`,
              height: `${cellSize}px`,
              backgroundColor: color,
              marginRight: i < colorScale.length - 1 ? `${cellMargin}px` : '0',
              borderRadius: '2px'
            }}
          ></div>
        ))}
        <span className="text-xs text-muted-foreground ml-2">More</span>
      </div>
    </div>
  );
};

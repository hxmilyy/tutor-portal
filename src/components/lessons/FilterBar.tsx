import { addMonths, format, parse, subMonths } from 'date-fns';
import { zhCN } from 'date-fns/locale'; // Chinese locale
import React from 'react';
import { useLessonStore } from '../../store/useLessonStore';

export const FilterBar: React.FC = () => {
  const { selectedMonth, setMonth } = useLessonStore();

  // Parse the currently selected month string into a Date object
  const currentSafeDate = parse(selectedMonth, 'yyyy-MM', new Date());

  const handlePrevMonth = () => {
    const prev = subMonths(currentSafeDate, 1);
    setMonth(format(prev, 'yyyy-MM'));
  };

  const handleNextMonth = () => {
    const next = addMonths(currentSafeDate, 1);
    setMonth(format(next, 'yyyy-MM'));
  };

  const handleGoToday = () => {
    setMonth(format(new Date(), 'yyyy-MM'));
  };

  return (
    <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm mb-8 flex flex-col space-y-4 lg:flex-row md:space-y-0 lg:items-center lg:justify-between gap-4">
      {/* Month Switcher */}
      <div className="flex items-center space-x-4 justify-between md:justify-start">
        <div className="flex items-center bg-gray-100 rounded-lg p-1">
          <button
            onClick={handlePrevMonth}
            className="p-2 hover:bg-white hover:shadow-sm rounded-md transition-all"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <div className="px-4 py-1 min-w-[120px] text-center font-bold text-gray-800">
            {format(currentSafeDate, 'yyyy MMMM', { locale: zhCN })}
          </div>

          <button
            onClick={handleNextMonth}
            className="p-2 hover:bg-white hover:shadow-sm rounded-md transition-all"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <button 
          onClick={handleGoToday}
          className="text-sm text-blue-600 font-medium hover:underline"
        >
          Back to Today
        </button>
      </div>

      {/* Date range placeholder (native HTML5 date enhancement) */}
      <div className="flex items-center space-x-2 w-full md:w-auto">
        <span className="text-sm text-gray-500">Date Filter:</span>
        <input 
          type="date" 
          className="flex-1 md:w-40 text-sm border border-gray-300 rounded-md px-2 py-1 focus:ring-2 focus:ring-blue-500 outline-none"
          onChange={(e) => {
            // Logic: If a specific date is selected, the filter in the Store can be updated synchronously
             console.log(e.target.value);
          }}
        />
      </div>
    </div>
  );
};
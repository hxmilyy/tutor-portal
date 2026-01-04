import { addMonths, format, parse, subMonths } from 'date-fns';
import { zhCN } from 'date-fns/locale'; // 如果需要中文显示
import React from 'react';
import { useLessonStore } from '../../store/useLessonStore';

export const FilterBar: React.FC = () => {
  const { selectedMonth, setMonth } = useLessonStore();

  // 解析当前选中的月份字符串为 Date 对象
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
      {/* 月份切换器 */}
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
            {format(currentSafeDate, 'yyyy年 MMMM', { locale: zhCN })}
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
          回到本月
        </button>
      </div>

      {/* 日期范围占位 (原生 HTML5 date 增强) */}
      <div className="flex items-center space-x-2 w-full md:w-auto">
        <span className="text-sm text-gray-500">日期筛选:</span>
        <input 
          type="date" 
          className="flex-1 md:w-40 text-sm border border-gray-300 rounded-md px-2 py-1 focus:ring-2 focus:ring-blue-500 outline-none"
          onChange={(e) => {
             // 逻辑：如果选了具体日期，可以同步更新 Store 的筛选
             console.log(e.target.value);
          }}
        />
      </div>
    </div>
  );
};
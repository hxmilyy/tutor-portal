import React, { useEffect } from 'react';
import { useLessonStore } from '../../store/useLessonStore';
import { LessonCard } from '../../components/lessons/LessonCard';
import type { Lesson } from '../../types';
import { FilterBar } from '../../components/lessons/FilterBar';

export const Dashboard: React.FC = () => {
  const { fetchLessons, isLoading, getFilteredLessons, selectedMonth } = useLessonStore();

  // 获取分类后的数据
  const sections = getFilteredLessons();

  useEffect(() => {
    fetchLessons();
  }, [selectedMonth, fetchLessons]);

  return (
    <div className="space-y-8">
      {/* 1. 页面标题区 */}
      <header>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">教学日程</h1>
        <p className="text-slate-500 mt-1">查看并管理您的课程安排</p>
      </header>

      {/* 2. 筛选栏集成 
          sticky top-0: 滚动时固定在顶部
          z-10: 确保不被卡片遮挡
      */}
      <div className="sticky top-0 z-10 bg-gray-50/80 backdrop-blur-md py-4">
        <FilterBar />
      </div>

      {/* 3. 课程列表区 */}
      <div className="space-y-12 pb-20">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 这里可以放三个 Skeleton 卡片占位 */}
            <div className="h-48 bg-gray-200 animate-pulse rounded-xl" />
            <div className="h-48 bg-gray-200 animate-pulse rounded-xl" />
            <div className="h-48 bg-gray-200 animate-pulse rounded-xl" />
          </div>
        ) : (
          <>
            <LessonSection title="今日课程" lessons={sections.today} />
            <LessonSection title="可领取课程" lessons={sections.available} />
            <LessonSection title="即将到来" lessons={sections.upcoming} />
            <LessonSection title="历史课程" lessons={sections.historic} />
          </>
        )}
      </div>
    </div>
  );
};

// --- 内部子组件：Section 容器 ---

interface SectionProps {
  title: string;
  lessons: Lesson[];
  variant?: 'default' | 'highlight';
}

const LessonSection: React.FC<SectionProps> = ({ title, lessons, variant = 'default' }) => {
  return (
    <section>
      <div className="flex items-center mb-4">
        <h2 className={`text-lg font-semibold ${variant === 'highlight' ? 'text-blue-600' : 'text-gray-800'}`}>
          {title}
        </h2>
        <span className="ml-3 px-2 py-0.5 bg-gray-100 text-gray-500 text-xs rounded-full">
          {lessons.length}
        </span>
      </div>

      {lessons.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {lessons.map((lesson) => (
            <LessonCard key={lesson.id} lesson={lesson} />
          ))}
        </div>
      ) : (
        <div className="border-2 border-dashed border-gray-200 rounded-xl py-10 text-center">
          <p className="text-gray-400 text-sm">暂无{title}</p>
        </div>
      )}
    </section>
  );
};
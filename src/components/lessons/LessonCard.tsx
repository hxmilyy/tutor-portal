import React, { useState } from 'react';
import { type Lesson } from '../../types/index';
import { format, parseISO } from 'date-fns';
import { useLessonStore } from '../../store/useLessonStore';

interface LessonCardProps {
    lesson: Lesson;
}

export const LessonCard: React.FC<LessonCardProps> = ({ lesson }) => {
    const [isTaking, setIsTaking] = useState(false);
    const takeLesson = useLessonStore((state) => state.takeLesson);

    // 根据状态定义颜色方案
    const statusStyles = {
        Completed: {
            border: 'border-l-gray-400',
            badge: 'bg-gray-100 text-gray-600',
            bg: 'bg-gray-50/50'
        },
        Confirmed: {
            border: 'border-l-blue-500',
            badge: 'bg-blue-100 text-blue-700',
            bg: 'bg-white'
        },
        Available: {
            border: 'border-l-green-500',
            badge: 'bg-green-100 text-green-700',
            bg: 'bg-white'
        }
    };

    const currentStyle = statusStyles[lesson.status];

    const handleTakeClass = async () => {
        setIsTaking(true);
        try {
            // 模拟当前登录导师为 "Sarah Tan"
            await takeLesson(lesson.id, "Sarah Tan");
        } catch (error) {
            alert("领取失败，请稍后重试");
        } finally {
            setIsTaking(false);
        }
    };

    return (
        <div className={`group relative flex flex-col justify-between p-5 rounded-xl border border-gray-200 border-l-4 ${currentStyle.border} ${currentStyle.bg} shadow-sm transition-all hover:shadow-md`}>

            {/* 顶部：科目与标签 */}
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="font-bold text-gray-900 text-lg leading-tight group-hover:text-blue-600 transition-colors">
                        {lesson.subject}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">{lesson.type || 'Standard Class'}</p>
                </div>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${currentStyle.badge}`}>
                    {lesson.status}
                </span>
            </div>

            {/* 中部：时间与学生信息 */}
            <div className="space-y-3 mb-6">
                <div className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {format(parseISO(lesson.date), 'PPP p')}
                </div>

                <div className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    {lesson.students.length > 0 ? lesson.students.join(', ') : 'No students enrolled'}
                </div>
            </div>

            {/* 底部：动作按钮 */}
            {lesson.status === 'Available' && (
                <button
                    onClick={handleTakeClass}
                    disabled={isTaking}
                    className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white rounded-lg font-semibold text-sm transition-colors flex items-center justify-center"
                >
                    {isTaking ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            处理中...
                        </>
                    ) : 'Take Class'}
                </button>
            )}

            {lesson.status === 'Confirmed' && (
                <div className="text-xs text-gray-400 italic text-right">
                    Tutor: {lesson.tutor}
                </div>
            )}
        </div>
    );
};
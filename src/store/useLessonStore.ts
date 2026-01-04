import { create } from 'zustand';
import type { Lesson } from '../types/index'; // 假设你已定义好类型
// 假设你已定义好类型
import { lessonApi } from '../api/lessonApi';
import { isToday, parseISO, format } from 'date-fns';

interface LessonState {
    // 原始数据
    lessons: Lesson[];
    isLoading: boolean;
    error: string | null;

    // 筛选条件
    selectedMonth: string; // 格式: "yyyy-MM"
    dateRange: [Date | null, Date | null];

    // Actions
    fetchLessons: () => Promise<void>;
    setMonth: (month: string) => void;
    setDateRange: (range: [Date | null, Date | null]) => void;
    takeLesson: (lessonId: string, tutorName: string) => Promise<void>;

    // Derived State (派生状态 - 类似 Getter)
    getFilteredLessons: () => {
        today: Lesson[];
        upcoming: Lesson[];
        historic: Lesson[];
        available: Lesson[];
    };
}

export const useLessonStore = create<LessonState>((set, get) => ({
    lessons: [],
    isLoading: false,
    error: null,
    selectedMonth: format(new Date(), 'yyyy-MM'),
    dateRange: [null, null],

    // 获取数据
    fetchLessons: async () => {
        set({ isLoading: true, error: null });
        try {
            // 传入当前选中的月份进行 API 筛选
            const data = await lessonApi.getLessons({ month: get().selectedMonth });
            set({ lessons: data, isLoading: false });
        } catch (err) {
            set({ error: '无法加载课程数据', isLoading: false });
        }
    },

    // 切换月份并重新抓取
    setMonth: (month) => {
        set({ selectedMonth: month });
        get().fetchLessons();
    },

    setDateRange: (range) => set({ dateRange: range }),

    // 领取课程：更新远程并同步本地状态
    takeLesson: async (lessonId, tutorName) => {
        try {
            const updatedLesson = await lessonApi.takeLesson(lessonId, tutorName);
            // 更新本地数组，避免全量重新请求
            set((state) => ({
                lessons: state.lessons.map((l) => (l.id === lessonId ? updatedLesson : l)),
            }));
        } catch (err) {
            console.error('领取失败:', err);
            throw err;
        }
    },

    // 核心逻辑：派生分类数据
    getFilteredLessons: () => {
        const { lessons, dateRange } = get();

        // 1. 如果有日期范围筛选，先过滤一遍
        let filtered = lessons;
        if (dateRange[0] && dateRange[1]) {
            filtered = lessons.filter(l => {
                const d = parseISO(l.date);
                return d >= dateRange[0]! && d <= dateRange[1]!;
            });
        }

        // 2. 按照需求文档的四个 Section 进行归类
        return {
            today: filtered.filter(l => isToday(parseISO(l.date))),
            upcoming: filtered.filter(l => l.status === 'Confirmed' && !isToday(parseISO(l.date))),
            historic: filtered.filter(l => l.status === 'Completed'),
            available: filtered.filter(l => l.status === 'Available'),
        };
    },
}));
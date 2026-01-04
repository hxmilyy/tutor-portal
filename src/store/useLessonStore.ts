import { create } from 'zustand';
import type { Lesson } from '../types/index'; // Assume Lesson type is defined
import { lessonApi } from '../api/lessonApi';
import { isToday, parseISO, format } from 'date-fns';

interface LessonState {
    // Raw data
    lessons: Lesson[];
    isLoading: boolean;
    error: string | null;

    // Filter criteria
    selectedMonth: string; // Format: "yyyy-MM"
    dateRange: [Date | null, Date | null];

    // Actions
    fetchLessons: () => Promise<void>;
    setMonth: (month: string) => void;
    setDateRange: (range: [Date | null, Date | null]) => void;
    takeLesson: (lessonId: string, tutorName: string) => Promise<void>;

    // Derived State (like getters)
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

    // Fetch data
    fetchLessons: async () => {
        set({ isLoading: true, error: null });
        try {
            // Pass the currently selected month to API for filtering
            const data = await lessonApi.getLessons({ month: get().selectedMonth });
            set({ lessons: data, isLoading: false });
        } catch (err) {
            set({ error: 'Unable to load lesson data', isLoading: false });
        }
    },

    // Change month and refetch
    setMonth: (month) => {
        set({ selectedMonth: month });
        get().fetchLessons();
    },

    setDateRange: (range) => set({ dateRange: range }),

    // Take lesson: update remote and sync local state
    takeLesson: async (lessonId, tutorName) => {
        try {
            const updatedLesson = await lessonApi.takeLesson(lessonId, tutorName);
            // Update local array to avoid refetching everything
            set((state) => ({
                lessons: state.lessons.map((l) => (l.id === lessonId ? updatedLesson : l)),
            }));
        } catch (err) {
            console.error('Failed to take lesson:', err);
            throw err;
        }
    },

    // Core logic: derived categorized data
    getFilteredLessons: () => {
        const { lessons, dateRange } = get();

        // 1. If a date range filter exists, filter first
        let filtered = lessons;
        if (dateRange[0] && dateRange[1]) {
            filtered = lessons.filter(l => {
                const d = parseISO(l.date);
                return d >= dateRange[0]! && d <= dateRange[1]!;
            });
        }

        // 2. Categorize into four sections as required
        return {
            today: filtered.filter(l => isToday(parseISO(l.date))),
            upcoming: filtered.filter(l => l.status === 'Confirmed' && !isToday(parseISO(l.date))),
            historic: filtered.filter(l => l.status === 'Completed'),
            available: filtered.filter(l => l.status === 'Available'),
        };
    },
}));
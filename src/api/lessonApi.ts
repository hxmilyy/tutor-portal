import { mockLessons, type Lesson } from '../types/index';

// 模拟延迟效果
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const lessonApi = {
  // 获取课程，支持简单的日期过滤逻辑
  getLessons: async (filters?: { month?: string; dateRange?: [string, string] }): Promise<Lesson[]> => {
    await sleep(800); // 模拟网络加载

    let filtered = [...mockLessons];

    if (filters?.month) {
      filtered = filtered.filter(l => l.date.startsWith(filters.month!));
    }
    
    // 这里可以添加更多复杂的过滤逻辑
    return filtered;
  },

  // 领取课程动作
  takeLesson: async (lessonId: string, tutorName: string): Promise<Lesson> => {
    await sleep(500);
    const index = mockLessons.findIndex(l => l.id === lessonId);
    if (index === -1) throw new Error("Lesson not found");

    // 更新 Mock 状态
    mockLessons[index] = {
      ...mockLessons[index],
      tutor: tutorName,
      status: 'Confirmed',
      type: 'Upcoming'
    };
    
    return mockLessons[index];
  }
};
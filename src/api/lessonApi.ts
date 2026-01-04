import { mockLessons, type Lesson } from '../types/index';

// simulate network delay
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const lessonApi = {
  // Get lessons with simple date filtering logic
  getLessons: async (filters?: { month?: string; dateRange?: [string, string] }): Promise<Lesson[]> => {
    await sleep(800); // simulate network loading

    let filtered = [...mockLessons];

    if (filters?.month) {
      filtered = filtered.filter(l => l.date.startsWith(filters.month!));
    }

    // Here you can add more complex filtering logic
    return filtered;
  },

  // Take lesson action
  takeLesson: async (lessonId: string, tutorName: string): Promise<Lesson> => {
    await sleep(500);
    const index = mockLessons.findIndex(l => l.id === lessonId);
    if (index === -1) throw new Error("Lesson not found");

    // Update mock state
    mockLessons[index] = {
      ...mockLessons[index],
      tutor: tutorName,
      status: 'Confirmed',
      type: 'Upcoming'
    };
    
    return mockLessons[index];
  }
};
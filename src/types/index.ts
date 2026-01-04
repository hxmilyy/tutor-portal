// types.ts
export type LessonStatus = 'Completed' | 'Confirmed' | 'Available';
export type LessonType = 'Historic' | 'Upcoming' | 'Available' | 'Today';

export interface Lesson {
    id: string;
    date: string; // ISO 8601 格式，例如 "2025-11-08T10:00:00Z"
    type: LessonType;
    subject: string;
    students: string[];
    tutor: string | null;
    status: LessonStatus;
}

// mockData.ts
export const mockLessons: Lesson[] = [
    {
        "id": "L001",
        "date": "2025-10-28T14:00:00Z",
        "type": "Historic",
        "subject": "Minecraft Game Design - Level 1",
        "students": ["Ethan", "Ava"],
        "tutor": "Sarah Tan",
        "status": "Completed"
    },
    {
        "id": "L002",
        "date": "2025-11-02T09:00:00Z",
        "type": "Historic",
        "subject": "Roblox Coding Basics",
        "students": ["Lucas"],
        "tutor": "Sarah Tan",
        "status": "Completed"
    },
    {
        "id": "L003",
        "date": "2025-11-05T16:00:00Z",
        "type": "Historic",
        "subject": "Python for Kids - Introduction",
        "students": ["Chloe", "Aaron"],
        "tutor": "Sarah Tan",
        "status": "Completed"
    },
    {
        "id": "L004",
        "date": "2025-11-08T10:00:00Z",
        "type": "Upcoming",
        "subject": "Minecraft Redstone Logic",
        "students": ["Emma", "Noah"],
        "tutor": "Sarah Tan",
        "status": "Confirmed"
    },
    {
        "id": "L005",
        "date": "2025-11-09T15:00:00Z",
        "type": "Upcoming",
        "subject": "Roblox Game Design - Level 2",
        "students": ["Ryan", "Mia"],
        "tutor": "Sarah Tan",
        "status": "Confirmed"
    },
    {
        "id": "L006",
        "date": "2025-11-10T12:00:00Z",
        "type": "Upcoming",
        "subject": "Website Design for Beginners",
        "students": ["Olivia"],
        "tutor": "Sarah Tan",
        "status": "Confirmed"
    },
    {
        "id": "L007",
        "date": "2025-11-12T11:00:00Z",
        "type": "Available",
        "subject": "Python for Kids - Game Projects",
        "students": [],
        "tutor": null,
        "status": "Available"
    },
    {
        "id": "L008",
        "date": "2025-11-13T17:00:00Z",
        "type": "Available",
        "subject": "Roblox Game Design - Level 1",
        "students": [],
        "tutor": null,
        "status": "Available"
    },
    {
        "id": "L009",
        "date": "2025-11-14T10:00:00Z",
        "type": "Available",
        "subject": "Minecraft AI Coding Adventure",
        "students": [],
        "tutor": null,
        "status": "Available"
    },
    {
        "id": "L010",
        "date": "2025-11-15T09:00:00Z",
        "type": "Upcoming",
        "subject": "Python Automation for Kids",
        "students": ["Elijah"],
        "tutor": "Sarah Tan",
        "status": "Confirmed"
    }
];

/**
 * 导师/用户信息接口
 */
export interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
}

/**
 * API 响应包装（可选，如果你想模拟标准的后端返回）
 */
export interface ApiResponse<T> {
    data: T;
    message?: string;
    status: number;
}

/**
 * 筛选器状态
 */
export interface FilterState {
    month: string; // "YYYY-MM"
    dateRange: {
        start: Date | null;
        end: Date | null;
    };
}
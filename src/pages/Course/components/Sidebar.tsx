import { useState } from 'react';
import { ChevronDown, ChevronRight, Check, BookOpen } from 'lucide-react';

interface Lesson {
  id: string;
  title: string;
  completed: boolean;
  isActive?: boolean;
}

interface Chapter {
  id: string;
  title: string;
  progress: number;
  lessons: Lesson[];
  isExpanded?: boolean;
  isActive?: boolean;
}

const chapters: Chapter[] = [
  {
    id: '1',
    title: 'Глава 1 — Основы сварки',
    progress: 100,
    isExpanded: true,
    isActive: true,
    lessons: [
      { id: '1-1', title: 'Что такое сварка', completed: true },
      { id: '1-2', title: 'Источники тока', completed: true },
      { id: '1-3', title: 'Типы процессов', completed: true, isActive: false },
    ],
  },
  {
    id: '2',
    title: 'Глава 2 — Оборудование',
    progress: 60,
    isExpanded: true,
    isActive: false,
    lessons: [
      { id: '2-1', title: 'Сварочные аппараты', completed: true },
      { id: '2-2', title: 'Электроды', completed: true, isActive: true },
      { id: '2-3', title: 'Защитный газ', completed: false },
    ],
  },
  {
    id: '3',
    title: 'Глава 3 — Режимы и параметры',
    progress: 0,
    isExpanded: false,
    lessons: [
      { id: '3-1', title: 'Сварочный ток', completed: false },
      { id: '3-2', title: 'Напряжение', completed: false },
      { id: '3-3', title: 'Полярность', completed: false },
      { id: '3-4', title: 'Толщина металла', completed: false },
    ],
  },
  {
    id: '4',
    title: 'Глава 4 — Дефекты',
    progress: 0,
    isExpanded: false,
    lessons: [
      { id: '4-1', title: 'Виды дефектов', completed: false },
      { id: '4-2', title: 'Причины возникновения', completed: false },
      { id: '4-3', title: 'Способы устранения', completed: false },
    ],
  },
  {
    id: '5',
    title: 'Глава 5 — Безопасность',
    progress: 0,
    isExpanded: false,
    lessons: [
      { id: '5-1', title: 'Средства защиты', completed: false },
      { id: '5-2', title: 'Правила работы', completed: false },
      { id: '5-3', title: 'Первая помощь', completed: false },
    ],
  },
];

export const Sidebar = () => {
  const [expandedChapters, setExpandedChapters] = useState<Set<string>>(
    new Set(['1', '2'])
  );

  const toggleChapter = (chapterId: string) => {
    setExpandedChapters((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(chapterId)) {
        newSet.delete(chapterId);
      } else {
        newSet.add(chapterId);
      }
      return newSet;
    });
  };

  return (
    <aside className="w-100 h-screen bg-white border-r border-gray-200 flex flex-col sticky top-0">
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#0C0D33] flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-[#0C0D33]">Обучение сварке</h1>
            <p className="text-xs text-gray-500">Профессиональный курс</p>
          </div>
        </div>
      </div>

      {/* Chapters List */}
      <div className="flex-1 overflow-y-auto py-4">
        {chapters.map((chapter) => {
          const isExpanded = expandedChapters.has(chapter.id);
          const isActive = chapter.isActive;

          return (
            <div key={chapter.id} className="mb-1">
              {/* Chapter Header */}
              <button
                onClick={() => toggleChapter(chapter.id)}
                className={`w-full px-6 py-3 flex items-center justify-between transition-all duration-200 relative ${
                  isActive ? 'bg-gray-50' : 'hover:bg-gray-50'
                }`}
              >
                {isActive && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#DD6207]" />
                )}
                <div className="flex items-center gap-2 flex-1">
                  {isExpanded ? (
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  )}
                  <span
                    className={`text-md font-medium text-left ${
                      isActive ? 'text-[#0C0D33]' : 'text-gray-700'
                    }`}
                  >
                    {chapter.title}
                  </span>
                </div>
              </button>

              {/* Progress Bar */}
              <div className="px-12 mb-2">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-base text-gray-400">{chapter.progress}%</span>
                </div>
                <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#DD6207] rounded-full transition-all duration-300"
                    style={{ width: `${chapter.progress}%` }}
                  />
                </div>
              </div>

              {/* Lessons */}
              {isExpanded && (
                <div className="animate-in slide-in-from-top-2 duration-200">
                  {chapter.lessons.map((lesson) => (
                    <button
                      key={lesson.id}
                      className={`w-full px-12 py-2.5 flex items-center gap-3 transition-all duration-200 group relative ${
                        lesson.isActive
                          ? 'bg-blue-50'
                          : 'hover:bg-orange-50/50'
                      }`}
                    >
                      {lesson.isActive && (
                        <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-[#DD6207]" />
                      )}
                      {lesson.completed ? (
                        <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                          <Check className="w-3 h-3 text-green-600" />
                        </div>
                      ) : (
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex-shrink-0 ${
                            lesson.isActive
                              ? 'border-[#DD6207]'
                              : 'border-gray-300 group-hover:border-[#DD6207]/50'
                          }`}
                        />
                      )}
                      <span
                        className={`text-md text-left flex-1 ${
                          lesson.isActive
                            ? 'text-[#0C0D33] font-medium'
                            : lesson.completed
                            ? 'text-gray-600'
                            : 'text-gray-500 group-hover:text-gray-700'
                        }`}
                      >
                        {lesson.title}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="p-6 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">Общий прогресс</span>
          <span className="text-sm font-semibold text-[#DD6207]">32%</span>
        </div>
        <div className="mt-2 h-2 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full w-[32%] bg-[#DD6207] rounded-full" />
        </div>
      </div>
    </aside>
  );
};

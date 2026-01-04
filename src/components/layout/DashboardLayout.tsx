import { Outlet, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { useState } from 'react';

export const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 flex flex-col md:flex-row">
      {/* 移动端遮罩层：侧边栏打开时遮住背景 */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/80 z-20 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      {/* 侧边栏 - 可以在这里处理响应式 */}
      <aside className={`
  /* 侧边栏基础样式 */
  w-64 bg-slate-900 text-white shrink-0 transition-transform duration-300
  
  /* 移动端 (小于 768px) 特有样式 */
  max-md:fixed max-md:inset-y-0 max-md:left-0 max-md:z-30
  ${isSidebarOpen ? 'max-md:translate-x-0' : 'max-md:-translate-x-full'}
  
  /* 桌面端 (大于 768px) 特有样式 */
  md:relative md:translate-x-0
`}>
        <div className="p-6 text-xl font-bold border-b border-slate-800">Champ Academy</div>
        <nav className="p-4 space-y-2">
          <div className="bg-blue-600 px-4 py-2 rounded-lg cursor-pointer">仪表盘</div>
          {/* 其他导航项... */}
        </nav>
      </aside>

      {/* 移动端导航栏：仅在手机端显示 */}
      <header className="md:hidden bg-slate-900 text-white p-4 flex justify-between items-center">
        <span className="font-bold">Champ Academy</span>
        <button className="p-2 tracking-tighter" onClick={() => setIsSidebarOpen(true)}>☰</button> {/* 这里可以加个抽屉菜单逻辑 */}
      </header>

      <div className="flex-1 flex flex-col min-w-0"> {/* min-w-0 防止内容溢出 */}
        {/* 顶部栏 */}
        <header className="h-16 px-8 flex items-center justify-between shrink-0 border-b border-gray-200 bg-white">
          <div className="text-sm text-gray-500">欢迎, {user?.name}</div>
          <button onClick={handleLogout} className="text-sm text-red-600 hover:font-bold">退出登录</button>
        </header>

        {/* 主内容区 */}
        <main className="flex-1 p-4 md:p-8 overflow-x-hidden overflow-y-auto">
          <div className="max-w-[1400px] mx-auto w-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
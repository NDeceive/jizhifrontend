import React, { useState } from "react";
import { motion } from "motion/react";
import { UserProfile, Course, WeakPoint, ErrorRecord, QuizQuestion } from "./types";
import {
  initialProfile,
  initialCourses,
  initialWeakPoints,
  initialErrorRecords
} from "./mockData";

// Views
import Portal from "./components/Portal";
import Dashboard from "./components/Dashboard";
import QuizView from "./components/QuizView";
import MentorView from "./components/MentorView";
import ResourceView from "./components/ResourceView";
import PathView from "./components/PathView";
import AssessmentView from "./components/AssessmentView";
import ErrorView from "./components/ErrorView";

import {
  Cpu,
  LogOut,
  User,
  LayoutDashboard,
  MessageSquare,
  Brain,
  Sparkles,
  Compass,
  Award,
  AlertTriangle,
  Github
} from "lucide-react";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [studentName, setStudentName] = useState("张同学");

  // Core Global States
  const [profile, setProfile] = useState<UserProfile>(initialProfile);
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [weakPoints, setWeakPoints] = useState<WeakPoint[]>(initialWeakPoints);
  const [errorRecords, setErrorRecords] = useState<ErrorRecord[]>(initialErrorRecords);

  // Navigations
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const [prefillPrompt, setPrefillPrompt] = useState<string | null>(null);

  const handleLogin = (name: string) => {
    setStudentName(name);
    setProfile((prev) => ({ ...prev, name }));
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setActiveTab("dashboard");
  };

  // Deep-linking navigation across tabs with optional prefilled prompts
  const handleNavigateToTab = (tab: string, prefillData?: any) => {
    setActiveTab(tab);
    if (prefillData && typeof prefillData === "string") {
      setPrefillPrompt(prefillData);
    }
  };

  // Add errored question dynamically to the local Error Bank list!
  const handleAddErrorRecord = (question: QuizQuestion, selectedIndex: number) => {
    // Avoid double adding
    if (errorRecords.some((rec) => rec.question === question.question)) return;

    const newRecord: ErrorRecord = {
      id: "err-dyn-" + Math.random().toString(36).substr(2, 9),
      title: `${question.domain} 专项测验偏误：${question.question.substring(0, 15)}...`,
      course: question.domain,
      question: question.question,
      code: question.code,
      options: question.options,
      userAnswer: selectedIndex,
      correctAnswer: question.answerIndex,
      diagnosis: {
        rootCause: `在本题关于【${question.domain}】的推演中，选错了答案选项。`,
        cognitiveTrap: "受到了相似抗干扰选项的误导，或者计算时在极端边界/计数上出现微调偏离。",
        learningPathAdjustment: "建议返回「AI智能问答」板块输入关键词并调阅该算法的执行动画。计智引擎已自动更新您的知识覆盖率和消灭进度。"
      },
      similarRecommendations: [
        `1. 关于 ${question.domain} 领域极值特性的延伸拓展题`,
        `2. 对比 ${question.domain} 不同算法在稠密条件下的表现`
      ],
      remediated: false,
      timestamp: new Date().toLocaleDateString()
    };

    setErrorRecords((prev) => [newRecord, ...prev]);

    // Adjust global weak points counters and profile stats
    setProfile((prev) => ({
      ...prev,
      weakPointsCount: prev.weakPointsCount + 1,
      pendingTasks: prev.pendingTasks + 1
    }));
  };

  // Mark specified error as remediated
  const handleRemediateRecord = (id: string) => {
    setErrorRecords((prev) =>
      prev.map((rec) => (rec.id === id ? { ...rec, remediated: true } : rec))
    );

    // Adjust profile counters
    setProfile((prev) => ({
      ...prev,
      weakPointsCount: Math.max(0, prev.weakPointsCount - 1),
      pendingTasks: Math.max(0, prev.pendingTasks - 1),
      proficiency: Math.min(100, prev.proficiency + 1)
    }));
  };

  if (!isLoggedIn) {
    return <Portal onLogin={handleLogin} />;
  }

  // Define tab navigation elements
  const tabs = [
    { id: "dashboard", label: "工作台", icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: "mentor", label: "AI 导师", icon: <MessageSquare className="w-4 h-4" /> },
    { id: "quiz", label: "自适应测验", icon: <Brain className="w-4 h-4" /> },
    { id: "resource", label: "资源生成", icon: <Sparkles className="w-4 h-4 text-amber-500" /> },
    { id: "path", label: "学习路径", icon: <Compass className="w-4 h-4" /> },
    { id: "analytics", label: "画像诊断", icon: <Award className="w-4 h-4" /> },
    { id: "errors", label: "错题本", icon: <AlertTriangle className="w-4 h-4" /> }
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans select-none selection:bg-indigo-100 selection:text-indigo-950">
      {/* 1. Main Navigation Header */}
      <header className="px-6 py-4 md:px-12 flex justify-between items-center border-b border-slate-100 bg-white sticky top-0 z-20 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-600 p-2 rounded-xl text-white shadow-md shadow-indigo-100">
            <Cpu className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-slate-900 font-sans flex items-center gap-1.5">
              计智引擎 <span className="text-[10px] font-bold bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full">Workbench v2.5</span>
            </h1>
            <p className="text-[9px] text-slate-400 font-mono tracking-widest uppercase">Multi-Agent Cognitive Learning</p>
          </div>
        </div>

        {/* Dynamic Responsive Tab Menu */}
        <nav className="hidden lg:flex items-center gap-1.5">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleNavigateToTab(tab.id)}
                className={`px-4 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-50/50"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* User Stats Badge & Logout */}
        <div className="flex items-center gap-4 text-xs font-semibold text-slate-700">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-slate-100/80 rounded-xl border border-slate-200/40">
            <User className="w-4 h-4 text-indigo-600" />
            <span>{studentName}</span>
          </div>

          <button
            onClick={handleLogout}
            className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all cursor-pointer flex items-center gap-1 font-bold"
            title="退出工作台"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">退出</span>
          </button>
        </div>
      </header>

      {/* Mobile Tab Navigation Menu */}
      <nav className="lg:hidden flex items-center justify-around border-b border-slate-100 bg-white py-2 px-4 shadow-sm sticky top-[68px] z-10 shrink-0 overflow-x-auto gap-2">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleNavigateToTab(tab.id)}
              className={`p-2 text-[10px] font-bold rounded-lg transition-all flex flex-col items-center gap-1 cursor-pointer min-w-[50px] ${
                isActive
                  ? "bg-indigo-50 text-indigo-700"
                  : "text-slate-500 hover:bg-slate-50"
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          );
        })}
      </nav>

      {/* 2. Main Tab Views Containers */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 py-6 md:px-8">
        {activeTab === "dashboard" && (
          <Dashboard
            profile={profile}
            courses={courses}
            weakPoints={weakPoints}
            onNavigateToTab={handleNavigateToTab}
          />
        )}

        {activeTab === "mentor" && (
          <MentorView
            initialPrompt={prefillPrompt}
            onClearPrefill={() => setPrefillPrompt(null)}
          />
        )}

        {activeTab === "quiz" && (
          <QuizView
            onAddErrorRecord={handleAddErrorRecord}
            onNavigateToTab={handleNavigateToTab}
          />
        )}

        {activeTab === "resource" && (
          <ResourceView onNavigateToTab={handleNavigateToTab} />
        )}

        {activeTab === "path" && (
          <PathView onNavigateToTab={handleNavigateToTab} />
        )}

        {activeTab === "analytics" && (
          <AssessmentView
            profile={profile}
            courses={courses}
            weakPoints={weakPoints}
            onNavigateToTab={handleNavigateToTab}
          />
        )}

        {activeTab === "errors" && (
          <ErrorView
            errorRecords={errorRecords}
            onRemediateRecord={handleRemediateRecord}
            onNavigateToTab={handleNavigateToTab}
          />
        )}
      </main>

      {/* 3. Global Footer */}
      <footer className="py-4 border-t border-slate-100 text-center text-[10px] text-slate-400 bg-white flex flex-col sm:flex-row justify-between items-center px-8 gap-2 shrink-0">
        <span>© {new Date().getFullYear()} 计智引擎 (JiZhi Engine). 408 计算机专业核心课多智能体教学对齐服务.</span>
        <div className="flex items-center gap-3 font-mono">
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            Node-S1: Connected
          </span>
          <span>Security Rules: Active</span>
        </div>
      </footer>
    </div>
  );
}

import React, { useState } from "react";
import { motion } from "motion/react";
import { UserProfile, Course, WeakPoint } from "../types";
import {
  Award,
  BookOpen,
  CheckCircle,
  AlertTriangle,
  History,
  Workflow,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Search,
  BookMarked,
  Brain,
  Terminal,
  Activity
} from "lucide-react";

interface DashboardProps {
  profile: UserProfile;
  courses: Course[];
  weakPoints: WeakPoint[];
  onNavigateToTab: (tab: string, prefillData?: any) => void;
}

export default function Dashboard({ profile, courses, weakPoints, onNavigateToTab }: DashboardProps) {
  const [selectedCourseFilter, setSelectedCourseFilter] = useState<string | null>(null);

  const filteredWeakPoints = selectedCourseFilter
    ? weakPoints.filter(wp => wp.course === selectedCourseFilter)
    : weakPoints;

  const agentActivities = [
    {
      agent: "ProfileAgent",
      role: "画像诊断体",
      status: "Success",
      desc: "已完成最新的自适应测验结果深度比对，调优红黑树掌握权重 -5.2%",
      time: "2分钟前",
      active: true
    },
    {
      agent: "PlannerAgent",
      role: "路径规划体",
      status: "Standby",
      desc: "根据张同学最新的薄弱科目（计算机网络），自动在前置路径中注入 TCP 拥塞控制温盘大纲",
      time: "10分钟前",
      active: false
    },
    {
      agent: "ResourceAgent",
      role: "资源生成体",
      status: "Standby",
      desc: "成功生成《数据结构：红黑树的旋转平衡》个性化讲义 (Advanced)",
      time: "1小时前",
      active: false
    },
    {
      agent: "ReviewAgent",
      role: "代码评测体",
      status: "Standby",
      desc: "对二叉树迭代遍历栈代码进行了安全审查，定位并修正了1处潜在的空指针解引用边界风险",
      time: "昨天",
      active: false
    }
  ];

  const recentEvents = [
    { type: "test", text: "完成了「自适应测验第12关：二叉树性质专项」，得分 88", time: "2小时前" },
    { type: "resource", text: "一键生成了《多线程同步与死锁避免》精炼温盘资料", time: "1天前" },
    { type: "error", text: "通过了对错题「进程同步PV序列」的第2次重新尝试，已标记为已消灭", time: "2天前" },
    { type: "qa", text: "向 AI 导师提问关于「斐波那契递归时空复杂度」，获得多维智能体协作答疑", time: "3天前" }
  ];

  return (
    <div className="space-y-6 fade-in font-sans">
      {/* 1. Greeting Panel */}
      <div className="bg-gradient-to-r from-indigo-900 to-indigo-850 rounded-3xl p-6 md:p-8 text-white relative overflow-hidden shadow-lg">
        {/* Decorative ambient blobs */}
        <div className="absolute -right-16 -top-16 w-64 h-64 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -left-16 -bottom-16 w-64 h-64 bg-violet-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>

        <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2">
            <span className="bg-indigo-700/60 text-indigo-200 text-xs font-semibold px-2.5 py-1 rounded-full border border-indigo-600/40 inline-flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> 计智引擎 · 个性伴学中
            </span>
            <h2 className="text-2.5xl font-bold tracking-tight">欢迎回来，{profile.name}！</h2>
            <p className="text-indigo-200 text-sm max-w-xl leading-relaxed">
              您的 ProfileAgent 诊断出您目前在 <span className="font-semibold underline decoration-wavy decoration-rose-400 text-white">数据结构（红黑树平衡）</span> 与 <span className="font-semibold underline decoration-wavy decoration-rose-400 text-white">操作系统（多线程信号量）</span> 存在重度知识重叠漏洞。建议立刻生成一份个性化温盘，或进行 10 分钟自适应测验。
            </p>
          </div>

          <div className="flex gap-3 w-full md:w-auto">
            <button
              onClick={() => onNavigateToTab("quiz")}
              className="flex-1 md:flex-initial bg-white text-indigo-900 hover:bg-slate-100 font-semibold text-xs px-5 py-3 rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Brain className="w-4 h-4 text-indigo-600" /> 开始自适应测验
            </button>
            <button
              onClick={() => onNavigateToTab("resource")}
              className="flex-1 md:flex-initial bg-indigo-700/80 hover:bg-indigo-700 text-white border border-indigo-600/50 font-semibold text-xs px-5 py-3 rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-300" /> 生成学习资源
            </button>
          </div>
        </div>
      </div>

      {/* 2. Quick Metrics Bento Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Core Proficiency */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between h-28">
          <div className="flex justify-between items-center text-slate-500">
            <span className="text-xs font-semibold tracking-tight">综合专业课掌握度</span>
            <Award className="w-5 h-5 text-indigo-600" />
          </div>
          <div className="space-y-1">
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-slate-900">{profile.proficiency}</span>
              <span className="text-xs text-slate-400 font-medium">/ 100</span>
            </div>
            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
              <div className="bg-indigo-600 h-full rounded-full" style={{ width: `${profile.proficiency}%` }}></div>
            </div>
          </div>
        </div>

        {/* Tests Completed */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between h-28">
          <div className="flex justify-between items-center text-slate-500">
            <span className="text-xs font-semibold tracking-tight">自适应已测验关卡</span>
            <CheckCircle className="w-5 h-5 text-emerald-500" />
          </div>
          <div className="space-y-0.5">
            <div className="text-2xl font-bold text-slate-900">{profile.testsTaken} 次</div>
            <p className="text-[11px] text-slate-400 font-medium">通关覆盖率 85%，超越 91% 同学</p>
          </div>
        </div>

        {/* Pending Tasks */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between h-28">
          <div className="flex justify-between items-center text-slate-500">
            <span className="text-xs font-semibold tracking-tight">今日待温盘任务</span>
            <Activity className="w-5 h-5 text-amber-500 animate-pulse" />
          </div>
          <div className="space-y-0.5">
            <div className="text-2xl font-bold text-slate-900">{profile.pendingTasks} 项</div>
            <p className="text-[11px] text-slate-400 font-medium">2个高优先漏洞急需消灭</p>
          </div>
        </div>

        {/* Weak Points Counter */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between h-28">
          <div className="flex justify-between items-center text-slate-500">
            <span className="text-xs font-semibold tracking-tight">知识漏洞(薄弱项)</span>
            <AlertTriangle className="w-5 h-5 text-rose-500" />
          </div>
          <div className="space-y-0.5">
            <div className="text-2xl font-bold text-slate-900">{profile.weakPointsCount} 个</div>
            <p className="text-[11px] text-slate-400 font-medium">新增1个，建议进入错题本消灭</p>
          </div>
        </div>
      </div>

      {/* 3. Main Dashboard Structure: Left / Right Column Grid */}
      <div className="grid lg:grid-cols-12 gap-6">
        {/* Left 8 Columns: Course Matrix & Weak Points review */}
        <div className="lg:col-span-8 space-y-6">
          {/* Course Master Matrix */}
          <section className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-4">
            <div className="flex justify-between items-center">
              <div className="space-y-0.5">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                  <BookMarked className="w-4 h-4 text-indigo-600" /> 课程掌握矩阵 (Course Matrix)
                </h3>
                <p className="text-xs text-slate-400">点击特定专业课，可快速检索过滤其在下方列出的薄弱知识点。</p>
              </div>
              {selectedCourseFilter && (
                <button
                  onClick={() => setSelectedCourseFilter(null)}
                  className="text-xs text-indigo-600 font-semibold hover:underline bg-indigo-50 px-2 py-1 rounded-md"
                >
                  清除过滤
                </button>
              )}
            </div>

            <div className="grid sm:grid-cols-5 gap-3.5">
              {courses.map((course) => {
                const isSelected = selectedCourseFilter === course.name;
                return (
                  <button
                    key={course.id}
                    onClick={() => setSelectedCourseFilter(isSelected ? null : course.name)}
                    className={`p-4 rounded-xl border text-left flex flex-col justify-between h-28 transition-all relative overflow-hidden group cursor-pointer ${
                      isSelected
                        ? "border-indigo-600 ring-2 ring-indigo-50 bg-indigo-50/20"
                        : "border-slate-100 bg-white hover:border-slate-200 hover:shadow-md"
                    }`}
                  >
                    {/* Tiny accent tag */}
                    <span className={`absolute top-0 left-0 w-full h-1 ${
                      course.color === 'blue' ? 'bg-blue-500' :
                      course.color === 'indigo' ? 'bg-indigo-500' :
                      course.color === 'purple' ? 'bg-purple-500' :
                      course.color === 'emerald' ? 'bg-emerald-500' : 'bg-rose-500'
                    }`}></span>

                    <div className="space-y-0.5 mt-1.5">
                      <span className="text-[10px] font-mono font-bold text-slate-400">{course.code}</span>
                      <h4 className="text-xs font-bold text-slate-800 leading-tight group-hover:text-indigo-600 transition-colors">
                        {course.name}
                      </h4>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between items-center text-[11px] font-semibold">
                        <span className="text-slate-400">掌握度</span>
                        <span className="text-slate-700">{course.proficiency}%</span>
                      </div>
                      <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            course.color === 'blue' ? 'bg-blue-500' :
                            course.color === 'indigo' ? 'bg-indigo-500' :
                            course.color === 'purple' ? 'bg-purple-500' :
                            course.color === 'emerald' ? 'bg-emerald-500' : 'bg-rose-500'
                          }`}
                          style={{ width: `${course.proficiency}%` }}
                        ></div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Weak Points Review Panel */}
          <section className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-4">
            <div className="flex justify-between items-center">
              <div className="space-y-0.5">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-500" /> 薄弱知识点温盘 (Weak Points Analysis)
                </h3>
                <p className="text-xs text-slate-400">
                  {selectedCourseFilter ? `正在筛选【${selectedCourseFilter}】薄弱项` : "当前追踪到的核心 CS 掌握度薄弱项。可通过智能联动直接提问或专项测试。"}
                </p>
              </div>
              <button
                onClick={() => onNavigateToTab("analytics")}
                className="text-xs text-indigo-600 font-semibold hover:underline inline-flex items-center gap-0.5"
              >
                查看完整诊断报告 <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="space-y-3">
              {filteredWeakPoints.length > 0 ? (
                filteredWeakPoints.map((wp) => (
                  <div
                    key={wp.id}
                    className="p-4 rounded-xl border border-slate-100 hover:border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition-all"
                  >
                    <div className="space-y-1.5 flex-grow">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-bold text-slate-800">{wp.name}</span>
                        <span className="text-[10px] font-medium bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full">
                          {wp.course}
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          wp.level === 'High' ? 'bg-rose-50 text-rose-600' :
                          wp.level === 'Medium' ? 'bg-amber-50 text-amber-600' :
                          'bg-emerald-50 text-emerald-600'
                        }`}>
                          薄弱度: {wp.level === 'High' ? '高' : wp.level === 'Medium' ? '中' : '低'}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <div className="flex-grow max-w-xs flex items-center gap-2">
                          <span className="text-[10px] text-slate-400 font-medium">修复进度</span>
                          <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                            <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${wp.remediationProgress}%` }}></div>
                          </div>
                          <span className="text-[10px] text-slate-500 font-mono font-semibold">{wp.remediationProgress}%</span>
                        </div>
                        <span className="text-[10px] text-slate-400 font-medium">错题触发 {wp.count} 次</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <button
                        onClick={() => onNavigateToTab("mentor", `我想深度咨询薄弱知识点【${wp.name}】的学术原理与典型代码。`)}
                        className="flex-1 sm:flex-initial text-xs font-semibold text-indigo-600 bg-white hover:bg-indigo-50 border border-slate-200 px-3.5 py-2 rounded-lg transition-colors cursor-pointer"
                      >
                        AI 答疑
                      </button>
                      <button
                        onClick={() => onNavigateToTab("quiz", wp.name)}
                        className="flex-1 sm:flex-initial text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 px-3.5 py-2 rounded-lg transition-colors shadow-sm cursor-pointer"
                      >
                        针对性练习
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-6 text-slate-400 text-xs">
                  暂无匹配的薄弱知识点。这代表该细分科目的掌握情况非常好！
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Right 4 Columns: Synergy dynamic logs & recent activity */}
        <div className="lg:col-span-4 space-y-6">
          {/* Multi-Agent Synergy Status */}
          <section className="bg-slate-900 rounded-2xl border border-slate-800 text-slate-300 p-5 space-y-4 shadow-md font-mono relative overflow-hidden">
            {/* Terminal scanner beam effect */}
            <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-30 animate-pulse"></div>

            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="text-xs font-bold text-slate-200 flex items-center gap-1.5 uppercase tracking-wider">
                <Workflow className="w-4 h-4 text-indigo-400 animate-spin" style={{ animationDuration: '6s' }} /> Multi-Agent Synergy
              </h3>
              <span className="text-[9px] bg-indigo-900/50 text-indigo-300 border border-indigo-800 px-2 py-0.5 rounded-md font-bold uppercase tracking-widest">
                Active Logs
              </span>
            </div>

            <div className="space-y-4">
              {agentActivities.map((act, i) => (
                <div key={i} className="space-y-1 text-xs">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1.5">
                      <span className="text-white font-bold">{act.agent}</span>
                      <span className="text-[10px] text-slate-500">[{act.role}]</span>
                    </div>
                    <span className={`text-[10px] font-bold ${
                      act.active ? 'text-emerald-400 animate-pulse' : 'text-slate-500'
                    }`}>
                      ● {act.active ? '执行中' : '就绪'}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed pl-3 border-l border-slate-800">
                    &gt; {act.desc}
                  </p>
                  <div className="text-[9px] text-slate-600 pl-3">
                    时间戳: {act.time}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-[10px] text-slate-500">
              <span>状态计数: 4/4 线程就绪</span>
              <span className="flex items-center gap-1">
                <Terminal className="w-3 h-3 text-indigo-400" /> CLI Mode
              </span>
            </div>
          </section>

          {/* Recent Activity Logs */}
          <section className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 space-y-4">
            <h3 className="text-xs font-bold text-slate-900 flex items-center gap-1.5 uppercase tracking-wide">
              <History className="w-4 h-4 text-slate-500" /> 近期学习动态 (Recent History)
            </h3>

            <div className="space-y-4">
              {recentEvents.map((evt, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <div className={`p-1.5 rounded-lg mt-0.5 ${
                    evt.type === 'test' ? 'bg-emerald-50 text-emerald-600' :
                    evt.type === 'resource' ? 'bg-indigo-50 text-indigo-600' :
                    evt.type === 'error' ? 'bg-rose-50 text-rose-600' :
                    'bg-slate-50 text-slate-600'
                  }`}>
                    {evt.type === 'test' ? <Brain className="w-3.5 h-3.5" /> :
                     evt.type === 'resource' ? <Sparkles className="w-3.5 h-3.5" /> :
                     evt.type === 'error' ? <AlertTriangle className="w-3.5 h-3.5" /> :
                     <Activity className="w-3.5 h-3.5" />}
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-xs font-medium text-slate-700 leading-relaxed">{evt.text}</p>
                    <span className="text-[10px] text-slate-400 font-medium">{evt.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

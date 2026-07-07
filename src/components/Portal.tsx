import React, { useState } from "react";
import { motion } from "motion/react";
import { Cpu, Sparkles, BookOpen, Compass, ClipboardCheck, ArrowRight, ShieldCheck, Database } from "lucide-react";

interface PortalProps {
  onLogin: (name: string) => void;
}

export default function Portal({ onLogin }: PortalProps) {
  const [username, setUsername] = useState("张同学");
  const [password, setPassword] = useState("••••••••");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) {
      setError("请输入学号/用户名");
      return;
    }
    onLogin(username);
  };

  const capabilities = [
    {
      icon: <Database className="w-6 h-6 text-indigo-600" />,
      title: "学习画像诊断",
      desc: "多维知识矩阵精准量化，动态追踪学术认知漏洞，实时绘制个人专业课掌握雷达。",
      bg: "bg-indigo-50/50 hover:bg-indigo-50"
    },
    {
      icon: <Sparkles className="w-6 h-6 text-emerald-600" />,
      title: "个性化资源生成",
      desc: "对接高规格 CS 专家大模型，针对薄弱点按需生成讲义、算法模板、专项代码与课后自测。",
      bg: "bg-emerald-50/50 hover:bg-emerald-50"
    },
    {
      icon: <Compass className="w-6 h-6 text-purple-600" />,
      title: "学习路径规划",
      desc: "PlannerAgent 智能规划最优学习里程碑，动态调整知识深度与时长，自适应匹配考研期末大纲。",
      bg: "bg-purple-50/50 hover:bg-purple-50"
    },
    {
      icon: <ClipboardCheck className="w-6 h-6 text-rose-600" />,
      title: "错题反馈闭环",
      desc: "FeedbackAgent 深度透视偏误根因，识别认知误区并给出针对性处方，打通『测-错-析-练』闭环。",
      bg: "bg-rose-50/50 hover:bg-rose-50"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between selection:bg-indigo-100 selection:text-indigo-950 font-sans">
      {/* Top Header */}
      <header className="px-6 py-4 md:px-12 flex justify-between items-center border-b border-slate-100 bg-white/80 backdrop-blur-md sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-600 p-2 rounded-xl text-white shadow-md shadow-indigo-100">
            <Cpu className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900 font-sans">
              计智引擎 <span className="text-xs font-semibold bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full ml-1">JiZhi Engine</span>
            </h1>
            <p className="text-[10px] text-slate-500 font-mono tracking-widest uppercase">Multi-Agent CS Learning System</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-slate-500 bg-slate-100/80 px-3 py-1.5 rounded-full">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          系统内核：V2.5-CS
        </div>
      </header>

      {/* Main Content Body */}
      <main className="max-w-7xl mx-auto px-6 py-12 md:px-12 grid md:grid-cols-12 gap-12 items-center flex-grow">
        {/* Left Hand: App Branding & Bento Capabilities */}
        <div className="md:col-span-7 flex flex-col gap-8">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-indigo-700 bg-indigo-50 rounded-full">
              <Sparkles className="w-3.5 h-3.5" /> 智能驱动 · 个性化生成 · 学术级深度
            </span>
            <h2 className="text-3.5xl md:text-4.5xl font-extrabold tracking-tight text-slate-900 leading-tight">
              计算机专业课 <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-indigo-700 to-violet-600">
                多智能体协同
              </span> 自适应工作台
            </h2>
            <p className="text-slate-600 text-base max-w-xl leading-relaxed">
              计智引擎是专门面向计算机专业核心课程（算法、数据结构、操作系统、计组、网络）打造的智能闭环自适应学习资源生成平台。通过多智能体无缝协同，为您量身定制学习闭环。
            </p>
          </motion.div>

          {/* Bento Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="grid sm:grid-cols-2 gap-4"
          >
            {capabilities.map((cap, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -2 }}
                className={`p-5 rounded-2xl border border-slate-100 bg-white shadow-sm transition-all duration-200 ${cap.bg} cursor-pointer group`}
              >
                <div className="p-2.5 bg-white rounded-xl shadow-sm w-fit mb-4 group-hover:scale-105 transition-transform">
                  {cap.icon}
                </div>
                <h3 className="text-sm font-semibold text-slate-900 mb-1.5">{cap.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{cap.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Right Hand: Login Form */}
        <div className="md:col-span-5 w-full flex justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="w-full max-w-md bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-100/50 p-8 space-y-8"
          >
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-slate-900">欢迎回来</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                请输入您的学生凭据以访问您的个性化 AI 学习终端，诊断本期薄弱领域并生成复习资源。
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 block">学号 / 用户名</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all font-medium text-slate-800"
                  placeholder="例如：202610214"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-semibold text-slate-700 block">验证密码</label>
                  <a href="#" className="text-xs text-indigo-600 hover:underline font-medium">忘记密码？</a>
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all font-mono"
                />
              </div>

              {error && (
                <p className="text-xs text-rose-600 bg-rose-50 px-3 py-2 rounded-lg font-medium">{error}</p>
              )}

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input type="checkbox" defaultChecked className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 w-4 h-4" />
                  <span className="text-xs text-slate-500 font-medium">保持登录状态</span>
                </label>
                <span className="text-xs text-slate-400 font-mono">节点: Web-Container-S1</span>
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm py-3 px-4 rounded-xl shadow-md shadow-indigo-100 hover:shadow-lg transition-all flex items-center justify-center gap-2 group cursor-pointer"
              >
                登录工作台
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </form>

            <div className="border-t border-slate-100 pt-6 flex items-center justify-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>数据全程进行加密并接受本地 ProfileAgent 隐私保护</span>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 border-t border-slate-100 text-center text-xs text-slate-400 bg-white">
        © {new Date().getFullYear()} 计智引擎 (JiZhi Engine). 计算机核心专业课 AI 智慧伴学与多智能体赋能服务平台.
      </footer>
    </div>
  );
}

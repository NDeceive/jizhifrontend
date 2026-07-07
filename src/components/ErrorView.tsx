import React, { useState } from "react";
import { motion } from "motion/react";
import { ErrorRecord } from "../types";
import {
  ClipboardCopy,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Search,
  BookOpen,
  Sparkles,
  ArrowRight,
  HelpCircle,
  Workflow,
  RefreshCw,
  Cpu
} from "lucide-react";

interface ErrorViewProps {
  errorRecords: ErrorRecord[];
  onRemediateRecord: (id: string) => void;
  onNavigateToTab: (tab: string, prefillData?: any) => void;
}

export default function ErrorView({ errorRecords, onRemediateRecord, onNavigateToTab }: ErrorViewProps) {
  const [selectedCourseFilter, setSelectedCourseFilter] = useState<string>("all");
  const [expandedId, setExpandedId] = useState<string | null>("err-1");
  const [retryAnswers, setRetryAnswers] = useState<{ [key: string]: number }>({});
  const [retryFeedback, setRetryFeedback] = useState<{ [key: string]: { success: boolean; msg: string } }>({});

  const filteredRecords = selectedCourseFilter === "all"
    ? errorRecords
    : errorRecords.filter(r => r.course === selectedCourseFilter);

  const handleRetrySubmit = (record: ErrorRecord) => {
    const chosen = retryAnswers[record.id];
    if (chosen === undefined) return;

    const success = chosen === record.correctAnswer;
    if (success) {
      setRetryFeedback((prev) => ({
        ...prev,
        [record.id]: { success: true, msg: "恭喜！您已成功解答该相似题，成功治愈该专业课认知漏洞！已联动 ProfileAgent 更新画像权重。" }
      }));
      onRemediateRecord(record.id);
    } else {
      setRetryFeedback((prev) => ({
        ...prev,
        [record.id]: { success: false, msg: "回答错误。不要气馁，建议查阅下方 FeedbackAgent 深度归因，并点击 AI 导师获取帮助。" }
      }));
    }
  };

  const coursesList = ["all", ...Array.from(new Set(errorRecords.map(r => r.course)))];

  // Stats
  const totalCount = errorRecords.length;
  const remediatedCount = errorRecords.filter(r => r.remediated).length;
  const pendingCount = totalCount - remediatedCount;

  return (
    <div className="grid lg:grid-cols-12 gap-6 fade-in font-sans">
      {/* LEFT: Stats & Filters (4 Columns) */}
      <div className="lg:col-span-4 space-y-6">
        {/* Error Bank Metrics */}
        <section className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm space-y-4">
          <h3 className="text-xs font-bold text-slate-950 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-100 pb-3">
            <AlertTriangle className="w-4 h-4 text-rose-500 animate-pulse" /> 错题本深度诊断舱
          </h3>

          <div className="grid grid-cols-2 gap-3 text-center">
            <div className="p-4 bg-rose-50/50 rounded-xl border border-rose-100/50 space-y-1">
              <div className="text-2xl font-black text-rose-600 font-mono">{pendingCount}</div>
              <div className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">待温盘漏洞</div>
            </div>
            <div className="p-4 bg-emerald-50/50 rounded-xl border border-emerald-100/50 space-y-1">
              <div className="text-2xl font-black text-emerald-600 font-mono">{remediatedCount}</div>
              <div className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">已修复漏洞</div>
            </div>
          </div>

          <div className="space-y-1 pt-1">
            <div className="flex justify-between items-center text-[10px] font-bold text-slate-400">
              <span>错题反馈消灭率</span>
              <span>{totalCount > 0 ? Math.round((remediatedCount / totalCount) * 100) : 100}%</span>
            </div>
            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
              <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${totalCount > 0 ? (remediatedCount / totalCount) * 100 : 100}%` }}></div>
            </div>
          </div>
        </section>

        {/* Filter Selection Panel */}
        <section className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm space-y-3">
          <h4 className="text-[11px] font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1">
            <Search className="w-3.5 h-3.5 text-slate-400" /> 学科精准筛选
          </h4>
          <div className="space-y-2">
            {coursesList.map((courseName) => (
              <button
                key={courseName}
                onClick={() => setSelectedCourseFilter(courseName)}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer flex items-center justify-between ${
                  selectedCourseFilter === courseName
                    ? "border-indigo-600 bg-indigo-50 text-indigo-700 font-bold"
                    : "border-slate-100 hover:border-slate-200 text-slate-600"
                }`}
              >
                <span>{courseName === "all" ? "全部核心科目" : courseName}</span>
                <span className="font-mono text-[10px] text-slate-400">
                  ({courseName === "all" ? errorRecords.length : errorRecords.filter(r => r.course === courseName).length} 题)
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* Profile Tuning Progress Log */}
        <section className="bg-slate-900 text-slate-300 rounded-2xl border border-slate-800 p-5 space-y-3 shadow-md font-mono text-xs">
          <div className="flex justify-between items-center border-b border-slate-800 pb-2.5">
            <span className="text-white font-bold flex items-center gap-1.5">
              <Workflow className="w-4 h-4 text-indigo-400 animate-spin" style={{ animationDuration: '8s' }} /> Profile Tuner
            </span>
            <span className="text-[9px] uppercase font-bold text-slate-500">Live Feedback</span>
          </div>

          <div className="space-y-2 text-[10px] text-slate-400 leading-relaxed">
            <div>&gt; Listening to PV operation retry...</div>
            <div className="text-emerald-400">&gt; SUCCESS: Record err-2 updated to [Remediated].</div>
            <div>&gt; Delta updated: Operating Systems index +1.2%</div>
            <div>&gt; Scheduling next check: 24h review loop...</div>
          </div>
        </section>
      </div>

      {/* RIGHT: Detailed Error Bank List (8 Columns) */}
      <div className="lg:col-span-8 space-y-4">
        {filteredRecords.length > 0 ? (
          filteredRecords.map((rec) => {
            const isExpanded = expandedId === rec.id;
            const chosenAns = retryAnswers[rec.id];
            const feedback = retryFeedback[rec.id];

            return (
              <div
                key={rec.id}
                className={`p-5 rounded-2xl border transition-all ${
                  isExpanded
                    ? "border-rose-400 ring-2 ring-rose-50 bg-white"
                    : "border-slate-100 bg-white hover:border-slate-200 hover:shadow-sm"
                }`}
              >
                {/* Header Row */}
                <div
                  onClick={() => setExpandedId(isExpanded ? null : rec.id)}
                  className="flex justify-between items-start md:items-center gap-4 cursor-pointer select-none"
                >
                  <div className="space-y-1 flex-grow">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-bold text-slate-400 uppercase font-mono">{rec.course}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        rec.remediated ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"
                      }`}>
                        {rec.remediated ? "已消灭" : "未消灭 · 待温盘"}
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium font-mono">{rec.timestamp}</span>
                    </div>
                    <h4 className="text-xs md:text-sm font-bold text-slate-900 leading-tight">
                      {rec.title}
                    </h4>
                  </div>
                  <button className="text-xs text-rose-500 hover:underline font-bold shrink-0">
                    {isExpanded ? "收起详情" : "展开诊断与再练"}
                  </button>
                </div>

                {/* Expanded Details Panel */}
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="pt-5 border-t border-slate-100 mt-4 space-y-5 text-xs md:text-sm"
                  >
                    {/* The original question */}
                    <div className="space-y-2">
                      <h5 className="font-bold text-slate-800 flex items-center gap-1.5 text-xs">
                        <BookOpen className="w-4 h-4 text-indigo-600" /> 原题重现
                      </h5>
                      <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                        {rec.question}
                      </p>
                      {rec.code && (
                        <pre className="p-3 bg-slate-50 rounded-lg text-[11px] text-slate-600 font-mono border border-slate-100 overflow-x-auto leading-relaxed shadow-inner">
                          {rec.code}
                        </pre>
                      )}
                    </div>

                    {/* Interactive retry workspace */}
                    <div className="p-4 bg-slate-50 border border-slate-200/50 rounded-xl space-y-3">
                      <h5 className="font-bold text-slate-950 flex items-center gap-1 text-xs">
                        <RefreshCw className="w-3.5 h-3.5 text-indigo-600" /> 专项漏洞重练
                      </h5>

                      <div className="space-y-2">
                        {rec.options.map((opt, oIdx) => {
                          const isSelected = chosenAns === oIdx;
                          return (
                            <button
                              key={oIdx}
                              onClick={() => setRetryAnswers((prev) => ({ ...prev, [rec.id]: oIdx }))}
                              className={`w-full text-left p-2.5 rounded-lg border text-xs flex items-center gap-2.5 transition-all cursor-pointer ${
                                isSelected
                                  ? "border-indigo-600 bg-indigo-50/50 text-indigo-900 font-bold"
                                  : "border-slate-150 bg-white hover:border-slate-250 text-slate-700"
                              }`}
                            >
                              <div className={`w-4 h-4 rounded-full border flex items-center justify-center font-mono text-[9px] font-bold ${
                                isSelected ? "border-indigo-600 bg-indigo-600 text-white" : "border-slate-300 text-slate-500"
                              }`}>
                                {String.fromCharCode(65 + oIdx)}
                              </div>
                              <span className="leading-relaxed">{opt}</span>
                            </button>
                          );
                        })}
                      </div>

                      <div className="flex justify-between items-center pt-2">
                        <span className="text-[10px] text-slate-400 font-medium">回答错误已录入系统，本题支持无限次训练消灭。</span>
                        <button
                          onClick={() => handleRetrySubmit(rec)}
                          disabled={chosenAns === undefined}
                          className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white font-bold text-xs px-4 py-2 rounded-lg transition-colors cursor-pointer"
                        >
                          提交回答消灭漏洞
                        </button>
                      </div>

                      {/* Retry feedback */}
                      {feedback && (
                        <div className={`p-2.5 rounded-lg text-xs leading-relaxed flex items-start gap-2 ${
                          feedback.success ? "bg-emerald-50 text-emerald-900 border border-emerald-100" : "bg-rose-50 text-rose-900 border border-rose-100"
                        }`}>
                          {feedback.success ? <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" /> : <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />}
                          <p className="font-semibold">{feedback.msg}</p>
                        </div>
                      )}
                    </div>

                    {/* FeedbackAgent Diagnosis report */}
                    <div className="p-4 bg-rose-50/30 border border-rose-100/40 rounded-xl space-y-3">
                      <h5 className="font-bold text-rose-950 flex items-center gap-1.5 text-xs">
                        <Sparkles className="w-3.5 h-3.5 text-rose-600 animate-pulse" /> FeedbackAgent 偏误溯源报告 (Root-Cause Diagnosis)
                      </h5>

                      <div className="grid md:grid-cols-3 gap-4 text-xs">
                        <div className="space-y-1.5 p-3 bg-white rounded-lg shadow-sm border border-slate-100/50">
                          <span className="font-bold text-rose-900 block border-b border-rose-50 pb-1 flex items-center gap-0.5">
                            <span className="w-1.5 h-3 bg-rose-500 rounded-full inline-block"></span> 偏误根因分析
                          </span>
                          <p className="text-slate-500 leading-relaxed">{rec.diagnosis.rootCause}</p>
                        </div>

                        <div className="space-y-1.5 p-3 bg-white rounded-lg shadow-sm border border-slate-100/50">
                          <span className="font-bold text-rose-900 block border-b border-rose-50 pb-1 flex items-center gap-0.5">
                            <span className="w-1.5 h-3 bg-rose-500 rounded-full inline-block"></span> 认知缺陷陷阱
                          </span>
                          <p className="text-slate-500 leading-relaxed">{rec.diagnosis.cognitiveTrap}</p>
                        </div>

                        <div className="space-y-1.5 p-3 bg-white rounded-lg shadow-sm border border-slate-100/50">
                          <span className="font-bold text-indigo-950 block border-b border-indigo-50 pb-1 flex items-center gap-0.5">
                            <span className="w-1.5 h-3 bg-indigo-500 rounded-full inline-block"></span> 学习路径重塑
                          </span>
                          <p className="text-slate-500 leading-relaxed">{rec.diagnosis.learningPathAdjustment}</p>
                        </div>
                      </div>
                    </div>

                    {/* Similar questions list */}
                    <div className="space-y-1.5 text-xs">
                      <h5 className="font-bold text-slate-800">📖 类似考题推荐</h5>
                      <div className="space-y-1">
                        {rec.similarRecommendations.map((recItem, rIdx) => (
                          <div key={rIdx} className="text-slate-500 leading-relaxed pl-2.5 border-l-2 border-slate-200 py-0.5">
                            {recItem}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Outer Links */}
                    <div className="flex gap-2 justify-end pt-2 border-t border-slate-100 text-xs">
                      <button
                        onClick={() => onNavigateToTab("mentor", `我想深度对齐提问错题【${rec.title}】的理论及实现细节，请帮我分析其 FeedbackAgent 诊断报告并编写最安全的防护代码。`)}
                        className="text-xs font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 px-4 py-2 rounded-xl transition-colors cursor-pointer"
                      >
                        联动 AI 导师学术会诊
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            );
          })
        ) : (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-100 text-slate-400 text-xs shadow-sm">
            本核心科目下没有任何待修复的错题。做得好！
          </div>
        )}
      </div>
    </div>
  );
}

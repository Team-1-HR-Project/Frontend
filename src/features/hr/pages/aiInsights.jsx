// import { Sparkles, ShieldCheck } from "lucide-react";

// // =====================================================
// // DATA
// // =====================================================

// const attentionSignals = [
//   {
//     name: "Youssef Lotfy",
//     note: "Lateness increased 32% vs August",
//     level: "high",
//     levelLabel: "High attention",
//   },
//   {
//     name: "Karim Ashraf",
//     note: "Task completion down 18% over 2 sprints",
//     level: "medium",
//     levelLabel: "Medium attention",
//   },
//   {
//     name: "Nour Adel",
//     note: "Engagement stable; promotion readiness rising",
//     level: "low",
//     levelLabel: "Low attention",
//   },
// ];

// const skillGaps = [
//   {
//     title: "Frontend Architecture",
//     count: "12 employees",
//     suggestion: "Advanced React systems workshop",
//   },
//   {
//     title: "Leadership",
//     count: "9 employees",
//     suggestion: "Manager coaching cohort",
//   },
//   {
//     title: "Data literacy",
//     count: "8 employees",
//     suggestion: "People analytics fundamentals",
//   },
// ];

// // =====================================================
// // STYLES
// // =====================================================

// const levelStyles = {
//   high: "bg-rose-50 text-rose-600",
//   medium: "bg-amber-50 text-amber-700",
//   low: "bg-emerald-50 text-emerald-600",
// };

// // =====================================================
// // ATTENTION CARD
// // =====================================================

// function AttentionCard({ item, isLast }) {
//   return (
//     <div className={`px-6 py-5 ${!isLast ? "border-b border-gray-100" : ""}`}>
//       <div className="flex items-start justify-between gap-4">
//         <h3 className="text-[15px] font-semibold text-gray-900">{item.name}</h3>

//         <span
//           className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${
//             levelStyles[item.level]
//           }`}
//         >
//           {item.levelLabel}
//         </span>
//       </div>

//       <p className="mt-1 text-sm text-blue-600">{item.note}</p>

//       <button
//         type="button"
//         className="mt-3 rounded-md border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
//       >
//         Schedule HR Check-in
//       </button>
//     </div>
//   );
// }

// // =====================================================
// // SKILL GAP ROW
// // =====================================================

// function SkillGapRow({ item, isLast }) {
//   return (
//     <div className={`px-6 py-5 ${!isLast ? "border-b border-gray-100" : ""}`}>
//       <h3 className="text-[15px] font-semibold text-gray-900">{item.title}</h3>

//       <p className="mt-1 text-sm text-gray-500">
//         {item.count} · Suggested: {item.suggestion}
//       </p>
//     </div>
//   );
// }

// // =====================================================
// // AI INSIGHTS PAGE
// // =====================================================

// export default function AIInsights() {
//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* =================================================
//           PAGE CONTENT
//       ================================================= */}

//       <main className="px-5 py-6 lg:px-8">
//         <div className="mx-auto max-w-[1220px]">
//           {/* =================================================
//               HEADER
//           ================================================= */}

//           <div className="mb-6 flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
//             <div>
//               <h1 className="text-[30px] font-semibold leading-tight tracking-[-0.02em] text-gray-900">
//                 AI Insights
//               </h1>

//               <p className="mt-2 max-w-[680px] text-[14px] leading-6 text-gray-500">
//                 Explainable HR insights derived from attendance, tasks, and
//                 evaluation history.
//               </p>
//             </div>

//             {/* Refresh Analysis */}

//             <button
//               type="button"
//               className="
//                 group flex h-[46px] items-center justify-center gap-2
//                 rounded-[7px]
//                 bg-[#243b53]
//                 px-5
//                 text-[13px] font-semibold text-white
//                 shadow-sm
//                 transition-all duration-300 ease-out
//                 hover:-translate-y-[2px]
//                 hover:bg-[#1f4d48]
//                 hover:shadow-[0_8px_20px_rgba(36,59,83,0.20)]
//                 active:translate-y-0
//                 active:scale-[0.98]
//               "
//             >
//               <Sparkles
//                 size={17}
//                 strokeWidth={2}
//                 className="
//                   transition-transform
//                   duration-300
//                   group-hover:rotate-12
//                   group-hover:scale-110
//                 "
//               />

//               <span className="transition-transform duration-300 group-hover:translate-x-[1px]">
//                 Refresh analysis
//               </span>
//             </button>
//           </div>

//           {/* =================================================
//               GROUNDED AI BANNER
//           ================================================= */}

//           <div className="mb-6 flex items-start gap-3 rounded-[10px] border border-emerald-100 bg-emerald-50 px-5 py-4">
//             <ShieldCheck
//               size={20}
//               strokeWidth={2}
//               className="mt-0.5 shrink-0 text-emerald-600"
//             />

//             <p className="text-[13px] leading-6 text-gray-700">
//               <span className="font-semibold text-gray-900">
//                 Grounded AI panel.
//               </span>{" "}
//               Every signal is linked to verified system metrics, comparison
//               periods, and an explicit recommended action.
//             </p>
//           </div>

//           {/* =================================================
//               TWO COLUMN PANELS
//           ================================================= */}

//           <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
//             {/* =================================================
//                 EMPLOYEE ATTENTION SIGNALS
//             ================================================= */}

//             <section className="overflow-hidden rounded-[10px] border border-[#d9e2ec] bg-white shadow-[0_1px_2px_rgba(36,59,83,0.03)]">
//               {/* Card Header */}

//               <div className="flex min-h-[59px] items-center justify-between border-b border-[#e6edf2] px-5">
//                 <h2 className="text-[15px] font-semibold text-[#243b53]">
//                   Employee attention signals
//                 </h2>
//               </div>

//               {/* Signals */}

//               <div>
//                 {attentionSignals.map((item, index) => (
//                   <AttentionCard
//                     key={item.name}
//                     item={item}
//                     isLast={index === attentionSignals.length - 1}
//                   />
//                 ))}
//               </div>
//             </section>

//             {/* =================================================
//                 WORKFORCE SKILL GAPS
//             ================================================= */}

//             <section className="overflow-hidden rounded-[10px] border border-[#d9e2ec] bg-white shadow-[0_1px_2px_rgba(36,59,83,0.03)]">
//               {/* Card Header */}

//               <div className="flex min-h-[59px] items-center justify-between border-b border-[#e6edf2] px-5">
//                 <h2 className="text-[15px] font-semibold text-[#243b53]">
//                   Workforce skill gaps
//                 </h2>
//               </div>

//               {/* Skill Gaps */}

//               <div>
//                 {skillGaps.map((item, index) => (
//                   <SkillGapRow
//                     key={item.title}
//                     item={item}
//                     isLast={index === skillGaps.length - 1}
//                   />
//                 ))}
//               </div>
//             </section>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }

export default function AIInsights() {
  return (
    <div>
      <h1>AI Insights</h1>
    </div>
  );
}

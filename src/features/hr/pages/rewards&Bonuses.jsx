import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function RewardsAndBonuses() {
    const { i18n } = useTranslation();
    const currentLang = i18n.language || 'en';
    const isArabic = currentLang === 'ar';

    // حالات التحكم في المودال وشاشة النجاح وحقول الإدخال الأربعة
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    
    const [employee, setEmployee] = useState('');
    const [incentiveCategory, setIncentiveCategory] = useState('');
    const [amount, setAmount] = useState('');
    const [reason, setReason] = useState('');

    // النصوص لدعم اللغتين
    const content = {
        en: {
            title: "Rewards & Bonuses",
            subtitle: "Recognize performance and route approved incentives into payroll.",
            issueBtn: "Issue Employee Incentive",
            card1Title: "TOTAL BONUS POOL DISTRIBUTED",
            card1Amount: "$14,200",
            card1Sub: "September 2026",
            card2Title: "PENDING APPROVALS",
            card2Count: "3",
            card2Sub: "Awaiting manager review",
            card3Title: "TOP REWARDED DEPARTMENT",
            card3Dept: "Sales",
            card3Sub: "42% of issued incentives",
            tableTitle: "Incentive register",
            colEmployee: "EMPLOYEE",
            colRole: "ROLE",
            colType: "INCENTIVE TYPE",
            colAmount: "APPROVED AMOUNT",
            colMonth: "TARGET PAYROLL MONTH",
            colManager: "APPROVING MANAGER",
            colStatus: "STATUS",
            perfBonus: "Performance Bonus",
            salesComm: "Sales Commission",
            eidReward: "Seasonal Eid Reward",
            statusQueued: "Queued for Payroll",
            statusPaid: "Paid",
            // Modal texts مطابقة تماماً للصورة الأخيرة
            modalTitle: "Issue Employee Incentive",
            labelEmployee: "Employee",
            placeholderEmployee: "Employee",
            labelCategory: "Incentive category",
            placeholderCategory: "Incentive category",
            labelAmount: "Amount",
            placeholderAmount: "Amount",
            labelReason: "Reason",
            placeholderReason: "Reason",
            cancelBtn: "Cancel",
            saveBtn: "Save changes",
            successTitle: "Incentive issued successfully",
            doneBtn: "Done"
        },
        ar: {
            title: "المكافآت والحوافز",
            subtitle: "تقدير الأداء وتوجيه الحوافز المعتمدة إلى كشوف المرتبات.",
            issueBtn: "صرف حافز للموظف",
            card1Title: "إجمالي إيرادات المكافآت الموزعة",
            card1Amount: "$14,200",
            card1Sub: "سبتمبر 2026",
            card2Title: "الموافقات المعلقة",
            card2Count: "3",
            card2Sub: "في انتظار مراجعة المدير",
            card3Title: "القسم الأكثر مكافأة",
            card3Dept: "المبيعات",
            card3Sub: "42% من الحوافز المصدرة",
            tableTitle: "سجل الحوافز",
            colEmployee: "الموظف",
            colRole: "الوظيفة",
            colType: "نوع الحافز",
            colAmount: "المبلغ المعتمد",
            colMonth: "شهر الرواتب المستهدف",
            colManager: "المدير الموافق",
            colStatus: "الحالة",
            perfBonus: "مكافأة أداء",
            salesComm: "عمولة مبيعات",
            eidReward: "مكافأة العيد الموسمية",
            statusQueued: "مدرج للرواتب",
            statusPaid: "مدفوع",
            // Modal texts
            modalTitle: "إصدار حافز للموظف",
            labelEmployee: "الموظف",
            placeholderEmployee: "الموظف",
            labelCategory: "فئة الحافز",
            placeholderCategory: "فئة الحافز",
            labelAmount: "المبلغ",
            placeholderAmount: "المبلغ",
            labelReason: "السبب",
            placeholderReason: "السبب",
            cancelBtn: "إلغاء",
            saveBtn: "حفظ التغييرات",
            successTitle: "تم إصدار الحافز بنجاح",
            doneBtn: "تم"
        }
    };

    const t = isArabic ? content.ar : content.en;

    const handleSave = (e) => {
        e.preventDefault();
        console.log({ employee, incentiveCategory, amount, reason });
        setIsSuccess(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setIsSuccess(false);
        setEmployee('');
        setIncentiveCategory('');
        setAmount('');
        setReason('');
    };

    return (
        <div 
            className="min-h-screen bg-slate-50 p-0 m-0 font-sans relative w-full space-y-6"
            dir={isArabic ? 'rtl' : 'ltr'}
        >
            {/* Header Section */}
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center bg-transparent py-2 px-1">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
                        {t.title}
                    </h1>
                    <p className="text-sm text-slate-500 mt-1">
                        {t.subtitle}
                    </p>
                </div>
                
                <div className="flex items-center gap-4 mt-4 md:mt-0">
                    <button 
                        onClick={() => { setIsModalOpen(true); setIsSuccess(false); }}
                        className="flex items-center gap-2 bg-[#1b2a47] hover:bg-[#152138] text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-sm transition-all"
                    >
                        <span>+</span> {t.issueBtn}
                    </button>
                </div>
            </header>

            {/* Top 3 Cards Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {/* Card 1 */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 relative flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                        <div>
                            <span className="text-[11px] font-bold text-slate-400 tracking-wider uppercase">
                                {t.card1Title}
                            </span>
                            <h2 className="text-3xl font-extrabold text-slate-900 mt-2">
                                {t.card1Amount}
                            </h2>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-600 font-bold text-lg shadow-xs">
                            $
                        </div>
                    </div>
                    <p className="text-xs text-slate-400 mt-4 font-medium">{t.card1Sub}</p>
                </div>

                {/* Card 2 */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 relative flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                        <div>
                            <span className="text-[11px] font-bold text-slate-400 tracking-wider uppercase">
                                {t.card2Title}
                            </span>
                            <h2 className="text-3xl font-extrabold text-slate-900 mt-2">
                                {t.card2Count}
                            </h2>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-600 shadow-xs">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                    </div>
                    <p className="text-xs text-slate-400 mt-4 font-medium">{t.card2Sub}</p>
                </div>

                {/* Card 3 */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 relative flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                        <div>
                            <span className="text-[11px] font-bold text-slate-400 tracking-wider uppercase">
                                {t.card3Title}
                            </span>
                            <h2 className="text-3xl font-extrabold text-slate-900 mt-2">
                                {t.card3Dept}
                            </h2>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-600 shadow-xs">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                            </svg>
                        </div>
                    </div>
                    <p className="text-xs text-slate-400 mt-4 font-medium">{t.card3Sub}</p>
                </div>
            </div>

            {/* Incentive Register Table Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-6 border-b border-slate-100">
                    <h2 className="text-base font-bold text-slate-900">{t.tableTitle}</h2>
                </div>

                <div className="overflow-x-auto">
                    <table className={`w-full ${isArabic ? 'text-right' : 'text-left'} border-collapse`}>
                        <thead>
                            <tr className="border-b border-slate-100 text-slate-400 text-[11px] font-bold tracking-wider">
                                <th className="p-5">{t.colEmployee}</th>
                                <th className="p-5">{t.colRole}</th>
                                <th className="p-5">{t.colType}</th>
                                <th className="p-5">{t.colAmount}</th>
                                <th className="p-5">{t.colMonth}</th>
                                <th className="p-5">{t.colManager}</th>
                                <th className={`p-5 ${isArabic ? 'text-left' : 'text-right'}`}>{t.colStatus}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                            {/* Row 1 */}
                            <tr className="hover:bg-slate-50/50 transition-colors">
                                <td className="p-5 font-semibold text-slate-900">Mariam Hassan</td>
                                <td className="p-5 text-slate-500">Engineering Manager</td>
                                <td className="p-5">
                                    <span className="inline-block bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-xs font-medium">
                                        {t.perfBonus}
                                    </span>
                                </td>
                                <td className="p-5 font-bold text-slate-900">$2,500</td>
                                <td className="p-5 text-slate-500">September 2026</td>
                                <td className="p-5 text-slate-600">Sarah Ahmed</td>
                                <td className={`p-5 ${isArabic ? 'text-left' : 'text-right'}`}>
                                    <span className="inline-block bg-amber-50 text-amber-800 border border-amber-200/60 px-3 py-1 rounded-full text-xs font-semibold">
                                        {t.statusQueued}
                                    </span>
                                </td>
                            </tr>
                            {/* Row 2 */}
                            <tr className="hover:bg-slate-50/50 transition-colors">
                                <td className="p-5 font-semibold text-slate-900">Omar Khaled</td>
                                <td className="p-5 text-slate-500">Sales Executive</td>
                                <td className="p-5">
                                    <span className="inline-block bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-xs font-medium">
                                        {t.salesComm}
                                    </span>
                                </td>
                                <td className="p-5 font-bold text-slate-900">$1,800</td>
                                <td className="p-5 text-slate-500">September 2026</td>
                                <td className="p-5 text-slate-600">Mariam Hassan</td>
                                <td className={`p-5 ${isArabic ? 'text-left' : 'text-right'}`}>
                                    <span className="inline-block bg-emerald-50 text-emerald-700 border border-emerald-200/60 px-3 py-1 rounded-full text-xs font-semibold">
                                        {t.statusPaid}
                                    </span>
                                </td>
                            </tr>
                            {/* Row 3 */}
                            <tr className="hover:bg-slate-50/50 transition-colors">
                                <td className="p-5 font-semibold text-slate-900">Nour Adel</td>
                                <td className="p-5 text-slate-500">People Ops Specialist</td>
                                <td className="p-5">
                                    <span className="inline-block bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-xs font-medium">
                                        {t.eidReward}
                                    </span>
                                </td>
                                <td className="p-5 font-bold text-slate-900">$600</td>
                                <td className="p-5 text-slate-500">September 2026</td>
                                <td className="p-5 text-slate-600">Sarah Ahmed</td>
                                <td className={`p-5 ${isArabic ? 'text-left' : 'text-right'}`}>
                                    <span className="inline-block bg-emerald-50 text-emerald-700 border border-emerald-200/60 px-3 py-1 rounded-full text-xs font-semibold">
                                        {t.statusPaid}
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal / Popup Form & Success View (الأربع حقول المطلوبة مطابقة للصورة تماماً) */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
                    <div className="bg-white rounded-3xl shadow-xl border border-slate-100 w-full max-w-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                        
                        {!isSuccess ? (
                            <>
                                {/* Modal Header */}
                                <div className="flex justify-between items-center px-8 py-6 border-b border-slate-100">
                                    <h3 className="text-xl font-bold text-slate-900">{t.modalTitle}</h3>
                                    <button 
                                        onClick={handleCloseModal}
                                        className="text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-lg hover:bg-slate-100"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>

                                {/* Modal Body Form - الأربع حقول بجانب بعضها بشكل متناسق */}
                                <form onSubmit={handleSave} className="p-8 space-y-5">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        {/* الحقل الأول: Employee */}
                                        <div>
                                            <label className="block text-xs font-semibold text-[#1b2a47] uppercase tracking-wider mb-2">
                                                {t.labelEmployee}
                                            </label>
                                            <input 
                                                type="text" 
                                                value={employee}
                                                onChange={(e) => setEmployee(e.target.value)}
                                                placeholder={t.placeholderEmployee}
                                                className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:border-[#1b2a47] focus:ring-1 focus:ring-[#1b2a47] outline-none text-slate-700 text-sm transition-all placeholder:text-slate-400"
                                            />
                                        </div>

                                        {/* الحقل الثاني: Incentive category */}
                                        <div>
                                            <label className="block text-xs font-semibold text-[#1b2a47] uppercase tracking-wider mb-2">
                                                {t.labelCategory}
                                            </label>
                                            <input 
                                                type="text" 
                                                value={incentiveCategory}
                                                onChange={(e) => setIncentiveCategory(e.target.value)}
                                                placeholder={t.placeholderCategory}
                                                className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:border-[#1b2a47] focus:ring-1 focus:ring-[#1b2a47] outline-none text-slate-700 text-sm transition-all placeholder:text-slate-400"
                                            />
                                        </div>

                                        {/* الحقل الثالث: Amount */}
                                        <div>
                                            <label className="block text-xs font-semibold text-[#1b2a47] uppercase tracking-wider mb-2">
                                                {t.labelAmount}
                                            </label>
                                            <input 
                                                type="text" 
                                                value={amount}
                                                onChange={(e) => setAmount(e.target.value)}
                                                placeholder={t.placeholderAmount}
                                                className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:border-[#1b2a47] focus:ring-1 focus:ring-[#1b2a47] outline-none text-slate-700 text-sm transition-all placeholder:text-slate-400"
                                            />
                                        </div>

                                        {/* الحقل الرابع: Reason */}
                                        <div>
                                            <label className="block text-xs font-semibold text-[#1b2a47] uppercase tracking-wider mb-2">
                                                {t.labelReason}
                                            </label>
                                            <input 
                                                type="text" 
                                                value={reason}
                                                onChange={(e) => setReason(e.target.value)}
                                                placeholder={t.placeholderReason}
                                                className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:border-[#1b2a47] focus:ring-1 focus:ring-[#1b2a47] outline-none text-slate-700 text-sm transition-all placeholder:text-slate-400"
                                            />
                                        </div>
                                    </div>

                                    {/* Modal Footer Buttons */}
                                    <div className="flex justify-end items-center gap-3 pt-4 border-t border-slate-100">
                                        <button 
                                            type="button"
                                            onClick={handleCloseModal}
                                            className="px-6 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-semibold text-sm hover:bg-slate-50 transition-colors"
                                        >
                                            {t.cancelBtn}
                                        </button>
                                        <button 
                                            type="submit"
                                            className="px-6 py-2.5 rounded-xl bg-[#1b2a47] hover:bg-[#152138] text-white font-semibold text-sm shadow-sm transition-all"
                                        >
                                            {t.saveBtn}
                                        </button>
                                    </div>
                                </form>
                            </>
                        ) : (
                            /* Success View Style */
                            <div className="p-10 text-center flex flex-col items-center justify-center space-y-6">
                                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                                    <svg className="w-8 h-8 stroke-[3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900">{t.successTitle}</h3>
                                <button 
                                    onClick={handleCloseModal}
                                    className="px-8 py-3 rounded-xl bg-[#1b2a47] hover:bg-[#152138] text-white font-semibold text-sm shadow-md transition-all w-full max-w-[200px]"
                                >
                                    {t.doneBtn}
                                </button>
                            </div>
                        )}

                    </div>
                </div>
            )}
        </div>
    );
}
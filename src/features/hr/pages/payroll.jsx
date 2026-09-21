import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function Payroll() {
    const { i18n } = useTranslation();
    const currentLang = i18n.language || 'en';
    const isArabic = currentLang === 'ar';

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    
    const [workflowDetails, setWorkflowDetails] = useState('');
    const [workflowOwner, setWorkflowOwner] = useState('');

    const content = {
        en: {
            title: "Payroll",
            subtitle: "Monthly compensation execution center.",
            runBtn: "Finalize & Run Payroll",
            badgeText: "September 2026 · Ready",
            formulaText: "Net Salary = Basic Salary + Bonuses - Deductions - Loan Installments",
            totalPayoutLabel: "total net payout",
            tableTitle: "Payslips",
            colEmployee: "EMPLOYEE",
            colBasicPay: "BASIC PAY",
            colBonuses: "BONUSES (+)",
            colDeductions: "DEDUCTIONS (-)",
            colAdvance: "ADVANCE (-)",
            colNetPayout: "NET PAYOUT",
            colStatus: "STATUS",
            colAction: "ACTION",
            statusReady: "Ready",
            statusPending: "Pending Approval",
            generatePdf: "Generate PDF",
            modalTitle: "Create workflow record",
            labelDetails: "Details",
            placeholderDetails: "Details",
            labelOwner: "Owner",
            placeholderOwner: "Owner",
            cancelBtn: "Cancel",
            saveBtn: "Save changes",
            successTitle: "Payroll executed successfully",
            doneBtn: "Done"
        },
        ar: {
            title: "كشوف المرتبات",
            subtitle: "مركز تنفيذ التعويضات الشهرية.",
            runBtn: "إنهاء وتشغيل الرواتب",
            badgeText: "سبتمبر 2026 · جاهز",
            formulaText: "الراتب الصافي = الراتب الأساسي + المكافآت - الاستقطاعات - أقساط السلف",
            totalPayoutLabel: "إجمالي الصافي المستحق",
            tableTitle: "قسائم الرواتب",
            colEmployee: "الموظف",
            colBasicPay: "الراتب الأساسي",
            colBonuses: "المكافآت (+)",
            colDeductions: "الاستقطاعات (-)",
            colAdvance: "السلف (-)",
            colNetPayout: "الصافي المستحق",
            colStatus: "الحالة",
            colAction: "الإجراء",
            statusReady: "جاهز",
            statusPending: "قيد الموافقة",
            generatePdf: "إنشاء PDF",
            modalTitle: "إنشاء سجل سير العمل",
            labelDetails: "التفاصيل",
            placeholderDetails: "التفاصيل",
            labelOwner: "المالك",
            placeholderOwner: "المالك",
            cancelBtn: "إلغاء",
            saveBtn: "حفظ التغييرات",
            successTitle: "تم تنفيذ كشوف الرواتب بنجاح",
            doneBtn: "تم"
        }
    };

    const t = isArabic ? content.ar : content.en;

    const handleSaveWorkflow = (e) => {
        e.preventDefault();
        setIsSuccess(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setIsSuccess(false);
        setWorkflowDetails('');
        setWorkflowOwner('');
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
                        className="inline-flex items-center gap-1.5 bg-[#1b2a47] hover:bg-[#152138] text-white px-3.5 py-1.5 rounded-lg text-xs font-medium shadow-xs transition-all w-auto whitespace-nowrap"
                    >
                        <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        <span>{t.runBtn}</span>
                    </button>
                </div>
            </header>

            {/* Top Summary Banner Card */}
            <div className="bg-[#f2f9f5] p-6 rounded-2xl shadow-xs border border-[#d8ebe1] relative flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="space-y-3">
                    <div className="inline-block bg-[#e1f3ea] text-[#1b4d32] border border-[#c5e6d4] px-3 py-1 rounded-full text-xs font-semibold">
                        {t.badgeText}
                    </div>
                    <p className="text-sm md:text-base font-semibold text-[#1b4d32]">
                        {t.formulaText}
                    </p>
                </div>
                {/* تم تصغير الفونت سايز بتاع الرقم هنا */}
                <div className="flex items-baseline gap-2 self-end md:self-center">
                    <span className="text-lg md:text-xl font-bold text-[#1b4d32]">$184,500</span>
                    <span className="text-xs text-[#527963] font-medium">{t.totalPayoutLabel}</span>
                </div>
            </div>

            {/* Payslips Table Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-6 border-b border-slate-100">
                    <h2 className="text-base font-bold text-slate-900">{t.tableTitle}</h2>
                </div>

                <div className="overflow-x-auto">
                    <table className={`w-full ${isArabic ? 'text-right' : 'text-left'} border-collapse`}>
                        <thead>
                            <tr className="border-b border-slate-100 text-slate-400 text-[11px] font-bold tracking-wider">
                                <th className="p-5">{t.colEmployee}</th>
                                <th className="p-5">{t.colBasicPay}</th>
                                <th className="p-5">{t.colBonuses}</th>
                                <th className="p-5">{t.colDeductions}</th>
                                <th className="p-5">{t.colAdvance}</th>
                                <th className="p-5">{t.colNetPayout}</th>
                                <th className="p-5">{t.colStatus}</th>
                                <th className={`p-5 ${isArabic ? 'text-left' : 'text-right'}`}>{t.colAction}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                            {/* Row 1 */}
                            <tr className="hover:bg-slate-50/50 transition-colors">
                                <td className="p-5 font-semibold text-slate-900">Youssef Lotfy</td>
                                <td className="p-5 text-slate-600">$3,200</td>
                                <td className="p-5 text-slate-600">+$250</td>
                                <td className="p-5 text-slate-600">-$0</td>
                                <td className="p-5 text-slate-600">-$0</td>
                                <td className="p-5 font-bold text-slate-900">$3,450</td>
                                <td className="p-5">
                                    <span className="inline-block bg-emerald-50 text-emerald-700 border border-emerald-200/60 px-3 py-1 rounded-full text-xs font-semibold">
                                        {t.statusReady}
                                    </span>
                                </td>
                                <td className={`p-5 ${isArabic ? 'text-left' : 'text-right'}`}>
                                    <button className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 text-slate-700 font-medium text-xs hover:bg-slate-50 transition-colors">
                                        <svg className="w-3.5 h-3.5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                        </svg>
                                        <span>{t.generatePdf}</span>
                                    </button>
                                </td>
                            </tr>
                            {/* Row 2 */}
                            <tr className="hover:bg-slate-50/50 transition-colors">
                                <td className="p-5 font-semibold text-slate-900">Mariam Hassan</td>
                                <td className="p-5 text-slate-600">$4,100</td>
                                <td className="p-5 text-slate-600">+$0</td>
                                <td className="p-5 text-slate-600">-$75</td>
                                <td className="p-5 text-slate-600">-$0</td>
                                <td className="p-5 font-bold text-slate-900">$4,025</td>
                                <td className="p-5">
                                    <span className="inline-block bg-amber-50 text-amber-800 border border-amber-200/60 px-3 py-1 rounded-full text-xs font-semibold">
                                        {t.statusPending}
                                    </span>
                                </td>
                                <td className={`p-5 ${isArabic ? 'text-left' : 'text-right'}`}>
                                    <button className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 text-slate-700 font-medium text-xs hover:bg-slate-50 transition-colors">
                                        <svg className="w-3.5 h-3.5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                        </svg>
                                        <span>{t.generatePdf}</span>
                                    </button>
                                </td>
                            </tr>
                            {/* Row 3 */}
                            <tr className="hover:bg-slate-50/50 transition-colors">
                                <td className="p-5 font-semibold text-slate-900">Omar Khaled</td>
                                <td className="p-5 text-slate-600">$2,800</td>
                                <td className="p-5 text-slate-600">+$0</td>
                                <td className="p-5 text-slate-600">-$0</td>
                                <td className="p-5 text-slate-600">-$400</td>
                                <td className="p-5 font-bold text-slate-900">$2,400</td>
                                <td className="p-5">
                                    <span className="inline-block bg-emerald-50 text-emerald-700 border border-emerald-200/60 px-3 py-1 rounded-full text-xs font-semibold">
                                        {t.statusReady}
                                    </span>
                                </td>
                                <td className={`p-5 ${isArabic ? 'text-left' : 'text-right'}`}>
                                    <button className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 text-slate-700 font-medium text-xs hover:bg-slate-50 transition-colors">
                                        <svg className="w-3.5 h-3.5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                        </svg>
                                        <span>{t.generatePdf}</span>
                                    </button>
                                </td>
                            </tr>
                            {/* Row 4 */}
                            <tr className="hover:bg-slate-50/50 transition-colors">
                                <td className="p-5 font-semibold text-slate-900">Nour Adel</td>
                                <td className="p-5 text-slate-600">$3,600</td>
                                <td className="p-5 text-slate-600">+$0</td>
                                <td className="p-5 text-slate-600">-$0</td>
                                <td className="p-5 text-slate-600">-$0</td>
                                <td className="p-5 font-bold text-slate-900">$3,600</td>
                                <td className="p-5">
                                    <span className="inline-block bg-emerald-50 text-emerald-700 border border-emerald-200/60 px-3 py-1 rounded-full text-xs font-semibold">
                                        {t.statusReady}
                                    </span>
                                </td>
                                <td className={`p-5 ${isArabic ? 'text-left' : 'text-right'}` }>
                                    <button className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 text-slate-700 font-medium text-xs hover:bg-slate-50 transition-colors">
                                        <svg className="w-3.5 h-3.5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                        </svg>
                                        <span>{t.generatePdf}</span>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal / Popup Form */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
                    <div className="bg-white rounded-2xl shadow-xl border border-slate-100 w-full max-w-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                        
                        {!isSuccess ? (
                            <>
                                {/* Modal Header */}
                                <div className="flex justify-between items-center px-6 py-5 border-b border-slate-100">
                                    <h3 className="text-lg font-bold text-slate-900">{t.modalTitle}</h3>
                                    <button 
                                        onClick={handleCloseModal}
                                        className="text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-lg hover:bg-slate-100"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>

                                {/* Modal Body */}
                                <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="block text-xs font-semibold text-slate-700">{t.labelDetails}</label>
                                        <input 
                                            type="text"
                                            value={workflowDetails}
                                            onChange={(e) => setWorkflowDetails(e.target.value)}
                                            placeholder={t.placeholderDetails}
                                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-slate-400 transition-colors"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="block text-xs font-semibold text-slate-700">{t.labelOwner}</label>
                                        <input 
                                            type="text"
                                            value={workflowOwner}
                                            onChange={(e) => setWorkflowOwner(e.target.value)}
                                            placeholder={t.placeholderOwner}
                                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-slate-400 transition-colors"
                                        />
                                    </div>
                                </div>

                                {/* Modal Footer Buttons */}
                                <div className="flex justify-end items-center gap-3 px-6 py-4 border-t border-slate-100 bg-white">
                                    <button 
                                        type="button"
                                        onClick={handleCloseModal}
                                        className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-50 transition-colors"
                                    >
                                        {t.cancelBtn}
                                    </button>
                                    <button 
                                        type="button"
                                        onClick={handleSaveWorkflow}
                                        className="px-5 py-2.5 rounded-xl bg-[#1b2a47] hover:bg-[#152138] text-white font-semibold text-xs shadow-sm transition-all"
                                    >
                                        {t.saveBtn}
                                    </button>
                                </div>
                            </>
                        ) : (
                            /* Success View */
                            <div className="p-10 text-center flex flex-col items-center justify-center space-y-6">
                                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                                    <svg className="w-8 h-8 stroke-[3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-slate-900">{t.successTitle}</h3>
                                <button 
                                    onClick={handleCloseModal}
                                    className="px-8 py-2.5 rounded-xl bg-[#1b2a47] hover:bg-[#152138] text-white font-semibold text-xs shadow-md transition-all w-full max-w-[180px]"
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
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function AdvancesAndDeductions() {
    const { i18n } = useTranslation();
    const currentLang = i18n.language || 'en';
    const isArabic = currentLang === 'ar';

    // حالات التحكم في المودال وشاشة النجاح
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [details, setDetails] = useState('');
    const [owner, setOwner] = useState('');

    // النصوص لدعم اللغتين
    const content = {
        en: {
            title: "Advances & Deductions",
            subtitle: "Control salary advances, penalties, and payroll-linked deductions.",
            recordBtn: "Record Manual Deduction",
            salarySection: "Salary Advance Requests",
            colEmployee: "EMPLOYEE",
            colRequestedAmount: "REQUESTED AMOUNT",
            colRepayment: "REPAYMENT",
            colMonthlyDeduction: "MONTHLY DEDUCTION",
            colReason: "REASON",
            colAction: "ACTION",
            approve: "Approve Advance",
            disciplinarySection: "Disciplinary & Delay Deductions",
            colPenaltyReason: "PENALTY REASON",
            colAmount: "AMOUNT",
            colDate: "DATE",
            colStatus: "STATUS",
            statusQueued: "Queued for Month-End Deduction",
            omarReason: "Emergency family expense",
            nourReason: "Medical expense",
            mariamReason: "Repeated unexcused delay",
            karimReason: "Policy breach",
            // Modal texts
            modalTitle: "Create workflow record",
            detailsLabel: "Details",
            detailsPlaceholder: "Details",
            ownerLabel: "Owner",
            ownerPlaceholder: "Owner",
            cancelBtn: "Cancel",
            saveBtn: "Save changes",
            successTitle: "Saved successfully",
            doneBtn: "Done"
        },
        ar: {
            title: "السلف والاستقطاعات",
            subtitle: "التحكم في سلف الرواتب، الجزاءات، والاستقطاعات المرتبطة بالرواتب.",
            recordBtn: "تسجيل استقطاع يدوي",
            salarySection: "طلبات سلف الرواتب",
            colEmployee: "الموظف",
            colRequestedAmount: "المبلغ المطلوب",
            colRepayment: "فترة السداد",
            colMonthlyDeduction: "الاستقطاع الشهري",
            colReason: "السبب",
            colAction: "الإجراء",
            approve: "موافقة على السلفة",
            disciplinarySection: "جزاءات التأخير والخصومات",
            colPenaltyReason: "سبب الجزاء",
            colAmount: "المبلغ",
            colDate: "التاريخ",
            colStatus: "الحالة",
            statusQueued: "مدرج للاستقطاع نهاية الشهر",
            omarReason: "مصروفات عائلية طارئة",
            nourReason: "مصروفات طبية",
            mariamReason: "تأخير متكرر بدون عذر",
            karimReason: "مخالفة للسياسة",
            // Modal texts
            modalTitle: "إنشاء سجل عمل جديد",
            detailsLabel: "التفاصيل",
            detailsPlaceholder: "التفاصيل",
            ownerLabel: "المسؤول",
            ownerPlaceholder: "المسؤول",
            cancelBtn: "إلغاء",
            saveBtn: "حفظ التغييرات",
            successTitle: "تم الحفظ بنجاح",
            doneBtn: "تم"
        }
    };

    const t = isArabic ? content.ar : content.en;

    const handleSave = (e) => {
        e.preventDefault();
        console.log({ details, owner });
        setIsSuccess(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setIsSuccess(false);
        setDetails('');
        setOwner('');
    };

    return (
        <div 
            className="min-h-screen bg-slate-50 p-0 m-0 font-sans relative w-full space-y-4"
            dir={isArabic ? 'rtl' : 'ltr'}
        >
            {/* Header Section بدون كارد خارجي وملاصق للأطراف */}
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
                        <span>+</span> {t.recordBtn}
                    </button>
                </div>
            </header>

            {/* Salary Advance Requests Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-6 border-b border-slate-100">
                    <h2 className="text-lg font-bold text-slate-900">{t.salarySection}</h2>
                </div>

                <div className="overflow-x-auto">
                    <table className={`w-full ${isArabic ? 'text-right' : 'text-left'} border-collapse`}>
                        <thead>
                            <tr className="border-b border-slate-100 text-slate-400 text-xs font-semibold tracking-wider">
                                <th className="p-6">{t.colEmployee}</th>
                                <th className="p-6">{t.colRequestedAmount}</th>
                                <th className="p-6">{t.colRepayment}</th>
                                <th className="p-6">{t.colMonthlyDeduction}</th>
                                <th className="p-6">{t.colReason}</th>
                                <th className={`p-6 ${isArabic ? 'text-left' : 'text-right'}`}>{t.colAction}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                            <tr className="hover:bg-slate-50/50 transition-colors">
                                <td className="p-6 text-slate-700">Omar Khaled</td>
                                <td className="p-6 text-slate-600">$1,200</td>
                                <td className="p-6 text-slate-600">3 Months</td>
                                <td className="p-6 text-slate-600">$400</td>
                                <td className="p-6 text-slate-500">{t.omarReason}</td>
                                <td className={`p-6 ${isArabic ? 'text-left' : 'text-right'}`}>
                                    <button className="bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-semibold px-4 py-2 rounded-xl text-xs transition-colors border border-emerald-200/60">
                                        {t.approve}
                                    </button>
                                </td>
                            </tr>
                            <tr className="hover:bg-slate-50/50 transition-colors">
                                <td className="p-6 text-slate-700">Nour Adel</td>
                                <td className="p-6 text-slate-600">$800</td>
                                <td className="p-6 text-slate-600">4 Months</td>
                                <td className="p-6 text-slate-600">$200</td>
                                <td className="p-6 text-slate-500">{t.nourReason}</td>
                                <td className={`p-6 ${isArabic ? 'text-left' : 'text-right'}`}>
                                    <button className="bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-semibold px-4 py-2 rounded-xl text-xs transition-colors border border-emerald-200/60">
                                        {t.approve}
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Disciplinary & Delay Deductions Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-6 border-b border-slate-100">
                    <h2 className="text-lg font-bold text-slate-900">{t.disciplinarySection}</h2>
                </div>

                <div className="overflow-x-auto">
                    <table className={`w-full ${isArabic ? 'text-right' : 'text-left'} border-collapse`}>
                        <thead>
                            <tr className="border-b border-slate-100 text-slate-400 text-xs font-semibold tracking-wider">
                                <th className="p-6">{t.colEmployee}</th>
                                <th className="p-6">{t.colPenaltyReason}</th>
                                <th className="p-6">{t.colAmount}</th>
                                <th className="p-6">{t.colDate}</th>
                                <th className={`p-6 ${isArabic ? 'text-left' : 'text-right'}`}>{t.colStatus}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                            <tr className="hover:bg-slate-50/50 transition-colors">
                                <td className="p-6 text-slate-700">Mariam Hassan</td>
                                <td className="p-6 text-slate-500">{t.mariamReason}</td>
                                <td className="p-6 text-slate-600">$75</td>
                                <td className="p-6 text-slate-600">Sep 15</td>
                                <td className={`p-6 ${isArabic ? 'text-left' : 'text-right'}`}>
                                    <span className="inline-block bg-amber-50 text-amber-800 border border-amber-200/60 px-3 py-1 rounded-full text-xs font-medium">
                                        {t.statusQueued}
                                    </span>
                                </td>
                            </tr>
                            <tr className="hover:bg-slate-50/50 transition-colors">
                                <td className="p-6 text-slate-700">Karim Ashraf</td>
                                <td className="p-6 text-slate-500">{t.karimReason}</td>
                                <td className="p-6 text-slate-600">$120</td>
                                <td className="p-6 text-slate-600">Sep 12</td>
                                <td className={`p-6 ${isArabic ? 'text-left' : 'text-right'}`}>
                                    <span className="inline-block bg-amber-50 text-amber-800 border border-amber-200/60 px-3 py-1 rounded-full text-xs font-medium">
                                        {t.statusQueued}
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal / Popup Form & Success View */}
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

                                {/* Modal Body Form */}
                                <form onSubmit={handleSave} className="p-8 space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-xs font-semibold text-[#1b2a47] uppercase tracking-wider mb-2">
                                                {t.detailsLabel}
                                            </label>
                                            <input 
                                                type="text" 
                                                value={details}
                                                onChange={(e) => setDetails(e.target.value)}
                                                placeholder={t.detailsPlaceholder}
                                                className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:border-[#1b2a47] focus:ring-1 focus:ring-[#1b2a47] outline-none text-slate-700 text-sm transition-all placeholder:text-slate-400"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-semibold text-[#1b2a47] uppercase tracking-wider mb-2">
                                                {t.ownerLabel}
                                            </label>
                                            <input 
                                                type="text" 
                                                value={owner}
                                                onChange={(e) => setOwner(e.target.value)}
                                                placeholder={t.ownerPlaceholder}
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

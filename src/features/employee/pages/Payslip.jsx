import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  FiDownload,
  FiPrinter,
  FiDollarSign,
  FiCheckCircle,
  FiCalendar,
  FiCreditCard,
  FiTrendingUp,
  FiShield,
  FiFileText,
  FiChevronDown,
} from "react-icons/fi";
import toast from "react-hot-toast";

const PAYSLIP_DATA = {
  "2026-09": {
    monthEn: "September 2026",
    monthAr: "سبتمبر 2026",
    periodEn: "01 Sep 2026 – 30 Sep 2026",
    periodAr: "01 سبتمبر 2026 – 30 سبتمبر 2026",
    payDateEn: "Sep 28, 2026",
    payDateAr: "28 سبتمبر 2026",
    statusEn: "Paid",
    statusAr: "مدفوع",
    basic: 3800,
    housing: 900,
    transport: 400,
    remoteWork: 250,
    bonus: 450,
    socialInsurance: 280,
    healthInsurance: 140,
    tax: 330,
    currencyEn: "$",
    currencyAr: "دولار",
  },
  "2026-08": {
    monthEn: "August 2026",
    monthAr: "أغسطس 2026",
    periodEn: "01 Aug 2026 – 31 Aug 2026",
    periodAr: "01 أغسطس 2026 – 31 أغسطس 2026",
    payDateEn: "Aug 28, 2026",
    payDateAr: "28 أغسطس 2026",
    statusEn: "Paid",
    statusAr: "مدفوع",
    basic: 3800,
    housing: 900,
    transport: 400,
    remoteWork: 250,
    bonus: 200,
    socialInsurance: 280,
    healthInsurance: 140,
    tax: 310,
    currencyEn: "$",
    currencyAr: "دولار",
  },
  "2026-07": {
    monthEn: "July 2026",
    monthAr: "يوليو 2026",
    periodEn: "01 Jul 2026 – 31 Jul 2026",
    periodAr: "01 يوليو 2026 – 31 يوليو 2026",
    payDateEn: "Jul 28, 2026",
    payDateAr: "28 يوليو 2026",
    statusEn: "Paid",
    statusAr: "مدفوع",
    basic: 3800,
    housing: 900,
    transport: 400,
    remoteWork: 250,
    bonus: 0,
    socialInsurance: 280,
    healthInsurance: 140,
    tax: 290,
    currencyEn: "$",
    currencyAr: "دولار",
  },
};

const Payslip = () => {
  const { i18n } = useTranslation();
  const isAr = i18n.language?.startsWith("ar");

  const [selectedPeriod, setSelectedPeriod] = useState("2026-09");
  const [periodDropdownOpen, setPeriodDropdownOpen] = useState(false);

  const currentSlip = PAYSLIP_DATA[selectedPeriod] || PAYSLIP_DATA["2026-09"];

  const totalEarnings =
    currentSlip.basic +
    currentSlip.housing +
    currentSlip.transport +
    currentSlip.remoteWork +
    currentSlip.bonus;

  const totalDeductions =
    currentSlip.socialInsurance +
    currentSlip.healthInsurance +
    currentSlip.tax;

  const netPay = totalEarnings - totalDeductions;

  const handleDownload = () => {
    toast.success(
      isAr
        ? `جاري تحميل بيان مفردات مرتب ${currentSlip.monthAr}...`
        : `Downloading payslip for ${currentSlip.monthEn}...`
    );
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full space-y-6">
      {/* ================= Header ================= */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-[#3f7d5a]">
            {isAr ? "التعويضات والمزايا" : "COMPENSATION & BENEFITS"}
          </p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-[#1e293b] md:text-3xl">
            {isAr ? "مفردات المرتب" : "My Payslip"}
          </h1>
          <p className="mt-1 text-sm text-[#64748b]">
            {isAr
              ? "مراجعة تفاصيل الراتب، الاستحقاقات، والاستقطاعات الشهرية."
              : "Review your monthly salary, earnings breakdown, and deductions."}
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Period Selector */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setPeriodDropdownOpen((prev) => !prev)}
              className="flex items-center gap-2 rounded-xl border border-[#cbd5e1] bg-white px-3.5 py-2 text-sm font-semibold text-[#1e293b] shadow-sm transition hover:bg-[#f8fafc]"
            >
              <FiCalendar className="size-4 text-[#64748b]" />
              <span>{isAr ? currentSlip.monthAr : currentSlip.monthEn}</span>
              <FiChevronDown className="size-4 text-[#94a3b8]" />
            </button>

            {periodDropdownOpen && (
              <div
                className={`absolute z-20 mt-1.5 w-48 rounded-xl border border-[#e2e8f0] bg-white p-1 shadow-lg ${
                  isAr ? "left-0" : "right-0"
                }`}
              >
                {Object.keys(PAYSLIP_DATA).map((key) => {
                  const item = PAYSLIP_DATA[key];
                  const active = selectedPeriod === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => {
                        setSelectedPeriod(key);
                        setPeriodDropdownOpen(false);
                      }}
                      className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition ${
                        active
                          ? "bg-[#eef4f0] text-[#3f7d5a] font-semibold"
                          : "text-[#334155] hover:bg-[#f1f5f9]"
                      }`}
                    >
                      <span>{isAr ? item.monthAr : item.monthEn}</span>
                      {active && <FiCheckCircle className="size-4 text-[#3f7d5a]" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Print Button */}
          <button
            type="button"
            onClick={handlePrint}
            className="flex items-center gap-2 rounded-xl border border-[#cbd5e1] bg-white px-3.5 py-2 text-sm font-semibold text-[#334155] shadow-sm transition hover:bg-[#f8fafc]"
          >
            <FiPrinter className="size-4 text-[#64748b]" />
            <span className="hidden sm:inline">{isAr ? "طباعة" : "Print"}</span>
          </button>

          {/* Download PDF Button */}
          <button
            type="button"
            onClick={handleDownload}
            className="flex items-center gap-2 rounded-xl bg-[#243B53] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1b2d40]"
          >
            <FiDownload className="size-4" />
            <span>{isAr ? "تحميل PDF" : "Download Slip"}</span>
          </button>
        </div>
      </div>

      {/* ================= Summary Metric Cards ================= */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Net Pay Card */}
        <div className="relative overflow-hidden rounded-2xl border border-[#bfdbfe] bg-gradient-to-br from-[#eff6ff] to-[#dbeafe] p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1e40af]">
              {isAr ? "صافي الراتب" : "NET SALARY"}
            </span>
            <span className="flex items-center gap-1 rounded-full bg-[#2563eb] px-2 py-0.5 text-[11px] font-semibold text-white">
              <FiCheckCircle className="size-3" />
              {isAr ? currentSlip.statusAr : currentSlip.statusEn}
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-1">
            <span className="text-3xl font-black text-[#1e3a8a]">
              ${netPay.toLocaleString()}
            </span>
          </div>
          <p className="mt-1 text-xs text-[#3b82f6]">
            {isAr
              ? `تم الإيداع في ${currentSlip.payDateAr}`
              : `Disbursed on ${currentSlip.payDateEn}`}
          </p>
        </div>

        {/* Gross Earnings */}
        <div className="rounded-2xl border border-[#e2e8f0] bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#64748b]">
              {isAr ? "إجمالي الاستحقاقات" : "GROSS EARNINGS"}
            </span>
            <div className="flex size-8 items-center justify-center rounded-xl bg-[#eef4f0] text-[#3f7d5a]">
              <FiTrendingUp className="size-4" />
            </div>
          </div>
          <div className="mt-3 text-2xl font-bold text-[#1e293b]">
            ${totalEarnings.toLocaleString()}
          </div>
          <p className="mt-1 text-xs text-[#64748b]">
            {isAr ? "الراتب الأساسي + كافة البدلات" : "Basic salary + all allowances"}
          </p>
        </div>

        {/* Total Deductions */}
        <div className="rounded-2xl border border-[#e2e8f0] bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#64748b]">
              {isAr ? "إجمالي الاستقطاعات" : "TOTAL DEDUCTIONS"}
            </span>
            <div className="flex size-8 items-center justify-center rounded-xl bg-[#fee2e2] text-[#dc2626]">
              <FiShield className="size-4" />
            </div>
          </div>
          <div className="mt-3 text-2xl font-bold text-[#b91c1c]">
            -${totalDeductions.toLocaleString()}
          </div>
          <p className="mt-1 text-xs text-[#64748b]">
            {isAr ? "التأمينات الاجتماعية والضرائب" : "Social insurance & taxes"}
          </p>
        </div>

        {/* Pay Date & Method */}
        <div className="rounded-2xl border border-[#e2e8f0] bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#64748b]">
              {isAr ? "طريقة الصرف" : "PAYMENT METHOD"}
            </span>
            <div className="flex size-8 items-center justify-center rounded-xl bg-[#f1f5f9] text-[#475569]">
              <FiCreditCard className="size-4" />
            </div>
          </div>
          <div className="mt-3 text-sm font-bold text-[#1e293b]">
            {isAr ? "تحويل بنكي مباشر" : "Direct Bank Transfer"}
          </div>
          <p className="mt-1 font-mono text-xs text-[#64748b]">
            IBAN: **** **** 4892
          </p>
        </div>
      </div>

      {/* ================= Detailed Breakdown Tables ================= */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Earnings Table */}
        <div className="rounded-2xl border border-[#e2e8f0] bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between border-b border-[#f1f5f9] pb-4">
            <div>
              <h2 className="text-lg font-bold text-[#1e293b]">
                {isAr ? "الاستحقاقات (Earnings)" : "Earnings"}
              </h2>
              <p className="text-xs text-[#64748b]">
                {isAr ? "تفاصيل الدخل والبدلات المستحقة" : "Details of salary and allowances"}
              </p>
            </div>
            <span className="rounded-lg bg-[#eef4f0] px-2.5 py-1 text-xs font-bold text-[#3f7d5a]">
              +${totalEarnings.toLocaleString()}
            </span>
          </div>

          <div className="mt-4 divide-y divide-[#f8fafc]">
            <div className="flex items-center justify-between py-3 text-sm">
              <span className="text-[#475569]">{isAr ? "الراتب الأساسي" : "Basic Salary"}</span>
              <span className="font-semibold text-[#1e293b]">${currentSlip.basic.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between py-3 text-sm">
              <span className="text-[#475569]">{isAr ? "بدل السكن" : "Housing Allowance"}</span>
              <span className="font-semibold text-[#1e293b]">${currentSlip.housing.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between py-3 text-sm">
              <span className="text-[#475569]">{isAr ? "بدل الانتقال" : "Transportation Allowance"}</span>
              <span className="font-semibold text-[#1e293b]">${currentSlip.transport.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between py-3 text-sm">
              <span className="text-[#475569]">{isAr ? "بدل العمل عن بُعد" : "Remote Work Allowance"}</span>
              <span className="font-semibold text-[#1e293b]">${currentSlip.remoteWork.toLocaleString()}</span>
            </div>
            {currentSlip.bonus > 0 && (
              <div className="flex items-center justify-between py-3 text-sm">
                <span className="text-[#475569]">{isAr ? "حافز الأداء الربع سنوي" : "Quarterly Performance Bonus"}</span>
                <span className="font-semibold text-[#16a34a]">+${currentSlip.bonus.toLocaleString()}</span>
              </div>
            )}
          </div>

          <div className="mt-4 flex items-center justify-between rounded-xl bg-[#f8fafc] px-4 py-3 text-sm font-bold text-[#1e293b]">
            <span>{isAr ? "إجمالي الاستحقاقات" : "Total Gross"}</span>
            <span>${totalEarnings.toLocaleString()}</span>
          </div>
        </div>

        {/* Deductions Table */}
        <div className="rounded-2xl border border-[#e2e8f0] bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between border-b border-[#f1f5f9] pb-4">
            <div>
              <h2 className="text-lg font-bold text-[#1e293b]">
                {isAr ? "الاستقطاعات (Deductions)" : "Deductions"}
              </h2>
              <p className="text-xs text-[#64748b]">
                {isAr ? "الخصومات القانونية والتأمينية" : "Statutory and company deductions"}
              </p>
            </div>
            <span className="rounded-lg bg-[#fee2e2] px-2.5 py-1 text-xs font-bold text-[#dc2626]">
              -${totalDeductions.toLocaleString()}
            </span>
          </div>

          <div className="mt-4 divide-y divide-[#f8fafc]">
            <div className="flex items-center justify-between py-3 text-sm">
              <span className="text-[#475569]">
                {isAr ? "التأمينات الاجتماعية (Social Insurance)" : "Social Insurance"}
              </span>
              <span className="font-semibold text-[#b91c1c]">-${currentSlip.socialInsurance.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between py-3 text-sm">
              <span className="text-[#475569]">
                {isAr ? "التأمين الصحي الإلزامي" : "Health Insurance"}
              </span>
              <span className="font-semibold text-[#b91c1c]">-${currentSlip.healthInsurance.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between py-3 text-sm">
              <span className="text-[#475569]">
                {isAr ? "ضريبة الدخل (Income Tax)" : "Income Tax"}
              </span>
              <span className="font-semibold text-[#b91c1c]">-${currentSlip.tax.toLocaleString()}</span>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between rounded-xl bg-[#fef2f2] px-4 py-3 text-sm font-bold text-[#991b1b]">
            <span>{isAr ? "إجمالي الاستقطاعات" : "Total Deductions"}</span>
            <span>-${totalDeductions.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* ================= Past Payslips History ================= */}
      <div className="rounded-2xl border border-[#e2e8f0] bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between border-b border-[#f1f5f9] pb-4">
          <div>
            <h2 className="text-lg font-bold text-[#1e293b]">
              {isAr ? "سجل مفردات المرتب السابقة" : "Payslip History"}
            </h2>
            <p className="text-xs text-[#64748b]">
              {isAr ? "استعراض وتحميل مسيرات الرواتب للأشهر الماضية" : "View and download previous month slips"}
            </p>
          </div>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-[#e2e8f0] text-xs font-bold uppercase text-[#64748b]">
                <th className="py-3 px-4">{isAr ? "الشهر" : "Month"}</th>
                <th className="py-3 px-4">{isAr ? "تاريخ الصرف" : "Pay Date"}</th>
                <th className="py-3 px-4">{isAr ? "الإجمالي" : "Gross"}</th>
                <th className="py-3 px-4">{isAr ? "الاستقطاعات" : "Deductions"}</th>
                <th className="py-3 px-4">{isAr ? "صافي الراتب" : "Net Pay"}</th>
                <th className="py-3 px-4">{isAr ? "الحالة" : "Status"}</th>
                <th className="py-3 px-4 text-center">{isAr ? "الإجراء" : "Action"}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f1f5f9]">
              {Object.keys(PAYSLIP_DATA).map((key) => {
                const item = PAYSLIP_DATA[key];
                const gross = item.basic + item.housing + item.transport + item.remoteWork + item.bonus;
                const ded = item.socialInsurance + item.healthInsurance + item.tax;
                const net = gross - ded;

                return (
                  <tr key={key} className="transition hover:bg-[#f8fafc]">
                    <td className="py-3.5 px-4 font-semibold text-[#1e293b]">
                      <div className="flex items-center gap-2">
                        <FiFileText className="size-4 text-[#64748b]" />
                        <span>{isAr ? item.monthAr : item.monthEn}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-[#475569]">
                      {isAr ? item.payDateAr : item.payDateEn}
                    </td>
                    <td className="py-3.5 px-4 font-medium text-[#1e293b]">
                      ${gross.toLocaleString()}
                    </td>
                    <td className="py-3.5 px-4 font-medium text-[#b91c1c]">
                      -${ded.toLocaleString()}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-[#1e40af]">
                      ${net.toLocaleString()}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center gap-1 rounded-full bg-[#eef4f0] px-2.5 py-0.5 text-xs font-semibold text-[#3f7d5a]">
                        <FiCheckCircle className="size-3" />
                        {isAr ? item.statusAr : item.statusEn}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedPeriod(key);
                          toast.success(
                            isAr
                              ? `تم اختيار مفردات ${item.monthAr}`
                              : `Selected ${item.monthEn}`
                          );
                        }}
                        className="rounded-lg border border-[#cbd5e1] px-3 py-1.5 text-xs font-semibold text-[#334155] transition hover:bg-[#f1f5f9]"
                      >
                        {isAr ? "عرض" : "View"}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Payslip;

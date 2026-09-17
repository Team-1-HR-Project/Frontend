import React from 'react';
import { FiChevronRight, FiArrowUpRight, FiPlus } from 'react-icons/fi';
import AdminLayout from '../../../layouts/AdminLayoutNew';
import DepartmentTable from '../../../components/DepartmentTable';

const PerformancePage = () => {
  return (
    <AdminLayout>
      <div className="mb-7 flex flex-col justify-between gap-5 xl:flex-row xl:items-end">
        <div>
          <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-[#829ab1]">
            Administration <FiChevronRight className="w-3.5 h-3.5" /> <span className="text-[#486581]">WiseWork</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-[#243B53] sm:text-[28px]">Performance &amp; Goals</h1>
          <p className="mt-2 text-sm text-[#627d98]">Configure and manage your WiseWork performance &amp; goals.</p>
        </div>
        <div>
          <button type="button" className="inline-flex items-center justify-center gap-2 rounded-lg px-3.5 py-2.5 text-sm font-semibold transition-colors border border-[#bcccdc] bg-white text-[#486581] hover:bg-[#f0f4f7]">
            <FiArrowUpRight className="w-4 h-4" /> Export configuration
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <div className="grid gap-6 xl:grid-cols-[1.15fr_.85fr]">
          
          <section className="rounded-xl border border-[#d9e2ec] bg-white p-5 sm:p-6">
            <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-[#243B53]">Goals &amp; evaluation governance</h2>
                <p className="mt-1 text-sm text-[#829ab1]">System-wide criteria and review cycle controls.</p>
              </div>
              <button type="button" className="inline-flex items-center justify-center gap-2 rounded-lg px-3.5 py-2.5 text-sm font-semibold transition-colors bg-[#243B53] text-white hover:bg-[#334e68]">
                <FiPlus className="w-4 h-4" /> Create Evaluation Cycle
              </button>
            </div>

            <div className="rounded-xl border border-[#d9e2ec] bg-[#f7fafb] p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold bg-[#e8f3eb] text-[#3f7d5a]">
                    <span className="size-1.5 rounded-full bg-current"></span>Active cycle
                  </span>
                  <h3 className="mt-3 text-lg font-bold text-[#243B53]">Q3 2026 Review</h3>
                  <p className="mt-1 text-sm text-[#627d98]">Jul 01 – Sep 30, 2026 · 1,248 employees</p>
                </div>
                <button type="button" className="inline-flex items-center justify-center gap-2 rounded-lg px-3.5 py-2.5 text-sm font-semibold transition-colors border border-[#bcccdc] bg-white text-[#486581] hover:bg-[#f0f4f7]">
                  Edit cycle
                </button>
              </div>
              <div className="mt-6">
                <div className="mb-2 flex justify-between text-xs font-semibold text-[#627d98]">
                  <span>Review completion</span><span>64%</span>
                </div>
                <div className="h-2 rounded-full bg-[#d9e2ec]">
                  <div className="h-full w-[64%] rounded-full bg-[#5b8c6a]"></div>
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-xl border border-[#d9e2ec] bg-white p-5 sm:p-6">
            <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-[#243B53]">Criteria weightage</h2>
                <p className="mt-1 text-sm text-[#829ab1]">The score composition for the active cycle.</p>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div>
                <div className="mb-2 flex justify-between text-sm">
                  <span className="font-medium text-[#486581]">Technical competency</span>
                  <span className="font-bold text-[#243B53]">30%</span>
                </div>
                <div className="h-2 rounded-full bg-[#eef1f4]">
                  <div className="h-full rounded-full bg-[#486581]" style={{ width: '30%' }}></div>
                </div>
              </div>
              <div>
                <div className="mb-2 flex justify-between text-sm">
                  <span className="font-medium text-[#486581]">Goals delivery</span>
                  <span className="font-bold text-[#243B53]">35%</span>
                </div>
                <div className="h-2 rounded-full bg-[#eef1f4]">
                  <div className="h-full rounded-full bg-[#486581]" style={{ width: '35%' }}></div>
                </div>
              </div>
              <div>
                <div className="mb-2 flex justify-between text-sm">
                  <span className="font-medium text-[#486581]">Leadership &amp; culture</span>
                  <span className="font-bold text-[#243B53]">20%</span>
                </div>
                <div className="h-2 rounded-full bg-[#eef1f4]">
                  <div className="h-full rounded-full bg-[#486581]" style={{ width: '20%' }}></div>
                </div>
              </div>
              <div>
                <div className="mb-2 flex justify-between text-sm">
                  <span className="font-medium text-[#486581]">Attendance &amp; reliability</span>
                  <span className="font-bold text-[#243B53]">15%</span>
                </div>
                <div className="h-2 rounded-full bg-[#eef1f4]">
                  <div className="h-full rounded-full bg-[#486581]" style={{ width: '15%' }}></div>
                </div>
              </div>
            </div>
          </section>

        </div>

        <DepartmentTable />

      </div>
    </AdminLayout>
  );
};

export default PerformancePage;
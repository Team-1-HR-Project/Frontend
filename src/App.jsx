import React, { useState } from 'react';
import { 
  FiArrowRight, 
  FiChevronRight, 
  FiUsers, 
  FiClock, 
  FiTrendingUp, 
  FiShield,
  FiCalendar,
  FiBarChart2,
  FiCpu,
  FiCheck,
  FiMenu,
  FiX,
  FiFileText
} from 'react-icons/fi';
import { HiSparkles } from 'react-icons/hi2';

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-emerald-500 selection:text-white">
      
      {/* Custom Styles for Animations, Pricing & Stats Section */}
      <style>{`
        .plan-price strong {
          color: #243b53;
          letter-spacing: -.04em;
          font-size: 28px;
        }

        .stats-section {
          background: #243b53;
          padding: 60px 0;
        }

        .stats-section stat strong {
          color: #fff;
          letter-spacing: -.06em;
          font-size: 36px;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes floatSlow {
          0%, 100% { transform: translateY(0px) rotate(1deg); }
          50% { transform: translateY(-8px) rotate(1deg); }
        }

        @keyframes pulseGlow {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }

        .animate-fade-in {
          animation: fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .animate-float {
          animation: floatSlow 6s ease-in-out infinite;
        }

        .animate-pulse-glow {
          animation: pulseGlow 3s ease-in-out infinite;
        }
      `}</style>

      {/* 1. Navbar Component */}
      <nav className="w-full bg-white/90 backdrop-blur-md border-b border-slate-100 py-4 px-6 sticky top-0 z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer group">
            <div className="w-9 h-9 rounded-xl bg-slate-800 flex flex-col items-center justify-center p-2 shadow-sm transition-transform duration-300 group-hover:scale-105">
              <div className="w-full h-1.5 bg-amber-400 rounded-full mb-1"></div>
              <div className="w-full h-1.5 bg-emerald-500 rounded-full"></div>
            </div>
            <span className="font-bold text-slate-800 text-xl tracking-tight">Smart HR</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-500">
            <a href="#home" className="text-slate-800 font-semibold border-b-2 border-emerald-600 pb-1 transition-all">Home</a>
            <a href="#about" className="hover:text-slate-800 transition-colors">About</a>
            <a href="#features" className="hover:text-slate-800 transition-colors">Features</a>
            <a href="#roles" className="hover:text-slate-800 transition-colors">Roles</a>
            <a href="#plans" className="hover:text-slate-800 transition-colors">Plans</a>
            <a href="#contact" className="hover:text-slate-800 transition-colors">Contact</a>
          </div>

          <div className="hidden md:flex items-center gap-5">
            <button className="text-sm font-semibold text-slate-700 hover:text-slate-900 transition-colors">
              Sign In
            </button>
            <button className="bg-slate-800 hover:bg-slate-900 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 flex items-center gap-2 group">
              <span>Get Started</span>
              <FiArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 text-slate-700 hover:text-slate-900 focus:outline-none transition-transform active:scale-95"
              aria-label="Open Menu"
            >
              <FiMenu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay / Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-white/95 backdrop-blur-xl flex flex-col px-6 py-4 md:hidden overflow-y-auto animate-fade-in">
          <div className="flex items-center justify-between pb-6 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-slate-800 flex flex-col items-center justify-center p-2 shadow-sm">
                <div className="w-full h-1.5 bg-amber-400 rounded-full mb-1"></div>
                <div className="w-full h-1.5 bg-emerald-500 rounded-full"></div>
              </div>
              <span className="font-bold text-slate-800 text-xl tracking-tight">Smart HR</span>
            </div>
            <button 
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-slate-700 hover:text-slate-900 focus:outline-none"
              aria-label="Close Menu"
            >
              <FiX className="w-6 h-6" />
            </button>
          </div>

          <div className="flex flex-col space-y-6 pt-8 pb-8 text-lg font-medium text-slate-800">
            <a href="#home" onClick={() => setMobileMenuOpen(false)} className="font-bold text-slate-900">Home</a>
            <a href="#about" onClick={() => setMobileMenuOpen(false)} className="text-slate-600 hover:text-slate-900 transition-colors">About</a>
            <a href="#features" onClick={() => setMobileMenuOpen(false)} className="text-slate-600 hover:text-slate-900 transition-colors">Features</a>
            <a href="#roles" onClick={() => setMobileMenuOpen(false)} className="text-slate-600 hover:text-slate-900 transition-colors">Roles</a>
            <a href="#plans" onClick={() => setMobileMenuOpen(false)} className="text-slate-600 hover:text-slate-900 transition-colors">Plans</a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="text-slate-600 hover:text-slate-900 transition-colors">Contact</a>
          </div>

          <div className="mt-auto pt-6 border-t border-slate-100 flex flex-col gap-3">
            <button 
              onClick={() => setMobileMenuOpen(false)}
              className="w-full bg-[#1e293b] hover:bg-slate-900 text-white font-semibold py-3.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 text-sm"
            >
              <span>Sign In</span>
              <FiArrowRight className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setMobileMenuOpen(false)}
              className="w-full border border-slate-300 hover:border-slate-400 text-slate-800 font-semibold py-3.5 rounded-xl transition-all text-sm bg-white flex items-center justify-center gap-2"
            >
              <span>Get Started</span>
            </button>
          </div>
        </div>
      )}

      {/* 2. Hero Section */}
      <section id="home" className="relative w-full bg-[#f4f7f6] py-16 lg:py-24 text-left overflow-hidden border-b border-slate-200/60">
        <div className="absolute inset-0 grid grid-cols-4 pointer-events-none opacity-40 max-w-7xl mx-auto px-6">
          <div className="border-r border-slate-200/60 h-full"></div>
          <div className="border-r border-slate-200/60 h-full"></div>
          <div className="border-r border-slate-200/60 h-full"></div>
          <div className="h-full"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6 animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-emerald-100/50 px-3 py-1 rounded-full border border-emerald-200/50">
              <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse"></span>
              <span className="text-xs font-bold text-emerald-800 tracking-wider uppercase">MODERN HR, MADE SIMPLE</span>
            </div>

            <h1 
              style={{
                color: '#243b53',
                letterSpacing: '-.065em',
                maxWidth: '650px',
                margin: '19px 0 22px',
                fontSize: 'clamp(45px, 5.4vw, 73px)',
                fontWeight: 700,
                lineHeight: 1.02,
              }}
            >
              Smarter HR.<br />
              <span className="text-[#2d6a4f] transition-all duration-300 hover:opacity-90">Better people</span><br />
              management.
            </h1>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-xl m-0">
              A modern HR management platform that helps organizations manage employees, attendance, leave, performance, and workforce insights — all in one place.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button className="bg-[#1e293b] hover:bg-slate-900 text-white font-semibold px-6 py-3.5 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-1 active:translate-y-0 flex items-center gap-2 text-sm group">
                <span>Get Started</span>
                <FiArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
              <button className="border border-slate-300/80 hover:border-slate-400 text-slate-800 font-semibold px-6 py-3.5 rounded-xl transition-all duration-300 hover:-translate-y-0.5 text-sm bg-white flex items-center gap-2 shadow-sm">
                <span>Explore Features</span>
                <FiChevronRight className="w-4 h-4 text-slate-400" />
              </button>
            </div>

            <div className="flex items-center gap-4 pt-4">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-[10px] font-bold text-slate-700 transition-transform hover:scale-110">AM</div>
                <div className="w-8 h-8 rounded-full bg-slate-300 border-2 border-white flex items-center justify-center text-[10px] font-bold text-slate-700 transition-transform hover:scale-110">LR</div>
                <div className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-[10px] font-bold text-slate-700 transition-transform hover:scale-110">SK</div>
                <div className="w-8 h-8 rounded-full bg-[#1e293b] border-2 border-white flex items-center justify-center text-xs font-bold text-white transition-transform hover:scale-110">+</div>
              </div>
              <p className="text-xs text-slate-500 m-0 leading-tight">
                Built for teams that put <br />
                <strong className="text-slate-900 font-bold">people first.</strong>
              </p>
            </div>
          </div>

          <div className="lg:col-span-6 relative flex justify-center animate-fade-in">
            <div className="absolute -top-6 -left-4 sm:left-2 z-20 bg-white/95 backdrop-blur-sm p-3.5 rounded-2xl border border-slate-100 shadow-xl flex items-start gap-3 max-w-[220px] animate-float">
              <div className="p-2 rounded-xl bg-slate-50 text-slate-700 border border-slate-100"><FiShield className="w-4 h-4" /></div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 m-0">Secure by design</h4>
                <p className="text-[11px] text-slate-500 m-0 leading-snug">Your data stays protected</p>
              </div>
            </div>

            <div className="w-full max-w-lg bg-white rounded-3xl border border-slate-200/80 shadow-2xl p-6 relative z-10 transform transition-transform duration-500 hover:scale-[1.01]">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <span className="text-[11px] text-slate-400 font-medium">Good morning, Sarah</span>
                  <h3 className="text-xl font-bold text-slate-900 m-0">People overview</h3>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">Live overview</span>
                  <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-600 border border-slate-200">SC</div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="p-3 bg-slate-50/50 rounded-2xl border border-slate-100 transition-all hover:bg-slate-100/80 hover:shadow-sm">
                  <FiUsers className="w-4 h-4 text-slate-500 mb-1" />
                  <div className="text-lg font-bold text-slate-900">248</div>
                  <div className="text-[11px] text-slate-400">Employees</div>
                </div>
                <div className="p-3 bg-slate-50/50 rounded-2xl border border-slate-100 transition-all hover:bg-slate-100/80 hover:shadow-sm">
                  <FiClock className="w-4 h-4 text-slate-500 mb-1" />
                  <div className="text-lg font-bold text-slate-900">94%</div>
                  <div className="text-[11px] text-slate-400">Attendance</div>
                </div>
                <div className="p-3 bg-slate-50/50 rounded-2xl border border-slate-100 transition-all hover:bg-slate-100/80 hover:shadow-sm">
                  <FiTrendingUp className="w-4 h-4 text-slate-500 mb-1" />
                  <div className="text-lg font-bold text-slate-900">86%</div>
                  <div className="text-[11px] text-slate-400">Engagement</div>
                </div>
              </div>

              <div className="grid grid-cols-12 gap-3 items-stretch">
                <div className="col-span-7 p-3.5 bg-slate-50/50 rounded-2xl border border-slate-100 flex flex-col justify-between">
                  <div className="flex items-center justify-between text-[11px] mb-4">
                    <span className="font-semibold text-slate-700">Workforce activity</span>
                    <span className="text-slate-400">This month</span>
                  </div>
                  <div className="flex items-end justify-between gap-1.5 h-20 pt-2">
                    <div className="w-full bg-[#2d6a4f] rounded-t-md h-[40%] transition-all duration-500 hover:h-[50%]"></div>
                    <div className="w-full bg-[#1e293b] rounded-t-md h-[65%] transition-all duration-500 hover:h-[75%]"></div>
                    <div className="w-full bg-[#2d6a4f] rounded-t-md h-[50%] transition-all duration-500 hover:h-[60%]"></div>
                    <div className="w-full bg-[#1e293b] rounded-t-md h-[85%] transition-all duration-500 hover:h-[95%]"></div>
                    <div className="w-full bg-[#2d6a4f] rounded-t-md h-[70%] transition-all duration-500 hover:h-[80%]"></div>
                    <div className="w-full bg-[#1e293b] rounded-t-md h-[100%] transition-all duration-500 hover:h-[90%]"></div>
                    <div className="w-full bg-[#2d6a4f] rounded-t-md h-[90%] transition-all duration-500 hover:h-[100%]"></div>
                  </div>
                </div>

                <div className="col-span-5 p-3.5 bg-emerald-50/40 rounded-2xl border border-emerald-200/60 flex flex-col justify-between">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-900">
                    <HiSparkles className="w-3.5 h-3.5 text-emerald-700 animate-spin" style={{ animationDuration: '4s' }} />
                    <span>AI insight</span>
                  </div>
                  <p className="text-[11px] text-slate-700 font-medium leading-relaxed m-0 mt-2">Team engagement is trending up this month.</p>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-6 -right-2 sm:right-2 z-20 bg-white/95 backdrop-blur-sm p-3.5 rounded-2xl border border-slate-100 shadow-xl flex items-center gap-3 max-w-[240px] animate-float" style={{ animationDelay: '1.5s' }}>
              <div className="p-2 rounded-xl bg-amber-50 text-amber-600 border border-amber-100"><HiSparkles className="w-4 h-4" /></div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 m-0">Actionable insights</h4>
                <p className="text-[11px] text-slate-500 m-0 leading-snug">Make better decisions, faster</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. About Smart HR Section */}
      <section id="about" className="py-24 bg-[#f4f7f6] border-t border-slate-200/60 text-left">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-12 mb-16 border-b border-slate-300/60 gap-4">
            <p className="text-xs text-slate-500 font-medium m-0">One platform for every part of your people journey</p>
            <div className="flex items-center gap-8 text-[11px] font-bold text-slate-400 tracking-wider">
              <span>PEOPLE-FIRST</span>
              <span>SECURE</span>
              <span>CONNECTED</span>
              <span>INSIGHTFUL</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-bold text-emerald-800 tracking-wider uppercase block">ABOUT SMART HR</span>
              <h2 
                style={{
                  color: '#243b53',
                  letterSpacing: '-.065em',
                  maxWidth: '650px',
                  margin: '19px 0 22px',
                  fontSize: 'clamp(45px, 5.4vw, 73px)',
                  fontWeight: 700,
                  lineHeight: 1.02,
                }}
              >
                Built to simplify the<br />
                way you <span className="text-[#2d6a4f]">manage</span><br />
                <span className="text-[#2d6a4f]">people.</span>
              </h2>
            </div>

            <div className="lg:col-span-6 space-y-8 pt-2">
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed m-0">
                Smart HR is an all-in-one HR management platform designed to make workforce management simpler, faster, and more organized.
              </p>

              <div className="grid grid-cols-3 gap-6 pt-4">
                <div className="transition-transform duration-300 hover:-translate-y-1">
                  <h4 className="text-sm font-bold text-slate-900 mb-1 m-0">Centralized</h4>
                  <p className="text-xs text-slate-500 m-0 leading-relaxed">Everything in one place</p>
                </div>
                <div className="transition-transform duration-300 hover:-translate-y-1">
                  <h4 className="text-sm font-bold text-slate-900 mb-1 m-0">Efficient</h4>
                  <p className="text-xs text-slate-500 m-0 leading-relaxed">Less admin, more impact</p>
                </div>
                <div className="transition-transform duration-300 hover:-translate-y-1">
                  <h4 className="text-sm font-bold text-slate-900 mb-1 m-0">Insightful</h4>
                  <p className="text-xs text-slate-500 m-0 leading-relaxed">Decisions backed by data</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Features Cards Grid with Hover Animation */}
      <section id="features" className="py-24 bg-[#f4f7f6] border-t border-slate-200/60 text-left">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-bold text-emerald-800 tracking-wider uppercase block">THE SMART HR ADVANTAGE</span>
              <h2 
                style={{
                  color: '#243b53',
                  letterSpacing: '-.065em',
                  maxWidth: '650px',
                  margin: '19px 0 22px',
                  fontSize: 'clamp(45px, 5.4vw, 73px)',
                  fontWeight: 700,
                  lineHeight: 1.02,
                }}
              >
                Everything your<br />
                HR team <span className="text-[#2d6a4f]">needs.</span>
              </h2>
            </div>
            <div className="lg:col-span-6 space-y-4 pt-2">
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-lg m-0">
                Powerful tools, thoughtfully connected, so your team can spend less time managing processes and more time supporting people.
              </p>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <div className="bg-white rounded-2xl border border-slate-200/80 p-8 flex flex-col justify-between transition-all duration-500 ease-in-out hover:-translate-y-2 hover:scale-[1.02] hover:shadow-2xl hover:border-emerald-300 group cursor-pointer">
              <div>
                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-700 mb-6 group-hover:scale-110 group-hover:bg-emerald-50 group-hover:text-emerald-700 transition-all duration-300"><FiUsers className="w-5 h-5" /></div>
                <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-emerald-900 transition-colors">Employee Management</h3>
                <p className="text-sm text-slate-600 leading-relaxed">Keep employee profiles, documents, and team information organized in one secure place.</p>
              </div>
              <div className="pt-8 flex justify-end">
                <div className="w-8 h-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-white group-hover:bg-[#1e293b] group-hover:border-[#1e293b] transition-all duration-300 shadow-sm">
                  <FiArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200/80 p-8 flex flex-col justify-between transition-all duration-500 ease-in-out hover:-translate-y-2 hover:scale-[1.02] hover:shadow-2xl hover:border-emerald-300 group cursor-pointer">
              <div>
                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-700 mb-6 group-hover:scale-110 group-hover:bg-emerald-50 group-hover:text-emerald-700 transition-all duration-300"><FiClock className="w-5 h-5" /></div>
                <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-emerald-900 transition-colors">Attendance</h3>
                <p className="text-sm text-slate-600 leading-relaxed">Track attendance and working hours with clear, reliable visibility for every team.</p>
              </div>
              <div className="pt-8 flex justify-end">
                <div className="w-8 h-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-white group-hover:bg-[#1e293b] group-hover:border-[#1e293b] transition-all duration-300 shadow-sm">
                  <FiArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200/80 p-8 flex flex-col justify-between transition-all duration-500 ease-in-out hover:-translate-y-2 hover:scale-[1.02] hover:shadow-2xl hover:border-emerald-300 group cursor-pointer">
              <div>
                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-700 mb-6 group-hover:scale-110 group-hover:bg-emerald-50 group-hover:text-emerald-700 transition-all duration-300"><FiCalendar className="w-5 h-5" /></div>
                <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-emerald-900 transition-colors">Leave Management</h3>
                <p className="text-sm text-slate-600 leading-relaxed">Make requests, approvals, and leave balances simple for everyone.</p>
              </div>
              <div className="pt-8 flex justify-end">
                <div className="w-8 h-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-white group-hover:bg-[#1e293b] group-hover:border-[#1e293b] transition-all duration-300 shadow-sm">
                  <FiArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200/80 p-8 flex flex-col justify-between transition-all duration-500 ease-in-out hover:-translate-y-2 hover:scale-[1.02] hover:shadow-2xl hover:border-emerald-300 group cursor-pointer">
              <div>
                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-700 mb-6 group-hover:scale-110 group-hover:bg-emerald-50 group-hover:text-emerald-700 transition-all duration-300"><FiTrendingUp className="w-5 h-5" /></div>
                <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-emerald-900 transition-colors">Performance</h3>
                <p className="text-sm text-slate-600 leading-relaxed">Create a consistent view of goals, reviews, and employee growth.</p>
              </div>
              <div className="pt-8 flex justify-end">
                <div className="w-8 h-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-white group-hover:bg-[#1e293b] group-hover:border-[#1e293b] transition-all duration-300 shadow-sm">
                  <FiArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200/80 p-8 flex flex-col justify-between transition-all duration-500 ease-in-out hover:-translate-y-2 hover:scale-[1.02] hover:shadow-2xl hover:border-emerald-300 group cursor-pointer">
              <div>
                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-700 mb-6 group-hover:scale-110 group-hover:bg-emerald-50 group-hover:text-emerald-700 transition-all duration-300"><FiBarChart2 className="w-5 h-5" /></div>
                <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-emerald-900 transition-colors">Reports & Analytics</h3>
                <p className="text-sm text-slate-600 leading-relaxed">Turn workforce data into reports your organization can act on.</p>
              </div>
              <div className="pt-8 flex justify-end">
                <div className="w-8 h-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-white group-hover:bg-[#1e293b] group-hover:border-[#1e293b] transition-all duration-300 shadow-sm">
                  <FiArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200/80 p-8 flex flex-col justify-between transition-all duration-500 ease-in-out hover:-translate-y-2 hover:scale-[1.02] hover:shadow-2xl hover:border-emerald-300 group cursor-pointer">
              <div>
                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-700 mb-6 group-hover:scale-110 group-hover:bg-emerald-50 group-hover:text-emerald-700 transition-all duration-300"><FiCpu className="w-5 h-5" /></div>
                <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-emerald-900 transition-colors">AI Insights</h3>
                <p className="text-sm text-slate-600 leading-relaxed">Discover meaningful patterns and make smarter people decisions.</p>
              </div>
              <div className="pt-8 flex justify-end">
                <div className="w-8 h-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-white group-hover:bg-[#1e293b] group-hover:border-[#1e293b] transition-all duration-300 shadow-sm">
                  <FiArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. Made for Every Role Section */}
      <section id="roles" className="py-24 bg-[#f4f7f6] border-t border-slate-200/60 text-left">
        <div className="max-w-7xl mx-auto px-6 space-y-20">
          
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <span className="text-xs font-bold text-emerald-800 tracking-wider uppercase block">MADE FOR EVERY ROLE</span>
            <h2 
              style={{
                color: '#243b53',
                letterSpacing: '-.065em',
                maxWidth: '850px',
                margin: '19px auto 22px',
                fontSize: 'clamp(40px, 4.8vw, 68px)',
                fontWeight: 700,
                lineHeight: 1.02,
              }}
            >
              One system. Three <span className="text-[#2d6a4f]">roles.</span>
            </h2>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed pt-2 m-0">Everyone gets the clarity and control they need to do their best work.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-[#1e2d3d] text-white rounded-3xl p-8 lg:p-10 flex flex-col justify-between relative overflow-hidden shadow-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
              <div className="absolute -right-12 -bottom-12 w-64 h-64 rounded-full border border-white/5 pointer-events-none"></div>
              <div className="absolute -right-4 -bottom-4 w-48 h-48 rounded-full border border-white/5 pointer-events-none"></div>
              <div>
                <div className="flex items-center justify-between mb-8">
                  <span className="text-xs font-bold text-emerald-400 tracking-wider uppercase">HR</span>
                  <span className="text-xs font-bold text-slate-500">01</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-4 text-white">A complete view of your workforce</h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-10">Manage people, policies, attendance, leave, and performance from one central workspace.</p>
              </div>
              <div className="space-y-3 pt-6 border-t border-white/10 relative z-10">
                <div className="flex items-center gap-3 text-sm text-slate-200"><FiCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" /><span>Employee records</span></div>
                <div className="flex items-center gap-3 text-sm text-slate-200"><FiCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" /><span>Approvals & policies</span></div>
                <div className="flex items-center gap-3 text-sm text-slate-200"><FiCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" /><span>Reports and insights</span></div>
              </div>
            </div>

            <div className="bg-[#243447] text-white rounded-3xl p-8 lg:p-10 flex flex-col justify-between relative overflow-hidden shadow-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
              <div className="absolute -right-12 -bottom-12 w-64 h-64 rounded-full border border-white/5 pointer-events-none"></div>
              <div className="absolute -right-4 -bottom-4 w-48 h-48 rounded-full border border-white/5 pointer-events-none"></div>
              <div>
                <div className="flex items-center justify-between mb-8">
                  <span className="text-xs font-bold text-emerald-400 tracking-wider uppercase">MANAGER</span>
                  <span className="text-xs font-bold text-slate-500">02</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-4 text-white">Support your team with confidence</h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-10">Give managers the context they need to guide performance and handle everyday workflows.</p>
              </div>
              <div className="space-y-3 pt-6 border-t border-white/10 relative z-10">
                <div className="flex items-center gap-3 text-sm text-slate-200"><FiCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" /><span>Team visibility</span></div>
                <div className="flex items-center gap-3 text-sm text-slate-200"><FiCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" /><span>Leave approvals</span></div>
                <div className="flex items-center gap-3 text-sm text-slate-200"><FiCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" /><span>Performance tracking</span></div>
              </div>
            </div>

            <div className="bg-[#e2efec] text-slate-900 rounded-3xl p-8 lg:p-10 flex flex-col justify-between relative overflow-hidden shadow-xl border border-emerald-200/60 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
              <div>
                <div className="flex items-center justify-between mb-8">
                  <span className="text-xs font-bold text-emerald-800 tracking-wider uppercase">ADMIN</span>
                  <span className="text-xs font-bold text-slate-400">03</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-4 text-slate-900">Keep the platform running smoothly</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-10">Control users, access, and platform settings while maintaining a secure foundation.</p>
              </div>
              <div className="space-y-3 pt-6 border-t border-slate-300/60 relative z-10">
                <div className="flex items-center gap-3 text-sm text-slate-700"><FiCheck className="w-4 h-4 text-emerald-700 flex-shrink-0" /><span>Role-based access</span></div>
                <div className="flex items-center gap-3 text-sm text-slate-700"><FiCheck className="w-4 h-4 text-emerald-700 flex-shrink-0" /><span>System settings</span></div>
                <div className="flex items-center gap-3 text-sm text-slate-700"><FiCheck className="w-4 h-4 text-emerald-700 flex-shrink-0" /><span>Secure administration</span></div>
              </div>
            </div>
          </div>

          {/* Connected HR workflows section */}
          <div className="pt-16 border-t border-slate-200/60 text-center space-y-12">
            <div className="space-y-3">
              <span className="text-xs font-bold text-emerald-800 tracking-wider uppercase block">HOW IT WORKS</span>
              <h2 
                style={{
                  color: '#243b53',
                  letterSpacing: '-.065em',
                  maxWidth: '750px',
                  margin: '0 auto',
                  fontSize: 'clamp(35px, 4.2vw, 55px)',
                  fontWeight: 700,
                  lineHeight: 1.1,
                }}
              >
                Connected HR workflows,<br />
                <span className="text-[#2d6a4f]">made simple.</span>
              </h2>
            </div>

            <div className="relative max-w-4xl mx-auto pt-8 pb-4">
              <div className="hidden md:block absolute top-[48px] left-[15%] right-[15%] h-[1px] bg-slate-200 z-0"></div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
                
                <div className="flex flex-col items-center text-center space-y-3 group cursor-pointer">
                  <div className="relative flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                    <div className="w-[88px] h-[88px] rounded-full border border-slate-200/60 absolute animate-pulse"></div>
                    <div className="w-[68px] h-[68px] rounded-full bg-[#1b2b3d] shadow-[0_4px_12px_rgba(27,43,61,0.2)] flex items-center justify-center text-white">
                      <FiUsers className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="space-y-0.5 pt-2">
                    <h4 className="text-sm font-bold text-[#1e293b] m-0">Employee</h4>
                    <p className="text-[12px] text-slate-400 m-0 font-medium">Engage</p>
                  </div>
                </div>

                <div className="flex flex-col items-center text-center space-y-3 group cursor-pointer">
                  <div className="relative flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                    <div className="w-[88px] h-[88px] rounded-full border border-slate-200/60 absolute animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                    <div className="w-[68px] h-[68px] rounded-full bg-[#243647] shadow-[0_4px_12px_rgba(36,54,71,0.2)] flex items-center justify-center text-white">
                      <FiShield className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="space-y-0.5 pt-2">
                    <h4 className="text-sm font-bold text-[#1e293b] m-0">Manager</h4>
                    <p className="text-[12px] text-slate-400 m-0 font-medium">Approve</p>
                  </div>
                </div>

                <div className="flex flex-col items-center text-center space-y-3 group cursor-pointer">
                  <div className="relative flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                    <div className="w-[88px] h-[88px] rounded-full border border-slate-200/60 absolute animate-pulse" style={{ animationDelay: '1s' }}></div>
                    <div className="w-[68px] h-[68px] rounded-full bg-[#d4942d] shadow-[0_4px_12px_rgba(212,148,45,0.25)] flex items-center justify-center text-white">
                      <FiFileText className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="space-y-0.5 pt-2">
                    <h4 className="text-sm font-bold text-[#1e293b] m-0">HR</h4>
                    <p className="text-[12px] text-slate-400 m-0 font-medium">Manage</p>
                  </div>
                </div>

                <div className="flex flex-col items-center text-center space-y-3 group cursor-pointer">
                  <div className="relative flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                    <div className="w-[88px] h-[88px] rounded-full border border-slate-200/60 absolute animate-pulse" style={{ animationDelay: '1.5s' }}></div>
                    <div className="w-[68px] h-[68px] rounded-full bg-[#4b7a5e] shadow-[0_4px_12px_rgba(75,122,94,0.25)] flex items-center justify-center text-white">
                      <FiCpu className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="space-y-0.5 pt-2">
                    <h4 className="text-sm font-bold text-[#1e293b] m-0">AI Insights</h4>
                    <p className="text-[12px] text-slate-400 m-0 font-medium">Improve</p>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 6. AI Insights Section */}
      <section className="py-24 bg-[#f4f7f6] border-t border-slate-200/60 text-left">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-bold text-emerald-800 tracking-wider uppercase block">SMARTER DECISIONS, POWERED BY DATA</span>
            <h2 
              style={{
                color: '#243b53',
                letterSpacing: '-.055em',
                maxWidth: '600px',
                margin: '14px 0 0',
                fontSize: 'clamp(34px, 4vw, 49px)',
                fontWeight: 700,
                lineHeight: 1.08,
              }}
            >
              Turn HR data into<br />
              <span className="text-[#2d6a4f]">smarter decisions.</span>
            </h2>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-lg m-0">
              Smart HR helps you see what is happening across your organization and understand what to do next.
            </p>
            <div className="pt-2">
              <a href="#ai-insights" className="inline-flex items-center gap-2 text-sm font-bold text-slate-900 hover:text-[#2d6a4f] transition-colors group">
                <span>Discover AI Insights</span>
                <FiArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-7 flex justify-center">
            <div className="w-full max-w-2xl bg-white rounded-3xl border border-slate-200/80 shadow-xl p-6 sm:p-8 transition-transform duration-500 hover:scale-[1.01]">
              
              <div className="flex items-center justify-between pb-5 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-700">
                    <HiSparkles className="w-4 h-4 text-[#2d6a4f] animate-spin" style={{ animationDuration: '6s' }} />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 m-0">AI Insights</h3>
                </div>
                <span className="text-xs text-slate-400 font-medium">Updated today</span>
              </div>

              <div className="py-8 grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                <div className="sm:col-span-5 space-y-2">
                  <span className="text-xs text-slate-400 font-medium block">Team health score</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-extrabold text-slate-900 tracking-tight">86</span>
                    <span className="text-slate-400 text-lg font-bold">/100</span>
                  </div>
                  <div className="pt-2">
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                      <FiTrendingUp className="w-3.5 h-3.5" />
                      <span>8.4% vs last month</span>
                    </span>
                  </div>
                </div>

                <div className="sm:col-span-7">
                  <div className="p-4 bg-slate-50/60 rounded-2xl border border-slate-100 flex flex-col justify-between">
                    <div 
                      style={{
                        background: 'repeating-linear-gradient(#0000, #0000 34px, #d9e2ec 35px)',
                        borderBottom: '1px solid #d9e2ec',
                        alignItems: 'end',
                        gap: '10px',
                        height: '112px',
                        padding: '0 12px',
                        display: 'flex',
                      }}
                    >
                      <div className="w-full bg-[#4b7a5e] rounded-t-lg h-[45%] transition-all duration-500 hover:h-[65%]"></div>
                      <div className="w-full bg-[#4b7a5e] rounded-t-lg h-[65%] transition-all duration-500 hover:h-[85%]"></div>
                      <div className="w-full bg-[#4b7a5e] rounded-t-lg h-[60%] transition-all duration-500 hover:h-[80%]"></div>
                      <div className="w-full bg-[#243447] rounded-t-lg h-[80%] transition-all duration-500 hover:h-[95%]"></div>
                      <div className="w-full bg-[#4b7a5e] rounded-t-lg h-[75%] transition-all duration-500 hover:h-[90%]"></div>
                      <div className="w-full bg-[#243447] rounded-t-lg h-[90%] transition-all duration-500 hover:h-[100%]"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-100 flex items-center justify-between group cursor-pointer hover:border-emerald-300 hover:bg-white hover:shadow-md transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-white border border-slate-200/80 flex items-center justify-center text-slate-700 shadow-sm flex-shrink-0 group-hover:bg-emerald-50 group-hover:text-emerald-700 transition-colors">
                    <HiSparkles className="w-4 h-4 text-[#2d6a4f]" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 m-0">What we noticed</h4>
                    <p className="text-xs text-slate-500 m-0 mt-0.5">Engagement has improved across 3 departments.</p>
                  </div>
                </div>
                <div className="text-slate-400 group-hover:text-slate-900 group-hover:translate-x-1 transition-all">
                  <FiChevronRight className="w-4 h-4" />
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 7. Pricing Cards Grid with Hover Effects */}
      <section id="plans" className="py-24 bg-[#f4f7f6] border-t border-slate-200/60 text-left">
        <div className="max-w-7xl mx-auto px-6 space-y-16">
          
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <span className="text-xs font-bold text-emerald-800 tracking-wider uppercase block">PLANS FOR EVERY STAGE</span>
            <h2 
              style={{
                color: '#243b53',
                letterSpacing: '-.065em',
                maxWidth: '850px',
                margin: '19px auto 22px',
                fontSize: 'clamp(40px, 4.8vw, 68px)',
                fontWeight: 700,
                lineHeight: 1.02,
              }}
            >
              Plans that fit your <span className="text-[#2d6a4f]">needs.</span>
            </h2>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed pt-2 m-0">
              Choose the plan that works best for your organization.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            
            {/* BASIC Plan */}
            <div className="bg-white rounded-3xl border border-slate-200/80 p-8 flex flex-col justify-between shadow-sm relative transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:border-slate-400 group">
              <div>
                <div className="space-y-1 mb-6">
                  <span className="text-xs font-bold text-slate-900 tracking-wider uppercase block">BASIC</span>
                  <p className="text-xs text-slate-500">For small teams</p>
                </div>

                <div className="mb-6 pb-6 border-b border-slate-100">
                  <div className="plan-price flex items-baseline gap-1.5 mb-2">
                    <strong>Flexible</strong>
                    <span className="text-sm font-semibold text-slate-400">pricing</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">The essentials to keep your people operations organized.</p>
                </div>

                <div className="space-y-3.5 mb-8">
                  <div className="flex items-center gap-3 text-sm text-slate-700">
                    <FiCheck className="w-4 h-4 text-[#2d6a4f] flex-shrink-0" />
                    <span>Employee Management</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-700">
                    <FiCheck className="w-4 h-4 text-[#2d6a4f] flex-shrink-0" />
                    <span>Attendance</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-700">
                    <FiCheck className="w-4 h-4 text-[#2d6a4f] flex-shrink-0" />
                    <span>Leave Management</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-700">
                    <FiCheck className="w-4 h-4 text-[#2d6a4f] flex-shrink-0" />
                    <span>Basic Reports</span>
                  </div>
                </div>
              </div>

              <div>
                <button className="w-full border border-slate-300 hover:border-slate-400 text-slate-800 font-semibold py-3.5 px-6 rounded-2xl transition-all text-sm bg-white flex items-center justify-center gap-2 group/btn shadow-sm hover:shadow">
                  <span>Get started</span>
                  <FiArrowRight className="w-4 h-4 text-slate-500 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* PROFESSIONAL Plan (Recommended) */}
            <div className="bg-white rounded-3xl border-2 border-[#2d6a4f] p-8 flex flex-col justify-between shadow-xl relative transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl group">
              <div className="absolute -top-3.5 left-1/2 transform -translate-x-1/2 bg-[#2d6a4f] text-white text-[10px] font-bold tracking-wider uppercase px-3.5 py-1 rounded-full shadow-sm">
                RECOMMENDED
              </div>

              <div>
                <div className="space-y-1 mb-6">
                  <span className="text-xs font-bold text-slate-900 tracking-wider uppercase block">PROFESSIONAL</span>
                  <p className="text-xs text-slate-500">For growing organizations</p>
                </div>

                <div className="mb-6 pb-6 border-b border-slate-100">
                  <div className="plan-price flex items-baseline gap-1.5 mb-2">
                    <strong>Flexible</strong>
                    <span className="text-sm font-semibold text-slate-400">pricing</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">More visibility and intelligence for growing teams.</p>
                </div>

                <div className="space-y-3.5 mb-8">
                  <div className="flex items-center gap-3 text-sm text-slate-700">
                    <FiCheck className="w-4 h-4 text-[#2d6a4f] flex-shrink-0" />
                    <span>Everything in Basic</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-700">
                    <FiCheck className="w-4 h-4 text-[#2d6a4f] flex-shrink-0" />
                    <span>Performance Management</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-700">
                    <FiCheck className="w-4 h-4 text-[#2d6a4f] flex-shrink-0" />
                    <span>Advanced Reports & Analytics</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-700">
                    <FiCheck className="w-4 h-4 text-[#2d6a4f] flex-shrink-0" />
                    <span>AI Insights</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-700">
                    <FiCheck className="w-4 h-4 text-[#2d6a4f] flex-shrink-0" />
                    <span>Priority Support</span>
                  </div>
                </div>
              </div>

              <div>
                <button className="w-full bg-[#1e293b] hover:bg-slate-900 text-white font-semibold py-3.5 px-6 rounded-2xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 text-sm group/btn">
                  <span>Get started</span>
                  <FiArrowRight className="w-4 h-4 text-slate-300 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* ENTERPRISE Plan */}
            <div className="bg-white rounded-3xl border border-slate-200/80 p-8 flex flex-col justify-between shadow-sm relative transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:border-slate-400 group">
              <div>
                <div className="space-y-1 mb-6">
                  <span className="text-xs font-bold text-slate-900 tracking-wider uppercase block">ENTERPRISE</span>
                  <p className="text-xs text-slate-500">For larger organizations</p>
                </div>

                <div className="mb-6 pb-6 border-b border-slate-100">
                  <div className="plan-price flex items-baseline gap-1.5 mb-2">
                    <strong>Custom</strong>
                    <span className="text-sm font-semibold text-slate-400">solutions</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">Advanced control and dedicated support at scale.</p>
                </div>

                <div className="space-y-3.5 mb-8">
                  <div className="flex items-center gap-3 text-sm text-slate-700">
                    <FiCheck className="w-4 h-4 text-[#2d6a4f] flex-shrink-0" />
                    <span>Everything in Professional</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-700">
                    <FiCheck className="w-4 h-4 text-[#2d6a4f] flex-shrink-0" />
                    <span>Advanced Workforce Insights</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-700">
                    <FiCheck className="w-4 h-4 text-[#2d6a4f] flex-shrink-0" />
                    <span>Custom Roles & Permissions</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-700">
                    <FiCheck className="w-4 h-4 text-[#2d6a4f] flex-shrink-0" />
                    <span>Dedicated Support</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-700">
                    <FiCheck className="w-4 h-4 text-[#2d6a4f] flex-shrink-0" />
                    <span>Custom Solutions</span>
                  </div>
                </div>
              </div>

              <div>
                <button className="w-full border border-slate-300 hover:border-slate-400 text-slate-800 font-semibold py-3.5 px-6 rounded-2xl transition-all text-sm bg-white flex items-center justify-center gap-2 group/btn shadow-sm hover:shadow">
                  <span>Contact us</span>
                  <FiArrowRight className="w-4 h-4 text-slate-500 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 8. Stats Section with .stats-section class */}
      <section className="stats-section text-white border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 text-center divide-y md:divide-y-0 md:divide-x divide-slate-700/60 gap-y-8 md:gap-y-0">
            
            <div className="px-4 transition-transform duration-300 hover:scale-105">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-2 text-white">250+</div>
              <div className="text-xs sm:text-sm text-slate-300 font-medium">Employees Managed</div>
            </div>

            <div className="px-4 transition-transform duration-300 hover:scale-105">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-2 text-white">6</div>
              <div className="text-xs sm:text-sm text-slate-300 font-medium">Core HR Features</div>
            </div>

            <div className="px-4 transition-transform duration-300 hover:scale-105">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-2 text-white">3</div>
              <div className="text-xs sm:text-sm text-slate-300 font-medium">User Roles</div>
            </div>

            <div className="px-4 transition-transform duration-300 hover:scale-105">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-2 text-white">24/7</div>
              <div className="text-xs sm:text-sm text-slate-300 font-medium">Platform Access</div>
            </div>

          </div>
        </div>
      </section>

      {/* 9. Contact / End CTA Banner Section */}
      <section id="contact" className="py-16 bg-[#f4f7f6] border-t border-slate-200/60 text-left">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-[#45627b] rounded-3xl p-8 sm:p-12 lg:p-16 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 shadow-xl relative overflow-hidden transition-all duration-500 hover:shadow-2xl">
            
            <div className="space-y-4 max-w-2xl relative z-10">
              <span className="text-[11px] font-bold text-white tracking-widest uppercase block">
                READY WHEN YOU ARE
              </span>
              
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal text-white tracking-tight m-0 leading-tight">
                Ready to manage HR <strong className="font-bold text-white">smarter?</strong>
              </h2>
              
              <p className="text-slate-200 text-sm sm:text-base leading-relaxed m-0 font-normal">
                Bring your people, processes, and insights together in one powerful platform.
              </p>
            </div>

            <div className="relative z-10 w-full lg:w-auto flex justify-start lg:justify-end">
              <button className="bg-white hover:bg-slate-50 text-slate-800 font-semibold px-6 py-3.5 rounded-xl transition-all duration-300 shadow-sm hover:shadow-md flex items-center justify-center gap-2 text-sm group">
                <span>Sign In</span>
                <FiArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* 10. Footer Section (Matched from image) */}
      <footer className="bg-[#f4f7f6] text-slate-600 pt-16 pb-8 border-t border-slate-200/60 text-left">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">
            
            {/* Logo and description */}
            <div className="md:col-span-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-slate-800 flex flex-col items-center justify-center p-2 shadow-sm">
                  <div className="w-full h-1.5 bg-amber-400 rounded-full mb-1"></div>
                  <div className="w-full h-1.5 bg-emerald-500 rounded-full"></div>
                </div>
                <span className="font-bold text-slate-800 text-xl tracking-tight">Smart HR</span>
              </div>
              <p className="text-sm text-slate-500 max-w-sm m-0 leading-relaxed">
                A simpler, smarter way to manage your people.
              </p>
            </div>

            {/* Platform Column */}
            <div className="md:col-span-2 space-y-4">
              <h4 className="text-xs font-bold text-slate-900 tracking-wider uppercase m-0">Platform</h4>
              <ul className="space-y-3 text-sm m-0 p-0 list-none">
                <li><a href="#features" className="text-slate-500 hover:text-slate-900 transition-colors">Features</a></li>
                <li><a href="#roles" className="text-slate-500 hover:text-slate-900 transition-colors">Roles</a></li>
                <li><a href="#signin" className="text-slate-500 hover:text-slate-900 transition-colors">Sign In</a></li>
              </ul>
            </div>

            {/* Company Column */}
            <div className="md:col-span-2 space-y-4">
              <h4 className="text-xs font-bold text-slate-900 tracking-wider uppercase m-0">Company</h4>
              <ul className="space-y-3 text-sm m-0 p-0 list-none">
                <li><a href="#about" className="text-slate-500 hover:text-slate-900 transition-colors">About us</a></li>
                <li><a href="#contact" className="text-slate-500 hover:text-slate-900 transition-colors">Contact</a></li>
                <li><a href="#privacy" className="text-slate-500 hover:text-slate-900 transition-colors">Privacy Policy</a></li>
              </ul>
            </div>

            {/* Resources Column */}
            <div className="md:col-span-2 space-y-4">
              <h4 className="text-xs font-bold text-slate-900 tracking-wider uppercase m-0">Resources</h4>
              <ul className="space-y-3 text-sm m-0 p-0 list-none">
                <li><a href="#how-it-works" className="text-slate-500 hover:text-slate-900 transition-colors">How it works</a></li>
                <li><a href="#terms" className="text-slate-500 hover:text-slate-900 transition-colors">Terms of Use</a></li>
              </ul>
            </div>

          </div>

          {/* Bottom Copyright Bar */}
          <div className="border-t border-slate-200/60 pt-6 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-400 gap-4">
            <p className="m-0">© 2024 Smart HR. All rights reserved.</p>
            <p className="m-0">Built for better workplaces.</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
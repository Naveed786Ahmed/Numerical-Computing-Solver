// App.jsx
import React, { useState } from "react";
import BisectionMethodSolver from "./bisectionSolver";
import RegulaFalsiSolver from "./RegulaFalsiSolver";
import JacobiGaussSolver from "./JacobiSeidal";
import SecantMethodSolver from "./SecantSolver";

export default function App() {

  const [activeComponent, setActiveComponent] = useState("home");

  // Conditional Rendering
  if (activeComponent === "bisection") {
    return <BisectionMethodSolver />;
  }

  if (activeComponent === "regula") {
    return <RegulaFalsiSolver />;
  }

  if (activeComponent === "secant") {
    return <SecantMethodSolver />;
  }

  if (activeComponent === "jacobi-gauss") {
    return <JacobiGaussSolver />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-800 to-slate-900 text-white p-6 flex flex-col items-center">

      {/* Header Section */}
      <div className="text-center mb-14">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 blur-3xl opacity-20"></div>
          <div className="relative bg-gradient-to-br from-slate-800/90 to-gray-900/90 backdrop-blur-xl border border-cyan-500/30 rounded-3xl p-10 shadow-2xl">
            <div className="flex items-center justify-center mb-4">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse mx-2"></div>
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight mb-3 bg-gradient-to-r from-cyan-300 via-blue-300 to-cyan-300 bg-clip-text text-transparent">
              Benazir Bhutto Shaheed University Lyari
            </h1>
            <div className="h-1 w-32 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto rounded-full mb-4"></div>
            <h2 className="text-2xl font-bold text-gray-200 mb-6">Numerical Computing Assignment</h2>
            <div className="flex flex-col gap-2 text-lg">
              <p className="font-bold text-cyan-300">Developed by: Naveed Ahmed</p>
              <p className="text-gray-300">Roll Number: 81</p>
              <p className="text-gray-300">Semester: 8th "B"</p>
              <p className="text-gray-300">Instructor: Sir Afzal</p>
            </div>
          </div>
        </div>
      </div>

      {/* Methods Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 w-full max-w-6xl">

        {/* Bisection Method Card */}
        <div className="group relative bg-gradient-to-br from-slate-800/90 to-gray-900/90 backdrop-blur-xl border-2 border-cyan-500/30 shadow-2xl rounded-3xl text-white p-8 hover:border-cyan-400/60 hover:-translate-y-2 transition-all duration-300">
          <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl group-hover:bg-cyan-500/20 transition-all"></div>
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-xl border border-cyan-400/30 group-hover:scale-110 transition-all">
                <span className="text-3xl">🎯</span>
              </div>
              <div className="text-cyan-400 text-sm font-bold">01</div>
            </div>
            <h3 className="text-2xl font-bold mb-3 text-cyan-300">Bisection Method</h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              A robust bracketing algorithm that systematically narrows down intervals to pinpoint function roots with mathematical certainty.
            </p>
            <button
              onClick={() => setActiveComponent("bisection")}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-bold px-5 py-3 rounded-xl shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 group-hover:scale-105"
            >
              Launch Solver →
            </button>
          </div>
        </div>

        {/* Regula Falsi Method Card */}
        <div className="group relative bg-gradient-to-br from-slate-800/90 to-gray-900/90 backdrop-blur-xl border-2 border-orange-500/30 shadow-2xl rounded-3xl text-white p-8 hover:border-orange-400/60 hover:-translate-y-2 transition-all duration-300">
          <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl group-hover:bg-orange-500/20 transition-all"></div>
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-xl border border-orange-400/30 group-hover:scale-110 transition-all">
                <span className="text-3xl">📏</span>
              </div>
              <div className="text-orange-400 text-sm font-bold">02</div>
            </div>
            <h3 className="text-2xl font-bold mb-3 text-orange-300">Regula Falsi Method</h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              An intelligent false-position strategy leveraging linear interpolation for accelerated root convergence compared to bisection.
            </p>
            <button
              onClick={() => setActiveComponent("regula")}
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-400 hover:to-red-400 text-white font-bold px-5 py-3 rounded-xl shadow-lg hover:shadow-orange-500/50 transition-all duration-300 group-hover:scale-105"
            >
              Launch Solver →
            </button>
          </div>
        </div>

        {/* Secant Method Card */}
        <div className="group relative bg-gradient-to-br from-slate-800/90 to-gray-900/90 backdrop-blur-xl border-2 border-emerald-500/30 shadow-2xl rounded-3xl text-white p-8 hover:border-emerald-400/60 hover:-translate-y-2 transition-all duration-300">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl group-hover:bg-emerald-500/20 transition-all"></div>
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-xl border border-emerald-400/30 group-hover:scale-110 transition-all">
                <span className="text-3xl">⚡</span>
              </div>
              <div className="text-emerald-400 text-sm font-bold">03</div>
            </div>
            <h3 className="text-2xl font-bold mb-3 text-emerald-300">Secant Method</h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              A derivative-free powerhouse that mimics Newton's method efficiency using secant lines for ultra-fast convergence rates.
            </p>
            <button
              onClick={() => setActiveComponent("secant")}
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-bold px-5 py-3 rounded-xl shadow-lg hover:shadow-emerald-500/50 transition-all duration-300 group-hover:scale-105"
            >
              Launch Solver →
            </button>
          </div>
        </div>

        {/* Jacobi & Gauss-Seidel Combined Card */}
        <div className="group relative bg-gradient-to-br from-slate-800/90 to-gray-900/90 backdrop-blur-xl border-2 border-violet-500/30 shadow-2xl rounded-3xl text-white p-8 hover:border-violet-400/60 hover:-translate-y-2 transition-all duration-300">
          <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/10 rounded-full blur-3xl group-hover:bg-violet-500/20 transition-all"></div>
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 rounded-xl border border-violet-400/30 group-hover:scale-110 transition-all">
                <span className="text-3xl">🔄</span>
              </div>
              <div className="text-violet-400 text-sm font-bold">04</div>
            </div>
            <h3 className="text-2xl font-bold mb-3 text-violet-300">Jacobi & Gauss-Seidel</h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Sophisticated iterative solvers for linear systems featuring comprehensive side-by-side performance analysis and convergence comparison.
            </p>
            <button
              onClick={() => setActiveComponent("jacobi-gauss")}
              className="w-full bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-violet-400 hover:to-fuchsia-400 text-white font-bold px-5 py-3 rounded-xl shadow-lg hover:shadow-violet-500/50 transition-all duration-300 group-hover:scale-105"
            >
              Launch Solver →
            </button>
          </div>
        </div>

      </div>

      {/* Footer */}
      <div className="mt-16 text-center">
        <div className="inline-block bg-gradient-to-r from-slate-800/50 to-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-full px-6 py-3">
          <p className="text-sm text-gray-400">© 2025 BBSUL • Numerical Computing Project</p>
        </div>
      </div>
    </div>
  );
}


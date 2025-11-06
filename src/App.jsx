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
    <div className="min-h-screen bg-gradient-to-br from-emerald-600 to-green-500 text-white p-6 flex flex-col items-center">

      {/* Header Section */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-extrabold tracking-wide mb-2">
          Benazir Bhutto Shaheed University Lyari
        </h1>
        <h2 className="text-xl font-semibold opacity-90">Numerical Computing Assignment</h2>
        <p className="mt-2 text-lg font-medium">Developed by: Naveed Ahmed</p>
        <p className="text-md opacity-90">Roll Number: 81</p>
        <p className="text-md opacity-90">Semester: 8th "B"</p>
        <p className="text-md opacity-90">Instructor: Sir Afzal</p>
      </div>

      {/* Methods Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">

        {/* --- CARD TEMPLATE --- */}
        {/* Each card uses single pure-Tailwind design */}

        {/* Bisection */}
        <div className="bg-white/20 backdrop-blur-md border border-white/20 shadow-xl rounded-2xl text-white p-6">
          <h3 className="text-xl font-bold mb-2">Bisection Method</h3>
          <p className="opacity-90 mb-4">Finds root using interval halving technique.</p>
          <button onClick={() => setActiveComponent("bisection")} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-4 py-2 rounded-xl shadow-md transition-all">
            Open Solver
          </button>
        </div>

        {/* Regula Falsi */}
        <div className="bg-white/20 backdrop-blur-md border border-white/20 shadow-xl rounded-2xl text-white p-6">
          <h3 className="text-xl font-bold mb-2">Regula Falsi Method</h3>
          <p className="opacity-90 mb-4">False-position method for root approximation.</p>
          <button onClick={() => setActiveComponent("regula")} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-4 py-2 rounded-xl shadow-md transition-all">
            Open Solver
          </button>
        </div>

        {/* Secant */}
        <div className="bg-white/20 backdrop-blur-md border border-white/20 shadow-xl rounded-2xl text-white p-6">
          <h3 className="text-xl font-bold mb-2">Secant Method</h3>
          <p className="opacity-90 mb-4">Derivative-free version of Newton method.</p>
          <button onClick={() => setActiveComponent("secant")} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-4 py-2 rounded-xl shadow-md transition-all">
            Open Solver
          </button>
        </div>

        {/* Jacobi & Gauss-Seidel Combined */}
        <div className="bg-white/20 backdrop-blur-md border border-white/20 shadow-xl rounded-2xl text-white p-6 col-span-1">
          <h3 className="text-xl font-bold mb-2">Jacobi & Gauss-Seidel Method</h3>
          <p className="opacity-90 mb-4">
            Iterative methods for solving linear systems with comparison results.
          </p>
          <button onClick={() => setActiveComponent("jacobi-gauss")} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-4 py-2 rounded-xl shadow-md transition-all">
            Open Solver
          </button>
        </div>


      </div>
    </div>
  );
}

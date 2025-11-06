import React, { useState } from 'react';
import { Calculator, PlayCircle, RefreshCw, AlertCircle } from 'lucide-react';

const JacobiGaussSolver = () => {
    const [size, setSize] = useState(3);
    const [matrix, setMatrix] = useState([
        [10, -1, 2, 6],
        [-1, 11, -1, 25],
        [2, -1, 10, -11]
    ]);
    const [tolerance, setTolerance] = useState(0.0001);
    const [maxIter, setMaxIter] = useState(25);
    const [results, setResults] = useState(null);

    const vars = ['x', 'y', 'z', 'w', 'v'];
    const subs = ['₁', '₂', '₃', '₄', '₅'];

    const updateMatrix = (i, j, val) => {
        const m = [...matrix];
        m[i][j] = parseFloat(val) || 0;
        setMatrix(m);
    };

    const changeSize = (n) => {
        setSize(parseInt(n));
        const m = Array(parseInt(n)).fill(0).map((_, i) =>
            Array(parseInt(n) + 1).fill(0).map((_, j) => i === j && j < parseInt(n) ? 10 : (j === parseInt(n) ? 1 : 0))
        );
        setMatrix(m);
    };

    const checkDominance = (A) => {
        const checks = [];
        let ok = true;
        for (let i = 0; i < A.length; i++) {
            const d = Math.abs(A[i][i]);
            let s = 0;
            for (let j = 0; j < A.length; j++) if (i !== j) s += Math.abs(A[i][j]);
            checks.push({ row: i + 1, diag: d, sum: s, ok: d > s });
            if (d <= s) ok = false;
        }
        return { ok, checks };
    };

    const jacobi = (A, b, tol, max) => {
        const n = A.length;
        let x = Array(n).fill(0);
        const iters = [];
        const formulas = A.map((row, i) => {
            const t = [`${b[i]}`];
            for (let j = 0; j < n; j++) {
                if (i !== j && A[i][j] !== 0) {
                    t.push(`${A[i][j] >= 0 ? ' - ' : ' + '}${Math.abs(A[i][j])}${vars[j]}${subs[j]}`);
                }
            }
            return `${vars[i]}${subs[i]} = (${t.join('')}) / ${A[i][i]}`;
        });

        for (let k = 0; k < max; k++) {
            const xn = Array(n).fill(0);
            const calcs = [];

            for (let i = 0; i < n; i++) {
                let v = b[i];
                const ct = [`${b[i]}`];
                for (let j = 0; j < n; j++) {
                    if (i !== j) {
                        v -= A[i][j] * x[j];
                        ct.push(` - ${A[i][j]}(${x[j].toFixed(4)})`);
                    }
                }
                xn[i] = v / A[i][i];
                calcs.push({ var: `${vars[i]}${subs[i]}`, calc: `(${ct.join('')}) / ${A[i][i]}`, res: xn[i] });
            }

            iters.push({ iter: k + 1, vals: xn, calcs });

            let diff = 0;
            for (let i = 0; i < n; i++) diff = Math.max(diff, Math.abs(xn[i] - x[i]));
            if (diff < tol) return { iters, conv: true, final: xn, formulas };
            x = [...xn];
        }
        return { iters, conv: false, final: x, formulas };
    };

    const gaussSeidel = (A, b, tol, max) => {
        const n = A.length;
        let x = Array(n).fill(0);
        const iters = [];
        const formulas = A.map((row, i) => {
            const t = [`${b[i]}`];
            for (let j = 0; j < n; j++) {
                if (i !== j && A[i][j] !== 0) {
                    t.push(`${A[i][j] >= 0 ? ' - ' : ' + '}${Math.abs(A[i][j])}${vars[j]}${subs[j]}`);
                }
            }
            return `${vars[i]}${subs[i]} = (${t.join('')}) / ${A[i][i]}`;
        });

        for (let k = 0; k < max; k++) {
            const calcs = [];

            for (let i = 0; i < n; i++) {
                let v = b[i];
                const ct = [`${b[i]}`];
                for (let j = 0; j < n; j++) {
                    if (i !== j) {
                        v -= A[i][j] * x[j];
                        ct.push(` - ${A[i][j]}(${x[j].toFixed(4)})`);
                    }
                }
                x[i] = v / A[i][i];
                calcs.push({ var: `${vars[i]}${subs[i]}`, calc: `(${ct.join('')}) / ${A[i][i]}`, res: x[i], upd: i > 0 });
            }

            iters.push({ iter: k + 1, vals: [...x], calcs });

            if (k > 0) {
                let diff = 0;
                for (let i = 0; i < n; i++) {
                    diff = Math.max(diff, Math.abs(x[i] - iters[k - 1].vals[i]));
                }
                if (diff < tol) return { iters, conv: true, final: x, formulas };
            }
        }
        return { iters, conv: false, final: x, formulas };
    };

    const solve = () => {
        const A = matrix.map(r => r.slice(0, size));
        const b = matrix.map(r => r[size]);
        const dom = checkDominance(A);
        const jRes = jacobi(A, b, tolerance, maxIter);
        const gsRes = gaussSeidel(A, b, tolerance, maxIter);
        setResults({ j: jRes, gs: gsRes, dom, A, b });
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                    <div className="flex items-center gap-3 mb-6 border-b pb-4">
                        <Calculator className="w-8 h-8 text-blue-600" />
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800">Iterative Methods Solver</h1>
                            <p className="text-sm text-gray-600">Jacobi & Gauss-Seidel Methods</p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4 mb-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Size</label>
                            <select value={size} onChange={(e) => changeSize(e.target.value)} className="w-full px-4 py-2 border rounded-lg">
                                <option value="2">2×2</option>
                                <option value="3">3×3</option>
                                <option value="4">4×4</option>
                                <option value="5">5×5</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Tolerance</label>
                            <input type="number" value={tolerance} onChange={(e) => setTolerance(parseFloat(e.target.value))} step="0.0001" className="w-full px-4 py-2 border rounded-lg" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Max Iterations</label>
                            <input type="number" value={maxIter} onChange={(e) => setMaxIter(parseInt(e.target.value))} className="w-full px-4 py-2 border rounded-lg" />
                        </div>
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm font-semibold text-gray-700 mb-3">System [A | b]</label>
                        <div className="bg-slate-50 p-4 rounded-lg">
                            {matrix.slice(0, size).map((row, i) => (
                                <div key={i} className="flex gap-2 mb-2">
                                    {row.slice(0, size + 1).map((val, j) => (
                                        <div key={j} className="flex items-center gap-1">
                                            <input type="number" value={val} onChange={(e) => updateMatrix(i, j, e.target.value)} className={`w-20 px-2 py-2 border rounded text-center ${j === size ? 'bg-amber-50 font-bold' : 'bg-white'}`} step="0.1" />
                                            {j < size && <span className="text-sm text-gray-600">{vars[j]}{subs[j]}</span>}
                                            {j < size && j < size - 1 && <span>+</span>}
                                        </div>
                                    ))}
                                    <span className="ml-2">= {matrix[i][size]}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <button onClick={solve} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center gap-2">
                            <PlayCircle className="w-5 h-5" />Solve
                        </button>
                        <button onClick={() => setResults(null)} className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg flex items-center gap-2">
                            <RefreshCw className="w-5 h-5" />Clear
                        </button>
                    </div>
                </div>

                {results && (
                    <div className="space-y-8">
                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <h2 className="text-xl font-bold mb-4">System of Equations</h2>
                            <div className="bg-slate-50 p-4 rounded-lg font-mono">
                                {results.A.map((row, i) => (
                                    <div key={i} className="text-lg">
                                        {row.map((c, j) => (
                                            <span key={j}>
                                                {j > 0 && c >= 0 && ' + '}
                                                {j > 0 && c < 0 && ' '}
                                                {c !== 0 && `${c}${vars[j]}${subs[j]}`}
                                            </span>
                                        ))} = <span className="font-bold text-amber-700">{results.b[i]}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                                <AlertCircle className="w-5 h-5" />Diagonal Dominance Check
                            </h2>
                            <div className="space-y-2">
                                {results.dom.checks.map((c, i) => (
                                    <div key={i} className={`p-3 rounded font-mono text-sm ${c.ok ? 'bg-green-50' : 'bg-red-50'}`}>
                                        Row {c.row}: |{c.diag.toFixed(2)}| {c.ok ? '>' : '≤'} {c.sum.toFixed(2)} {c.ok ? '✓' : '✗'}
                                    </div>
                                ))}
                            </div>
                            <p className={`mt-4 font-semibold ${results.dom.ok ? 'text-green-600' : 'text-orange-600'}`}>
                                {results.dom.ok ? '✓ Diagonally Dominant' : '⚠ Not Diagonally Dominant'}
                            </p>
                        </div>

                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <h2 className="text-2xl font-bold text-blue-600 mb-4 border-b-2 pb-3">Jacobi Method</h2>
                            <div className="mb-6 bg-blue-50 p-4 rounded-lg">
                                <h3 className="font-bold mb-3">Formulas:</h3>
                                {results.j.formulas.map((f, i) => (
                                    <div key={i} className="font-mono bg-white p-2 rounded mb-2 border-l-4 border-blue-500">{f}</div>
                                ))}
                                <p className="text-sm text-gray-600 mt-3 italic">Uses previous iteration values</p>
                            </div>

                            {results.j.iters.map((it, idx) => (
                                <div key={idx} className="border-l-4 border-blue-500 pl-4 bg-blue-50 p-4 rounded-r-lg mb-4">
                                    <h4 className="font-bold text-lg mb-2">Iteration #{it.iter}</h4>
                                    {it.iter === 1 && <p className="text-sm text-gray-600 mb-2">Initial: all = 0</p>}
                                    {it.calcs.map((c, i) => (
                                        <div key={i} className="bg-white p-3 rounded mb-2 border">
                                            <p className="text-sm font-mono mb-1">{c.calc}</p>
                                            <div className="bg-blue-100 p-2 rounded text-center">
                                                <p className="font-bold text-blue-800">{c.var} = {c.res.toFixed(6)}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ))}
                            {/* {results.j.iters.length > 4 && <p className="text-center text-gray-500 italic">... {results.j.iters.length - 4} more iterations ...</p>} */}

                            <div className="mt-6 bg-blue-100 p-4 rounded-lg">
                                <h4 className="font-bold mb-3">Final Solution:</h4>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
                                    {results.j.final.map((v, i) => (
                                        <div key={i} className="bg-white p-3 rounded text-center">
                                            <p className="text-sm text-gray-600">{vars[i]}{subs[i]}</p>
                                            <p className="font-bold text-blue-700">{v.toFixed(7)}</p>
                                        </div>
                                    ))}
                                </div>
                                <p><span className="font-semibold">Status:</span> <span className={results.j.conv ? 'text-green-600 font-bold' : 'text-red-600 font-bold'}>{results.j.conv ? '✓ Converged' : '✗ Not Converged'}</span></p>
                                <p><span className="font-semibold">Iterations:</span> <span className="font-bold text-blue-700">{results.j.iters.length}</span></p>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <h2 className="text-2xl font-bold text-green-600 mb-4 border-b-2 pb-3">Gauss-Seidel Method</h2>
                            <div className="mb-6 bg-green-50 p-4 rounded-lg">
                                <h3 className="font-bold mb-3">Formulas:</h3>
                                {results.gs.formulas.map((f, i) => (
                                    <div key={i} className="font-mono bg-white p-2 rounded mb-2 border-l-4 border-green-500">{f}</div>
                                ))}
                                <p className="text-sm text-gray-600 mt-3 italic">Uses updated values immediately</p>
                            </div>

                            {results.gs.iters.map((it, idx) => (
                                <div key={idx} className="border-l-4 border-green-500 pl-4 bg-green-50 p-4 rounded-r-lg mb-4">
                                    <h4 className="font-bold text-lg mb-2">Iteration #{it.iter}</h4>
                                    {it.iter === 1 && <p className="text-sm text-gray-600 mb-2">Initial: all = 0</p>}
                                    {it.calcs.map((c, i) => (
                                        <div key={i} className="bg-white p-3 rounded mb-2 border">
                                            <p className="text-sm font-mono mb-1">{c.calc}</p>
                                            <div className="bg-green-100 p-2 rounded text-center">
                                                <p className="font-bold text-green-800">{c.var} = {c.res.toFixed(6)} {c.upd && <span className="text-xs">(updated)</span>}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ))}
                            {/* {results.gs.iters.length > 4 && <p className="text-center text-gray-500 italic">... {results.gs.iters.length - 4} more iterations ...</p>} */}

                            <div className="mt-6 bg-green-100 p-4 rounded-lg">
                                <h4 className="font-bold mb-3">Final Solution:</h4>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
                                    {results.gs.final.map((v, i) => (
                                        <div key={i} className="bg-white p-3 rounded text-center">
                                            <p className="text-sm text-gray-600">{vars[i]}{subs[i]}</p>
                                            <p className="font-bold text-green-700">{v.toFixed(7)}</p>
                                        </div>
                                    ))}
                                </div>
                                <p><span className="font-semibold">Status:</span> <span className={results.gs.conv ? 'text-green-600 font-bold' : 'text-red-600 font-bold'}>{results.gs.conv ? '✓ Converged' : '✗ Not Converged'}</span></p>
                                <p><span className="font-semibold">Iterations:</span> <span className="font-bold text-green-700">{results.gs.iters.length}</span></p>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <h2 className="text-2xl font-bold mb-4">Comparison</h2>
                            <div className="overflow-x-auto">
                                <table className="w-full border-collapse">
                                    <thead>
                                        <tr className="bg-gray-100">
                                            <th className="p-3 border font-bold text-left">Aspect</th>
                                            <th className="p-3 border font-bold bg-blue-50">Jacobi</th>
                                            <th className="p-3 border font-bold bg-green-50">Gauss-Seidel</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="p-3 border font-semibold">Update Strategy</td>
                                            <td className="p-3 border">Uses OLD values</td>
                                            <td className="p-3 border">Uses UPDATED values</td>
                                        </tr>
                                        <tr className="bg-gray-50">
                                            <td className="p-3 border font-semibold">Convergence</td>
                                            <td className="p-3 border text-center">{results.j.conv ? '✓' : '✗'}</td>
                                            <td className="p-3 border text-center">{results.gs.conv ? '✓' : '✗'}</td>
                                        </tr>
                                        <tr>
                                            <td className="p-3 border font-semibold">Iterations</td>
                                            <td className="p-3 border text-center font-bold text-blue-700">{results.j.iters.length}</td>
                                            <td className="p-3 border text-center font-bold text-green-700">{results.gs.iters.length}</td>
                                        </tr>
                                        <tr className="bg-gray-50">
                                            <td className="p-3 border font-semibold">Speed</td>
                                            <td className="p-3 border text-center">{results.j.iters.length > results.gs.iters.length ? 'Slower' : results.j.iters.length < results.gs.iters.length ? 'Faster' : 'Same'}</td>
                                            <td className="p-3 border text-center">{results.gs.iters.length < results.j.iters.length ? 'Faster ⚡' : results.gs.iters.length > results.j.iters.length ? 'Slower' : 'Same'}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default JacobiGaussSolver;
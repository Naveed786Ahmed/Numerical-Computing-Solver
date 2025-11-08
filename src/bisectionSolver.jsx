import React, { useState } from 'react';
import { Calculator, Search, ArrowRight, CheckCircle } from 'lucide-react';

export default function BisectionMethodSolver() {
    const [equation, setEquation] = useState('x^3 - x - 1');
    const [decimalPlaces, setDecimalPlaces] = useState('3');
    const [results, setResults] = useState(null);
    const [error, setError] = useState('');


    const evaluateFunction = (expr, x) => {
        try {
            let equation = expr
                .replace(/\^/g, '**')
                .replace(/(\d)([a-z])/gi, '$1*$2')
                .replace(/x/gi, `(${x})`);
            return eval(equation);
        } catch (err) {
            throw new Error('Invalid equation');
        }
    };

    const findInterval = (expr) => {
        // Start from x = 1 and find interval
        for (let x = 1; x <= 100; x++) {
            const fa = evaluateFunction(expr, x);
            const fb = evaluateFunction(expr, x + 1);

            if (fa * fb < 0) {
                return { a: x, b: x + 1, fa, fb };
            }
        }

        // If not found in positive, check negative
        for (let x = 0; x >= -100; x--) {
            const fa = evaluateFunction(expr, x);
            const fb = evaluateFunction(expr, x + 1);

            if (fa * fb < 0) {
                return { a: x, b: x + 1, fa, fb };
            }
        }

        return null;
    };

    const checkDecimalMatch = (x1, x2, places) => {
        const factor = Math.pow(10, places);
        const rounded1 = Math.round(x1 * factor) / factor;
        const rounded2 = Math.round(x2 * factor) / factor;
        return rounded1 === rounded2;
    };

    const solve = () => {
        setError('');
        setResults(null);

        try {
            const decimals = parseInt(decimalPlaces);
            if (isNaN(decimals) || decimals < 1 || decimals > 10) {
                setError('Decimal places must be between 1 and 10');
                return;
            }

            // Step 1: Let equation as f(x)
            const functionExpr = `f(x) = ${equation}`;

            // Step 2: Find interval starting from x = 1
            const interval = findInterval(equation);

            if (!interval) {
                setError('No interval found where f(a)·f(b) < 0. Please check the equation.');
                return;
            }

            // Step 3: Set x₀ and x₁
            let x0 = interval.a;
            let x1 = interval.b;

            const iterations = [];
            let xCurrent, fx0, fx1, fxCurrent;
            let previousX = null;
            let xIndex = 2; // Starting from x₂

            // Step 4: Start iterations
            do {
                // Calculate midpoint
                xCurrent = (x0 + x1) / 2;

                // Calculate function values
                fx0 = evaluateFunction(equation, x0);
                fx1 = evaluateFunction(equation, x1);
                fxCurrent = evaluateFunction(equation, xCurrent);

                // Determine which interval to use next
                let decision;
                let nextX0, nextX1;

                if (fx0 * fxCurrent < 0) {
                    // f(x₀) and f(xCurrent) have opposite signs → x₁ = xCurrent, x₀ stays same
                    decision = 'opposite';
                    nextX0 = x0;
                    nextX1 = xCurrent;
                } else {
                    // f(x₀) and f(xCurrent) have same signs → x₀ = xCurrent, x₁ stays same
                    decision = 'same';
                    nextX0 = xCurrent;
                    nextX1 = x1;
                }

                iterations.push({
                    xIndex: xIndex,
                    x0: x0,
                    x1: x1,
                    xCurrent: xCurrent,
                    fx0: fx0,
                    fx1: fx1,
                    fxCurrent: fxCurrent,
                    decision: decision,
                    nextX0: nextX0,
                    nextX1: nextX1
                });

                // Check: Do decimal places match?
                if (previousX !== null && checkDecimalMatch(previousX, xCurrent, decimals)) {
                    break;
                }

                previousX = xCurrent;
                x0 = nextX0;
                x1 = nextX1;
                xIndex++;

                // Safety check
                if (xIndex > 102) {
                    setError('Did not converge after 100 iterations');
                    return;
                }

            } while (true);

            setResults({
                functionExpr,
                initialInterval: interval,
                iterations,
                finalRoot: xCurrent,
                decimals
            });

        } catch (err) {
            setError(err.message || 'Error in calculation');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="bg-white rounded-xl shadow-2xl p-6 md:p-8 mb-6">
                    <div className="flex items-center gap-3 mb-6">
                        <Calculator className="w-10 h-10 text-indigo-600" />
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                                Bisection Method - Step by Step Manual Solver
                            </h1>
                            <p className="text-sm text-gray-600 mt-1">Automatically finds interval starting from x = 1</p>
                        </div>
                    </div>

                    {/* Input Section */}
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                Enter Simple Equation (for f(x) = 0)
                            </label>
                            <input
                                type="text"
                                value={equation}
                                onChange={(e) => setEquation(e.target.value)}
                                className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
                                placeholder="e.g., x^3 - x - 1"
                            />
                            <p className="text-xs text-gray-500 mt-2">
                                Examples: x^3 - x - 1, x^2 - 4, x^3 - 4*x - 9
                            </p>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                How many decimal places? (Accuracy)
                            </label>
                            <input
                                type="number"
                                value={decimalPlaces}
                                onChange={(e) => setDecimalPlaces(e.target.value)}
                                min="1"
                                max="10"
                                className="w-full md:w-48 px-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
                            />
                            <p className="text-xs text-gray-500 mt-2">
                                Iteration stops when current and previous x match to {decimalPlaces} decimal places
                            </p>
                        </div>

                        <button
                            onClick={solve}
                            className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg text-lg"
                        >
                            🚀 Solve Now!
                        </button>
                    </div>

                    {error && (
                        <div className="mt-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg">
                            <p className="text-red-700 font-semibold">❌ {error}</p>
                        </div>
                    )}
                </div>

                {/* Results */}
                {results && (
                    <div className="space-y-6">
                        {/* Step 1: Function */}
                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <h2 className="text-xl font-bold text-indigo-600 mb-3 flex items-center gap-2">
                                <span className="bg-indigo-100 text-indigo-600 w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span>
                                Let the equation as f(x)
                            </h2>
                            <div className="bg-gray-50 p-4 rounded-lg border-2 border-indigo-200">
                                <p className="text-2xl font-mono text-gray-800">{results.functionExpr}</p>
                            </div>
                        </div>

                        {/* Step 2: Interval Finding */}
                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <h2 className="text-xl font-bold text-indigo-600 mb-3 flex items-center gap-2">
                                <span className="bg-indigo-100 text-indigo-600 w-8 h-8 rounded-full flex items-center justify-center text-sm">2</span>
                                Find interval starting from x = 1 (where f(a)·f(b) &lt; 0)
                            </h2>
                            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg border-2 border-green-300">
                                <div className="flex items-center gap-2 mb-3">
                                    <Search className="w-6 h-6 text-green-600" />
                                    <p className="text-lg font-bold text-green-700">Interval Found! ✓</p>
                                </div>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm text-gray-600 mb-1">Interval:</p>
                                        <p className="text-3xl font-bold text-gray-800">
                                            [{results.initialInterval.a}, {results.initialInterval.b}]
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600 mb-1">Verification:</p>
                                        <p className="text-lg font-mono text-gray-700">
                                            f({results.initialInterval.a}) = {results.initialInterval.fa.toFixed(4)}
                                        </p>
                                        <p className="text-lg font-mono text-gray-700">
                                            f({results.initialInterval.b}) = {results.initialInterval.fb.toFixed(4)}
                                        </p>
                                        <p className="text-sm text-green-600 font-semibold mt-2">
                                            {results.initialInterval.fa.toFixed(4)} × {results.initialInterval.fb.toFixed(4)} = {(results.initialInterval.fa * results.initialInterval.fb).toFixed(4)} &lt; 0 ✓
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Step 3: Setting x₀ and x₁ */}
                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <h2 className="text-xl font-bold text-indigo-600 mb-3 flex items-center gap-2">
                                <span className="bg-indigo-100 text-indigo-600 w-8 h-8 rounded-full flex items-center justify-center text-sm">3</span>
                                Set x₀ and x₁
                            </h2>
                            <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-300">
                                <p className="text-xl font-semibold text-gray-800">
                                    x₀ = {results.initialInterval.a} &nbsp;&nbsp;|&nbsp;&nbsp; x₁ = {results.initialInterval.b}
                                </p>
                            </div>
                        </div>

                        {/* Step 4: Iterations */}
                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <h2 className="text-xl font-bold text-indigo-600 mb-4 flex items-center gap-2">
                                <span className="bg-indigo-100 text-indigo-600 w-8 h-8 rounded-full flex items-center justify-center text-sm">4</span>
                                Step-by-Step Iterations
                            </h2>

                            <div className="space-y-4">
                                {results.iterations.map((iter, idx) => {
                                    const isLast = idx === results.iterations.length - 1;

                                    return (
                                        <div
                                            key={idx}
                                            className={`border-2 rounded-xl p-6 ${isLast
                                                ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-400'
                                                : 'bg-gradient-to-r from-gray-50 to-blue-50 border-indigo-200'
                                                }`}
                                        >
                                            {/* Iteration Header */}
                                            <div className="flex items-center justify-between mb-4">
                                                <h3 className="text-2xl font-bold text-indigo-600 flex items-center gap-2">
                                                    <span className="bg-indigo-600 text-white px-3 py-1 rounded-lg">
                                                        Iteration {idx + 1}
                                                    </span>
                                                    <span className="text-purple-600">
                                                        → x<sub>{iter.xIndex}</sub>
                                                    </span>
                                                </h3>
                                                {isLast && (
                                                    <CheckCircle className="w-8 h-8 text-green-600" />
                                                )}
                                            </div>

                                            {/* Calculation */}
                                            <div className="space-y-3">
                                                {/* Midpoint Formula */}
                                                <div className="bg-white rounded-lg p-4 border border-gray-200">
                                                    <p className="text-sm text-gray-600 mb-1">Midpoint Formula:</p>
                                                    <p className="text-xl font-mono font-bold text-gray-800">
                                                        x<sub>{iter.xIndex}</sub> = (x₀ + x₁) / 2 = ({iter.x0} + {iter.x1}) / 2 = <span className="text-purple-600">{iter.xCurrent.toFixed(6)}</span>
                                                    </p>
                                                </div>

                                                {/* Function Values */}
                                                <div className="grid md:grid-cols-3 gap-3">
                                                    <div className="bg-white rounded-lg p-3 border border-gray-200">
                                                        <p className="text-xs text-gray-500 mb-1">f(x₀):</p>
                                                        <p className="text-lg font-mono font-semibold text-gray-800">
                                                            f({iter.x0}) = {iter.fx0.toFixed(6)}
                                                        </p>
                                                    </div>
                                                    <div className="bg-white rounded-lg p-3 border border-gray-200">
                                                        <p className="text-xs text-gray-500 mb-1">f(x₁):</p>
                                                        <p className="text-lg font-mono font-semibold text-gray-800">
                                                            f({iter.x1}) = {iter.fx1.toFixed(6)}
                                                        </p>
                                                    </div>
                                                    <div className="bg-purple-100 rounded-lg p-3 border-2 border-purple-300">
                                                        <p className="text-xs text-purple-700 mb-1 font-semibold">f(x<sub>{iter.xIndex}</sub>):</p>
                                                        <p className="text-lg font-mono font-bold text-purple-700">
                                                            f({iter.xCurrent.toFixed(6)}) = {iter.fxCurrent.toFixed(6)}
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* Decision Logic */}
                                                {!isLast && (
                                                    <div className="bg-amber-50 rounded-lg p-4 border-2 border-amber-300">
                                                        <div className="flex items-start gap-3">
                                                            <ArrowRight className="w-5 h-5 text-amber-600 mt-1 flex-shrink-0" />
                                                            <div>
                                                                <p className="font-semibold text-amber-800 mb-1">Decision:</p>
                                                                {iter.decision === 'opposite' ? (
                                                                    <div>
                                                                        <p className="text-sm text-gray-700">
                                                                            f(x₀) × f(x<sub>{iter.xIndex}</sub>) = {iter.fx0.toFixed(4)} × {iter.fxCurrent.toFixed(4)} = {(iter.fx0 * iter.fxCurrent).toFixed(4)} <span className="font-bold text-green-600">&lt; 0</span>
                                                                        </p>
                                                                        <p className="text-sm text-gray-700 mt-1">
                                                                            → <strong>Opposite signs</strong>, so root is between x₀ and x<sub>{iter.xIndex}</sub>
                                                                        </p>
                                                                        <p className="text-sm font-bold text-indigo-600 mt-2">
                                                                            Next: x₀ = {iter.nextX0}, x₁ = {iter.nextX1.toFixed(6)}
                                                                        </p>
                                                                    </div>
                                                                ) : (
                                                                    <div>
                                                                        <p className="text-sm text-gray-700">
                                                                            f(x₀) × f(x<sub>{iter.xIndex}</sub>) = {iter.fx0.toFixed(4)} × {iter.fxCurrent.toFixed(4)} = {(iter.fx0 * iter.fxCurrent).toFixed(4)} <span className="font-bold text-blue-600">&gt; 0</span>
                                                                        </p>
                                                                        <p className="text-sm text-gray-700 mt-1">
                                                                            → <strong>Same signs</strong>, so root is between x<sub>{iter.xIndex}</sub> and x₁
                                                                        </p>
                                                                        <p className="text-sm font-bold text-indigo-600 mt-2">
                                                                            Next: x₀ = {iter.nextX0.toFixed(6)}, x₁ = {iter.nextX1}
                                                                        </p>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}

                                                {isLast && (
                                                    <div className="bg-green-100 rounded-lg p-4 border-2 border-green-400">
                                                        <p className="text-green-800 font-bold text-center">
                                                            ✓ Converged! Current x<sub>{iter.xIndex}</sub> and previous x values match to {results.decimals} decimal places.
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Final Answer */}
                        <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl shadow-2xl p-8 text-white">
                            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                                <span className="text-4xl">🎉</span>
                                Final Answer
                            </h2>
                            <div className="bg-white/20 rounded-lg p-6 backdrop-blur-sm">
                                <p className="text-lg mb-2">Approximate value of root:</p>
                                <p className="text-5xl font-bold mb-4">
                                    x ≈ {results.finalRoot.toFixed(results.decimals)}
                                </p>
                                <p className="text-sm opacity-90">
                                    Total iterations: {results.iterations.length} |
                                    Accuracy: {results.decimals} decimal places
                                </p>
                            </div>
                        </div>

                        {/* Method Explanation */}
                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <h3 className="text-lg font-bold text-gray-800 mb-3">📚 Method Logic:</h3>
                            <div className="space-y-2 text-sm text-gray-700">
                                <div className="flex items-start gap-2">
                                    <ArrowRight className="w-4 h-4 mt-1 text-indigo-600 flex-shrink-0" />
                                    <p><strong>Midpoint formula:</strong> x<sub>n</sub> = (x₀ + x₁) / 2</p>
                                </div>
                                <div className="flex items-start gap-2">
                                    <ArrowRight className="w-4 h-4 mt-1 text-indigo-600 flex-shrink-0" />
                                    <p><strong>If f(x₀) and f(x<sub>n</sub>) have opposite signs:</strong> x₁ = x<sub>n</sub> (x₀ stays same)</p>
                                </div>
                                <div className="flex items-start gap-2">
                                    <ArrowRight className="w-4 h-4 mt-1 text-indigo-600 flex-shrink-0" />
                                    <p><strong>If f(x₀) and f(x<sub>n</sub>) have same signs:</strong> x₀ = x<sub>n</sub> (x₁ stays same)</p>
                                </div>
                                <div className="flex items-start gap-2">
                                    <ArrowRight className="w-4 h-4 mt-1 text-indigo-600 flex-shrink-0" />
                                    <p><strong>Stop condition:</strong> When current iteration's x and previous iteration's x match to {results.decimals} decimal places</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
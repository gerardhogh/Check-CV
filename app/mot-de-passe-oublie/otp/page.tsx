"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Navbar from "../../components/Navbar";

function OtpForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  
  const [code, setCode] = useState(["", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    // Focus first input on mount
    if (inputsRef.current[0]) {
      inputsRef.current[0].focus();
    }
  }, []);

  const handleChange = (index: number, value: string) => {
    if (!/^[0-9]*$/.test(value)) return;
    
    setError(""); // Clear error when typing
    
    const newCode = [...code];
    // Take only the last character if user pasted or typed multiple
    newCode[index] = value.slice(-1);
    setCode(newCode);

    // Move to next input if value exists
    if (value && index < 3) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Move to previous input on backspace if current is empty
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const otp = code.join("");
    if (otp.length !== 4) return;
    
    setIsLoading(true);
    // Simulate real API validation
    setTimeout(() => {
      setIsLoading(false);
      if (otp === "1234") {
        router.push(`/mot-de-passe-oublie/nouveau`);
      } else {
        setError("Code incorrect. (Pour la démo, utilisez 1234)");
      }
    }, 1000);
  };

  return (
    <div className="flex-1 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 md:p-10 border border-slate-100 animate-fade-in-up">
        <h1 className="text-3xl font-extrabold text-center mb-2" style={{ color: "#32A8D7" }}>
          Entrer le code à 4 chiffres
        </h1>
        <p className="text-center text-sm mb-8 text-slate-500 px-4">
          Saisissez le code envoyé à votre email {email ? <span className="font-semibold text-slate-700 block mt-1">{email}</span> : ""}
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-3 bg-red-50 text-red-600 text-sm rounded-xl border border-red-100 text-center">
              {error}
            </div>
          )}
          
          <div className="flex justify-center gap-4">
            {code.map((digit, idx) => (
              <input
                key={idx}
                ref={(el) => { inputsRef.current[idx] = el; }}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(idx, e.target.value)}
                onKeyDown={(e) => handleKeyDown(idx, e)}
                className="w-14 h-14 text-center text-2xl font-bold bg-[#F9FAFB] border-0 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#32A8D7] transition-all"
              />
            ))}
          </div>

          <div className="text-center">
            <button
              type="button"
              className="text-sm font-semibold hover:underline"
              style={{ color: "#F7815B" }}
            >
              Renvoyer le code
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoading || code.some(d => !d)}
            className="w-full py-3.5 px-6 rounded-xl font-bold text-white bg-[#32A8D7] hover:bg-[#2a95c2] disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.99] transition-all shadow-md flex items-center justify-center gap-2 text-sm mt-4"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Vérification...
              </>
            ) : (
              "Vérifier le code"
            )}
          </button>
        </form>

        <div className="mt-8 flex justify-center">
          <Link
            href="/mot-de-passe-oublie"
            className="flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-slate-800 transition-colors"
          >
            <ArrowLeft size={16} /> Retour
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function OtpPage() {
  return (
    <div
      className="min-h-screen flex flex-col relative"
      style={{
        backgroundImage: "url('/assets/Fond.png')",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
      }}
    >
      <Navbar variant="transparent" />
      <Suspense fallback={<div className="flex-1"></div>}>
        <OtpForm />
      </Suspense>
    </div>
  );
}

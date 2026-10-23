import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { AlertCircle, Check, X } from "lucide-react";
import { ToastContext, type ToastType } from "./AppContexts";

interface ToastMessage {
  id: number;
  message: string;
  type: ToastType;
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<ToastMessage | null>(null);
  const timer = useRef<number | undefined>(undefined);

  const dismissToast = useCallback(() => {
    window.clearTimeout(timer.current);
    setToast(null);
  }, []);

  const showToast = useCallback(
    (message: string, type: ToastType = "success") => {
      window.clearTimeout(timer.current);
      setToast({ id: Date.now(), message, type });
      timer.current = window.setTimeout(() => setToast(null), 3200);
    },
    [],
  );

  useEffect(() => () => window.clearTimeout(timer.current), []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div
        aria-live="polite"
        aria-atomic="true"
        className="pointer-events-none fixed right-4 top-20 z-[100] w-[min(24rem,calc(100vw-2rem))]"
      >
        {toast && (
          <div
            key={toast.id}
            role={toast.type === "error" ? "alert" : "status"}
            className="pointer-events-auto flex items-center gap-3 rounded-2xl border border-[#c9a8f1]/35 bg-white px-4 py-3.5 text-sm font-semibold text-[#391053] shadow-xl shadow-[#391053]/15 animate-toast-in"
          >
            <span
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                toast.type === "success"
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {toast.type === "success" ? (
                <Check aria-hidden="true" className="h-4 w-4" />
              ) : (
                <AlertCircle aria-hidden="true" className="h-4 w-4" />
              )}
            </span>
            <span className="flex-1">{toast.message}</span>
            <button
              type="button"
              onClick={dismissToast}
              aria-label="Dismiss notification"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[#5a2675]/60 transition-colors hover:bg-[#c9a8f1]/20 hover:text-[#391053] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9d72b3]"
            >
              <X aria-hidden="true" className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </ToastContext.Provider>
  );
}

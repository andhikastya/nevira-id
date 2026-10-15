"use client";

/** Kilau switch (Medium): 44×24 track, 20px white thumb, 2px inset. Label left, 12px gap. */
export function Toggle({ checked, onChange, label, id }: { checked: boolean; onChange: (v: boolean) => void; label: string; id: string }) {
  return (
    <label htmlFor={id} className="flex cursor-pointer items-center justify-between gap-3 py-2">
      <span className="text-body-sm text-text-1">{label}</span>
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 shrink-0 rounded-full transition-colors duration-[120ms] focus-visible:rounded-full ${
          checked ? "bg-[#412675] hover:bg-[#2B1750]" : "bg-[#ECEFF3] shadow-[inset_0_0_0_1px_#DFE1E7] hover:bg-[#DFE1E7]"
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 size-5 rounded-full bg-white shadow-[0_1px_2px_#1018280F,0_1px_3px_#1018281A] transition-transform duration-[120ms] ease-kilau ${
            checked ? "translate-x-5" : ""
          }`}
        />
      </button>
    </label>
  );
}

"use client";

export function BackToTop() {
  return (
    <div className="mt-12 pt-8 border-t text-center">
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="text-primary hover:underline"
      >
        Back to Top ↑
      </button>
    </div>
  );
}

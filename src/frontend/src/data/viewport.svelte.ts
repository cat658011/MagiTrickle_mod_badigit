const DESKTOP_BREAKPOINT = 668;

// Default to Infinity (desktop) to match the original per-component behavior
// where `client_width` was initialized to Infinity before the window was available.
let _width = $state(typeof window !== "undefined" ? window.innerWidth : Infinity);

if (typeof window !== "undefined") {
  const handleResize = () => {
    _width = window.innerWidth;
  };

  window.addEventListener("resize", handleResize, { passive: true });

  // Clean up during Vite HMR to avoid duplicate listeners across hot reloads.
  if (import.meta.hot) {
    import.meta.hot.dispose(() => {
      window.removeEventListener("resize", handleResize);
    });
  }
}

export const viewport = {
  get isDesktop() {
    return _width > DESKTOP_BREAKPOINT;
  },
};

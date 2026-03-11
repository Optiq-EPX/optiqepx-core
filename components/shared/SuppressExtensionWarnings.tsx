export function SuppressExtensionWarnings() {
  // This script runs synchronously before React hydration starts.
  // It removes attributes injected by browser extensions (like Bitdefender)
  // to prevent React from throwing hydration mismatch errors.
  const scriptContent = `
    (function() {
      try {
        const removeAttrs = () => {
          document.querySelectorAll('[bis_skin_checked]').forEach(el => el.removeAttribute('bis_skin_checked'));
          document.querySelectorAll('[data-temp-mail-org]').forEach(el => el.removeAttribute('data-temp-mail-org'));
        };
        
        // Remove initially
        removeAttrs();

        // Keep removing dynamically before React hydrates
        const observer = new MutationObserver((mutations) => {
          mutations.forEach((mutation) => {
            if (mutation.type === 'attributes') {
              const el = mutation.target;
              if (el.hasAttribute('bis_skin_checked')) el.removeAttribute('bis_skin_checked');
              if (el.hasAttribute('data-temp-mail-org')) el.removeAttribute('data-temp-mail-org');
            }
          });
        });

        observer.observe(document.documentElement, {
          attributes: true,
          subtree: true,
          attributeFilter: ['bis_skin_checked', 'data-temp-mail-org']
        });
      } catch (e) {}
    })();
  `;

  return (
    <script dangerouslySetInnerHTML={{ __html: scriptContent }} />
  );
}

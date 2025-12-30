/**
 * Code block copy button functionality
 * Adds copy-to-clipboard buttons to all code blocks in blog posts
 */

interface CopyButtonOptions {
  successDuration?: number;
  errorDuration?: number;
}

/**
 * Sets up copy buttons for all code blocks in the article
 */
export function setupCodeCopyButtons(options: CopyButtonOptions = {}) {
  const { successDuration = 2000, errorDuration = 2000 } = options;

  const codeBlocks = document.querySelectorAll<HTMLPreElement>('article pre');

  codeBlocks.forEach((pre) => {
    const wrapper = createWrapper();
    const button = createCopyButton();

    button.addEventListener('click', async () => {
      await handleCopyClick(pre, button, successDuration, errorDuration);
    });

    wrapCodeBlock(pre, wrapper, button);
  });
}

function createWrapper(): HTMLDivElement {
  const wrapper = document.createElement('div');
  wrapper.className = 'relative group my-6';
  return wrapper;
}

function createCopyButton(): HTMLButtonElement {
  const button = document.createElement('button');
  button.className =
    'absolute top-2 right-2 px-3 py-1 bg-saddle-brown text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-saddle-brown focus:ring-offset-2';
  button.textContent = 'Copy';
  button.setAttribute('aria-label', 'Copy code to clipboard');
  return button;
}

async function handleCopyClick(
  pre: HTMLPreElement,
  button: HTMLButtonElement,
  successDuration: number,
  errorDuration: number
): Promise<void> {
  const code = pre.querySelector('code');
  if (!code) return;

  try {
    await navigator.clipboard.writeText(code.textContent || '');
    showSuccess(button, successDuration);
  } catch (err) {
    console.error('Failed to copy code:', err);
    showError(button, errorDuration);
  }
}

function showSuccess(button: HTMLButtonElement, duration: number): void {
  const originalText = button.textContent;
  const originalClasses = button.className;

  button.textContent = 'Copied!';
  button.className = button.className.replace('bg-saddle-brown', 'bg-green-600');

  setTimeout(() => {
    button.textContent = originalText;
    button.className = originalClasses;
  }, duration);
}

function showError(button: HTMLButtonElement, duration: number): void {
  button.textContent = 'Failed';

  setTimeout(() => {
    button.textContent = 'Copy';
  }, duration);
}

function wrapCodeBlock(
  pre: HTMLPreElement,
  wrapper: HTMLDivElement,
  button: HTMLButtonElement
): void {
  if (pre.parentNode) {
    pre.parentNode.insertBefore(wrapper, pre);
    wrapper.appendChild(pre);
    wrapper.appendChild(button);
  }
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => setupCodeCopyButtons());
} else {
  setupCodeCopyButtons();
}

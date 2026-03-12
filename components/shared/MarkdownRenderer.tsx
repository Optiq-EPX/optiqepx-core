'use client';

import { useMemo, useState, useEffect } from 'react';
import { Marked, Renderer } from 'marked';
import hljs from 'highlight.js';
import DOMPurify from 'isomorphic-dompurify';

interface MarkdownRendererProps {
  content: string;
  className?: string;
  isGenerating?: boolean;
}

const renderer = new Renderer();

renderer.code = ({ text, lang }: { text: string; lang?: string }) => {
  const codeContent = text || '';
  const language = (lang || 'text').split(' ')[0].toLowerCase();
  
  let highlightedCode = codeContent;
  try {
    if (language && hljs.getLanguage(language)) {
      highlightedCode = hljs.highlight(codeContent, { language }).value;
    } else {
      highlightedCode = hljs.highlightAuto(codeContent).value;
    }
  } catch (e) {
    console.warn('Highlight.js error:', e);
  }

  return `
    <div class="code-block-wrapper">
      <div class="terminal-header">
        <div class="terminal-dots">
          <div class="terminal-dot terminal-dot-red"></div>
          <div class="terminal-dot terminal-dot-yellow"></div>
          <div class="terminal-dot terminal-dot-green"></div>
        </div>
        <div class="terminal-right">
          <span class="terminal-lang">${language}</span>
          <button class="copy-code-btn" data-code="${encodeURIComponent(codeContent)}">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="copy-icon"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
            <span class="btn-text">Copy</span>
          </button>
        </div>
      </div>
      <pre class="code-pre"><code class="hljs language-${language}">${highlightedCode}</code></pre>
    </div>
  `;
};

const markedInstance = new Marked({
  renderer,
  breaks: true,
  gfm: true
});

export function MarkdownRenderer({ content, className = '', isGenerating = false }: MarkdownRendererProps) {
  const [displayedContent, setDisplayedContent] = useState(content);

  useEffect(() => {
    const updateButtonState = (btn: HTMLButtonElement) => {
      const icon = btn.querySelector('.copy-icon');
      const text = btn.querySelector('.btn-text');
      if (icon && text) {
        const originalIcon = icon.innerHTML;
        const originalText = text.textContent;
        
        text.textContent = 'Copied';
        btn.classList.add('bg-emerald-500/20', 'text-emerald-400', 'border-emerald-500/20');
        icon.innerHTML = '<path d="M20 6L9 17l-5-5"/>';
        
        setTimeout(() => {
          text.textContent = originalText;
          btn.classList.remove('bg-emerald-500/20', 'text-emerald-400', 'border-emerald-500/20');
          icon.innerHTML = originalIcon;
        }, 2000);
      }
    };

    const handleCopyClick = async (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // Handle Code Copy
      const codeBtn = target.closest('.copy-code-btn') as HTMLButtonElement;
      if (codeBtn) {
        const code = decodeURIComponent(codeBtn.getAttribute('data-code') || '');
        await navigator.clipboard.writeText(code);
        updateButtonState(codeBtn);
        return;
      }

      // Handle Table Copy
      const tableBtn = target.closest('.copy-table-btn') as HTMLButtonElement;
      if (tableBtn) {
        const container = tableBtn.closest('.table-container');
        const table = container?.querySelector('table');
        if (table) {
          const rows = Array.from(table.rows);
          const text = rows.map(row => 
            Array.from(row.cells).map(cell => cell.innerText.trim()).join('\t')
          ).join('\n');
          await navigator.clipboard.writeText(text);
          updateButtonState(tableBtn);
        }
        return;
      }
    };

    document.addEventListener('click', handleCopyClick);
    return () => document.removeEventListener('click', handleCopyClick);
  }, []);

  useEffect(() => {
    if (!isGenerating) {
      setDisplayedContent(content);
      return;
    }

    if (content.length > displayedContent.length) {
      const diff = content.length - displayedContent.length;
      
      // Calculate organic speed and step size
      // If we're far behind, jump more characters to catch up, but keep it smooth
      const step = diff > 100 ? 15 : diff > 30 ? 6 : diff > 10 ? 2 : 1;
      const delay = diff > 200 ? 5 : diff > 50 ? 10 : 20;

      const timeout = setTimeout(() => {
        setDisplayedContent(content.slice(0, displayedContent.length + step));
      }, delay);
      
      return () => clearTimeout(timeout);
    } else if (content.length < displayedContent.length) {
      // If content was reset or shortened (e.g. regeneration)
      setDisplayedContent(content);
    }
  }, [content, isGenerating, displayedContent.length]);

  const html = useMemo(() => {
    if (!displayedContent && !isGenerating) return '';
    
    const rawHtml = markedInstance.parse(displayedContent || '') as string;
    
    const wrappedHtml = rawHtml
      .replace(/<table([^>]*)>/g, `
        <div class="table-container my-4 sm:my-8 rounded-xl border border-white/10 bg-zinc-900/20 overflow-hidden shadow-2xl shadow-black/20 isolate" style="max-width: 100%; min-width: 0;">
          <div class="flex items-center justify-between px-3 py-1.5 sm:px-4 sm:py-2 border-b border-white/5 bg-white/[0.02] backdrop-blur-md">
            <div class="flex items-center gap-2">
              <div class="w-1.5 h-1.5 rounded-full bg-violet-500/50"></div>
              <span class="text-[9px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Platform Data Table</span>
            </div>
            <button class="copy-table-btn flex items-center gap-1.5 px-2 py-1 rounded-md bg-white/[0.05] border border-white/10 text-zinc-400 hover:text-white hover:bg-white/[0.1] hover:border-white/20 transition-all cursor-pointer" title="Copy table to clipboard">
              <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="copy-icon"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
              <span class="btn-text text-[9px] font-black uppercase tracking-wider">Copy</span>
            </button>
          </div>
          <div class="table-wrapper" style="width: 100%; max-width: 100%; overflow-x: auto; display: block;"><table$1>
      `)
      .replace(/<\/table>/g, '</table></div></div>');
    
    const clean = DOMPurify.sanitize(wrappedHtml, {
      ALLOWED_TAGS: [
        'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
        'p', 'br', 'hr',
        'strong', 'em', 'del', 'code', 'pre',
        'ul', 'ol', 'li',
        'blockquote',
        'a', 'img',
        'table', 'thead', 'tbody', 'tr', 'th', 'td',
        'span', 'div', 'sup', 'sub', 'input',
        'button', 'svg', 'path', 'rect', 'circle'
      ],
      ALLOWED_ATTR: [
        'href', 'target', 'rel', 'src', 'alt', 'class', 'title', 'type', 'checked', 'disabled',
        'data-code', 'viewBox', 'fill', 'stroke', 'stroke-width', 'stroke-linecap', 'stroke-linejoin',
        'd', 'width', 'height', 'x', 'y', 'rx', 'ry', 'aria-hidden', 'xmlns'
      ],
    });

    return clean;
  }, [displayedContent, isGenerating]);

  return (
    <div
      className={`chat-markdown ${className}`}
      style={{
        maxWidth: '100%',
        minWidth: 0,
        overflowX: 'hidden',
        boxSizing: 'border-box'
      }}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

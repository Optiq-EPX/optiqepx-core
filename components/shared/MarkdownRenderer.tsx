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
    const handleCopyClick = async (e: MouseEvent) => {
      const btn = (e.target as HTMLElement).closest('.copy-code-btn') as HTMLButtonElement;
      if (!btn) return;

      const code = decodeURIComponent(btn.getAttribute('data-code') || '');
      await navigator.clipboard.writeText(code);

      const icon = btn.querySelector('.copy-icon');
      const text = btn.querySelector('.btn-text');
      if (icon && text) {
        const originalIcon = icon.innerHTML;
        const originalText = text.textContent;
        
        text.textContent = 'Copied';
        btn.classList.add('bg-emerald-500/20', 'text-emerald-400', 'border-emerald-500/20');
        btn.classList.remove('text-white/50', 'bg-white/[0.05]', 'border-white/5');
        icon.innerHTML = '<path d="M20 6L9 17l-5-5"/>';
        
        setTimeout(() => {
          text.textContent = originalText;
          btn.classList.remove('bg-emerald-500/20', 'text-emerald-400', 'border-emerald-500/20');
          btn.classList.add('text-white/50', 'bg-white/[0.05]', 'border-white/5');
          icon.innerHTML = originalIcon;
        }, 2000);
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
      const timeout = setTimeout(() => {
        const nextLength = Math.min(content.length, displayedContent.length + 12);
        setDisplayedContent(content.slice(0, nextLength));
      }, 10);
      return () => clearTimeout(timeout);
    } else if (content.length < displayedContent.length) {
      setDisplayedContent(content);
    }
  }, [content, isGenerating, displayedContent]);

  const html = useMemo(() => {
    if (!displayedContent && !isGenerating) return '';
    
    const rawHtml = markedInstance.parse(displayedContent || '') as string;
    
    const wrappedHtml = rawHtml
      .replace(/<table([^>]*)>/g, '<div class="table-wrapper"><table$1>')
      .replace(/<\/table>/g, '</table></div>');
    
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
      className={`chat-markdown ${isGenerating ? 'typing-cursor' : ''} ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

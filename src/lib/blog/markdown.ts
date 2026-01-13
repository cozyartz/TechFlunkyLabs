/**
 * Markdown parsing utilities for blog content
 * Uses marked for parsing with custom renderers for enhanced styling
 */

import { marked, type MarkedOptions, type Tokens } from 'marked';

// Configure marked with custom options for clean output
marked.setOptions({
  gfm: true, // GitHub Flavored Markdown
  breaks: false, // Don't convert \n to <br>
});

// Custom renderer for enhanced table styling
const renderer = {
  table(token: Tokens.Table): string {
    const headerCells = token.header.map(cell => {
      const align = cell.align ? ` style="text-align: ${cell.align}"` : '';
      return `<th${align}>${this.parser.parseInline(cell.tokens)}</th>`;
    }).join('\n            ');

    const bodyRows = token.rows.map(row => {
      const cells = row.map(cell => {
        const align = cell.align ? ` style="text-align: ${cell.align}"` : '';
        return `<td${align}>${this.parser.parseInline(cell.tokens)}</td>`;
      }).join('\n              ');
      return `          <tr>\n              ${cells}\n          </tr>`;
    }).join('\n');

    return `<div class="table-wrapper">
      <table>
        <thead>
          <tr>
            ${headerCells}
          </tr>
        </thead>
        <tbody>
${bodyRows}
        </tbody>
      </table>
    </div>`;
  },

  list(token: Tokens.List): string {
    const tag = token.ordered ? 'ol' : 'ul';
    const start = token.ordered && token.start !== 1 ? ` start="${token.start}"` : '';
    const body = token.items.map(item => this.listitem(item)).join('\n');
    return `<${tag}${start} class="styled-list">\n${body}\n</${tag}>`;
  },

  listitem(token: Tokens.ListItem): string {
    let text = '';
    if (token.task) {
      const checkbox = token.checked
        ? '<span class="checkbox checked"></span>'
        : '<span class="checkbox"></span>';
      text = checkbox + this.parser.parse(token.tokens);
    } else {
      text = this.parser.parse(token.tokens);
    }
    return `<li>${text}</li>`;
  },

  heading(token: Tokens.Heading): string {
    const slug = token.text.toLowerCase().replace(/[^\w]+/g, '-');
    return `<h${token.depth} id="${slug}">${this.parser.parseInline(token.tokens)}</h${token.depth}>`;
  },

  code(token: Tokens.Code): string {
    const lang = token.lang || '';
    const langClass = lang ? ` language-${lang}` : '';
    const langLabel = lang ? `<span class="code-lang">${lang}</span>` : '';
    return `<div class="code-block">${langLabel}<pre><code class="hljs${langClass}">${escapeHtml(token.text)}</code></pre></div>`;
  },

  blockquote(token: Tokens.Blockquote): string {
    return `<blockquote class="styled-quote">${this.parser.parse(token.tokens)}</blockquote>`;
  },

  strong(token: Tokens.Strong): string {
    return `<strong class="text-white font-semibold">${this.parser.parseInline(token.tokens)}</strong>`;
  },

  link(token: Tokens.Link): string {
    const href = token.href;
    const title = token.title ? ` title="${token.title}"` : '';
    const isExternal = href.startsWith('http') && !href.includes('techflunkylabs.com');
    const externalAttrs = isExternal ? ' target="_blank" rel="noopener noreferrer"' : '';
    const externalIcon = isExternal ? '<svg class="external-link-icon" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>' : '';
    return `<a href="${href}"${title}${externalAttrs}>${this.parser.parseInline(token.tokens)}${externalIcon}</a>`;
  },

  hr(): string {
    return '<hr class="styled-divider" />';
  },

  image(token: Tokens.Image): string {
    const alt = token.text || '';
    const title = token.title ? ` title="${token.title}"` : '';
    return `<figure class="blog-figure">
      <img src="${token.href}" alt="${alt}"${title} loading="lazy" />
      ${alt ? `<figcaption>${alt}</figcaption>` : ''}
    </figure>`;
  },
};

// Escape HTML for code blocks
function escapeHtml(text: string): string {
  const escapeMap: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  };
  return text.replace(/[&<>"']/g, char => escapeMap[char]);
}

// Apply custom renderer
marked.use({ renderer });

/**
 * Parse markdown content to HTML
 */
export function parseMarkdown(content: string): string {
  if (!content) return '';
  return marked.parse(content, { async: false }) as string;
}

/**
 * Parse markdown content to HTML (async version)
 */
export async function parseMarkdownAsync(content: string): Promise<string> {
  if (!content) return '';
  return await marked.parse(content);
}

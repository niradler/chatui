import React, { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  vscDarkPlus,
  vs,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import mermaid from "mermaid";

interface MarkdownRendererProps {
  content: string;
  darkMode?: boolean;
  className?: string;
}

// Initialize mermaid
mermaid.initialize({
  startOnLoad: true,
  theme: "default",
  securityLevel: "loose",
  fontFamily: "arial",
  fontSize: 14,
});

const MermaidDiagram: React.FC<{ chart: string; darkMode?: boolean }> = ({
  chart,
  darkMode,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const lastRenderId = useRef<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    if (ref.current) {
      ref.current.innerHTML = "";
      let errorHtml = "";
      try {
        // Only re-initialize if theme changes
        mermaid.initialize({
          theme: darkMode ? "dark" : "default",
          securityLevel: "loose",
          startOnLoad: true,
        });
      } catch (error: unknown) {
        const errMsg = error instanceof Error ? error.message : String(error);
        errorHtml = `
          <div class="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 dark:bg-red-900/20 dark:border-red-800 dark:text-red-300">
            <p class="font-medium">Mermaid Initialization Error</p>
            <p class="text-sm mt-1">${
              errMsg || "Failed to initialize Mermaid."
            }</p>
            <details class="mt-2">
              <summary class="cursor-pointer text-sm">Show raw content</summary>
              <pre class="mt-2 text-xs bg-gray-100 dark:bg-gray-800 p-2 rounded overflow-x-auto">${chart}</pre>
            </details>
          </div>
        `;
        if (ref.current) ref.current.innerHTML = errorHtml;
        return;
      }

      // Generate unique ID for each diagram render
      const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
      lastRenderId.current = id;

      mermaid
        .render(id, chart)
        .then(({ svg }) => {
          if (!cancelled && ref.current && lastRenderId.current === id) {
            ref.current.innerHTML = svg;
          }
        })
        .catch((error: unknown) => {
          const errMsg = error instanceof Error ? error.message : String(error);
          if (!cancelled && ref.current && lastRenderId.current === id) {
            ref.current.innerHTML = `
            <div class="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 dark:bg-red-900/20 dark:border-red-800 dark:text-red-300">
              <p class="font-medium">Mermaid Diagram Error</p>
              <p class="text-sm mt-1">${
                errMsg || "Failed to render diagram. Please check the syntax."
              }</p>
              <details class="mt-2">
                <summary class="cursor-pointer text-sm">Show raw content</summary>
                <pre class="mt-2 text-xs bg-gray-100 dark:bg-gray-800 p-2 rounded overflow-x-auto">${chart}</pre>
              </details>
            </div>
          `;
          }
        });
    }
    return () => {
      cancelled = true;
    };
  }, [chart, darkMode]);

  return <div ref={ref} className="my-4" />;
};

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
  content,
  darkMode = false,
  className = "",
}) => {
  return (
    <div
      className={`prose prose-sm max-w-none ${
        darkMode ? "prose-invert" : ""
      } ${className}`}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({ node, className, children, ...props }) {
            const inline = !className;
            const match = /language-(\w+)/.exec(className || "");
            const language = match ? match[1] : "";

            // Handle mermaid diagrams
            if (language === "mermaid") {
              return (
                <MermaidDiagram
                  chart={String(children).trim()}
                  darkMode={darkMode}
                />
              );
            }

            // Handle regular code blocks
            if (!inline && language) {
              return (
                <div className="relative my-4">
                  <div className="flex items-center justify-between bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-t-lg border-b border-gray-200 dark:border-gray-700">
                    <span className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase">
                      {language}
                    </span>
                    <button
                      onClick={() =>
                        navigator.clipboard.writeText(String(children))
                      }
                      className="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                      title="Copy code"
                    >
                      Copy
                    </button>
                  </div>
                  <SyntaxHighlighter
                    style={darkMode ? vscDarkPlus : vs}
                    language={language}
                    PreTag="div"
                  >
                    {String(children).replace(/\n$/, "")}
                  </SyntaxHighlighter>
                </div>
              );
            }

            // Handle inline code
            const { ref, ...restProps } = props;
            return (
              <code
                className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-sm font-mono"
                {...restProps}
              >
                {children}
              </code>
            );
          },

          // Enhanced table styling
          table({ children, ...props }) {
            return (
              <div className="overflow-x-auto my-4">
                <table
                  className="min-w-full border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
                  {...props}
                >
                  {children}
                </table>
              </div>
            );
          },

          thead({ children, ...props }) {
            return (
              <thead className="bg-gray-50 dark:bg-gray-800" {...props}>
                {children}
              </thead>
            );
          },

          th({ children, ...props }) {
            return (
              <th
                className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider border-b border-gray-200 dark:border-gray-700"
                {...props}
              >
                {children}
              </th>
            );
          },

          td({ children, ...props }) {
            return (
              <td
                className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700"
                {...props}
              >
                {children}
              </td>
            );
          },

          // Enhanced blockquote styling
          blockquote({ children, ...props }) {
            return (
              <blockquote
                className="border-l-4 border-blue-500 pl-4 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-r-lg my-4"
                {...props}
              >
                {children}
              </blockquote>
            );
          },

          // Enhanced list styling
          ul({ children, ...props }) {
            return (
              <ul className="list-disc pl-6 my-4 space-y-1" {...props}>
                {children}
              </ul>
            );
          },

          ol({ children, ...props }) {
            return (
              <ol className="list-decimal pl-6 my-4 space-y-1" {...props}>
                {children}
              </ol>
            );
          },

          // Enhanced heading styling
          h1({ children, ...props }) {
            return (
              <h1
                className="text-2xl font-bold mt-6 mb-4 text-gray-900 dark:text-gray-100"
                {...props}
              >
                {children}
              </h1>
            );
          },

          h2({ children, ...props }) {
            return (
              <h2
                className="text-xl font-semibold mt-5 mb-3 text-gray-900 dark:text-gray-100"
                {...props}
              >
                {children}
              </h2>
            );
          },

          h3({ children, ...props }) {
            return (
              <h3
                className="text-lg font-medium mt-4 mb-2 text-gray-900 dark:text-gray-100"
                {...props}
              >
                {children}
              </h3>
            );
          },

          // Enhanced link styling
          a({ children, href, ...props }) {
            return (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline transition-colors"
                {...props}
              >
                {children}
              </a>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;

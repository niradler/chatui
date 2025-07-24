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
  isChatComplete?: boolean;
}

// Initialize mermaid
mermaid.initialize({
  startOnLoad: true,
  theme: "default",
  securityLevel: "loose",
  fontFamily: "arial",
  fontSize: 14,
});

const MermaidDiagram: React.FC<{
  chart: string;
  darkMode?: boolean;
  isChatComplete?: boolean;
}> = ({ chart, darkMode, isChatComplete = true }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [svg, setSvg] = React.useState<string | null>(null);
  const [retryCount, setRetryCount] = React.useState(0);
  const renderTimeoutRef = useRef<number | null>(null);

  const renderDiagram = async (cancelled: boolean) => {
    try {
      mermaid.initialize({
        theme: darkMode ? "dark" : "default",
        securityLevel: "loose",
        startOnLoad: false,
      });

      const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;

      const result = await mermaid.render(id, chart);

      if (!cancelled) {
        setSvg(result.svg);
        setError(null);
      }
    } catch (error: unknown) {
      if (!cancelled) {
        const errMsg = error instanceof Error ? error.message : String(error);
        setError(
          errMsg || "Failed to render diagram. Please check the syntax."
        );
        setSvg(null);
      }
    } finally {
      if (!cancelled) {
        setIsLoading(false);
      }
    }
  };

  const validateAndRender = async (cancelled: boolean) => {
    if (!chart.trim()) {
      setError("Empty diagram content");
      setIsLoading(false);
      return;
    }

    if (!isChatComplete && !chart.includes("```")) {
      setIsLoading(false);
      return;
    }

    try {
      await renderDiagram(cancelled);
    } catch (error: unknown) {
      if (!cancelled) {
        const errMsg = error instanceof Error ? error.message : String(error);
        setError(errMsg || "Failed to render diagram");
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);
    setError(null);
    setSvg(null);

    if (ref.current) {
      ref.current.innerHTML = "";
    }

    if (isChatComplete) {
      renderTimeoutRef.current = setTimeout(
        () => validateAndRender(cancelled),
        300
      );
    } else {
      setIsLoading(false);
    }

    return () => {
      cancelled = true;
      if (renderTimeoutRef.current) {
        clearTimeout(renderTimeoutRef.current);
      }
    };
  }, [chart, darkMode, isChatComplete]);

  if (isLoading) {
    return (
      <div className="my-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Rendering diagram...
          </span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="my-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 dark:bg-red-900/20 dark:border-red-800 dark:text-red-300">
        <div className="flex items-center justify-between mb-2">
          <p className="font-medium">Mermaid Diagram Error</p>
          {retryCount < 3 && (
            <button
              onClick={() => {
                setError(null);
                setRetryCount((prev) => prev + 1);
                setIsLoading(true);
                renderTimeoutRef.current = setTimeout(
                  () => validateAndRender(false),
                  300
                );
              }}
              className="text-xs px-2 py-1 bg-red-100 hover:bg-red-200 dark:bg-red-800 dark:hover:bg-red-700 rounded transition-colors"
            >
              Retry
            </button>
          )}
        </div>
        <p className="text-sm mt-1">{error}</p>
        <details className="mt-2">
          <summary className="cursor-pointer text-sm">Show raw content</summary>
          <pre className="mt-2 text-xs bg-gray-100 dark:bg-gray-800 p-2 rounded overflow-x-auto">
            {chart}
          </pre>
        </details>
      </div>
    );
  }

  if (svg) {
    return (
      <div
        ref={ref}
        className="my-4"
        dangerouslySetInnerHTML={{ __html: svg }}
      />
    );
  }

  return null;
};

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
  content,
  darkMode = false,
  className = "",
  isChatComplete = true,
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
          code({ className, children, ...props }) {
            const inline = !className;
            const match = /language-(\w+)/.exec(className || "");
            const language = match ? match[1] : "";

            // Handle mermaid diagrams
            if (language === "mermaid") {
              return (
                <MermaidDiagram
                  chart={String(children).trim()}
                  darkMode={darkMode}
                  isChatComplete={isChatComplete}
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
            const { ...restProps } = props;
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

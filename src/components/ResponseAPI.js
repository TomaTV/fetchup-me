"use client";
import { useState } from "react";
import { Copy } from "lucide-react";

export default function ResponseAPI({ response, isLoading, error }) {
  const [activeTab, setActiveTab] = useState("response");

  const handleCopy = (content) => {
    const textToCopy = JSON.stringify(content, null, 2);
    navigator.clipboard.writeText(textToCopy);
  };

  if (isLoading) {
    return (
      <section className="bg-light-100 h-full">
        <div className="text-center text-gray-500 p-6">Loading...</div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-light-100 h-full">
        <div className="flex items-center mb-4 bg-red-100 p-3 rounded-xl shadow-soft mx-6">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-red-500"></div>
            <div className="text-red-600 font-medium">
              Error: {error.status}
            </div>
          </div>
          <div className="ml-4 text-red-600">{error.message}</div>
        </div>
      </section>
    );
  }

  if (!response) return null;

  const isEmpty = (obj) => {
    return !obj || Object.keys(obj).length === 0;
  };

  const renderEmptyMessage = (type) => {
    const messages = {
      response: "No response data available",
      headers: "No headers found in the response",
      cookies: "No cookies set in this response",
    };
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <p className="text-gray-400">{messages[type]}</p>
      </div>
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case "response":
        return isEmpty(response.response) ? (
          renderEmptyMessage("response")
        ) : (
          <pre className="text-gray-300 font-mono text-sm overflow-x-auto">
            {JSON.stringify(response.response, null, 2)}
          </pre>
        );
      case "headers":
        return isEmpty(response.headers) ? (
          renderEmptyMessage("headers")
        ) : (
          <div className="space-y-2">
            {Object.entries(response.headers).map(([key, value]) => (
              <div key={key} className="grid grid-cols-2 gap-4">
                <span className="text-gray-400 font-medium">{key}:</span>
                <span className="text-gray-300">{value}</span>
              </div>
            ))}
          </div>
        );
      case "cookies":
        return isEmpty(response.cookies) ? (
          renderEmptyMessage("cookies")
        ) : (
          <div className="space-y-2">
            {Object.entries(response.cookies).map(([key, value]) => (
              <div key={key} className="grid grid-cols-2 gap-4">
                <span className="text-gray-400 font-medium">{key}:</span>
                <span className="text-gray-300">{value}</span>
              </div>
            ))}
          </div>
        );
      default:
        return renderEmptyMessage("response");
    }
  };

  const formatSize = (bytes) => {
    if (!bytes) return "0 B";
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <section className="bg-light-100 min-h-0 h-full overflow-y-auto">
      <div className="sticky top-0 z-10 bg-light-100">
        <div className="flex items-center mb-4 bg-light-200 p-3 rounded-xl shadow-soft mx-6">
          <div className="flex items-center space-x-2">
            <div
              className={`w-2 h-2 rounded-full ${
                response.status >= 200 && response.status < 300
                  ? "bg-green-500"
                  : "bg-red-500"
              }`}
            ></div>
            <div className="text-primary-600 font-medium">
              Status: {response.status} {response.statusText}
            </div>
          </div>
          <div className="flex ml-6 space-x-4">
            <div className="flex items-center space-x-1">
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="text-dark-200 font-medium">
                {response.responseTime}ms
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 7v10c0 2 1 3 3 3h10c2 0 3-1 3-3V7c0-2-1-3-3-3H7C5 4 4 5 4 7z"
                />
              </svg>
              <span className="text-dark-200 font-medium">
                {formatSize(response.size)}
              </span>
            </div>
          </div>
        </div>

        <div className="px-6">
          <div className="flex space-x-8 border-b border-gray-200 pb-2 mb-4">
            {[
              { id: "response", label: "Response" },
              { id: "headers", label: "Headers" },
              { id: "cookies", label: "Cookies" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`text-sm font-medium pb-3 border-b-2 transition-all duration-200 ${
                  activeTab === tab.id
                    ? "text-primary-600 border-primary-600"
                    : "text-gray-500 border-transparent hover:text-primary-600 hover:border-primary-600"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="px-6">
        <div className="bg-dark-200 p-6 rounded-2xl shadow-soft relative mb-6">
          <button
            onClick={() =>
              handleCopy(
                activeTab === "response"
                  ? response.response
                  : activeTab === "headers"
                  ? response.headers
                  : response.cookies
              )
            }
            className="absolute right-4 top-4 text-gray-400 hover:text-white transition-colors duration-200 p-1.5 hover:bg-gray-700/50 rounded-lg"
            title="Copy to clipboard"
          >
            <Copy className="w-4 h-4" />
          </button>

          <div className="mt-2">{renderContent()}</div>
        </div>
      </div>
    </section>
  );
}

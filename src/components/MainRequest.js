"use client";
import { useState, useEffect } from "react";
import { ChevronDown, Plus, Send, X } from "lucide-react";

export default function MainRequest({ apiUrl, onRequest }) {
  const [url, setUrl] = useState("");
  const [method, setMethod] = useState("GET");
  const [activeTab, setActiveTab] = useState("query");
  const [queryParams, setQueryParams] = useState([{ name: "", value: "" }]);
  const [headers, setHeaders] = useState([{ name: "", value: "" }]);
  const [bodyContent, setBodyContent] = useState("");

  const methods = [
    { value: "GET", style: "text-green-600" },
    { value: "POST", style: "text-blue-600" },
    { value: "PUT", style: "text-yellow-600" },
    { value: "DELETE", style: "text-red-600" },
    { value: "PATCH", style: "text-purple-600" },
  ];

  useEffect(() => {
    if (apiUrl) {
      setUrl(apiUrl);
    }
  }, [apiUrl]);

  const updateQueryParam = (index, field, value) => {
    const newParams = [...queryParams];
    newParams[index] = { ...newParams[index], [field]: value };
    setQueryParams(newParams);
  };

  const updateHeader = (index, field, value) => {
    const newHeaders = [...headers];
    newHeaders[index] = { ...newHeaders[index], [field]: value };
    setHeaders(newHeaders);
  };

  const getMethodStyle = () => {
    if (method === "") return "text-gray-600";
    return methods.find((m) => m.value === method)?.style;
  };

  const handleSendRequest = () => {
    const requestConfig = {
      url: url,
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
    };

    onRequest(requestConfig);
  };

  return (
    <main className="p-6 bg-light-100">
      <div className="flex items-center space-x-4 mb-6">
        <div className="relative w-36">
          <select
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            className={`w-full appearance-none px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary-500/20 focus:outline-none bg-light-300 font-medium shadow-soft cursor-pointer transition-all duration-200 hover:border-primary-500 ${getMethodStyle()}`}
            style={{ paddingRight: "2.5rem" }}
          >
            {methods.map((m) => (
              <option key={m.value} value={m.value} className={m.style}>
                {m.value}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </div>
        </div>

        <div className="flex-grow">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://api.example.com"
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500/20 focus:outline-none bg-light-300 text-dark-200 shadow-soft transition-all duration-200 hover:border-primary-500"
          />
        </div>

        <button
          onClick={handleSendRequest}
          className="bg-primary-600 text-white px-5 py-2.5 rounded-lg font-medium shadow-md hover:bg-primary-700 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 flex items-center space-x-2 group"
        >
          <span>Send</span>
          <Send className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
        </button>
      </div>

      <div className="flex space-x-6 border-b border-gray-200 mb-4">
        <button
          onClick={() => setActiveTab("query")}
          className={`font-medium pb-2 border-b-2 transition-all duration-200 ${
            activeTab === "query"
              ? "text-primary-600 border-primary-600"
              : "text-gray-500 border-transparent hover:text-primary-600 hover:border-primary-600"
          }`}
        >
          Query
        </button>
        <button
          onClick={() => setActiveTab("headers")}
          className={`font-medium pb-2 border-b-2 transition-all duration-200 ${
            activeTab === "headers"
              ? "text-primary-600 border-primary-600"
              : "text-gray-500 border-transparent hover:text-primary-600 hover:border-primary-600"
          }`}
        >
          Headers
        </button>
        <button
          onClick={() => setActiveTab("body")}
          className={`font-medium pb-2 border-b-2 transition-all duration-200 ${
            activeTab === "body"
              ? "text-primary-600 border-primary-600"
              : "text-gray-500 border-transparent hover:text-primary-600 hover:border-primary-600"
          }`}
        >
          Body
        </button>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm">
        {activeTab === "query" && (
          <div className="space-y-2">
            {queryParams.map((param, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="grid grid-cols-2 gap-3 flex-grow">
                  <input
                    type="text"
                    value={param.name}
                    onChange={(e) =>
                      updateQueryParam(index, "name", e.target.value)
                    }
                    placeholder="Parameter name"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500/20 focus:outline-none bg-white text-dark-200 transition-all duration-200 hover:border-primary-500"
                  />
                  <input
                    type="text"
                    value={param.value}
                    onChange={(e) =>
                      updateQueryParam(index, "value", e.target.value)
                    }
                    placeholder="Parameter value"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500/20 focus:outline-none bg-white text-dark-200 transition-all duration-200 hover:border-primary-500"
                  />
                </div>
              </div>
            ))}
            <button className="flex items-center space-x-1 text-primary-600 px-2 py-1 rounded-md hover:bg-primary-50 font-medium transition-colors duration-200 text-sm mt-2">
              <Plus className="w-3.5 h-3.5" />
              <span>Add parameter</span>
            </button>
          </div>
        )}

        {activeTab === "headers" && (
          <div className="space-y-2">
            {headers.map((header, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="grid grid-cols-2 gap-3 flex-grow">
                  <input
                    type="text"
                    value={header.name}
                    onChange={(e) =>
                      updateHeader(index, "name", e.target.value)
                    }
                    placeholder="Header name"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500/20 focus:outline-none bg-white text-dark-200 transition-all duration-200 hover:border-primary-500"
                  />
                  <input
                    type="text"
                    value={header.value}
                    onChange={(e) =>
                      updateHeader(index, "value", e.target.value)
                    }
                    placeholder="Header value"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500/20 focus:outline-none bg-white text-dark-200 transition-all duration-200 hover:border-primary-500"
                  />
                </div>
              </div>
            ))}
            <button className="flex items-center space-x-1 text-primary-600 px-2 py-1 rounded-md hover:bg-primary-50 font-medium transition-colors duration-200 text-sm mt-2">
              <Plus className="w-3.5 h-3.5" />
              <span>Add header</span>
            </button>
          </div>
        )}

        {activeTab === "body" && (
          <textarea
            value={bodyContent}
            onChange={(e) => setBodyContent(e.target.value)}
            placeholder="Enter JSON body"
            className="w-full h-56 p-3 font-mono text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500/20 focus:outline-none bg-white text-dark-200 resize-none transition-all duration-200 hover:border-primary-500"
          />
        )}
      </div>
    </main>
  );
}

"use client";
import { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import MainRequest from "../components/MainRequest";
import ResponseAPI from "../components/ResponseAPI";

export default function Home() {
  const [selectedApiUrl, setSelectedApiUrl] = useState("");
  const [apiResponse, setApiResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleApiRequest = async (requestConfig) => {
    setIsLoading(true);
    setError(null);

    try {
      const startTime = performance.now();

      const response = await fetch(requestConfig.url, {
        method: requestConfig.method,
        headers: requestConfig.headers,
        body: requestConfig.method !== "GET" ? requestConfig.body : undefined,
      });

      const endTime = performance.now();
      const responseTime = Math.round(endTime - startTime);

      const responseSize =
        response.headers.get("content-length") ||
        (await response.clone().text()).length;

      const headers = {};
      response.headers.forEach((value, key) => {
        headers[key] = value;
      });

      const cookies = {};
      const cookieHeader = response.headers.get("set-cookie");
      if (cookieHeader) {
        cookieHeader.split(";").forEach((cookie) => {
          const [key, value] = cookie.split("=");
          cookies[key.trim()] = value;
        });
      }

      const data = await response.json();

      setApiResponse({
        status: response.status,
        statusText: response.statusText,
        responseTime,
        size: responseSize,
        headers,
        cookies,
        response: data,
      });
    } catch (err) {
      setError({
        message: err.message,
        status: err.status || 500,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-light-200">
      <Header onApiSelect={(api) => setSelectedApiUrl(api.url)} />
      <div className="flex flex-grow overflow-hidden">
        <Sidebar />
        <div className="flex flex-col flex-grow">
          <MainRequest apiUrl={selectedApiUrl} onRequest={handleApiRequest} />
          <div className="flex-1 overflow-auto">
            <ResponseAPI
              response={apiResponse}
              isLoading={isLoading}
              error={error}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

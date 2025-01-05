"use client";
import { useState, useEffect } from "react";
import { Search, X, Save, ArrowRight } from "lucide-react";

export default function Header({ onApiSelect }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedApi, setSelectedApi] = useState(null);
  const [apis, setApis] = useState([]);
  const [displayCount, setDisplayCount] = useState(20);

  useEffect(() => {
    const loadApis = async () => {
      try {
        const response = await fetch("/public_apis_grouped_by_category.json");
        const data = await response.json();
        setApis(
          Object.entries(data).flatMap(([category, apis]) =>
            apis.map((api) => ({ ...api, category }))
          )
        );
      } catch {
        console.error("Erreur de chargement des API.");
      }
    };
    loadApis();
  }, []);

  const filteredApis = apis.filter((api) =>
    api.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const displayedApis = filteredApis.slice(0, displayCount);
  const hasMore = filteredApis.length > displayCount;

  const clearSearch = () => {
    setSearchQuery("");
    setSelectedApi(null);
    setIsSearchOpen(false);
    setDisplayCount(20);
  };

  const handleApiSelect = (api) => {
    setSelectedApi(api);
    setIsSearchOpen(false);
    if (onApiSelect) {
      onApiSelect(api);
    }
  };

  const getLogo = (api) => {
    try {
      const url = new URL(api.url);
      return `https://www.google.com/s2/favicons?domain=${url.hostname}&sz=128`;
    } catch (error) {
      return null;
    }
  };

  return (
    <header className="bg-light-100 w-full px-6 py-3 flex items-center justify-between border-b border-gray-100 shadow-soft relative">
      <div className="flex items-center space-x-4">
        <h1 className="text-dark-200 font-black text-2xl tracking-tight hover:text-gray-500 transition-colors duration-200 cursor-pointer select-none">
          fetchup<span className="text-primary-600">.me</span>
        </h1>
      </div>

      <div className="w-1/3 mx-auto relative">
        <div className="relative z-50">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            {selectedApi ? (
              <div className="w-5 h-5 rounded overflow-hidden">
                {/* fix probleme Image next */}
                <img
                  src={getLogo(selectedApi)}
                  alt={selectedApi.name}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.target.parentElement.innerHTML = `<div class="w-full h-full bg-primary-100 flex items-center justify-center">
                      <span class="text-sm font-medium text-primary-600">${selectedApi.name.charAt(
                        0
                      )}</span>
                    </div>`;
                  }}
                />
              </div>
            ) : (
              <Search className="h-5 w-5 text-gray-400" />
            )}
          </div>
          <input
            type="text"
            placeholder="Search an API..."
            value={selectedApi ? selectedApi.name : searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setSelectedApi(null);
              setDisplayCount(20);
            }}
            onFocus={() => setIsSearchOpen(true)}
            className="w-full pl-10 pr-12 py-2.5 bg-white border border-gray-200 rounded-xl text-dark-200 placeholder-gray-400 transition-all duration-200 hover:border-gray-300 focus:outline-none focus:border-primary-500"
          />
          {(searchQuery || selectedApi) && (
            <button
              onClick={clearSearch}
              className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-200 z-50"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {isSearchOpen && (
          <>
            <div
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
              onClick={() => setIsSearchOpen(false)}
            />
            <div className="absolute mt-2 w-full bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50">
              {displayedApis.length > 0 ? (
                <>
                  <div className="max-h-[60vh] overflow-auto">
                    {displayedApis.map((api, index) => (
                      <div
                        key={index}
                        className="p-3 hover:bg-gray-50 cursor-pointer transition-colors duration-200 flex items-start space-x-3 group"
                        onClick={() => handleApiSelect(api)}
                      >
                        <div className="flex-shrink-0 w-8 h-8 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                          {/* fix probleme Image next */}
                          <img
                            src={getLogo(api)}
                            alt={api.name}
                            className="w-full h-full object-contain"
                            onError={(e) => {
                              e.target.parentElement.innerHTML = `<div class="w-full h-full flex items-center justify-center">
                                <span class="text-lg font-medium text-primary-600">${api.name.charAt(
                                  0
                                )}</span>
                              </div>`;
                            }}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-gray-900 truncate group-hover:text-primary-600 transition-colors duration-200">
                              {api.name}
                            </p>
                            <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">
                              {api.category}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 mt-0.5 truncate">
                            {api.url}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            {api.description}
                          </p>
                        </div>
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <ArrowRight className="w-5 h-5 text-primary-600" />
                        </div>
                      </div>
                    ))}
                  </div>
                  {hasMore && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setDisplayCount((prev) => prev + 20);
                      }}
                      className="w-full p-3 bg-gray-50 border-t border-gray-100 text-sm text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200 flex items-center justify-center space-x-2"
                    >
                      <span>Voir plus</span>
                      <span className="text-gray-400">
                        ({filteredApis.length - displayCount} restants)
                      </span>
                    </button>
                  )}
                </>
              ) : (
                <div className="p-4 text-center text-gray-500">
                  Aucune API trouvée
                </div>
              )}
            </div>
          </>
        )}
      </div>

      <div className="flex items-center space-x-3">
        <button className="bg-green-500 text-white px-4 py-2 rounded-xl font-medium shadow-soft hover:bg-green-600 hover:shadow-md transform hover:-translate-y-0.5 transition-all duration-200 flex items-center space-x-2 group">
          <Save className="w-5 h-5 transition-transform duration-200 group-hover:rotate-12" />
          <span>Save</span>
        </button>
        <button className="bg-primary-600 text-white px-5 py-2 rounded-xl font-medium shadow-soft hover:bg-primary-700 hover:shadow-md transform hover:-translate-y-0.5 transition-all duration-200 flex items-center space-x-2 group">
          <span>Login</span>
          <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-0.5" />
        </button>
      </div>
    </header>
  );
}

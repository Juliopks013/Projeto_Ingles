import React from "react";
import { Link } from "@inertiajs/react";
import { Search, XCircle, Bookmark } from "lucide-react";

export default function Layout({
    children,
    search = "",
    setSearch = () => { },
    filterMode = "all",
    setFilterMode = () => { },
    availableLetters = [],
    scrollToSection = () => { },
    totalCards = 0,
    savedCount = 0,
}) {
    return (
        <div className="min-h-screen bg-[#F0F2F5] text-slate-800 font-sans flex flex-col">
            <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">

                    {/* Logo / Brand */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="w-9 h-9 bg-[#3B57A1] rounded-xl flex items-center justify-center text-white font-black text-lg shadow-sm group-hover:bg-[#2d437d] transition-colors">
                            Tech
                        </div>
                        <div>
                            <h1 className="font-bold text-slate-900 text-sm leading-tight">Glossário Tech</h1>
                            <p className="text-[11px] text-slate-500 font-medium">Inglês Técnico para Devs</p>
                        </div>
                    </Link>

                    {/* Campo de Busca Principal */}
                    <div className="flex-1 max-w-md relative">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                        <input
                            type="text"
                            placeholder="Pesquisar por termo, tradução ou descrição..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-9 pr-9 py-2 bg-slate-100 hover:bg-slate-100 focus:bg-white border border-transparent focus:border-[#3B57A1]/30 rounded-lg text-sm transition-all outline-none"
                        />
                        {search && (
                            <button
                                type="button"
                                onClick={() => setSearch("")}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                            >
                                <XCircle className="w-4 h-4" />
                            </button>
                        )}
                    </div>

                    {/* Filtro Rápido */}
                    <div className="hidden sm:flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200/60 text-xs font-semibold">
                        <button
                            type="button"
                            onClick={() => setFilterMode("all")}
                            className={`px-3 py-1 rounded-md transition-all ${filterMode === "all"
                                    ? "bg-white text-slate-900 shadow-sm"
                                    : "text-slate-500 hover:text-slate-800"
                                }`}
                        >
                            Todos ({totalCards})
                        </button>
                        <button
                            type="button"
                            onClick={() => setFilterMode("saved")}
                            className={`px-3 py-1 rounded-md transition-all flex items-center gap-1.5 ${filterMode === "saved"
                                    ? "bg-white text-[#3B57A1] shadow-sm"
                                    : "text-slate-500 hover:text-slate-800"
                                }`}
                        >
                            <Bookmark className="w-3.5 h-3.5 fill-current" />
                            Salvos ({savedCount})
                        </button>
                    </div>
                </div>

                {/* Navegação A-Z */}
                {search.length === 0 && filterMode === "all" && availableLetters.length > 0 && (
                    <div className="border-t border-slate-100 bg-slate-50/50">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 flex gap-1 overflow-x-auto scrollbar-none text-xs font-bold text-slate-600">
                            {availableLetters.map((letter) => (
                                <button
                                    key={letter}
                                    type="button"
                                    onClick={() => scrollToSection(letter)}
                                    className="w-7 h-7 rounded-md hover:bg-[#3B57A1] hover:text-white transition-colors flex items-center justify-center shrink-0"
                                >
                                    {letter}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </header>

            {/* Renderização das Páginas (children) */}
            <main className="flex-1 w-full mx-auto">{children}</main>
        </div>
    );
}
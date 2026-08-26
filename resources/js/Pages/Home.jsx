import React, { useEffect, useState, useRef } from "react";
import {
  Code,
  Cloud,
  Database,
  Send,
  Download,
  Layers,
  Box,
  ChevronRight,
  Search,
  X,
  Volume2
} from "lucide-react";

// Mapeamento de ícones para React Web
const ICON_MAP = {
  code: Code,
  cloud: Cloud,
  database: Database,
  send: Send,
  download: Download,
  layers: Layers,
};

export default function Home() {
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [search, setSearch] = useState("");

  const mainScrollRef = useRef(null);
  const sectionRefs = useRef({});

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/home")
      .then((res) => res.json())
      .then((data) => {
        if (data?.cards) setCards(sortCards(data.cards));
      })
      .catch(() => {
        const mockData = [
          {
            word: "API",
            translation: "Interface de Prog.",
            desc: "Ponte entre softwares que permite a comunicação entre diferentes aplicações de forma padronizada.",
            category: "Dev",
            icon: "code",
            pronunciation: "/ˌeɪ.piːˈaɪ/",
          },
          {
            word: "Cloud",
            translation: "Nuvem",
            desc: "Servidores remotos acessados pela internet para armazenar e processar dados.",
            category: "Infra",
            icon: "cloud",
            pronunciation: "/klaʊd/",
          },
          {
            word: "Database",
            translation: "Banco de dados",
            desc: "Coleção organizada de dados estruturados armazenados eletronicamente.",
            category: "Dados",
            icon: "database",
            pronunciation: "/ˈdeɪtəbeɪs/",
          },
          {
            word: "Deploy",
            translation: "Implantar",
            desc: "Processo de disponibilizar uma aplicação para uso no ambiente de produção.",
            category: "DevOps",
            icon: "send",
            pronunciation: "/dɪˈplɔɪ/",
          },
          {
            word: "Download",
            translation: "Baixar",
            desc: "Transferência de dados ou arquivos de um servidor remoto para um dispositivo local.",
            category: "Geral",
            icon: "download",
            pronunciation: "/ˌdaʊnˈloʊd/",
          },
          {
            word: "Framework",
            translation: "Estrutura",
            desc: "Conjunto de bibliotecas e ferramentas pré-construídas que facilitam o desenvolvimento.",
            category: "Dev",
            icon: "layers",
            pronunciation: "/ˈfreɪmwɜːrk/",
          },
        ];
        setCards(sortCards(mockData));
      });
  }, []);

  const sortCards = (list) => {
    return [...list].sort((a, b) => a.word.localeCompare(b.word));
  };

  // Reprodução de áudio nativa do Navegador Web
  const playPronunciation = (word) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = "en-US";
      window.speechSynthesis.speak(utterance);
    }
  };

  const normalizeText = (t = "") =>
    t
      .toString()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();

  const filteredCards = cards.filter((c) => {
    const content = `${c.word} ${c.translation} ${c.desc} ${c.category || ""}`;
    return normalizeText(content).includes(normalizeText(search));
  });

  const groupCardsByLetter = (data) => {
    return data.reduce((groups, card) => {
      const letter = card.word.charAt(0).toUpperCase();
      if (!groups[letter]) groups[letter] = [];
      groups[letter].push(card);
      return groups;
    }, {});
  };

  const groupedCards = groupCardsByLetter(filteredCards);
  const availableLetters = Object.keys(groupedCards).sort();

  const scrollToSection = (letter) => {
    const target = sectionRefs.current[letter];
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const renderSingleCard = (card, key) => {
    const IconComponent = ICON_MAP[card.icon] || Box;
    const isActive = selectedCard?.word === card.word;

    return (
      <div
        key={key}
        onClick={() => setSelectedCard(card)}
        className={`flex items-center p-4 rounded-xl border transition-all cursor-pointer shadow-sm hover:shadow-md ${isActive
            ? "bg-[#3B57A1] border-[#3B57A1] text-white"
            : "bg-white border-gray-200 text-gray-800 hover:border-[#3B57A1]"
          }`}
      >
        <div
          className={`w-11 h-11 rounded-lg flex items-center justify-center mr-3 transition-colors ${isActive ? "bg-white/20 text-white" : "bg-blue-50 text-[#3B57A1]"
            }`}
        >
          <IconComponent size={22} />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className={`font-bold text-base truncate ${isActive ? "text-white" : "text-gray-800"}`}>
            {card.word}
          </h3>
          <p className={`text-xs truncate ${isActive ? "text-blue-100" : "text-gray-500"}`}>
            {card.translation}
          </p>
        </div>

        <ChevronRight size={18} className={isActive ? "text-white" : "text-gray-300"} />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#F0F2F5] flex flex-col font-sans">

      {/* Navegação Rápida A-Z */}
      {search.length === 0 && availableLetters.length > 0 && (
        <div className="bg-white border-b border-gray-200 py-2 sticky top-0 z-10 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 flex gap-1.5 overflow-x-auto no-scrollbar">
            {availableLetters.map((letter) => (
              <button
                key={letter}
                onClick={() => scrollToSection(letter)}
                className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-blue-50 text-[#3B57A1] font-bold text-xs flex items-center justify-center flex-shrink-0 transition-colors"
              >
                {letter}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Conteúdo Principal */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-5" ref={mainScrollRef}>
        <div className="flex justify-between items-baseline mb-4">
          <h1 className="text-2xl font-extrabold text-gray-900">Biblioteca de Termos</h1>
          <span className="text-xs font-semibold text-gray-500">{filteredCards.length} termos</span>
        </div>

        {filteredCards.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-10 bg-white rounded-2xl border border-gray-200 text-center my-4">
            <Search size={32} className="text-gray-400 mb-2" />
            <h2 className="text-sm font-bold text-gray-800">Nenhum termo encontrado</h2>
            <button
              onClick={() => setSearch("")}
              className="mt-3 bg-[#3B57A1] text-white text-xs font-semibold px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors"
            >
              Limpar pesquisa
            </button>
          </div>
        ) : search.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredCards.map((card, index) => renderSingleCard(card, index))}
          </div>
        ) : (
          availableLetters.map((letter) => (
            <section
              key={letter}
              ref={(el) => (sectionRefs.current[letter] = el)}
              className="mb-8 scroll-mt-14"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xl font-black text-[#3B57A1]">{letter}</span>
                <div className="flex-1 h-[1.5px] bg-gray-200" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {groupedCards[letter].map((card, index) =>
                  renderSingleCard(card, `${letter}-${index}`)
                )}
              </div>
            </section>
          ))
        )}
      </main>

      {/* Modal Web */}
      {selectedCard && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedCard(null)}
        >
          <div
            className="bg-white w-full max-w-md rounded-2xl p-6 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <span className="bg-blue-50 text-[#3B57A1] text-[11px] font-bold uppercase px-2.5 py-1 rounded-md">
                {selectedCard.category || "Termo"}
              </span>
              <button
                onClick={() => setSelectedCard(null)}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex justify-between items-start gap-3 mb-3">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">{selectedCard.word}</h2>
                <p className="text-sm text-slate-500">{selectedCard.translation}</p>
              </div>

              <button
                onClick={() => playPronunciation(selectedCard.word)}
                className="w-11 h-11 rounded-xl bg-[#3B57A1] hover:bg-blue-800 text-white flex items-center justify-center transition-colors flex-shrink-0"
                title="Ouvir pronúncia"
              >
                <Volume2 size={20} />
              </button>
            </div>

            {selectedCard.pronunciation && (
              <span className="inline-block bg-slate-100 text-slate-600 text-xs px-2.5 py-1 rounded-md mb-4 font-mono">
                {selectedCard.pronunciation}
              </span>
            )}

            <hr className="border-gray-100 my-3" />

            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Descrição / Contexto
              </span>
              <p className="text-sm text-slate-600 leading-relaxed">
                {selectedCard.desc}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
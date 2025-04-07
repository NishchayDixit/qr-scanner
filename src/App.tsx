import { useEffect, useState, useCallback } from "react";
import { ViewsType } from "@/common/interface";
import { views } from "@/common/constant";
import { HistoryIcon, QrCodeIcon, ScanLine } from "lucide-react";
import { QRCodeGenerator } from "./components/QRCodeGenerator";
import { QRCodeScanner } from "./components/QRCodeScanner";
import { HistoryList } from "./components/HistoryList";

const App = () => {
  const [url, setUrl] = useState<string>("");
  const [favicon, setFavicon] = useState<string>("");
  const [history, setHistory] = useState<string[]>([]);
  const [view, setView] = useState<ViewsType>(views.QR);

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs: chrome.tabs.Tab[]) => {
      const tabUrl = tabs[0]?.url || "";
      const tabFavicon = tabs[0]?.favIconUrl || "/assets/icon.png";
      setUrl(tabUrl);
      setFavicon(tabFavicon);
    });
  }, []);

  useEffect(() => {
    if (url) {
      chrome.storage.local.get({ history: [] }, (data: { history: string[] }) => {
        const historySet = new Set(data.history);
        if (!historySet.has(url)) {
          const newHistory = [...historySet, url];
          chrome.storage.local.set({ history: newHistory });
          setHistory(newHistory);
        } else {
          setHistory([...historySet]);
        }
      });
    }
  }, [url]);

  useEffect(() => {
    chrome.storage.local.get({ history: [] }, (data: { history: string[] }) => {
      setHistory(data.history);
    });
  }, [view]);

  const clearHistory = useCallback(() => {
    chrome.storage.local.set({ history: [] }, () => setHistory([]));
  }, []);

  const clearItem = (linkToRemove: string) => {
    const updatedHistory = history.filter((link) => link !== linkToRemove);
    chrome.storage.local.set({ history: updatedHistory }, () => setHistory(updatedHistory));
  };

  return (
    <div className="select-none">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold">
          {view === views.QR ? "Generate QR" : view === views.HISTORY ? "Browsing History" : "Scan QR Code"}
        </h2>
        <div className="flex items-center justify-center gap-2">
          <QrCodeIcon size={18} onClick={() => setView(views.QR)} className="cursor-pointer" />
          <ScanLine size={18} onClick={() => setView(views.SCAN)} className="cursor-pointer" />
          <HistoryIcon size={18} onClick={() => setView(views.HISTORY)} className="cursor-pointer" />
        </div>
      </div>
      {view === views.QR ? (
          <QRCodeGenerator url={url} favicon={favicon} />
      ) : view === views.HISTORY ? (
          <HistoryList history={history} clearHistory={clearHistory} clearItem={clearItem} />
      ) : (
          <QRCodeScanner />
      )}
    </div>
  );
};

export default App;

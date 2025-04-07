import { HistoryListProps } from "@/common/interface";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Trash2, Copy, Check } from "lucide-react";
import { useState, useEffect } from "react";

const HistoryList: React.FC<HistoryListProps> = ({ history, clearHistory, clearItem }) => {
  const [historyList, setHistoryList] = useState<string[]>(history);
  const [copiedLink, setCopiedLink] = useState<string | null>(null);

  useEffect(() => {
    setHistoryList(history);
  }, [history]);

  const handleDelete = (linkToRemove: string) => {
    const updatedHistory = historyList.filter((link) => link !== linkToRemove);
    setHistoryList(updatedHistory);
    clearItem(linkToRemove);
  };

  const copyToClipboard = (link: string) => {
    setCopiedLink(link);
    navigator.clipboard.writeText(link);
    setTimeout(() => setCopiedLink(null), 1000);
  };

  return (
    <div className="min-h-64 max-h-64 space-y-3">
      <div className="h-52 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent">
        {historyList.length > 0 ? (
          historyList.map((link, index) => (
            <Card key={index} className="mb-2 p-0 shadow-sm border">
              <CardContent className="flex justify-between items-center p-3 text-start">
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:underline truncate w-4/5"
                >
                  {link}
                </a>
                <div className="flex gap-0.5">
                  <Button onClick={() => copyToClipboard(link)} className="!p-1.5 bg-transparent text-xl m-0 shadow-none text-primary hover:bg-transparent hover:text-gray-800">
                    {copiedLink === link ? <Check size={18} /> : <Copy size={18} />}
                  </Button>
                  <Button onClick={() => handleDelete(link)} className="!p-1.5 bg-transparent text-xl m-0 shadow-none text-destructive hover:bg-transparent hover:text-red-700">
                    <Trash2 size={18} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-gray-400">No history available</p>
        )}
      </div>

      {historyList.length > 0 && (
        <Button onClick={clearHistory} variant="destructive">
          Clear All
        </Button>
      )}
    </div>
  );
};

export default HistoryList;

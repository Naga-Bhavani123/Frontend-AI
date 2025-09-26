import { useState } from "react";
import { Folder, Archive, User, Send, Download } from "lucide-react"; 
import "./index.css";

export default function Home() {
  const [active, setActive] = useState("folders"); 
  const [activeFile, setActiveFile] = useState(null);

  const renderContent = () => {
    switch (active) {
      case "folders":
        return <p>📁 Create or view your folders here.</p>;
      case "old-folders":
        return <p>🗂️ Old folders content here.</p>;
      case "account":
        return <p>👤 Account details go here.</p>;
      case "gmail":
        return <p>📧 Sent Gmail will appear here.</p>;
      default:
        return <p>Select an option from sidebar</p>;
    }
  };

  const handleDownload = () => {
    if (activeFile) {
      const link = document.createElement("a");
      link.href = activeFile.url;
      link.download = activeFile.name;
      link.click();
    } else {
      alert("No active file to download!");
    }
  };

  return (
    <div className="home-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <button onClick={() => setActive("folders")} className={active === "folders" ? "active" : ""}>
          <Folder size={22} /> <span>Create Folder</span>
        </button>
        <button onClick={() => setActive("old-folders")} className={active === "old-folders" ? "active" : ""}>
          <Archive size={22} /> <span>Old Folders</span>
        </button>
        <button onClick={() => setActive("account")} className={active === "account" ? "active" : ""}>
          <User size={22} /> <span>Account</span>
        </button>
        <button onClick={() => setActive("gmail")} className={active === "gmail" ? "active" : ""}>
          <Send size={22} /> <span>Sent Gmail</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <div className="top-bar">
          <h2>{active.toUpperCase()}</h2>
          <button onClick={handleDownload} className="download-btn">
            <Download size={18} /> Download
          </button>
        </div>
        <div className="content-body">{renderContent()}</div>
      </main>
    </div>
  );
}


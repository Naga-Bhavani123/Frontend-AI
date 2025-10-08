import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Home as HomeIcon, Folder, Archive, User, Send, X } from "lucide-react";
import Cookie from "js-cookie"
import "./index.css";

function SideBar() {
  const [hovered, setHovered] = useState(null);
  const [active, setActive] = useState("home");
  const [showTooltip, setShowTooltip] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [folderName, setFolderName] = useState("");
  const navigate = useNavigate()

  const descriptions = {
    home: "🏠 Welcome to Home Page.",
    folders: "📁 Create or view your folders here.",
    oldFolders: "🗂️ Old folders content here.",
    account: "👤 Account details go here.",
    gmail: "📧 Sent Gmail will appear here.",
  };

  // Tooltip delay
  useEffect(() => {
    let timer;
    if (hovered) {
      timer = setTimeout(() => setShowTooltip(hovered), 1000);
    } else {
      setShowTooltip(null);
    }
    return () => clearTimeout(timer);
  }, [hovered]);

  const handleClick = (name) => {
    setActive(name);
    if (name === "folders") setShowPopup(true);
  };

  const handleCreateFolder =  async () => {
    if (folderName.trim() === "") return alert("Enter folder name!");
    const token = Cookie.get("jwt-token")
    console.log(token)
    const response = await fetch("http://localhost:5000/folder", {
      method: "POST", 
      headers: {
        "Content-Type": "application/json", 
        Authorization: `Bearer ${token}` 
      }, 
      body: JSON.stringify({
        title: folderName
      })

    })
    if (response.ok){
      
      const idData = await response.json()
      navigate(`folder/${idData.folderId}`)
    }
    setFolderName("");
    setShowPopup(false);
  };

  return (
    <div className="side-container">
      {/* Sidebar */}
      <aside className="sidebar">
          <div className="logo-section">
          <img
            src="https://res.cloudinary.com/dk9fr18eq/image/upload/v1759730014/ChatGPT_Image_Oct_6_2025_11_02_10_AM_hcszdk.png"
            alt="FolderFlow Logo"
            className="app-logo"
          />
          <h2 className="logo-text">FolderFlow</h2>
        </div>
        {/* HOME */}
        <div
          className={`sidebar-item ${active === "home" ? "active" : ""}`}
          onMouseEnter={() => setHovered("home")}
          onMouseLeave={() => setHovered(null)}
          onClick={() => handleClick("home")}
        >
          <HomeIcon size={22} /> <span>Home</span>
          {showTooltip === "home" && (
            <div className="hover-info">{descriptions.home}</div>
          )}
        </div>

        {/* CREATE FOLDER */}
        <div
          className={`sidebar-item ${active === "folders" ? "active" : ""}`}
          onMouseEnter={() => setHovered("folders")}
          onMouseLeave={() => setHovered(null)}
          onClick={() => handleClick("folders")}
        >
          <Folder size={22} /> <span>Create Folder</span>
          {showTooltip === "folders" && (
            <div className="hover-info">{descriptions.folders}</div>
          )}
        </div>

        {/* OLD FOLDERS */}
        <div
          className={`sidebar-item ${active === "oldFolders" ? "active" : ""}`}
          onMouseEnter={() => setHovered("oldFolders")}
          onMouseLeave={() => setHovered(null)}
          onClick={() => handleClick("oldFolders")}
        >
          <Archive size={22} /> <span>Old Folders</span>
          {showTooltip === "oldFolders" && (
            <div className="hover-info">{descriptions.oldFolders}</div>
          )}
        </div>

        {/* ACCOUNT */}
        <div
          className={`sidebar-item ${active === "account" ? "active" : ""}`}
          onMouseEnter={() => setHovered("account")}
          onMouseLeave={() => setHovered(null)}
          onClick={() => handleClick("account")}
        >
          <User size={22} /> <span>Account</span>
          {showTooltip === "account" && (
            <div className="hover-info">{descriptions.account}</div>
          )}
        </div>

        {/* SENT GMAIL */}
        <div
          className={`sidebar-item ${active === "gmail" ? "active" : ""}`}
          onMouseEnter={() => setHovered("gmail")}
          onMouseLeave={() => setHovered(null)}
          onClick={() => handleClick("gmail")}
        >
          <Send size={22} /> <span>Sent Gmail</span>
          {showTooltip === "gmail" && (
            <div className="hover-info">{descriptions.gmail}</div>
          )}
        </div>
      </aside>

      {/* POPUP MODAL */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <div className="popup-header">
              <h3>Create New Folder</h3>
              <X className="close-btn" onClick={() => setShowPopup(false)} />
            </div>
            <input
              type="text"
              placeholder="Enter folder name"
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
              className="popup-input"
            />
            <button className="create-btn" onClick={handleCreateFolder}>
              Create
            </button>
          </div>
        </div>
      )}
    </div>
  );
}


export default SideBar
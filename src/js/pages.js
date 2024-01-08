// Imports
import Api from "../pages/Api.svelte"
import Article from "../pages/Article.svelte"
import Database from "../pages/Database.svelte"
import FileSystem from "../pages/FileSystem.svelte"
import Logs from "../pages/Logs.svelte"
import Monaco from "../pages/Monaco.svelte"
import NewTab from "../pages/NewTab.svelte"
import SiteMap from "../pages/SiteMap.svelte"
import Programs from "../pages/Programs.svelte"
import SerialPort from "../pages/SerialPort.svelte"
import Settings from "../pages/Settings.svelte"
import System from "../pages/System.svelte"
import TcpClient from "../pages/TcpClient.svelte"
import Users from "../pages/Users.svelte"

// Exports
export const pages = {

    // System
    "Users": Users,
    "System": System,
    "File System": FileSystem,
    "Logs": Logs,
    "Settings": Settings,
    
    // Programs
    "Programs": Programs,
    "Database": Database,
    "Code": Monaco,
    
    // Tools
    "TCP Client": TcpClient,
    "Serial Port": SerialPort,
    
    // Test Page
    "Site Map": SiteMap,
    "Article": Article,
    "Api": Api,
    "NewTab": NewTab,
}

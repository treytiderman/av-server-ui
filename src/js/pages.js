// Imports
import Article from "../pages/Article.svelte"
import Database from "../pages/Database.svelte"
import FileSystem from "../pages/FileSystem.svelte"
import Logs from "../pages/Logs.svelte"
import Monaco from "../pages/Monaco.svelte"
import Pages from "../pages/Pages.svelte"
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
    "Monaco": Monaco,
    
    // Tools
    "TCP Client": TcpClient,
    "Serial Port": SerialPort,
    
    // Test Page
    "Pages": Pages,
    "Article": Article,
    // "NewTab": NewTab,
}

// Imports
import Article from "../pages/Article.svelte"
import Database from "../pages/Database.svelte"
import FileSystem from "../pages/FileSystem.svelte"
import Logs from "../pages/Logs.svelte"
import Monaco from "../pages/Monaco.svelte"
// import NewTab from "../pages/NewTab.svelte"
import Pages from "../pages/Pages.svelte"
import Program from "../pages/Program.svelte"
import SerialPort from "../pages/SerialPort.svelte"
import Settings from "../pages/Settings.svelte"
import System from "../pages/System.svelte"
import TcpClient from "../pages/TcpClient.svelte"
import Users from "../pages/Users.svelte"

// Exports
export const pages = {

    // System
    "Database": Database,
    "File System": FileSystem,
    "Logs": Logs,
    "Monaco": Monaco,
    
    // Programs
    "Program": Program,
    "Settings": Settings,
    "System": System,
    "Users": Users,

    // Tools
    "Tcp Client": TcpClient,
    "Serial Port": SerialPort,
    
    // Test Page
    "Pages": Pages,
    "Article": Article,
    // "NewTab": NewTab,
}

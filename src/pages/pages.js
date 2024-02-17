// Imports
import Api from "../pages/Api.svelte"
import Article from "../pages/Article.svelte"
import Blank from "../pages/Blank.svelte"
import Database from "../pages/Database.svelte"
import FileSystem from "../pages/FileSystem.svelte"

import Browser from "./browser-v1/Browser.svelte"
import Code from "./code-editor-v1/Code.svelte"
import Logs from "../pages/logs-v1/Logs.svelte"
import Notes from "../pages/notes/Notes.svelte"
import Program from "../pages/program-v1/Program.svelte"
import SerialPort from "../pages/serialport-v1/SerialPort.svelte"
// import SiteMap from "../pages/SiteMap.svelte"
// import Settings from "../pages/Settings.svelte"
import System from "../pages/system-v1/System.svelte"
import TcpClient from "../pages/tcp-client-v1/TcpClient.svelte"
import User from "../pages/user-v1/User.svelte"

// Exports
export const pages = {

    // System
    "User": User,
    "System": System,
    "File System": FileSystem,
    "Logs": Logs,
    // "Settings": Settings,
    
    // // Programs
    "Programs": Program,
    "Database": Database,
    "Code": Code,
    
    // // Tools
    "TCP Client": TcpClient,
    "Serial Port": SerialPort,
    
    // // Test Page
    // "Site Map": SiteMap,
    "Article": Article,
    "Api": Api,
    "Blank": Blank,
    "Notes": Notes,
    "Browser": Browser,
}

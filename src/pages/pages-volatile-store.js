// Imports
import { volatileStore } from "../js/store.js";

// Pages
import Api from "./Api.svelte"
import Article from "./article-v1/Article.svelte"
import Blank from "./Blank.svelte"
import Database from "./database-v1/Database.svelte"
// import FileSystem from "./FileSystem.svelte"

import Browser from "./browser-v1/Browser.svelte"
import Code from "./code-editor-v1/Code.svelte"
import Logs from "./logs-v1/Logs.svelte"
import Notes from "./notes/Notes.svelte"
import Program from "./program-v1/Program.svelte"
import SerialPort from "./serialport-v1/SerialPort.svelte"
import SiteMap from "./site-map-v1/SiteMap.svelte"
import Settings from "./settings-v1/Settings.svelte"
import System from "./system-v1/System.svelte"
import TcpClient from "./tcp-client-v1/TcpClient.svelte"
import User from "./user-v1/User.svelte"

// Store
export const store = volatileStore("pages", {

    // System
    "User": User,
    "System": System,
    // "File System": FileSystem,
    "Logs": Logs,
    "Settings": Settings,
    
    // Programs
    "Programs": Program,
    "Database": Database,
    "Code": Code,
    
    // Tools
    "TCP Client": TcpClient,
    "Serial Port": SerialPort,
    
    // Test Page
    "Site Map": SiteMap,
    "Article": Article,
    "Api": Api,
    "Blank": Blank,
    "Notes": Notes,
    "Browser": Browser,
})

# State

> What state?

Any data needing shown on the UI

> Types of State

- Volatile (Lost on reload)
    - Any data that is fetched from the server or browser on page load
    - Secret form data like passwords
- Persistent (Saved to localStorage)
    - Form data (not passwords)
    - UI settings
    - Layout / Workspace (page tabs and split panes)

There are no hard rules here. Make the call per piece of data whether it should be Persistent or Volatile

> Levels of State

1. Global (Volatile or Persistent)
    - Data that is needed anywhere
    - URL
    - Browser Window size / focus
    - User info (username, groups)
    - Layout / Workspace (page tabs and split panes)
2. Page Type (Volatile or Persistent)
    - Data that effects any page of that type. For example all "Tcp Client" pages
    - How much history to pull into a log on load
    - UI settings like table borders or pretty json vs collapsed
    - Data fetched from the server that any of this page type would need
3. Page Instance (Volatile only)
    - Data that effects only this page.
    - If opened in another tab or in split view then data from one instance should not effect another
    - Form Data
    - Visibility state of settings

State should be kept at the lowest level needed

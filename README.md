# GitHub Pull Request google extension 
This extension improves your productivity.  
You can also save data in your local storage, then just click update-button away in your GitHub pull request page.  

**F2E:** React  
  
**Design:** [antd](https://ant.design/)  
  
**API:** [Google Chrome API](https://developer.chrome.com/extensions)  
  
**Third party:**  
  * [react-chrome-extension-router](https://www.npmjs.com/package/react-chrome-extension-router)
  * [react-markdown](https://github.com/rexxars/react-markdown)
  * [formik](https://github.com/jaredpalmer/formik)
  * [formik-antd](https://github.com/jannikbuschke/formik-antd)

## How to use 
1. Build project. 
```
npm run build
```
2. Go to google extension platform. 
```
chrome://extensions/
```
3. Upload build package. 
4. Enjoy it. 

---

## How to start a new google extension project yourself  
1. Create project
  * For example, you can use React, or just  simple popup HTML.
 
2. Create or modify manifest.json
  * If you use framework, you can find it in public folder.
 
3. Setting attributes
  * You can customize its icon.
```
{
  "manifest_version": 2,
  "name": "GitHub PR tools",
  "description": "Easily add content in your PR form.",
  "version": "0.0.1",

  "browser_action": {
    "default_popup": "index.html",
    "default_title": "Open the popup"
  },
  "icons": {
    "16": "logo.png",
    "48": "logo.png",
    "128": "logo.png"
  },
  "permissions": [
    "tabs",
    "storage",
    "activeTab",
    "<all_urls>"
  ]  
}
```

4. **Setting content_security_policy**  
* It is very important, you need to copy sha256-id to the manifest.json, or you will get error in your console, also not usage.  
```
{
  "manifest_version": 2,

  "name": "GitHub PR tools",
  "description": "Easily add content in your PR form.",
  "version": "0.0.1",

  "browser_action": {
    "default_popup": "index.html",
    "default_title": "Open the popup"
  },
  "icons": {
    "16": "logo.png",
    "48": "logo.png",
    "128": "logo.png"
  },
  "permissions": [
    "tabs",
    "storage",
    "activeTab",
    "<all_urls>"
  ],
  "content_security_policy": "script-src 'self' 'sha256-......='; object-src 'self'"
}
```

5. Build project  
6. Load and Use it  

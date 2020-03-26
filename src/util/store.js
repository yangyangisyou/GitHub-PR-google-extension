/* global chrome */
// For local storage, use chrome.storage.local. 
// It has a very simple API and 5 MB of storage per profile.
// The permission is "storage" and it'll grant you access to chrome.storage.local and chrome.storage.sync. local is 5 MB per profile, saved on the client. sync is 100 KB, saved in the Google account. Same API.

export function storeData(data) {
    const {title, content, hotfix, environment} = data;
    chrome.storage.local.set({
        cacheData: {
            title: title, 
            content: content,
            hotfix: hotfix,
            environment: environment
        }
    });
}

// export async function fetchData() {
//     let title = '';
//     let content = '';
//     let hotfix = false;
//     let environment = '';
//     await chrome.storage.local.get('title', function (payload) {
//         title = payload.title;
//         // alert(JSON.stringify(payload));
//         console.log('content-> ', title);
//         return title;
//     });
//     await chrome.storage.local.get('content', function (payload) {
//         content = payload.content;
//         alert(JSON.stringify(payload));
//         // alert(payload.content);
//         // console.log('content-> ', content);
//         return content;
//     });
//     await chrome.storage.local.get('hotfix', function (payload) {
//         hotfix = payload.hotfix;
//         return hotfix;
//     });
//     await chrome.storage.local.get('environment', function (payload) {
//         environment = payload.environment;
//         return environment;
//     });
//     alert(JSON.stringify({
//         title: title,
//         content: content,
//         hotfix: hotfix,
//         environment: environment
//     }));
//     return {
//         title: title,
//         content: content,
//         hotfix: hotfix,
//         environment: environment
//     };
// }

// fetchLive = (callback) => {
//     doSomething(function(data) {
//       chrome.storage.local.set({cache: data, cacheTime: Date.now()}, () => callback(data));
//     });
//   }

// fetch = (callback) => {
//     chrome.storage.local.get(['cache', 'cacheTime'], (items) => {
//       if (items.cache && items.cacheTime && items.cacheTime) {
//         if (items.cacheTime > Date.now() - 3600*1000) {
//           return callback(items.cache); // Serialization is auto, so nested objects are no problem
//         }
//       }
  
//       fetchLive(callback);
//     });
// }
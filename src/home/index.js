/* global chrome */
import React, { PureComponent, Fragment } from 'react';
import {storeData, fetchData} from '../util/store.js';
import { Button, message as antdMessage } from 'antd';
import Setting from '../setting';
import {
  Router,
  Link,
  goBack,
  goTo,
  popToTop
} from 'react-chrome-extension-router';
class Home extends PureComponent {
  state = {
    currentUrl: '',
    cacheData: null
  }
  componentDidMount() {
    chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
      this.setState({
        currentUrl: tabs[0].url
      }, () => console.log('did this.state.currentUrl: ',this.state.currentUrl))
    }.bind(this));

    chrome.storage.local.get('cacheData', (payload) => {
      let cacheData = payload.cacheData;
      this.setState({
          ...this.state,
          cacheData: cacheData
      });
      // console.log('get cacheData-> ',cacheData);
      return cacheData;
    });
  }

  injectContent = () => {
    chrome.tabs.executeScript(null, {
      "code": `document.getElementById(\"pull_request_title\").value = \"${this.state.cacheData.title}\"; document.getElementById(\"pull_request_body\").value = \"${this.state.cacheData.content}\"`
    }, function (result) {
      antdMessage.success('Update successful');
      console.log('inject successful');
    });
  }

  render() {
    // let currentUrl = '';
    // chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
    //   currentUrl = tabs[0].url;
    // });
    let isGithubPage = this.state.currentUrl.indexOf('github') > 0;
    // console.log('this.state.currentUrl: ',this.state.currentUrl);
    // console.log('isGithub: ',isGithub);
    
    // chrome.tabs.executeScript(tabs[tab].id, {
    //     "code": "document.getElementById(\"_Your_ID_Here_\").innerText.split(' ')"
    // }, function (result) {
    //     console.log('result: ',result);
    //     // for (i = 0; i < result[0].length; i++)
    //     // getText [i] = result[0][i];
    //     // console.log(getText);
    // });

  //   chrome.tabs.executeScript(null, {
  //     "code": "document.getElementById(\"pull_request_body\").value = \'test\'"
  // }, function (result) {
  //     console.log('my result: ',result);
  //     // for (i = 0; i < result[0].length; i++)
  //     // getText [i] = result[0][i];
  //     // console.log(getText);
  // });

    // chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
    //   let data = document.getElementById("pull_request_body"); //The line I changed to pass the URL to html.
    //   console.log('data-> ', data);
    //   console.log('document-> ', document);
    //   console.log('tabs-> ', tabs);
    // }.bind(this));

    return(
        <Fragment>
            <h2>GitHub PR tools</h2>
            <Button type="primary" 
                    disabled={!isGithubPage} 
                    onClick={()=>this.injectContent()}
            >{!isGithubPage?'Not in PR page':'Update content'}</Button>
            <Link component={Setting} props={{ message: "I came from component Home!" }}>
              Go to Setting
            </Link>
        </Fragment>
    );
  }
}
export default Home;




// {"app":{"isInstalled":false,"InstallState":{"DISABLED":"disabled","INSTALLED":"installed","NOT_INSTALLED":"not_installed"},"RunningState":{"CANNOT_RUN":"cannot_run","READY_TO_RUN":"ready_to_run","RUNNING":"running"}},"browserAction":{"onClicked":{}},"extension":{"onMessageExternal":{},"onMessage":{},"onConnectExternal":{},"onConnect":{},"onRequestExternal":{},"onRequest":{},"ViewType":{"POPUP":"popup","TAB":"tab"},"inIncognitoContext":false},"i18n":{},"management":{"ExtensionDisabledReason":{"PERMISSIONS_INCREASE":"permissions_increase","UNKNOWN":"unknown"},"ExtensionInstallType":{"ADMIN":"admin","DEVELOPMENT":"development","NORMAL":"normal","OTHER":"other","SIDELOAD":"sideload"},"ExtensionType":{"EXTENSION":"extension","HOSTED_APP":"hosted_app","LEGACY_PACKAGED_APP":"legacy_packaged_app","LOGIN_SCREEN_EXTENSION":"login_screen_extension","PACKAGED_APP":"packaged_app","THEME":"theme"},"LaunchType":{"OPEN_AS_PINNED_TAB":"OPEN_AS_PINNED_TAB","OPEN_AS_REGULAR_TAB":"OPEN_AS_REGULAR_TAB","O...Attached":{},"onDetached":{},"onHighlighted":{},"onHighlightChanged":{},"onActivated":{},"onActiveChanged":{},"onSelectionChanged":{},"onMoved":{},"onUpdated":{},"onCreated":{},"MutedInfoReason":{"CAPTURE":"capture","EXTENSION":"extension","USER":"user"},"TabStatus":{"COMPLETE":"complete","LOADING":"loading"},"WindowType":{"APP":"app","DEVTOOLS":"devtools","NORMAL":"normal","PANEL":"panel","POPUP":"popup"},"ZoomSettingsMode":{"AUTOMATIC":"automatic","DISABLED":"disabled","MANUAL":"manual"},"ZoomSettingsScope":{"PER_ORIGIN":"per-origin","PER_TAB":"per-tab"},"TAB_ID_NONE":-1},"windows":{"onFocusChanged":{},"onRemoved":{},"onCreated":{},"CreateType":{"NORMAL":"normal","PANEL":"panel","POPUP":"popup"},"WindowState":{"FULLSCREEN":"fullscreen","LOCKED_FULLSCREEN":"locked-fullscreen","MAXIMIZED":"maximized","MINIMIZED":"minimized","NORMAL":"normal"},"WindowType":{"APP":"app","DEVTOOLS":"devtools","NORMAL":"normal","PANEL":"panel","POPUP":"popup"},"WINDOW_ID_CURRENT":-2,"WINDOW_ID_NONE":-1}}
/* global chrome */
import React, { PureComponent, Fragment } from 'react';
import { storeData, fetchData } from '../util/store.js';
import { Button, Input, Checkbox, Select, message as antdMessage } from 'antd';
import {
  Router,
  Link,
  goBack,
  goTo,
  popToTop
} from 'react-chrome-extension-router';
import { Formik, ErrorMessage } from 'formik';
import {
    DatePicker,
    Radio,
    SubmitButton,
    Form
  } from "formik-antd";
import { DisplayFormikState } from '../util/debug.js';
import ReactMarkdown from 'react-markdown';
import Home from '../home';
import './setting.css';
class Setting extends PureComponent {
    state = {
        formData: {
            title: '',
            content: '',
            hotfix: false,
            environment: 'lab'
        },
        cacheData: null
    }

    // This callback function is called when the content script has been
    // injected and returned its results
    // onPageDetailsReceived = () => {
    //     document.getElementById('pull_request_body').value = this.state.formData.content;
    // }

    // // This function is called onload in the popup code
    // getPageDetails = (callback) => {
    //     // Inject the content script into the current page
    //     chrome.tabs.executeScript(null, { file: 'content.js' });
    //     // When a message is received from the content script
    //     chrome.runtime.onMessage.addListener(function(message) {
    //         // Call the callback function
    //         callback(message);
    //     });
    // };

    renderForm = (props) => {
        const blockStyle = {
            margin: '10px 10px'
        };
        const Option = Select.Option;
        const TextArea = Input.TextArea;
        return (
            <Form>
                {/* 部署環境 */}
                <div style = { blockStyle }>
                    <label style = {{ float: "left" }}> Deploy attribute: </label>
                    <Select value = {this.state.formData.environment} 
                            name = 'environment'
                            style = {{ width: 120, margin: 'auto 10px' }} 
                            onChange={(value) => {
                            this.setState({
                                ...this.state, 
                                formData: {
                                    ...this.state.formData, 
                                    environment: value,
                                    title: this.state.formData.hotfix 
                                    ? `Hotfix to ${this.state.formData.environment}`
                                    : `Deploy to ${this.state.formData.environment}`
                                }
                            })
                        }} 
                    >
                        <Option value="lab">lab</Option>
                        <Option value="staging">staging</Option>
                        <Option value="production">production</Option>
                    </Select>
                    {/* Hotfix確認 */}
                    <Checkbox style = {{ margin: 'auto 10px' }}
                        name = 'hotfix'
                        onChange={(element) => {
                            this.setState({
                                ...this.state, 
                                formData: {
                                    ...this.state.formData, 
                                    hotfix: element.target.checked,
                                    title: this.state.formData.hotfix 
                                    ? `Hotfix to ${this.state.formData.environment}`
                                    : `Deploy to ${this.state.formData.environment}`
                                }
                            })
                        }}      
                    >hotfix</Checkbox>
                    <br />
                </div>
                <div style = { blockStyle }>
                    {/* 內容 */}
                    <label style = {{ float: "left" }}> Your content: </label>
                    <TextArea
                        rows={5} 
                        value={this.state.formData.content} 
                        name = 'content'
                        onChange={(element) => {
                            this.setState({
                                ...this.state, 
                                formData: {
                                    ...this.state.formData, 
                                    content: element.target.value
                                }
                            })
                        }} 
                    />
                    <br />
                </div>
                {
                    this.state.formData.hotfix 
                    ? <p>Title：Hotfix to {this.state.formData.environment}</p>
                    : <p>Title：Deploy to {this.state.formData.environment}</p>
                }
                <p>Content：</p>
                <ReactMarkdown source={this.state.formData.content}/>
                <div style = {{bottom: '0px'}}>
                    <SubmitButton type = "primary" style = { blockStyle }>Save</SubmitButton>
                    {/* <Button type = "primary" 
                        style = {{margin: 'auto 10px'}} 
                        onClick={async() => {
                            alert('inside->',JSON.stringify(this.state.cacheData));
                            // const data = await fetchData();
                            // alert('get data: ',data);
                            // console.log(data);
                            // this.setState({
                            //     ...this.state,
                            //     formData: data
                            // })
                    }}>Fetch previous data</Button> */}
                </div> 
                {/* <DisplayFormikState {...props} /> */}
            </Form>
        );
    }
    
    componentDidMount() {
        chrome.storage.local.get('cacheData', (payload) => {
            let cacheData = payload.cacheData;
            this.setState({
                ...this.state,
                formData: cacheData
            });
            return cacheData;
        });
    }

    render() {
        // chrome.storage.local.get('cacheData', (payload) => {
        //     let cacheData = payload.cacheData;
        //     console.log('payload.cacheData', JSON.stringify(payload.cacheData));
        //     this.setState({
        //         ...this.state,
        //         cacheData: cacheData
        //     });
        //     console.log('cacheData->', this.state.cacheData);
        //     // alert('cacheData->', this.state.cacheData)
        //     return cacheData;
        // });

        
        
        return(
            <Fragment>
                <h2> GitHub PR setting </h2>
                <Formik
                    initialValues = { this.state.formData }
                    onSubmit = {
                        async (data, {setSubmitting}) => {
                            await storeData(this.state.formData);
                            antdMessage.success('Save data successful');
                        // await this.saveFormData(data);
                        setSubmitting(false);   
                    }}
                    render = { this.renderForm }
                />
                <Link component={Home}>
                    Back to home
                </Link>
            </Fragment>
        );
    }
}
export default Setting;

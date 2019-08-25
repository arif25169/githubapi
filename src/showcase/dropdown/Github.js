import React, { Component } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import axios from 'axios';
import { FileUpload } from "primereact/fileupload";
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import {Growl} from 'primereact/growl';
let gitdirUserPath;

export class Github extends Component {
    constructor() {
        super();
        this.state = {
            gitUserName: 'ioori',
            gitUserRepo: 'file',
            gitUserPath: '',
            finalUrl: '',
            mainUrl: '',
            users: [],
            urlApi: [],
            branchesList: '',
            branchesValue: 'master',
            commitMsg: 'arif',
            uploadfileName: '',
            uploadfilePath: 'ioori/file',

        };
        this.uploadGithub = this.uploadGithub.bind(this)
        this.gitUrlApi = this.gitUrlApi.bind(this)
        this.gitUrlApi2 = this.gitUrlApi2.bind(this)
        this.gitUrlApi3 = this.gitUrlApi3.bind(this)
        this.downloadBody = this.downloadBody.bind(this)
        this.gitDirUrlApi = this.gitDirUrlApi.bind(this)
        this.goBackApi = this.goBackApi.bind(this)
    }

    // componentDidMount() {
    //     this.gitApi();
    // }

    // gitApi = async () => {
    //     let res = await axios.get("https://api.github.com/repos/arif25169/file/contents/wget");
    //     let { data } = res;
    //     this.setState({ users: data });
    // };
    gitUrlApi3 = async () => {
        var finalUrl;
        if (this.state.mainUrl !== "") {
            let mainUrl = this.state.mainUrl;
            // [0].slice(1,-1)
            var gitUserName = mainUrl.split('/')[3];
            var gitUserRepo = mainUrl.split('/')[4];
            this.setState({ gitUserName: gitUserName });
            this.setState({ gitUserRepo: gitUserRepo });
            let branches = "https://api.github.com/repos/" + gitUserName + "/" + gitUserRepo + "/branches"
            //  console.log(branches)
            let branchvalue = await axios.get(branches);
            if (branchvalue) {
                this.setState({ branchesList: branchvalue.data });
            }
            finalUrl = "https://api.github.com/repos/" + gitUserName + "/" + gitUserRepo + "/contents/"
            this.setState({ finalUrl: finalUrl });
            let res = await axios.get(finalUrl + '?ref=' + this.state.branchesValue)
            console.log(finalUrl + '?ref=' + this.state.branchesValue)
            let { data } = res;
            console.log(data)
            this.setState({ urlApi: data });

        } else this.gitUrlApi2();
    };
    gitUrlApi = async () => {
        var finalUrl;
        if (this.state.mainUrl !== "") {
            let mainUrl = this.state.mainUrl;
            // [0].slice(1,-1)
            var gitUserName = mainUrl.split('/')[3];
            var gitUserRepo = mainUrl.split('/')[4];
            this.setState({ gitUserName: gitUserName });
            this.setState({ gitUserRepo: gitUserRepo });
            let branches = "https://api.github.com/repos/" + gitUserName + "/" + gitUserRepo + "/branches"
            //  console.log(branches)
            let branchvalue = await axios.get(branches);
            if (branchvalue) {
                this.setState({ branchesList: branchvalue.data });
            }
            finalUrl = "https://api.github.com/repos/" + gitUserName + "/" + gitUserRepo + "/contents/"
            this.setState({ finalUrl: finalUrl });
            let res = await axios.get(finalUrl)
            let { data } = res;
            console.log(data)
            this.setState({ urlApi: data });

        } else this.gitUrlApi2();
    };


    gitUrlApi2 = async () => {

        var finalUrl;
        // console.log('nai')
        let branches = "https://api.github.com/repos/" + this.state.gitUserName + "/" + this.state.gitUserRepo + "/branches"
        let branchvalue = await axios.get(branches);
        if (branchvalue) {
            this.setState({ branchesList: branchvalue.data });
        }
        if (this.state.gitUserPath === '') {

            finalUrl = "https://api.github.com/repos/" + this.state.gitUserName + "/" + this.state.gitUserRepo + "/contents/";
        } else if (this.state.gitUserPath !== '') {
            //console.log('ache')
            finalUrl = "https://api.github.com/repos/" + this.state.gitUserName + "/" + this.state.gitUserRepo + "/contents/" + this.state.gitUserPath + '/';
        }
        console.log(finalUrl)
        this.setState({ finalUrl: finalUrl });
        let res = await axios.get(finalUrl)
        let { data } = res;
        console.log(data)
        this.setState({ urlApi: data });

    };
    gitDirUrlApi = async () => {

        let inputUrl = this.state.finalUrl;
        if (this.state.gitUserPath !== '') {
            inputUrl = "https://api.github.com/repos/" + this.state.gitUserName + "/" + this.state.gitUserRepo + "/contents/";
        }

        let nestedurl = inputUrl + gitdirUserPath

        //console.log(nestedurl)
        let res = await axios.get(nestedurl);
        //console.log(afterSlashChars)

        let { data } = res;
        console.log(data)
        this.setState({ urlApi: data });

    };

    goBackApi = async () => {
        let inputUrl = this.state.finalUrl
        if (this.state.gitUserPath !== '') {
            inputUrl = "https://api.github.com/repos/" + this.state.gitUserName + "/" + this.state.gitUserRepo + "/contents/";
        }

        let nestedurl = inputUrl + gitdirUserPath

        // console.log('before')
        // console.log(nestedurl)
        var afterSlashChars = nestedurl.match(/\/([^\/]+)\/?$/)[1] + '/';
        let nestedur2l = nestedurl.slice(0, -afterSlashChars.length)
        //  nestedurl = nestedurl.slice(0, -afterSlashChars.length)

        //  console.log('after')
        //  console.log(nestedurl)
        //  console.log(afterSlashChars)
        let res = await axios.get(nestedur2l);

        let { data } = res;
        console.log(data)
        this.setState({ urlApi: data });

    };

    downloadBody = (rowData) => {

        return <Button icon="pi pi-download" onClick={() => window.open(rowData.download_url, "_blank")} />

    }
    dirBody = (rowData) => {
        if (rowData.type === 'file') {
            return <Button icon="pi pi-ban" />
        } else if (rowData.type !== 'file') {
            gitdirUserPath = rowData.path + '/'
            return <Button icon="pi pi-folder" label="Open Dir" onClick={this.gitDirUrlApi} />
        }
    }
    onFileUpload(e) {
        var reader = new FileReader();
        let photo = e.files[0];
        const scope = this;
        reader.readAsDataURL(photo);
        reader.onload = function () {
            let content = reader.result;
            var keyw = "data:" + photo.type + ";base64,"; //link will be same from the word webapps in URL
            var urlStr = content.substring(content.indexOf(keyw) + keyw.length);
            let album = {
                extention: photo.type,
                contentPic: urlStr,
                contentName: photo.name
            };
            scope.setState({ proPic: album });
        };
    }

    uploadGithub = async () => {
        console.log('work')
        let nameWithOwner = this.state.uploadfilePath;
        let fileName = this.state.proPic.contentName;
        let fileMessage = this.state.commitMsg
        let fileContent ;
        if(this.state.uploadfileName!==''){
            fileContent = this.state.uploadfileName;
        } else fileContent = this.state.proPic.contentPic
        const token = 'cfe6f89de53e39323b6c5618b5cafcd3745d18f5';
        var apiurl = "https://api.github.com/repos/" + nameWithOwner + "/contents/" + fileName;
        var filedata = {
            "message": fileMessage,
            "content": fileContent
        };
        console.log(filedata)
        try {
            let res = await axios.put(apiurl, filedata, {
                headers: { Authorization: "Token " + token }
            })
            console.log(res)
            if (res.status===201){
                this.growl.show({severity: 'success', summary: 'Success Message', detail: 'Successfully Uploaded'});
            }
        } catch (error) {
            this.growl.show({severity: 'error', summary: 'Error Message', detail: 'Upload failed'});
            // console.log(error.response.data);
            // console.log(error.response.status);
            // console.log(error.response.headers);
        }
  

    }


    render() {
        let branchesOption = [{ label: 'master', value: 'master' }]
        if (this.state.branchesList && this.state.branchesList.length) {
            branchesOption = this.state.branchesList.map(item => ({
                value: item.name,
                label: item.name
            }));
        }
        var header = <div className="p-clearfix" style={{ 'lineHeight': '1.87em' }}>List of Files <Button icon="pi pi-arrow-left" title="Go Back" onClick={this.goBackApi} style={{ 'float': 'right' }} /></div>;;
        let paginatorLeft2 = <Button icon="pi pi-refresh" onClick={this.gitUrlApi} />;
        let paginatorRight = <Button icon="pi pi-arrow-left" title="Go Back" onClick={this.goBackApi} />;

        return (
            <div>
<Growl ref={(el) => this.growl = el}></Growl>
                {/* <TabPanel header="Static">
                        <div className="content-section implementation">
                            <div>
                                <DataTable value={this.state.users}
                                    paginator={true}
                                    paginatorLeft={paginatorLeft}
                                    paginatorRight={paginatorRight}
                                    rows={10}
                                    rowsPerPageOptions={[5, 10, 20]}
                                >
                                    <Column field="name" header="File" sortable={true} filter={true} />
                                    <Column field="size" header="Size" sortable={true} filter={true} />
                                    <Column body={this.downloadBody} header="Download" />
                                </DataTable>

                            </div>
                        </div>
                    </TabPanel> */}


                <div className="ui-grid">
                    <div className="ui-grid">
                        <br />
                    </div>
                    <div className="ui-grid">

                        <InputText value={this.state.mainUrl} style={{ width: '70%' }} onChange={(e) => this.setState({ mainUrl: e.target.value })} placeholder="Enter Url " /> &nbsp;
                            </div>
                    <div className="ui-grid">
                    </div>
                    <div className="ui-grid">
                        <InputText value={this.state.gitUserName} onChange={(e) => this.setState({ gitUserName: e.target.value })} placeholder="User " />
                        <InputText value={this.state.gitUserRepo} onChange={(e) => this.setState({ gitUserRepo: e.target.value })} placeholder="Repo" />
                        <InputText value={this.state.gitUserPath} onChange={(e) => this.setState({ gitUserPath: e.target.value })} placeholder="Path" />
                        <Dropdown value={this.state.branchesValue} options={branchesOption} onChange={(e) => { this.setState({ branchesValue: e.value }) }} placeholder="Select a Branch" />&nbsp;
                                <Button label="Fetch" onClick={this.gitUrlApi2} />&nbsp;
                                <Button label="URL" onClick={this.gitUrlApi} />&nbsp;
                                <Button label="Branch" onClick={this.gitUrlApi3} />
                    </div>
                </div>
                {this.state.urlApi ?
                    <div className="content-section implementation">
                        <div>
                            <DataTable value={this.state.urlApi}
                                paginator={true}
                                paginatorLeft={paginatorLeft2}
                                paginatorRight={paginatorRight}
                                rows={20}
                                header={header}
                                rowsPerPageOptions={[5, 10, 20]}
                                responsive={true}
                            >
                                <Column field="name" header="File" sortable={true} filter={true} />
                                <Column field="size" header="Size" sortable={true} filter={true} />
                                <Column body={this.dirBody} header="Dir/File" sortable={true} />
                                <Column body={this.downloadBody} header="Download" sortable={true} />
                            </DataTable>

                        </div>
                    </div>
                    : ""}


                <div className="ui-grid">
                    <FileUpload
                        chooseLabel="Upload File"
                        id="photoUpload"
                        mode="basic"
                        accept="*/*"
                        maxFileSize={1000000}
                        onSelect={this.onFileUpload.bind(this)}
                        auto={true}
                    />
                    {/* <center>{this.state.proPic.contentName}</center> */}
                    &nbsp;
                      <InputText value={this.state.commitMsg} onChange={(e) => this.setState({ commitMsg: e.target.value })} placeholder="User " />
                    &nbsp;
                      <InputText value={this.state.uploadfilePath} onChange={(e) => this.setState({ uploadfilePath: e.target.value })} placeholder="User " />
                    &nbsp;
                      <InputText value={this.state.uploadfileName} onChange={(e) => this.setState({ uploadfileName: e.target.value })} placeholder="File Name " />
                    &nbsp;
                      <Button label="Upload" onClick={this.uploadGithub} />

                </div>

                {/* https://github.com/google/rejoiner
    var afterSlashChars = id.match(/\/([^\/]+)\/?$/)[1];
Breaking down this regex:

\/ match a slash
(  start of a captured group within the match
[^\/] match a non-slash character
+ match one of more of the non-slash characters
)  end of the captured group
\/? allow one optional / at the end of the string
$  match to the end of the string */}

            </div>
        )
    }
}



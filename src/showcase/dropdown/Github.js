import React, { Component } from 'react';
import { TabView, TabPanel } from 'primereact/tabview';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import axios from 'axios';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';

let gitdirUserPath;
let gitdirUserPathback;


export class Github extends Component {
    constructor() {
        super();
        this.state = {
            gitUserName: 'arif25169',
            gitUserRepo: 'files',
            gitUserPath: '',
            finalUrl: '',
            mainUrl: '',
            users: [],
            urlApi: [],
            branchesList: '',
            branchesValue: 'master',

        };
      //  this.gitApi = this.gitApi.bind(this)
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
            let res = await axios.get(finalUrl +'?ref='+this.state.branchesValue )
            console.log(finalUrl +'?ref='+this.state.branchesValue)
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
            let res = await axios.get(finalUrl )
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
        // console.log(finalUrl)
        this.setState({ finalUrl: finalUrl });
        let res = await axios.get(finalUrl )
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

     //   let nestedurl = inputUrl + gitdirUserPath
        this.setState({ nestedurl: inputUrl + gitdirUserPath });
        //console.log(gitdirUserPathback)
        // console.log('before')
        // console.log(nestedurl)
        var afterSlashChars = this.state.nestedurl.match(/\/([^\/]+)\/?$/)[1] + '/';
       let nestedur2l = this.state.nestedurl.slice(0, -afterSlashChars.length)
       this.setState({ nestedurl: nestedur2l });
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
            return <Button icon="pi pi-ban"  />
        } else if (rowData.type !== 'file') {
            gitdirUserPath = rowData.path + '/'
            gitdirUserPathback = '/' + rowData.name
            return <Button icon="pi pi-folder" label="Open Dir" onClick={this.gitDirUrlApi} />
        }
    }



    render() {
        // console.log(this.state.users)

        let branchesOption = [{ label: 'master', value: 'master' }]
        if (this.state.branchesList && this.state.branchesList.length) {
            branchesOption = this.state.branchesList.map(item => ({
                value: item.name,
                label: item.name
            }));
        }
        var header = <div className="p-clearfix" style={{'lineHeight':'1.87em'}}>List of Files <Button icon="pi pi-arrow-left" title="Go Back" onClick={this.goBackApi} style={{'float':'right'}}/></div>;;
        let paginatorLeft2 = <Button icon="pi pi-refresh" onClick={this.gitUrlApi} />;
        let paginatorRight = <Button icon="pi pi-arrow-left" title="Go Back" onClick={this.goBackApi} />;

        return (
            <div>
                <TabView>
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
                    <TabPanel header="URL">

                        <div className="ui-grid">
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
                                <Button label="URL" onClick={this.gitUrlApi} />&nbsp;
                                <Button label="Fetch" onClick={this.gitUrlApi2} />&nbsp;
                                <Button label="Branch" onClick={this.gitUrlApi3} />
                            </div>
                        </div>
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
                    </TabPanel>

                </TabView>

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



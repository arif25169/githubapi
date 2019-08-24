import React, { Component } from 'react';
import { TabView, TabPanel } from 'primereact/tabview';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import axios from 'axios';
import { Button } from 'primereact/button';
import {InputText} from 'primereact/inputtext';

let gitdirUserPath;
let gitdirUserPathback;
let gopackLength;

export class Github extends Component {
    constructor() {
        super();
        this.state = {
            gitUserName: 'primefaces',
            gitUserRepo: 'primereact',
            gitUserPath: '',
            finalUrl: '',
            users: [],
            urlApi: [],
        };
        this.gitApi = this.gitApi.bind(this)
        this.gitUrlApi = this.gitUrlApi.bind(this)
        this.downloadBody = this.downloadBody.bind(this)
        this.gitDirUrlApi = this.gitDirUrlApi.bind(this)
        this.goBackApi = this.goBackApi.bind(this)
    }

    componentDidMount() {
        this.gitApi();
    }

    gitApi = async () => {
        let res = await axios.get("https://api.github.com/repos/arif25169/file/contents/wget");
        let { data } = res;
        this.setState({ users: data });
    };


    gitUrlApi = async () => {
        var finalUrl;
        console.log(this.state.gitUserPath)
        if (this.state.gitUserPath===''){
            console.log('nai')
         finalUrl= "https://api.github.com/repos/"+this.state.gitUserName+"/"+this.state.gitUserRepo+"/contents/";
        } else if (this.state.gitUserPath!==''){
            console.log('ache')
            finalUrl= "https://api.github.com/repos/"+this.state.gitUserName+"/"+this.state.gitUserRepo+"/contents/"+this.state.gitUserPath+'/';
            }
       console.log(finalUrl)
       this.setState({ finalUrl: finalUrl });
        let res = await axios.get(finalUrl);
        let { data } = res;
        console.log(data)
        this.setState({ urlApi: data });
       
    };
    gitDirUrlApi = async () => {

       let inputUrl=this.state.finalUrl
       if (this.state.gitUserPath!==''){
        inputUrl="https://api.github.com/repos/"+this.state.gitUserName+"/"+this.state.gitUserRepo+"/contents/";
        }
       
        let nestedurl=inputUrl+gitdirUserPath
 
        console.log(nestedurl)
        var afterSlashChars = nestedurl.match(/\/([^\/]+)\/?$/)[0];
       let res = await axios.get(nestedurl);
       console.log(afterSlashChars)
     
        let { data } = res;
        console.log(data)
        this.setState({ urlApi: data });
       
    };

    goBackApi = async () => {
        let inputUrl=this.state.finalUrl
        if (this.state.gitUserPath!==''){
         inputUrl="https://api.github.com/repos/"+this.state.gitUserName+"/"+this.state.gitUserRepo+"/contents/";
         }
        
         let nestedurl=inputUrl+gitdirUserPath
        console.log("nestedurl")
        console.log(nestedurl)
        console.log(gitdirUserPathback)
        console.log(gopackLength)
        let lengthBack=gitdirUserPathback.length
       let gobackUrl= nestedurl.slice(0,-lengthBack)
       var afterSlashChars = nestedurl.match(/\/([^\/]+)\/?$/)[1];
        console.log("gobackUrl")
        console.log(gobackUrl)
        console.log(afterSlashChars)
      
       let res = await axios.get(gobackUrl);
     
        let { data } = res;
        console.log(data)
        this.setState({ urlApi: data });
       
    };

    downloadBody = (rowData) => {
        return <Button label="Download" onClick={() => window.open(rowData.download_url, "_blank")} />
    }
    dirBody = (rowData) => {
     if (rowData.type==='file'){
        return 'File'
     } else if (rowData.type!=='file'){
        gitdirUserPath=rowData.path+'/'
        gitdirUserPathback='/'+rowData.name
        gopackLength= rowData.name;
        return <Button label="Open Dir" onClick={this.gitDirUrlApi}/>
     }
    }


    render() {
       // console.log(this.state.users)
        let paginatorLeft = <Button icon="pi pi-refresh" onClick={this.gitApi}/>;
        let paginatorLeft2 = <Button icon="pi pi-refresh" onClick={this.gitUrlApi}/>;
        let paginatorRight = <Button icon="pi pi-backward" title="Go Back" onClick={this.goBackApi}/>;

        return (
            <div>
                <TabView>
                    <TabPanel header="Static">
                        <div className="content-section implementation">
                            <div>
                                <DataTable value={this.state.users}
                                paginator={true}
                                 paginatorLeft={paginatorLeft}
                                  paginatorRight={paginatorRight} 
                                  rows={10} 
                                  rowsPerPageOptions={[5,10,20]}
                                >
                                    <Column field="name" header="File" sortable={true} filter={true} />
                                    <Column field="size" header="Size" sortable={true} filter={true} />
                                    <Column body={this.downloadBody} header="Download" />
                                </DataTable>

                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel header="URL">
                    <h3 className="first">Basic</h3>
                    <InputText value={this.state.gitUserName} onChange={(e) => this.setState({gitUserName: e.target.value})} placeholder="User "/>
                    <InputText value={this.state.gitUserRepo} onChange={(e) => this.setState({gitUserRepo: e.target.value})} placeholder="Repo"/>
                    <InputText value={this.state.gitUserPath} onChange={(e) => this.setState({gitUserPath: e.target.value})} placeholder="Path" />
                    <Button label="Save" onClick={this.gitUrlApi} />
                    <div className="content-section implementation">
                    <div>
                                <DataTable value={this.state.urlApi}
                                paginator={true}
                                 paginatorLeft={paginatorLeft2}
                                  paginatorRight={paginatorRight} 
                                  rows={20} 
                                  rowsPerPageOptions={[5,10,20]}
                                >
                                    <Column field="name" header="File" sortable={true} filter={true} />
                                    <Column field="size" header="Size" sortable={true} filter={true} />
                                    <Column body={this.downloadBody} header="Download" />
                                    <Column body={this.dirBody} header="Open Dir" />
                                    
                                </DataTable>

                            </div>
                        </div>
    </TabPanel>

                </TabView>



            </div>
        )
    }
}



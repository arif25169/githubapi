import React, { Component } from 'react';
import { TabView, TabPanel } from 'primereact/tabview';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import axios from 'axios';
import { Button } from 'primereact/button';
import {InputText} from 'primereact/inputtext';
import {Dropdown} from 'primereact/dropdown';

let gitdirUserPath;
let gitdirUserPathback;
let gopackLength;

export class Github extends Component {
    constructor() {
        super();
        this.state = {
            gitUserName: '',
            gitUserRepo: '',
            gitUserPath: '',
            finalUrl: '',
            mainUrl: '',
            users: [],
            urlApi: [],
        };
        this.gitApi = this.gitApi.bind(this)
        this.gitUrlApi = this.gitUrlApi.bind(this)
        this.gitUrlApi2 = this.gitUrlApi2.bind(this)
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
        if(this.state.mainUrl!==""){
            let mainUrl=this.state.mainUrl;
           // [0].slice(1,-1)
            var gitUserName = mainUrl.split('/')[3];
            var gitUserRepo = mainUrl.split('/')[4];
            this.setState({ gitUserName: gitUserName });
            this.setState({ gitUserRepo: gitUserRepo });
            finalUrl= "https://api.github.com/repos/"+gitUserName+"/"+gitUserRepo+"/contents/";
            this.setState({ finalUrl: finalUrl });
            let res = await axios.get(finalUrl);
            let { data } = res;
            console.log(data)
            this.setState({ urlApi: data });
            
        } else  this.gitUrlApi2();
    };
    

    gitUrlApi2 = async () => {

        var finalUrl;
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

       let inputUrl=this.state.finalUrl;
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
    console.log(gitdirUserPathback)

       nestedurl= nestedurl.slice(0,-gitdirUserPathback.length)
       var afterSlashChars = nestedurl.match(/\/([^\/]+)\/?$/)[1]+'/';
       nestedurl= nestedurl.slice(0,-afterSlashChars.length)
           
        console.log(nestedurl)
       let res = await axios.get(nestedurl);
     
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
       console.log(this.state.mainUrl)
       
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

                    <div className="ui-grid">
                    <div className="ui-grid">

    <InputText value={this.state.mainUrl} style={{width:'70%'}} onChange={(e) => this.setState({mainUrl: e.target.value})} placeholder="Enter Url "/>
  <Button label="Fetch" style={{width:'15%'}} onClick={this.gitUrlApi} />
 
   
</div>
<div className="ui-grid">
                    <InputText value={this.state.gitUserName} onChange={(e) => this.setState({gitUserName: e.target.value})} placeholder="User "/>
                    <InputText value={this.state.gitUserRepo} onChange={(e) => this.setState({gitUserRepo: e.target.value})} placeholder="Repo"/>
                    <InputText value={this.state.gitUserPath} onChange={(e) => this.setState({gitUserPath: e.target.value})} placeholder="Path" />
                    <Button label="Fetch" onClick={this.gitUrlApi2} />
                    </div>
                    </div>
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
                                    <Column body={this.dirBody} header="Dir/File"  sortable={true}  />
                                    <Column body={this.downloadBody} header="Download"  sortable={true}  />
                                    
                                    
                                </DataTable>

                            </div>
                        </div>
    </TabPanel>

                </TabView>



            </div>
        )
    }
}



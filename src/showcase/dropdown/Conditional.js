import React, { Component } from 'react';
import {TabView,TabPanel} from 'primereact/tabview';
import { CodeHighlight } from '../../codehighlight/CodeHighlight';
import {Dropdown} from 'primereact/dropdown';

export class Conditional extends Component {
    constructor() {
        super();
        this.state = {
            name: 'React',
            selectedOption: {},
            selectedOption2: {}
        };
    }

    handleChange1 = (selectedOption) => {
        this.setState({ selectedOption });
    };

    handleChange2 = (selectedOption) => {
        this.setState({ selectedOption2: selectedOption })
    }

    render() {
        const options1 = [
            { value: 'one', label: 'One' },
            { value: 'two', label: 'Two' }
        ];

        const options2 = [
            { value: 'one-a', label: 'One A', link: 'one' },
            { value: 'one-b', label: 'One B', link: 'one' },
            { value: 'two-a', label: 'Two A', link: 'two' },
            { value: 'two-b', label: 'Two B', link: 'two' }
        ];

        const filteredOptions = options2.filter((o) => o.link === this.state.selectedOption.value)
        return (
            <div>
                <div className="content-section introduction">
                    <div className="feature-intro">
                        <h1>Conditional Dropdown</h1>
                        <p>This is a simple Conditional Dropdown</p>
                    </div>
                </div>

                <div className="content-section implementation">
                    <div>
                        <p>Select one first</p>
                        <Dropdown 
                            value={this.state.selectedOption.value}
                            onChange={this.handleChange1}
                            options={options1}
                            style={{width:'150px'}}
                        />
                        <p>Then the other</p>
                        <Dropdown 
                            value={this.state.selectedOption2.value}
                            onChange={this.handleChange2}
                            options={filteredOptions}
                            style={{width:'150px'}}
                        />
                    </div>
                </div>

                <ConditionalDoc></ConditionalDoc>
            </div>
        )
    }
}

export class ConditionalDoc extends Component {

    shouldComponentUpdate() {
        return false;
    }

    render() {
        return (
            <div className="content-section source">
                <TabView>
                    <TabPanel header="Source">
                        <CodeHighlight className="language-javascript">
                            {`
import React, { Component } from 'react';
import {Dropdown} from 'primereact/dropdown';

export class Conditional extends Component {
    constructor() {
        super();
        this.state = {
            name: 'React',
            selectedOption: {},
            selectedOption2: {}
        };
    }

    handleChange1 = (selectedOption) => {
        this.setState({ selectedOption });
    };

    handleChange2 = (selectedOption) => {
        this.setState({ selectedOption2: selectedOption })
    }

    render() {
        const options1 = [
            { value: 'one', label: 'One' },
            { value: 'two', label: 'Two' }
        ];

        const options2 = [
            { value: 'one-a', label: 'One A', link: 'one' },
            { value: 'one-b', label: 'One B', link: 'one' },
            { value: 'two-a', label: 'Two A', link: 'two' },
            { value: 'two-b', label: 'Two B', link: 'two' }
        ];

        const filteredOptions = options2.filter((o) => o.link === this.state.selectedOption.value)
        return (
            <div>
                <div className="content-section introduction">
                    <div className="feature-intro">
                        <h1>Conditional Dropdown</h1>
                        <p>This is a simple Conditional Dropdown</p>
                    </div>
                </div>

                <div className="content-section implementation">
                    <div>
                        <p>Select one first</p>
                        <Dropdown 
                            value={this.state.selectedOption.value}
                            onChange={this.handleChange1}
                            options={options1}
                            style={{width:'150px'}}
                        />
                        <p>Then the other</p>
                        <Dropdown 
                            value={this.state.selectedOption2.value}
                            onChange={this.handleChange2}
                            options={filteredOptions}
                            style={{width:'150px'}}
                        />
                    </div>
                </div>
            </div>
        )
    }
}


`}
                        </CodeHighlight>
                    </TabPanel>
                </TabView>
            </div>
        )
    }
}

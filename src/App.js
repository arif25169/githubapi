import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import classNames from 'classnames';
import 'nanoscroller';
import jQuery from "jquery";
import './resources/style/primereact.css';
import 'nanoscroller/bin/css/nanoscroller.css';
import 'fullcalendar/dist/fullcalendar.css';
import 'font-awesome/css/font-awesome.css';
import 'primeicons/primeicons.css';
import 'prismjs/themes/prism-coy.css';
import './sass/App.css';

import { HomeComponent } from './showcase/home/HomeComponent';
import { Conditional } from './showcase/dropdown/Conditional';
import { Github } from './showcase/dropdown/Github';

class AppMenu extends Component {

    constructor() {
        super();
        this.state = { activeMenu: -1 };
    }

    openMenu(event, val) {
        this.setState({ activeMenu:this.state.activeMenu===val?-1: val });
        setTimeout(() => jQuery(this.scrollContainer).nanoScroller(), 350);
        event.preventDefault();
    }

    componentDidMount() {
        jQuery(this.scrollContainer).nanoScroller({ flash: true });
    }

    componentWillUnmount() {
        jQuery(this.scrollContainer).nanoScroller({ destroy: true });
    }

    render() {
        return (
            <div ref={(el) => this.scrollContainer = el} className="nano">
                <div className="nano-content">
                    <div className="layout-menu">

                        <a id="menu_messages" onClick={(event) => this.openMenu(event, 8)} className={classNames({ 'active-menuitem': this.state.activeMenu === 1 })}>
                            <img alt="overlay" className="layout-menu-icon-inactive" src="showcase/resources/images/mono/overlay.svg"></img>
                            <img alt="overlay" className="layout-menu-icon-active" src="showcase/resources/images/mono/overlay-active.svg"></img>
                            <span>Dropdown</span>
                        </a>
                        <div className={classNames({ 'submenuhide': this.state.activeMenu !== 8, 'submenushow': this.state.activeMenu === 8 })}>
                            <div>
                                <Link to="/conditional">&#9679; Conditional</Link>
                                <Link to="/github">&#9679; Github</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

class App extends Component {

    constructor() {
        super();
        this.state = {};
        this.theme = 'omega';
        this.changeTheme = this.changeTheme.bind(this);
        this.openMenu = this.openMenu.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
        this.onSidebarClick = this.onSidebarClick.bind(this);
    }

    changeTheme(event) {
        var theme = event.currentTarget.dataset.theme;
        var themeElement = document.getElementById('theme-link');
        var oldThemeURL = themeElement.getAttribute('href');
        var newThemeURL = oldThemeURL.replace(this.theme, theme);
        this.theme = theme;
        themeElement.setAttribute('href', newThemeURL);
        event.preventDefault();
    }

    openMenu(event) {
        this.setState({ menuActive:!this.state.menuActive });
        event.preventDefault();
    }

    closeMenu(event) {
        this.setState({ menuActive:false});
        event.preventDefault();
    }

    onSidebarClick(event) {
        if (event.target.nodeName === 'A' && event.target.parentNode.className.indexOf('layout-menu') === -1) {
            this.closeMenu(event);
        }
    }

    render() {

        return (
            <div className='layout-wrapper'>
                <div id="layout-topbar">
                    <a className="menu-button" onClick={this.openMenu}>
                        <i className="fa fa-bars"></i>
                    </a>
                    <Link to="/" className="logo">
                        <img alt="logo" src="showcase/resources/images/okkhor-logo.png" />
                    </Link>

                    <ul className="topbar-menu">
                        {/* <li>
                            <Link to="/setup" > GET STARTED </Link>
                        </li> */}

                        <li className="topbar-menu-themes">
                            <a>Style</a>
                            <ul>
                                <li className="topbar-submenu-header">Style</li>
                                <li><a data-theme="cruze" onClick={this.changeTheme}><span className="ui-text">Cruze</span></a></li>
                                <li><a data-theme="cupertino" onClick={this.changeTheme}><span className="ui-text">Cupertino</span></a></li>
                                <li><a data-theme="darkness" onClick={this.changeTheme}><span className="ui-text">Darkness</span></a></li>
                                <li><a data-theme="flick" onClick={this.changeTheme}><span className="ui-text">Flick</span></a></li>
                                <li><a data-theme="home" onClick={this.changeTheme}><span className="ui-text">Home</span></a></li>
                                <li><a data-theme="kasper" onClick={this.changeTheme}><span className="ui-text">Kasper</span></a></li>
                                <li><a data-theme="lightness" onClick={this.changeTheme}><span className="ui-text">Lightness</span></a></li>
                                <li><a data-theme="ludvig" onClick={this.changeTheme}><span className="ui-text">Ludvig</span></a></li>
                                <li><a data-theme="pepper-grinder" onClick={this.changeTheme}><span className="ui-text">Pepper-Grinder</span></a></li>
                                <li><a data-theme="redmond" onClick={this.changeTheme}><span className="ui-text">Redmond</span></a></li>
                                <li><a data-theme="rocket" onClick={this.changeTheme}><span className="ui-text">Rocket</span></a></li>
                                <li><a data-theme="south-street" onClick={this.changeTheme}><span className="ui-text">South-Street</span></a></li>
                                <li><a data-theme="start" onClick={this.changeTheme}><span className="ui-text">Start</span></a></li>
                                <li><a data-theme="trontastic" onClick={this.changeTheme}><span className="ui-text">Trontastic</span></a></li>
                                <li><a data-theme="voclain" onClick={this.changeTheme}><span className="ui-text">Voclain</span></a></li>
                            </ul>
                        </li>

                        {/* <li>
                            <Link to="/support">SUPPORT</Link>
                        </li> */}
                    </ul>
                </div>

                <div id="layout-sidebar" className={classNames({ 'active': this.state.menuActive === true })} onClick={this.onSidebarClick}>
                    <AppMenu />
                </div>

                <div className={classNames({ 'layout-mask': this.state.menuActive === true })}>
                </div>

                <div id="layout-content">
                    <Route exact path="/" component={Github} />
                    <Route path="/conditional" component={Conditional}/>
                    <Route path="/github" component={Github}/>
                    <div className="content-section layout-footer clearfix">
                        <span>Okkhor-Copyright © 2018 <a href="http://okkhor.org" target="_blank" rel="noopener noreferrer">okkhor.org</a></span>
                        <div className="footer-links">
                            <a href="https://github.com/arif25169"><i className=" icon-github fa fa-github-square"></i></a>
                            <a href="https://twitter.com/okkhorx"><i className="icon-twitter fa fa-twitter-square"></i></a>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default App;

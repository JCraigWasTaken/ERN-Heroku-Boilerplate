var React = require('react')
var ReactDom = require('react-dom')

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

import './app.css'

class App extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            mouseBeingUsedClass: ''
        };
    }

    componentDidMount() {
        window.addEventListener('mousedown', this.handleEvent, true)
        window.addEventListener("keydown", this.handleEvent, true);
    }

    handleEvent = (e) => {
        //If you click using a mouse
        if(e.type == 'mousedown' && this.state.mouseBeingUsedClass == ''){
            this.setState({
                mouseBeingUsedClass:'mouse'
            })
        }
        //If you use keys outside of a text input
        if(e.type == 'keydown' && this.state.mouseBeingUsedClass == 'mouse' && e.target.tagName!='INPUT' && e.target.tagName!='TEXTAREA'){
            this.setState({
                mouseBeingUsedClass:''
            })
        }
    }

    openLink = (link) =>{
        const a = document.createElement('a');
        a.setAttribute('hidden','');
        a.setAttribute('href', link);
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    openLinkNewTab = (link) =>{
        window.open(link, "_blank")
    }

    render(){
        return(
            <div
            className={''+this.state.mouseBeingUsedClass}>
                <Router>
                    <Switch>
                        <Route exact path='/'>
                            <h1>HomePage Here</h1>
                        </Route>
                        <Route path='/'>
                            <h1>404 Here</h1>
                        </Route>
                    </Switch>
                </Router>
            </div>
        )
    }
}

ReactDom.render(<App/>,document.getElementById("app"))
var React = require('react')
var ReactDom = require('react-dom')

import './app.css'

class App extends React.Component{

    constructor(props) {
        super(props);
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
                id='appContents' 
                className='color-background_primary color-text_primary'
                style={{overflowY:'hidden'}}>
                <p>Hello Ali</p>
            </div>
        )
    }
}

ReactDom.render(<App/>,document.getElementById("app"))
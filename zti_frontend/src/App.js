import React from 'react'
import {BrowserRouter} from 'react-router-dom'
import {Routing} from './Routing'
import {Provider} from "react-redux";
import createStore from "./redux/store"
import {Menu} from './components/Menu'


function App() {
    const store = createStore();
    return (
        <div style={{ backgroundImage: "url(/images/chef-hat.png)" }}>
            <Provider store={store}>
                <BrowserRouter>
                    <Menu/>
                    {/*<style>{`body { backgroundImage: "url(/images/chef-hat.png)" }; }`}</style>*/}
                    <Routing/>
                </BrowserRouter>
            </Provider>
        </div>
    );
}

export default App;

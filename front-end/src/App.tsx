import React from 'react';
import {DAppProvider, Kovan, Rinkeby} from '@usedapp/core'
import {Header} from "./features/Header"
import {Container} from "@material-ui/core"
import {Main} from "./features/Main"


const config = {
    networks: [Rinkeby, Kovan], // {{ so the first bracket says its a typescript and second says its a object}}
    notifications: {
        expirationPeriod: 1000,
        checkInterval: 1000
    }
}
function App() {
    return (
        <DAppProvider config={config}>
            <Header/>
            <Container maxWidth={"md"}>
                <Main/>
            </Container>
        </DAppProvider>
    );
}

export default App;

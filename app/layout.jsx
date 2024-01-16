import '@styles/globals.css';

import Nav from '@components/Nav';
import Provider from '@components/Provider';
import RouteTest from '@components/RouteTest';

export const metadata = {
    title: "promptopia",
    description: 'Discover % Share Valuable AI Prompts'
}

const RootLayout = ({children}) => {
  return (
    <html lang='en'>
        <body>
            <Provider>

            
            <div className='main'>
                <div className='gradient'/>
            </div>
            
            <main className='app'>
                <Nav/>
                
                {children}
            </main>
            
            </Provider>
        </body>
        
    </html>
  )
}

export default RootLayout
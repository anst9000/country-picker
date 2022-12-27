import { QueryClient, QueryClientProvider } from 'react-query';

import { CountryPicker } from './components/CountryPicker';
import { CountryDetails } from './components/CountryDetails';

import { createContext, useState } from 'react';
export const CountryContext = createContext();

const queryClient = new QueryClient();

function App() {
  const [country, setCountry] = useState('SE');

  return (
    <QueryClientProvider client={queryClient}>
      <CountryContext.Provider value={{ country, setCountry }}>
        <div className="App">
          <CountryPicker />
          <CountryDetails />
        </div>
      </CountryContext.Provider>
    </QueryClientProvider>
  );
}

export default App;

import { useState } from 'react';
import PropTypes from 'prop-types';
import { DataContext } from './DataContext';

const ContextProvider = ({ children }) => {
    const [insights, setInsights] = useState(null);
    return (
        <DataContext.Provider value={{ insights, setInsights }}>
            {children}
        </DataContext.Provider>
    );
};

ContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ContextProvider;


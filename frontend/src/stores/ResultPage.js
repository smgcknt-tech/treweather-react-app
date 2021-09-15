import React, { createContext, useReducer } from 'react'
const initialState = {
    loading: false,
    error: false,
    resultData:[],
    currentPage: 0,
    selectedStock:null,
    indicators:{
        stockData:null,
        monthly_profit:0,
        last_profit: 0,
        todays_profit: 0,
    },

}
export const context = createContext(initialState)
export const actions = {
    SET_LOADING: 'SET_LOADING',
    SET_ERROR: 'SET_ERROR',
    SET_RESULT: 'SET_RESULT',
    SET_CURRENT_PAGE: 'SET_CURRENT_PAGE',
    SET_SELECTED_STOCK: 'SET_SELECTED_STOCK',
    SET_INDICATORS: 'SET_INDICATORS',
}
export const ResultProvider = ({ children }) => {
    const [state, dispatch] = useReducer((state, action) => {
        const currentState = { ...state };
        switch (action.type) {
            case actions.SET_LOADING:
                currentState.loading = action.payload
                return currentState
            case actions.SET_ERROR:
                currentState.error = action.payload
                return currentState
            case actions.SET_RESULT:
                currentState.resultData = action.payload
                return currentState
            case actions.SET_CURRENT_PAGE:
                currentState.currentPage = action.payload
                return currentState
            case actions.SET_SELECTED_STOCK:
                currentState.selectedStock = action.payload
                return currentState
            case actions.SET_INDICATORS:
                currentState.indicators = action.payload
                return currentState
            default:
                throw new Error('no action matched')
        }
    }, initialState)
    return <context.Provider value={{ state, dispatch }}>{children}</context.Provider>
}
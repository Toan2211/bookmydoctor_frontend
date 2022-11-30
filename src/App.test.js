/* eslint-disable no-undef */
import React from 'react'
import { render, screen } from '@testing-library/react'
import App from './App'

import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

describe('With React Testing Library', () => {
    const initialState = { output: 10 }
    const mockStore = configureStore()
    let store

    it('Shows "Render App!"', () => {
        store = mockStore(initialState)
        render(
            <Provider store={store}>
                <App />
            </Provider>
        )
        const linkElement = screen.getByText('Render App')
        expect(linkElement).toBeInTheDocument()
    })
})

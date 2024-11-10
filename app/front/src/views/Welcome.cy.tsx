import React from 'react'
import Welcome from './Welcome'
import store from '@s/store';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

describe('<Welcome />', () => {
  it('renders', () => {
    cy.mount(
      <MemoryRouter>
        <Provider store={store}>
          <Welcome />
        </Provider>
      </MemoryRouter>
    );
  });
});
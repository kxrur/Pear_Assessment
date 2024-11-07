import React from 'react';
import LoginStudent from './StudentLoginView';
import store from '@s/store';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

describe('<LoginStudent />', () => {
  it('renders', () => {
    cy.mount(
      <MemoryRouter>
        <Provider store={store}>
          <LoginStudent />
        </Provider>
      </MemoryRouter>
    );
  });
});

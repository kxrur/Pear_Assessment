import React from 'react'
import RegistrationForm from './StudentRegView'
import store from '@s/store';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

describe('<Registration/>', () => {
  it('renders', () => {
    cy.mount(
      <MemoryRouter>
        <Provider store={store}>
          <RegistrationForm />
        </Provider>
      </MemoryRouter>
    );
  });
});
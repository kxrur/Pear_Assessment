import React from 'react'
import LoginTeacher from './TeacherLoginView'
import store from '@s/store';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

describe('<LoginTeacher />', () => {
  it('renders', () => {
    cy.mount(
      <MemoryRouter>
        <Provider store={store}>
          <LoginTeacher />
        </Provider>
      </MemoryRouter>
    );
  });
});
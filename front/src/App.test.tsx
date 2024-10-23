// npx vitest
// npx vitest --watch

import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

describe('App component', () => {
  const setup = (initialEntries: string[]) => {
    render(
      <MemoryRouter initialEntries={initialEntries}>
        <App RouterComponent={({ children }) => <div>{children}</div>} />
      </MemoryRouter>
    );
  };

  // it('renders the home route', () => {
  //   setup(['/']);
  //   expect(screen.getByText(/Upload CSV/i)).toBeInTheDocument();
  // });

  it('renders the welcome route', () => {
    setup(['/welcome']);
    expect(screen.getByText(/Welcome/i)).toBeInTheDocument();
  });

  // it('renders the create team form', () => {
  //   setup(['/create-team']);
  //   expect(screen.getByText(/Create Team/i)).toBeInTheDocument();
  // })
  //
  // it('renders the team preview', () => {
  //   setup(['/team-preview']);
  //   expect(screen.getByText(/Create New Team/i)).toBeInTheDocument();
  // })

  it('renders the teacher login and registration route', () => {
    setup(['/teacher']);
    expect(screen.getByText(/Teacher Registration/i)).toBeInTheDocument();
    expect(screen.getByText(/Teacher Login/i)).toBeInTheDocument();
  });

  // it('renders the student management route', () => {
  //   setup(['/student-management']);
  //   expect(screen.getByText(/Upload CSV/i)).toBeInTheDocument();
  // });

  it('renders the student login and registration route', () => {
    setup(['/student']);
    expect(screen.getByText(/Student Registration/i)).toBeInTheDocument();
    expect(screen.getByText(/Student Login/i)).toBeInTheDocument();
  });
  it('renders the success login view', () => {
    setup(['/success-login']);
    expect(screen.getByText(/Login Successful/i)).toBeInTheDocument();
  });

})

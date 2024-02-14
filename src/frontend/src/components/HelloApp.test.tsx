import * as React from 'react';
import { render } from '@testing-library/react';

import App from './HelloApp';

describe('App', () => {
  it('renders App component', () => {
    render(<App />);
  });
});
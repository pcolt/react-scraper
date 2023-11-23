import React from 'react'
import '@testing-library/jest-dom'
import { getByTestId, render, screen } from '@testing-library/react'
import { RepoCard } from './repoCard'

test('Repo renders content', () => {
  const repo = {
    user: 'OpenEMS',
    repoName: 'openems',
    url: 'https://github.com/OpenEMS/openems',
    stars: 536,
    description: 'OpenEMS - Open Source Energy Management System',
    topics: [
      'energy-storage',
      'heatpump',
      'energy-management',
      'climatechange',
      'photovoltaics',
      'electric-vehicle-charging-station'
    ],
    repoLink: '/OpenEMS/openems',
    commits: 5641
  }

  const { container } = render(<RepoCard repo={repo} />)
  // const div = container.querySelector('.repoCardDescription')
  const div = getByTestId(container, 'repoCardDescription')
  expect(div).toHaveTextContent('OpenEMS - Open Source Energy Management System')

  // const element = screen.getByText('OpenEMS - Open Source Energy Management System')
  // expect(element).toBeDefined()

  // screen.debug()
})
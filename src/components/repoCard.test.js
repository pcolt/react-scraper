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
  // screen.debug()

  const description = getByTestId(container, 'repoCardDescription')
  // screen.debug(description)
  expect(description).toHaveTextContent('OpenEMS - Open Source Energy Management System')

  const repoLink = screen.getByRole('link', { name: 'GitHub' })
  expect(repoLink).toHaveAttribute('href', 'https://github.com/OpenEMS/openems')

  // const element = screen.getByText('OpenEMS - Open Source Energy Management System')
  // expect(element).toBeDefined()

})
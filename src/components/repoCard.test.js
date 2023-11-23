import React from 'react'
import '@testing-library/jest-dom'
import { getByTestId, render, screen } from '@testing-library/react'
import { RepoCard } from './repoCard'

describe('<RepoCard />', () => {
  let repo
  let container

  beforeEach(() => {
    repo = {
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
    container = render(<RepoCard repo={repo} />).container
  })

  // const { container } = render(<RepoCard repo={repo} />)
  // const div = container.querySelector('.repoCardDescription')
  // screen.debug(div)

  test('description is rendered', () => {
    // const description = screen.getByTestId('repoCardDescription')
    const description = getByTestId(container, 'repoCardDescription')
    // screen.debug(description)
    expect(description).toHaveTextContent('OpenEMS - Open Source Energy Management System')
  })

  test('link is rendered', () => {
    const repoLink = screen.getByRole('link', { name: 'GitHub' })
    expect(repoLink).toHaveAttribute('href', 'https://github.com/OpenEMS/openems')
  })

})
import React from "react";
import { render, screen } from '@testing-library/react'
import Logo from '../../../components/common/logo'

describe('Logo', () => {
  it('renders appropriately', () => {
    render(<Logo />)
    expect(screen.getByText('CHAT')).toBeInTheDocument
  })
})

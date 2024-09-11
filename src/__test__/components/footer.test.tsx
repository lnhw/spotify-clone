import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import useResponsive from '@/hooks/useResponsive';
import Footer from '@/components/footer';

// Mocking the useResponsive hook
jest.mock('@/hooks/useResponsive');

describe('Footer Component', () => {
    test('renders mobile footer when isMobile is true', () => {
        (useResponsive as jest.Mock).mockReturnValue({ isMobile: true, isDesktop: false });
        render(<Footer />);

        expect(screen.getByTestId('footer-mobile')).toBeInTheDocument();
        expect(screen.getByTestId('company-section-mobile')).toBeInTheDocument();
        expect(screen.getByTestId('community-section-mobile')).toBeInTheDocument();
        expect(screen.getByTestId('useful-links-section-mobile')).toBeInTheDocument();
        expect(screen.getByTestId('spotify-plans-section-mobile')).toBeInTheDocument();
        expect(screen.getByTestId('copyright-mobile')).toHaveTextContent('© 2024 Spotify AB');
    });

    test('renders desktop footer when isDesktop is true', () => {
        (useResponsive as jest.Mock).mockReturnValue({ isMobile: false, isDesktop: true });
        render(<Footer />);
        expect(screen.getByTestId('footer-desktop')).toBeInTheDocument();
        expect(screen.getByTestId('company-section')).toBeInTheDocument();
        expect(screen.getByTestId('community-section')).toBeInTheDocument();
        expect(screen.getByTestId('useful-links-section')).toBeInTheDocument();
        expect(screen.getByTestId('spotify-plans-section')).toBeInTheDocument();
        expect(screen.getByTestId('copyright')).toHaveTextContent('© 2024 Spotify AB');
    });

    test('renders social media icons', () => {
        (useResponsive as jest.Mock).mockReturnValue({ isMobile: true, isDesktop: false });
        render(<Footer />);

        expect(screen.getByTestId('instagram-icon')).toBeInTheDocument();
        expect(screen.getByTestId('twitter-icon')).toBeInTheDocument();
        expect(screen.getByTestId('facebook-icon')).toBeInTheDocument();
    });

    // test('renders correct number of links in mobile view', () => {
    //     (useResponsive as jest.Mock).mockReturnValue({ isMobile: true, isDesktop: false });
    //     render(<Footer />);

    //     const links = screen.getAllByRole('link');
    //     expect(links).toHaveLength(16); // Adjust this number based on the actual number of links in the mobile footer
    // });

    // test('renders correct number of links in desktop view', () => {
    //     (useResponsive as jest.Mock).mockReturnValue({ isMobile: false, isDesktop: true });
    //     render(<Footer />);

    //     const links = screen.getAllByRole('link');
    //     expect(links).toHaveLength(16); // Adjust this number based on the actual number of links in the desktop footer
    // });
});
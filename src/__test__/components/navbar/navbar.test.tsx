import React from 'react';
import { render, screen, fireEvent, cleanup, act, waitFor } from '@testing-library/react';
import { signOut, useSession } from 'next-auth/react';
import NavBar from '@/components/navbar/navbar';
import useResponsive from '@/hooks/useResponsive';
import { usePathname, useSearchParams, useRouter, redirect } from "next/navigation";

afterEach(() => {
    cleanup(); // Resets the DOM after each test suite
})
jest.mock('next-auth/react', () => ({
    useSession: jest.fn().mockReturnValue({
        data: null,
        status: 'unauthenticated',
    }),
    signOut: jest.fn(),

}));
jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
    usePathname: jest.fn()
}));
jest.mock('@/hooks/useResponsive');

describe('NavBar Component', () => {
    let pushMock: jest.Mock;
    let mockBack: jest.Mock;
    let mockForward: jest.Mock;

    beforeEach(() => {
        pushMock = jest.fn();
        mockBack = jest.fn();
        mockForward = jest.fn();

        (useRouter as jest.Mock).mockReturnValue({
            push: pushMock,
            back: mockBack,
            forward: mockForward,
        });

        // Mock the session to simulate an authenticated user
        (useSession as jest.Mock).mockReturnValue({
            data: { user: { name: 'Test User', id: '123' } },
            status: 'authenticated',
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
        cleanup();
    });

    describe("mobile", () => {
        beforeEach(() => {
            (useResponsive as jest.Mock).mockReturnValue({
                isMobile: true,
                isTablet: false,
                isDesktop: false,
            });
            render(<NavBar />);
        });

        it("should render mobile navbar", async () => {
            const navbar = await screen.findByTestId("nav-mobile");
            expect(navbar).toBeInTheDocument();
        });

        it("height is equal to 70px", async () => {
            const navbar = await screen.findByTestId("nav-mobile");
            expect(navbar.className).toContain('h-[70px]');
        });

        it("redirects to home page on click", async () => {
            const homeBtn = await screen.findByTestId("home-Btn");
            fireEvent.click(homeBtn);
            expect(pushMock).toHaveBeenCalledWith('/');
        });

        it("redirects to search page on click", async () => {
            const searchBtn = await screen.findByTestId("search-Btn");
            fireEvent.click(searchBtn);
            expect(pushMock).toHaveBeenCalledWith("/search");
        });

        it("redirects to download page on click", async () => {
            const downBtn = await screen.findByTestId("down-Btn");
            fireEvent.click(downBtn);
            expect(pushMock).toHaveBeenCalledWith("/download");
        });
    });
    describe("Desktop", () => {
        beforeEach(() => {
            (useResponsive as jest.Mock).mockReturnValue({
                isMobile: false,
                isTablet: false,
                isDesktop: true,
            });
            (signOut as jest.Mock).mockImplementation(() => Promise.resolve());
            render(<NavBar />);
        });
        it("should render desktop navbar", () => {
            const nav = screen.getByTestId("nav-desktop");
            expect(nav).toBeInTheDocument();
        });
        it("should call router.back()", () => {
            const backBtn = screen.getByTestId("btn-back");
            fireEvent.click(backBtn);
            expect(mockBack).toHaveBeenCalled();
        });
        it("should call router.forward() ", () => {
            const fowrardBtn = screen.getByTestId("btn-forward");
            fireEvent.click(fowrardBtn);
            expect(mockForward).toHaveBeenCalled();
        });
        it("opens the dropdown menu when the avatar button is clicked", () => {
            // Get the avatar button
            const avatarBtn = screen.getByTestId("avatar");
            // Click the avatar button
            fireEvent.click(avatarBtn);
            // Assert that the menu is rendered and visible
            const menu = screen.getByTestId('avatar-menu');
            expect(menu).toBeInTheDocument();
        });
        it("closes the dropdown menu when clicking outside the menu", () => {
            // Get the avatar button and click it to open the menu
            const avatarBtn = screen.getByTestId("avatar");
            fireEvent.click(avatarBtn);
            // Assert that the menu is visible
            const menu = screen.getByTestId("avatar-menu");
            expect(menu).toBeInTheDocument();
            // Click outside the menu
            fireEvent.mouseDown(document);
            // Assert that the menu is no longer visible
            expect(menu).not.toBeInTheDocument();
        });
        it("should logout and redirect to login page when logout button is clicked", async () => {

            const mockSignOut = signOut as jest.Mock;
            mockSignOut.mockImplementation(() => Promise.resolve());

            // Open the menu
            const avatarBtn = screen.getByTestId("avatar");
            fireEvent.click(avatarBtn);

            // Ensure the menu is open
            const menu = screen.getByTestId("avatar-menu");
            expect(menu).toBeInTheDocument();

            // Find and click the logout button
            const logoutBtn = screen.getByTestId("logout-btn");
            fireEvent.click(logoutBtn);

            // Wait for the logout process to complete
            await waitFor(() => {
                expect(mockSignOut).toHaveBeenCalled();
            });
            // Check if the router was called to redirect to the login page
            expect(pushMock).toHaveBeenCalledWith('/login');
        });
    });
});

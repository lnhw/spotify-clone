"use client";
import React from "react";
import { render, screen, } from "@testing-library/react";
import "@testing-library/jest-dom";
import SideBar from "@/components/siderbar";
import Link from "next/link";

//mock nextjs link component
// jest.mock('next/link', () => {
//   const MockedLink = ({ children, href }: { children: React.ReactNode, href: string }) => {
//     return (
//       <Link href={href}>{children}</Link>
//     );
//   };
//   MockedLink.displayName = "Link";
//   return MockedLink;
// });
// //mock routers useRouter hook
// const mockPush = jest.fn();
// jest.mock("next/router", () => ({
//   useRouter() {
//     return { push: mockPush };
//   },
// }));

describe("SideBar component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
});
  test("renders SideBar Component", () => {
    render(<SideBar />);
    expect(screen.getByTestId("sidebar")).toBeInTheDocument();
  });

  // test("toggle playlist visibility when clicked", () => {
  //   render(<SideBar />);
  //   const playlistToggleButton = screen.getByTestId('playlist-toggle');

  //   // Initially, the arrow should point right
  //   expect(screen.getByTestId('arrow-right')).toBeInTheDocument();

  //   // Click to expand
  //   fireEvent.click(playlistToggleButton);
  //   expect(screen.getByTestId('arrow-down')).toBeInTheDocument();

  //   // Click to collapse
  //   fireEvent.click(playlistToggleButton);
  //   expect(screen.getByTestId('arrow-right')).toBeInTheDocument();
  // });
  // test("render home and search links", () => {
  //   render(<SideBar />);
  //   const homeLink: HTMLElement = screen.getByTestId("home-link");
  //   const searchLink: HTMLElement = screen.getByTestId("search-link");

  //   expect(homeLink).toBeInTheDocument();
  //   expect(searchLink).toBeInTheDocument();

  //   expect(homeLink).toHaveAttribute("href", "/");
  //   expect(searchLink).toHaveAttribute("href", "/search");
  // });
  // it('displays the Home link', () => {
  //   render(<SideBar />);
  //   const homeLink = screen.getByTestId('home-link');
  //   expect(homeLink).toBeInTheDocument();
  //   expect(homeLink).toHaveTextContent('Trang Chủ');
  // });

  // it('displays the Search link', () => {
  //   render(<SideBar />);
  //   const searchLink = screen.getByTestId('search-link');
  //   expect(searchLink).toBeInTheDocument();
  //   expect(searchLink).toHaveTextContent('Tìm Kiếm');
  // });

  // it('displays the Library section', () => {
  //   render(<SideBar />);
  //   const librarySection = screen.getByTestId('library-section');
  //   expect(librarySection).toBeInTheDocument();
  //   expect(librarySection).toHaveTextContent('Thư viện');
  // });
  // it('toggles playlist visibility when clicked', () => {
  //   render(<SideBar />);
  //   const playlistToggle = screen.getByTestId('playlist-toggle');

  //   // Initially, the arrow should point right
  //   expect(screen.getByTestId('arrow-right')).toBeInTheDocument();

  //   // Click the toggle button
  //   fireEvent.click(playlistToggle);

  //   // After clicking, the arrow should point down
  //   expect(screen.getByTestId('arrow-down')).toBeInTheDocument();

  //   // Click again to toggle back
  //   fireEvent.click(playlistToggle);

  //   // Arrow should point right again
  //   expect(screen.getByTestId('arrow-right')).toBeInTheDocument();
  // });
});

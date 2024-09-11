import React from "react";
import Album from "@/components/albums/album";
import useResponsive from "@/hooks/useResponsive";
import { render, screen, waitFor } from "@testing-library/react";
import { useSession } from "next-auth/react";

jest.mock("next-auth/react");
jest.mock("@/hooks/useResponsive");

describe("Render Album component", () => {
    // Chạy cleanup trước mỗi test để đảm bảo không còn render nào từ các test trước
    beforeEach(() => {
        jest.clearAllMocks();
    });
    describe("Render mobile", () => {
        (useResponsive as jest.Mock).mockReturnValue({
            isMobile: true,
            isDesktop: false,
        });
        (useSession as jest.Mock).mockReturnValue({
            data: {
                accessToken: "mockedAccessToken",
            },
        });
        render(<Album />);
        test("it should render mobile album component", () => {
            expect(screen.getByTestId("album-mobile")).toBeInTheDocument();
        });
        // test("it should render images with corrent size and styles in mobile", async () => {
        //     render(<Album />);
        //     await waitFor(() => {
        //         const images = screen.getAllByRole("img");
        //         images.forEach((image) => {
        //             expect(image).toBeInTheDocument();
        //             const styles = getComputedStyle(image);
        //             expect(styles.width).toBe("128px");
        //             expect(styles.height).toBe("128px");
        //         })
        //     })
        // })
    });
    describe("Render desktop", () => {
        (useResponsive as jest.Mock).mockReturnValue({
            isMobile: false,
            isDesktop: true,
        });
        (useSession as jest.Mock).mockReturnValue({
            data: {
                accessToken: "mockedAccessToken",
            },
        });
        render(<Album />);

        test("it should render desktop album component", async () => {
            await waitFor(() => {
                expect(screen.getByTestId("album-desktop")).toBeInTheDocument();
            })
        });
    });
});




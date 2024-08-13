"use client"
import React, { useEffect, useRef, useState } from "react";
import styles from "@/styles/Tooltip.module.css";

interface TooltipProps {
    content: React.ReactNode;
    children: React.ReactNode;
    backgroundColor?: string;
    textColor?: string;
    position?: "top" | "bottom" | "left" | "right";
}

const Tooltip: React.FC<TooltipProps> = ({
    content,
    children,
    backgroundColor,
    textColor,
    position,
}) => {
    const [visible, setVisible] = useState(false);
    const tooltipRef = useRef<HTMLDivElement>(null);
    const warpperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const adjustPosition = () => {
            if (tooltipRef.current && warpperRef.current) {
                const tooltip = tooltipRef.current;
                const wrapper = warpperRef.current;
                const wrapperRect = wrapper.getBoundingClientRect();
                const tooltipRect = tooltip.getBoundingClientRect();
                const padding = 2;
                let top, left, right, bottom;

                switch (position) {
                    case "bottom":
                        top = wrapperRect.height;
                        left = (wrapperRect.width - tooltipRect.width) / 2;
                        if (wrapperRect.bottom + tooltipRect.height > window.innerHeight) {
                            top = -tooltipRect.height - padding;
                        }
                        if (wrapperRect.left + left < 0) {
                            left = padding;
                        }
                        if (wrapperRect.right + left > window.innerWidth) {
                            left = window.innerWidth - wrapperRect.right - tooltipRect.width - padding;
                        }
                        break;
                    case "left":
                        top = (wrapperRect.height - tooltipRect.height) / 2;
                        left = -tooltipRect.width;
                        if (wrapperRect.left - tooltipRect.width < 0) {
                            left = wrapperRect.width + padding
                        }
                        if (wrapperRect.top + top < 0) {
                            top = padding;
                        }
                        if (wrapperRect.bottom + top > window.innerHeight) {
                            top = window.innerHeight + wrapperRect.bottom - tooltipRect.height - padding;
                        }
                        break;
                    case "right":
                        top = (wrapperRect.height - tooltipRect.height) / 2;
                        left = wrapperRect.width;
                        if (wrapperRect.right + tooltipRect.width > window.innerWidth) {
                            left = -tooltipRect.width - padding;
                        }
                        if (wrapperRect.top + top < 0) {
                            top = padding;
                        }
                        if (wrapperRect.bottom + top > window.innerHeight) {
                            top = window.innerHeight - wrapperRect.bottom - tooltipRect.height - padding;
                        }
                        break;
                    default://top
                        top = -tooltipRect.height;
                        left = (wrapperRect.width - tooltipRect.width) / 2;
                        if (wrapperRect.top - tooltipRect.height < 0) {
                            top = wrapperRect.height + padding;
                        }
                        if (wrapperRect.left + left < 0) {
                            left = padding;
                        } else if (wrapperRect.right + left > window.innerWidth) {
                            left = window.innerWidth - wrapperRect.right - tooltipRect.width - padding;
                        }
                }
                tooltip.style.top = `${top}px`;
                tooltip.style.left = `${left}px`;
            }
        };
        if (visible) {
            adjustPosition();
            window.addEventListener("resize", adjustPosition);
        }
        return () => {
            window.removeEventListener("resize", adjustPosition);
        }
    }, [visible, position]);
    const getPositionClassName = () => {
        switch (position) {
            case "bottom":
                return styles.tooltipBottom;
            case "left":
                return styles.tooltipLeft;
            case "right":
                return styles.tooltipRight;
            default:
                return styles.tooltipTop;
        }
    };
    return (
        <div className={styles.tooltipWrapper}
            ref={warpperRef}
            onMouseEnter={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
        >
            {children}
            {visible && (
                <div ref={tooltipRef}
                    className={`${styles.tooltip} ${getPositionClassName()}`}
                    style={{ backgroundColor, color: textColor }}
                >
                    <span className={styles.tooltopText}>
                        {content}
                    </span>
                </div>
            )}
        </div>
    );
}
export default Tooltip;
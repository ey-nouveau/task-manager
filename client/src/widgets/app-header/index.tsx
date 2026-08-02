import { Row } from "@/shared/ui/row";
import { ThemeToggle } from "@/features/toggle-theme";
import { Box } from "lucide-react";
import styles from "./styles.module.css";
import cn from "classnames";
import { useHeaderLinks } from "./use-header-links";
import { Link } from "react-router-dom";
import { useIsMobile } from "@/shared/lib/hooks/use-is-mobile";
import { Responsive } from "@/shared/ui/responsive";

const MAX_SHOWN_LINKS_MOBILE = 3;

export const AppHeader = () => {
  const headerLinks = useHeaderLinks();
  const isMobile = useIsMobile();
  const activeIndex = headerLinks.findIndex((link) => link.active);

  const visibleLinks = isMobile
    ? (() => {
        const offset = Math.floor(MAX_SHOWN_LINKS_MOBILE / 2);

        const start = Math.min(
          Math.max(0, activeIndex - offset),
          headerLinks.length - MAX_SHOWN_LINKS_MOBILE,
        );

        return headerLinks.slice(start, start + MAX_SHOWN_LINKS_MOBILE);
      })()
    : headerLinks;

  return (
    <Row
      justify={isMobile ? "center" : "between"}
      align="center"
      className={styles.mainHeader}
    >
      <Responsive layout="desktop">
        <Box size={28} />
      </Responsive>

      <Row align="center" className={styles.navPillContainer}>
        {visibleLinks.map((item, index) => {
          return (
            <Link
              key={index}
              to={item.path}
              className={cn(
                styles.navPillItem,
                item.active && styles.navPillItemActive,
              )}
            >
              {item.icon}
              {!isMobile && item.label}
            </Link>
          );
        })}
      </Row>

      <Responsive layout="desktop">
        <ThemeToggle />
      </Responsive>
    </Row>
  );
};

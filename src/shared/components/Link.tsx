import React from "react";
import { Link as WouterLink } from "wouter";

import styles from "./Link.module.scss";

interface Props {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  href: string;
  onClick?: Function;
}

export function Link(props: Props) {
  return (
    <WouterLink
      className={`${styles.link} ${props.className ?? ''} ${props.disabled ? styles.disabled : ''}`}
      href={props.disabled ? "" : props.href}
      tabIndex={props.disabled ? -1 : undefined}
    >
      {props.children}
    </WouterLink>
  );
}

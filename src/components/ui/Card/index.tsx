import React from 'react';
import styles from './style.module.scss';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export const Card = ({ children, className = '', ...props }: CardProps) => {
  return <div className={`${styles.card} ${className}`} {...props}>{children}</div>
};

export const CardTop = ({ children, className = '', ...props }: CardProps) => {
  return <div className={`${styles.card__top} ${className}`} {...props}>{children}</div>
};

export const CardBody = ({ children, className = '', ...props }: CardProps) => {
  return <div className={`${styles.card__body} ${className}`} {...props}>{children}</div>
};
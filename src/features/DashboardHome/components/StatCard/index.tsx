import React from 'react';
import { Card, CardBody, CardTop } from '@/components/ui/Card';
import styles from './style.module.scss'
import { TrendingDown, TrendingUp } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isUp: boolean;
  };
  color?: string;
}

const StatCard = ({ title, value, icon, trend, color }: StatCardProps) => {
  return (
    <Card style={{ borderBottom: `4px solid ${color}` }} >
      <div className={styles.statCard}>
        <CardTop>
          <div className={styles.statCard__icon} style={{ color: color, backgroundColor: `${color}20` }}>
            {icon}
          </div>
        </CardTop>
        <CardBody>
          <div className={styles.statCard__content}>
            <div>
              <h2 className={styles.statCard__content__value}>{value}</h2>
              <p className={styles.statCard__content__title}>{title}</p>
            </div>

            <div>
              {trend && (
                <span className={styles.statCard__content__trend}>
                  {trend.isUp ? <TrendingUp size={32} color={color} /> : <TrendingDown size={32} color={color} />}
                  <span style={{ color: trend.isUp ? 'green' : 'red' }}>
                    {trend.isUp ? `+${trend.value}` : `-${trend.value}`}
                  </span>
                </span>
              )}
            </div>
          </div>
        </CardBody>
      </div >
    </Card >
  );
};

export default StatCard;

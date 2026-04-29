import { Card, CardBody, CardTop } from "@/components/ui/Card"
import styles from "./style.module.scss"

interface ChartsProps {
  children: React.ReactNode
  stats: { title?: string; value: number }[]
}

const Charts = ({ children, stats }: ChartsProps) => {
  return (
    <Card className={styles.chartContainer}>
      <CardTop>
        <div className={styles.chartContainer__header}>
          {children}
        </div>
      </CardTop>
      <CardBody className={styles.chartContainer__body}>
        <div className={styles.chartContainer__chart}>
          {
            stats.map((stat, index: number) => (
              <div
                key={index}
                className={styles.chartContainer__chart__items}
                style={{ height: `${Number(stat.value) + 80}px ` }}
              >
                {stat.value}

                {
                  stat.title &&
                  <div className={styles.chartContainer__chart__items__tooltip}>
                    <div className={styles.chartContainer__chart__items__tooltip__shape} />
                    {stat.title}
                  </div>
                }
              </div>
            ))
          }
        </div>
      </CardBody>
    </Card >
  )
}

export default Charts
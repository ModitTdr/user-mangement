import { Card, CardBody, CardTop } from "@/components/ui/Card"
import styles from "./style.module.scss"

const Charts = ({ stats }) => {
  return (
    <Card className={styles.chartContainer}>
      <CardTop>
        <div className={styles.chartContainer__header}>
          <h2>User Overview</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.</p>
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

                <div className={styles.chartContainer__chart__items__tooltip}>
                  <div className={styles.chartContainer__chart__items__tooltip__shape} />
                  {stat.title}
                </div>
              </div>
            ))
          }
        </div>
      </CardBody>
    </Card >
  )
}

export default Charts
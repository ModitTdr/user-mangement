import { Card, CardBody } from "@/components/ui/Card";
import styles from "./style.module.scss";

interface DetailItem {
  label?: string;
  value?: React.ReactNode;
}

interface DetailCardProps {
  title: string;
  details: DetailItem[];
  className?: string;
}

const DetailCard = ({ title, details, className = "" }: DetailCardProps) => (
  <Card className={`${styles.infoCard} ${className}`}>
    <CardBody>
      <div className={styles.infoCard__sectionHeader}>
        <h3>{title}</h3>
      </div>
      <div className={styles.infoCard__detailsList}>
        {details.map((detail, index) => (
          <div key={index} className={styles.infoCard__detailsList__detail}>
            {detail.label && <label>{detail.label}</label>}
            <p>{detail?.value || '-'}</p>
          </div>
        ))}
      </div>
    </CardBody>
  </Card>
);

export default DetailCard;
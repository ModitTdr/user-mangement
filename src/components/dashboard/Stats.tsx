interface StatsProps {
  title: string;
  amount: number;
}

const Stats = ({ title, amount }: StatsProps) => {
  return (
    <div className="stats">
      <p>{title}</p>
      <h3>{amount || 0}</h3>
    </div>
  )
}

export default Stats

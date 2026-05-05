import Button from '@/components/ui/Button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { Dispatch, SetStateAction } from 'react'
import styles from "./style.module.scss"

const PaginationButton = ({ page, totalPages, setPage }:
  {
    page: number,
    totalPages: number,
    setPage: Dispatch<SetStateAction<number>>;
  }) => {
  return (
    <div className={styles.paginationButtons}>
      <Button
        disabled={page === 1}
        onClick={() => setPage(p => p - 1)}
        size="sm"
      >
        <ChevronLeft size={15} />
      </Button>

      <div className={styles.paginationButtons__buttonContainer}>
        {
          Array.from({ length: totalPages }).map((_, index) => (
            <Button
              key={index}
              disabled={page === index + 1}
              onClick={() => setPage(index + 1)}
              variant="outline"
              className={styles.paginationButtons__buttonContainer__button}
            >
              {index + 1}
            </Button>
          ))
        }
      </div>

      <Button
        disabled={page === totalPages}
        onClick={() => setPage((p) => p + 1)}
        size="sm"
      >
        <ChevronRight size={15} />
      </Button>
    </div >
  )
}

export default PaginationButton;
import { ReactNode } from 'react'

import styles from './styles.module.css';

interface Props {
  children: ReactNode
}

export default function Table({ children }: Props) {
  return (
    <table className={styles.table}>
      {children}
    </table>
  )
}

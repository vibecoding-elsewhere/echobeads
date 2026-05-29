import { NavLink } from 'react-router-dom'
import styles from './BottomNav.module.css'

const tabs = [
  { to: '/',          icon: '✦', label: 'Echo'      },
  { to: '/reflect',   icon: '♡', label: 'Reflect'   },
  { to: '/community', icon: '◎', label: 'Community' },
  { to: '/profile',   icon: '○', label: 'Profile'   },
]

export default function BottomNav() {
  return (
    <nav className={styles.nav}>
      {tabs.map(tab => (
        <NavLink
          key={tab.to}
          to={tab.to}
          end={tab.to === '/'}
          className={({ isActive }) =>
            `${styles.item} ${isActive ? styles.active : ''}`
          }
        >
          <span className={styles.icon}>{tab.icon}</span>
          <span className={styles.label}>{tab.label}</span>
        </NavLink>
      ))}
    </nav>
  )
}

import { useCommunity } from '../../hooks/useCommunity'
import styles from './CommunityPage.module.css'

function timeAgo(iso) {
  const diff = (Date.now() - new Date(iso)) / 1000
  if (diff < 60)   return 'just now'
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
  return new Date(iso).toLocaleDateString([], { month: 'short', day: 'numeric' })
}

export default function CommunityPage() {
  const { posts, loading, likePost } = useCommunity()

  return (
    <div className={styles.page}>
      <h2 className={styles.title}>From the community</h2>
      <p className={styles.subtitle}>A place where strangers leave feelings behind.</p>

      {loading && <p className={styles.loading}>gathering echoes…</p>}

      <div className={styles.list}>
        {posts.map(post => (
          <div key={post.id} className={styles.card}>
            <div className={styles.cardTop}>
              <span className={styles.badge}>{post.mood}</span>
              <span className={styles.time}>{timeAgo(post.created_at)}</span>
            </div>
            {post.quote && (
              <p className={styles.quote}>"{post.quote}"</p>
            )}
            <p className={styles.text}>{post.content}</p>
            <div className={styles.cardFooter}>
              <span className={styles.author}>— anonymous soul</span>
              <button className={styles.likeBtn} onClick={() => likePost(post.id)}>
                ♡ <span>{post.likes || 0}</span>
              </button>
            </div>
          </div>
        ))}

        {!loading && posts.length === 0 && (
          <p className={styles.empty}>No echoes yet. Be the first to leave one.</p>
        )}
      </div>
    </div>
  )
}

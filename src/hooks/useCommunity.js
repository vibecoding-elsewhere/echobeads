import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export function useCommunity() {
  const [posts,   setPosts]   = useState([])
  const [loading, setLoading] = useState(true)

  // ── Fetch shared notes (community feed) ───────────────────
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true)
      const { data, error } = await supabase
        .from('Note')
        .select('id, quote, mood, content, likes, created_at')
        .eq('shared', true)
        .order('created_at', { ascending: false })
        .limit(50)

      if (!error && data) setPosts(data)
      setLoading(false)
    }

    fetchPosts()

    // ── Real-time updates ──────────────────────────────────
    // New shared notes appear instantly; like counts update live.
    const channel = supabase
      .channel('community-feed')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'Note', filter: 'shared=eq.true' },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setPosts(prev => [payload.new, ...prev])
          } else if (payload.eventType === 'UPDATE') {
            setPosts(prev => prev.map(p => p.id === payload.new.id ? payload.new : p))
          } else if (payload.eventType === 'DELETE') {
            setPosts(prev => prev.filter(p => p.id !== payload.old.id))
          }
        }
      )
      .subscribe()

    return () => supabase.removeChannel(channel)
  }, [])

  // ── Like a post ────────────────────────────────────────────
  // Calls the DB function so the increment is atomic and bypasses RLS.
  const likePost = async (id) => {
    // Optimistic update
    setPosts(prev => prev.map(p => p.id === id ? { ...p, likes: (p.likes || 0) + 1 } : p))

    const { error } = await supabase.rpc('increment_note_like', { note_id: id })
    if (error) {
      // Revert on failure
      setPosts(prev => prev.map(p => p.id === id ? { ...p, likes: Math.max(0, (p.likes || 1) - 1) } : p))
    }
  }

  return { posts, loading, likePost }
}

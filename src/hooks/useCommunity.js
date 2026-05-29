import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'

export function useCommunity() {
  const [posts,      setPosts]      = useState([])
  const [loading,    setLoading]    = useState(true)
  const [likedPosts, setLikedPosts] = useState(new Set())
  const [userId,     setUserId]     = useState(null)

  // ── Get current user ───────────────────────────────────────
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUserId(session?.user?.id ?? null)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      setUserId(session?.user?.id ?? null)
    })
    return () => subscription.unsubscribe()
  }, [])

  // ── Fetch posts + user's existing likes ───────────────────
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)

      // Fetch community posts
      const { data: notes, error } = await supabase
        .from('Note')
        .select('id, quote, mood, content, likes, created_at')
        .eq('shared', true)
        .order('created_at', { ascending: false })
        .limit(50)

      if (!error && notes) setPosts(notes)

      // Fetch which notes the current user has already liked
      if (userId) {
        const { data: likes } = await supabase
          .from('Like')
          .select('note_id')
          .eq('user_id', userId)

        if (likes) setLikedPosts(new Set(likes.map(l => l.note_id)))
      }

      setLoading(false)
    }

    fetchData()

    // ── Real-time updates ──────────────────────────────────
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
  }, [userId])

  // ── Like a note ────────────────────────────────────────────
  // Only runs if the user has not already liked this note.
  const likeNote = async (post) => {
    const id       = post.id
    const newLikes = (post.likes || 0) + 1

    // Optimistic update
    setLikedPosts(prev => new Set([...prev, id]))
    setPosts(prev => prev.map(p => p.id === id ? { ...p, likes: newLikes } : p))

    const [likeResult, rpcResult] = await Promise.all([
      supabase.from('Like').insert({ user_id: userId, note_id: id }),
      supabase.rpc('increment_note_like', { note_id: id }),
    ])

    if (likeResult.error || rpcResult.error) {
      // Revert on failure
      setLikedPosts(prev => { const next = new Set(prev); next.delete(id); return next })
      setPosts(prev => prev.map(p => p.id === id ? { ...p, likes: post.likes || 0 } : p))
    }
  }

  // ── Unlike a note ───────────────────────────────────────────
  // Only runs if the user has previously liked this note.
  const unlikeNote = async (post) => {
    const id       = post.id
    const newLikes = Math.max(0, (post.likes || 0) - 1)

    // Optimistic update
    setLikedPosts(prev => { const next = new Set(prev); next.delete(id); return next })
    setPosts(prev => prev.map(p => p.id === id ? { ...p, likes: newLikes } : p))

    const [likeResult, rpcResult] = await Promise.all([
      supabase.from('Like').delete().eq('user_id', userId).eq('note_id', id),
      supabase.rpc('decrement_note_like', { note_id: id }),
    ])

    if (likeResult.error || rpcResult.error) {
      // Revert on failure
      setLikedPosts(prev => new Set([...prev, id]))
      setPosts(prev => prev.map(p => p.id === id ? { ...p, likes: post.likes || 0 } : p))
    }
  }

  // ── Toggle — dispatches to like or unlike based on current state ──
  const toggleLike = useCallback(async (post) => {
    if (!userId) return  // must be logged in to like

    if (likedPosts.has(post.id)) {
      await unlikeNote(post)   // already liked → remove the like
    } else {
      await likeNote(post)     // not yet liked → add the like
    }
  }, [likedPosts, userId])

  return { posts, loading, likedPosts, toggleLike }
}

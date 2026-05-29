import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'

export function useNotes(userId) {
  const [notes,   setNotes]   = useState([])
  const [loading, setLoading] = useState(true)

  // ── Fetch all notes for this user ──────────────────────────
  const fetchNotes = useCallback(async () => {
    if (!userId) { setNotes([]); setLoading(false); return }

    setLoading(true)
    const { data, error } = await supabase
      .from('Note')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (!error && data) setNotes(data)
    setLoading(false)
  }, [userId])

  useEffect(() => { fetchNotes() }, [fetchNotes])

  // ── Save a new note ────────────────────────────────────────
  // `quote`   = the affirmation shown on the Echo page
  // `content` = the user's own typed reflection
  const saveNote = useCallback(async ({ quote, mood, text, shared = true }) => {
    const { data, error } = await supabase
      .from('Note')
      .insert({ user_id: userId, quote, mood, content: text, shared })
      .select()
      .single()

    if (!error && data) setNotes(prev => [data, ...prev])
    return { data, error }
  }, [userId])

  // ── Edit the content of an existing note ──────────────────
  const editNote = useCallback(async (id, content) => {
    const { error } = await supabase
      .from('Note')
      .update({ content })
      .eq('id', id)
      .eq('user_id', userId)

    if (!error) setNotes(prev => prev.map(n => n.id === id ? { ...n, content } : n))
    return { error }
  }, [userId])

  // ── Delete a note ──────────────────────────────────────────
  const deleteNote = useCallback(async (id) => {
    const { error } = await supabase
      .from('Note')
      .delete()
      .eq('id', id)
      .eq('user_id', userId)

    if (!error) setNotes(prev => prev.filter(n => n.id !== id))
    return { error }
  }, [userId])

  // ── Group notes by date for the calendar view ──────────────
  const notesByDate = notes.reduce((acc, note) => {
    const key = note.created_at.slice(0, 10)
    if (!acc[key]) acc[key] = []
    acc[key].push(note)
    return acc
  }, {})

  return { notes, notesByDate, loading, saveNote, editNote, deleteNote, refetch: fetchNotes }
}

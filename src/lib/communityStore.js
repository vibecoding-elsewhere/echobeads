// Shared in-memory store for community posts.
// Both useCommunity and useNotes write here so new reflections
// appear immediately in the community feed without Supabase.

const SEED_POSTS = [
  {
    id: 1,
    quote: "you're allowed to take your time → slow down one thing you're doing",
    mood: 'Peaceful',
    text: 'I read this during my lunch break and it stopped me completely. I needed this today more than I realized.',
    likes: 14,
    created_at: new Date(Date.now() - 1000 * 60 * 2).toISOString(),
  },
  {
    id: 2,
    quote: "your softness is not your weakness → let your guard down just a little",
    mood: 'Hopeful',
    text: 'Been so hard on myself lately. This bracelet keeps reminding me to breathe.',
    likes: 31,
    created_at: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
  },
  {
    id: 3,
    quote: "you've survived every difficult moment so far → remember your own track record",
    mood: 'Emotional',
    text: 'I tap this thing like 5 times a day now. My coworker asked what I was doing and now she wants one lol',
    likes: 47,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
  },
  {
    id: 4,
    quote: "rest is not a reward → give yourself permission to stop for a moment",
    mood: 'Heavy',
    text: 'Wore this to my therapy session and my therapist asked about it. Small thing but it starts big conversations.',
    likes: 22,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
  },
  {
    id: 5,
    quote: "you are not behind → let go of one timeline that isn't yours",
    mood: 'Lonely',
    text: 'This one hit different today. Sitting with it.',
    likes: 8,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
  },
]

let _posts = [...SEED_POSTS]
const _listeners = new Set()

export function getPosts() {
  return _posts
}

export function addPost(post) {
  _posts = [post, ..._posts]
  _listeners.forEach(fn => fn(_posts))
}

export function likePost(id) {
  _posts = _posts.map(p => p.id === id ? { ...p, likes: (p.likes || 0) + 1 } : p)
  _listeners.forEach(fn => fn(_posts))
}

export function subscribe(fn) {
  _listeners.add(fn)
  return () => _listeners.delete(fn)
}

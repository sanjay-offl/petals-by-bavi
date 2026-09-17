import { createClient } from '@supabase/supabase-js'
import { SAMPLE_BOUQUETS } from '../data/sampleBouquets'

const SUPABASE_URL = 'https://mfpgiwrnekanudelowcy.supabase.co'
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1mcGdpd3JuZWthbnVkZWxvd2N5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQwMzUxMTIsImV4cCI6MjA2OTYxMTExMn0.AEJkTniZT97oWpg32rANC32AeJKLEZ6DUOunfOBOX2o'

let supabase = null
try {
  supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
} catch (e) {
  console.warn('Supabase initialization failed, running in offline mode:', e)
}

const LOCAL_STORAGE_KEY = 'petals_by_bavi_bouquets'

function getLocalBouquets() {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function saveLocalBouquet(bouquet) {
  try {
    const list = getLocalBouquets()
    const filtered = list.filter((b) => b.id !== bouquet.id)
    filtered.unshift(bouquet)
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(filtered.slice(0, 50)))
  } catch (err) {
    console.warn('Could not save to localStorage:', err)
  }
}

function generateShortId(length = 8) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let res = ''
  for (let i = 0; i < length; i++) {
    res += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return res
}

function generateUuid() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

/**
 * Save a bouquet to Supabase with fallback to LocalStorage
 */
export async function saveBouquet(bouquetData) {
  const newId = generateUuid()
  const shortId = generateShortId(8)
  const record = {
    id: newId,
    short_id: shortId,
    mode: bouquetData.mode || 'color',
    flowers: bouquetData.flowers || [],
    letter: bouquetData.letter || { recipient: '', message: '', sender: '' },
    timestamp: bouquetData.timestamp || Date.now(),
    greenery: bouquetData.greenery ?? 0,
    flowerOrder: bouquetData.flowerOrder || [],
    created_at: new Date().toISOString()
  }

  // Always persist locally first so it's guaranteed to be available
  saveLocalBouquet(record)

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('bouquets')
        .insert([
          {
            short_id: shortId,
            mode: record.mode,
            flowers: record.flowers,
            letter: record.letter,
            timestamp: record.timestamp,
            greenery: record.greenery,
            flowerOrder: record.flowerOrder
          }
        ])
        .select()

      if (!error && data && data.length > 0) {
        const saved = data[0]
        saveLocalBouquet(saved)
        return { success: true, bouquet: saved, id: saved.id }
      }
    } catch (e) {
      console.warn('Remote Supabase save failed, falling back to local:', e)
    }
  }

  return { success: true, bouquet: record, id: newId }
}

/**
 * Fetch a single bouquet by its UUID or shortId
 */
export async function fetchBouquetById(id) {
  if (!id) return null

  // 1. Check local storage first
  const locals = getLocalBouquets()
  const foundLocal = locals.find((b) => b.id === id || b.short_id === id)
  if (foundLocal) return foundLocal

  // 2. Check sample bouquets
  const foundSample = SAMPLE_BOUQUETS.find((b) => b.id === id || b.short_id === id)
  if (foundSample) return foundSample

  // 3. Try fetching from Supabase
  if (supabase) {
    try {
      // Is it a full UUID or short_id?
      const column = id.includes('-') ? 'id' : 'short_id'
      const { data, error } = await supabase
        .from('bouquets')
        .select('*')
        .eq(column, id)
        .single()

      if (!error && data) {
        saveLocalBouquet(data)
        return data
      }
    } catch (e) {
      console.warn('Remote fetch failed for bouquet id:', id, e)
    }
  }

  return null
}

/**
 * Fetch all bouquets for the Garden gallery
 */
export async function fetchGardenBouquets(limit = 30) {
  let remoteList = []

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('bouquets')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(limit)

      if (!error && Array.isArray(data)) {
        remoteList = data
      }
    } catch (e) {
      console.warn('Could not fetch bouquets from Supabase for Garden:', e)
    }
  }

  const localList = getLocalBouquets()
  const sampleList = SAMPLE_BOUQUETS

  // Merge and deduplicate by id
  const map = new Map()
  ;[...localList, ...remoteList, ...sampleList].forEach((item) => {
    if (item && item.id && !map.has(item.id)) {
      map.set(item.id, item)
    }
  })

  return Array.from(map.values())
}

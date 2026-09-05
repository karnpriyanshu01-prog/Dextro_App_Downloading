import { createClient } from '@/lib/supabase/server'

export type Mirror = {
  id: string
  label: string
  file_url: string
  region: string | null
}

export type Release = {
  id: string
  version: string
  versionCode: number
  fileSizeBytes: number
  sha256: string
  minAndroidVersion: string
  releaseDate: string
  releaseNotes: {
    added: string[]
    improved: string[]
    fixed: string[]
  }
  isLatest: boolean
  isPublished: boolean
  mirrors: Mirror[]
}

// Shown only if Supabase has no published release yet — keeps the site
// from crashing on a fresh database, and never presents fake data as real
// (isPublished stays false, so the UI disables the download button).
const EMPTY_RELEASE: Release = {
  id: '',
  version: '0.0.0',
  versionCode: 0,
  fileSizeBytes: 0,
  sha256: '',
  minAndroidVersion: '8.0',
  releaseDate: new Date().toISOString().slice(0, 10),
  releaseNotes: { added: [], improved: [], fixed: [] },
  isLatest: true,
  isPublished: false,
  mirrors: [],
}

function mapRow(row: any): Release {
  return {
    id: row.id,
    version: row.version,
    versionCode: row.version_code,
    fileSizeBytes: row.file_size,
    sha256: row.sha256,
    minAndroidVersion: row.min_android_version,
    releaseDate: row.release_date,
    releaseNotes: row.release_notes || { added: [], improved: [], fixed: [] },
    isLatest: row.is_latest,
    isPublished: row.is_published,
    mirrors: (row.release_mirrors || [])
      .sort((a: any, b: any) => a.sort_order - b.sort_order)
      .map((m: any) => ({ id: m.id, label: m.label, file_url: m.file_url, region: m.region })),
  }
}

export async function getLatestRelease(): Promise<Release> {
  const supabase = createClient()
  const { data } = await supabase
    .from('app_releases')
    .select('*, release_mirrors(*)')
    .eq('is_latest', true)
    .eq('is_published', true)
    .maybeSingle()

  return data ? mapRow(data) : EMPTY_RELEASE
}

export async function getReleaseHistory(): Promise<Release[]> {
  const supabase = createClient()
  const { data } = await supabase
    .from('app_releases')
    .select('*, release_mirrors(*)')
    .eq('is_published', true)
    .order('release_date', { ascending: false })

  return data && data.length > 0 ? data.map(mapRow) : [EMPTY_RELEASE]
}

export function formatReleaseSize(release: Release) {
  if (!release.fileSizeBytes) return '—'
  return `${(release.fileSizeBytes / (1024 * 1024)).toFixed(1)} MB`
}

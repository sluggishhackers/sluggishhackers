import { createClient } from "@supabase/supabase-js"

// 환경 변수가 없을 경우 데모용 더미 값 사용
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://demo.supabase.co"
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "demo-key"

// Supabase 클라이언트가 제대로 설정되었는지 확인
const isSupabaseConfigured =
  process.env.NEXT_PUBLIC_SUPABASE_URL &&
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
  process.env.NEXT_PUBLIC_SUPABASE_URL !== "https://demo.supabase.co"

export const supabase = isSupabaseConfigured ? createClient(supabaseUrl, supabaseAnonKey) : null

export { isSupabaseConfigured }

export type Database = {
  public: {
    Tables: {
      judgments: {
        Row: {
          id: string
          case_number: string
          court_name: string
          judge_name: string
          case_type: string
          judgment_date: string
          parties: string
          summary: string
          full_text: string
          created_at: string
        }
        Insert: {
          id?: string
          case_number: string
          court_name: string
          judge_name: string
          case_type: string
          judgment_date: string
          parties: string
          summary: string
          full_text: string
          created_at?: string
        }
        Update: {
          id?: string
          case_number?: string
          court_name?: string
          judge_name?: string
          case_type?: string
          judgment_date?: string
          parties?: string
          summary?: string
          full_text?: string
          created_at?: string
        }
      }
      budget_data: {
        Row: {
          id: string
          year: number
          ministry_code: string
          ministry_name: string
          program_code: string
          program_name: string
          project_code: string
          project_name: string
          budget_amount: number
          created_at: string
        }
        Insert: {
          id?: string
          year: number
          ministry_code: string
          ministry_name: string
          program_code: string
          program_name: string
          project_code: string
          project_name: string
          budget_amount: number
          created_at?: string
        }
        Update: {
          id?: string
          year?: number
          ministry_code?: string
          ministry_name?: string
          program_code?: string
          program_name?: string
          project_code?: string
          project_name?: string
          budget_amount?: number
          created_at?: string
        }
      }
    }
  }
}

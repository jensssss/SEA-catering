export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          created_at: string | null;
          full_name: string | null;
          role: 'user' | 'admin' | null;
        };
        Insert: {
          id: string;
          created_at?: string | null;
          full_name?: string | null;
          role?: 'user' | 'admin' | null;
        };
        Update: {
          full_name?: string | null;
          role?: 'user' | 'admin' | null;
        };
      };

      subscriptions: {
        Row: {
          id: number;
          created_at: string | null;
          name: string | null;
          phone: string | null;
          plan: string | null;
          meals: string[] | null;
          days: string[] | null;
          allergies: string | null;
          total_price: number | null;
          user_id: string | null;
          status: 'active' | 'paused' | 'cancelled' | null;
          pause_start: string | null;
          pause_end: string | null;
        };
        Insert: {
          id?: number;
          created_at?: string | null;
          name?: string | null;
          phone?: string | null;
          plan?: string | null;
          meals?: string[] | null;
          days?: string[] | null;
          allergies?: string | null;
          total_price?: number | null;
          user_id?: string | null;
          status?: 'active' | 'paused' | 'cancelled' | null;
          pause_start?: string | null;
          pause_end?: string | null;
        };
        Update: {
          name?: string | null;
          phone?: string | null;
          plan?: string | null;
          meals?: string[] | null;
          days?: string[] | null;
          allergies?: string | null;
          total_price?: number | null;
          user_id?: string | null;
          status?: 'active' | 'paused' | 'cancelled' | null;
          pause_start?: string | null;
          pause_end?: string | null;
        };
      };

      testimonials: {
        Row: {
          id: string;
          name: string | null;
          review: string | null;
          rating: number | null;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          name?: string | null;
          review?: string | null;
          rating?: number | null;
          created_at?: string | null;
        };
        Update: {
          name?: string | null;
          review?: string | null;
          rating?: number | null;
          created_at?: string | null;
        };
      };
    };

    Views: {};
    Functions: {};
    Enums: {};
  };
};

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      friends: {
        Row: {
          id: number;
          request_sent_by: string;
          status: Database["public"]["Enums"]["invite_status"];
          uid1: string;
          uid2: string;
        };
        Insert: {
          id?: number;
          request_sent_by: string;
          status: Database["public"]["Enums"]["invite_status"];
          uid1: string;
          uid2: string;
        };
        Update: {
          id?: number;
          request_sent_by?: string;
          status?: Database["public"]["Enums"]["invite_status"];
          uid1?: string;
          uid2?: string;
        };
        Relationships: [
          {
            foreignKeyName: "public_friend_of_request_sent_by_fkey";
            columns: ["request_sent_by"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "public_friends_uid1_fkey";
            columns: ["uid1"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "public_friends_uid2_fkey";
            columns: ["uid2"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      habit_completions: {
        Row: {
          completed: boolean;
          date: string;
          habit_id: number;
          id: number;
          user_habit_id: number | null;
          user_id: string;
        };
        Insert: {
          completed?: boolean;
          date?: string;
          habit_id: number;
          id?: number;
          user_habit_id?: number | null;
          user_id?: string;
        };
        Update: {
          completed?: boolean;
          date?: string;
          habit_id?: number;
          id?: number;
          user_habit_id?: number | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "public_habit_completions_habit_id_fkey";
            columns: ["habit_id"];
            isOneToOne: false;
            referencedRelation: "habits";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "public_habit_completions_user_habit-id_fkey";
            columns: ["user_habit_id"];
            isOneToOne: false;
            referencedRelation: "user_habits";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "public_habit_completions_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      habits: {
        Row: {
          color: string;
          description: string | null;
          id: number;
          name: string;
          owner_id: string;
          start_date: string;
        };
        Insert: {
          color: string;
          description?: string | null;
          id?: number;
          name: string;
          owner_id?: string;
          start_date?: string;
        };
        Update: {
          color?: string;
          description?: string | null;
          id?: number;
          name?: string;
          owner_id?: string;
          start_date?: string;
        };
        Relationships: [
          {
            foreignKeyName: "public_habits_owner_id_fkey";
            columns: ["owner_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      profiles: {
        Row: {
          created_at: string;
          display_name: string | null;
          id: string;
          picture: string | null;
          profile_created: boolean;
          username: string | null;
        };
        Insert: {
          created_at?: string;
          display_name?: string | null;
          id: string;
          picture?: string | null;
          profile_created?: boolean;
          username?: string | null;
        };
        Update: {
          created_at?: string;
          display_name?: string | null;
          id?: string;
          picture?: string | null;
          profile_created?: boolean;
          username?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "public_users_id_fkey";
            columns: ["id"];
            isOneToOne: true;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      user_habits: {
        Row: {
          habit_id: number;
          id: number;
          join_date: string;
          status: Database["public"]["Enums"]["invite_status"];
          user_id: string;
        };
        Insert: {
          habit_id: number;
          id?: number;
          join_date?: string;
          status: Database["public"]["Enums"]["invite_status"];
          user_id: string;
        };
        Update: {
          habit_id?: number;
          id?: number;
          join_date?: string;
          status?: Database["public"]["Enums"]["invite_status"];
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "public_user_habits_habit_id_fkey";
            columns: ["habit_id"];
            isOneToOne: false;
            referencedRelation: "habits";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "public_user_habits_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      invite_status: "pending" | "accepted" | "declined";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never;

// Schema: public
// Enums
export enum InviteStatus {
  pending = "pending",
  accepted = "accepted",
  declined = "declined",
}

// Tables
export type Friend = Database["public"]["Tables"]["friends"]["Row"];
export type InsertFriend = Database["public"]["Tables"]["friends"]["Insert"];
export type UpdateFriend = Database["public"]["Tables"]["friends"]["Update"];

export type HabitCompletion =
  Database["public"]["Tables"]["habit_completions"]["Row"];
export type InsertHabitCompletion =
  Database["public"]["Tables"]["habit_completions"]["Insert"];
export type UpdateHabitCompletion =
  Database["public"]["Tables"]["habit_completions"]["Update"];

export type Habit = Database["public"]["Tables"]["habits"]["Row"];
export type InsertHabit = Database["public"]["Tables"]["habits"]["Insert"];
export type UpdateHabit = Database["public"]["Tables"]["habits"]["Update"];

export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type InsertProfile = Database["public"]["Tables"]["profiles"]["Insert"];
export type UpdateProfile = Database["public"]["Tables"]["profiles"]["Update"];

export type UserHabit = Database["public"]["Tables"]["user_habits"]["Row"];
export type InsertUserHabit =
  Database["public"]["Tables"]["user_habits"]["Insert"];
export type UpdateUserHabit =
  Database["public"]["Tables"]["user_habits"]["Update"];

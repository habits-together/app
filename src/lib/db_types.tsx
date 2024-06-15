type dbT = {
  users: [
    id: {
      created_at: Date;
      display_name: string;
      username: string;
      picture: string;
      habit_invites: [
        habit_invite_ref: string, // references habit_invites
      ];
      friend_requests: [
        friend_request_ref: string, // references friend_requests
      ];
      // collections
      nudges: [
        nudge_id: {
          habit_ref: string; // references habits
          friend_ref: string; // references users
          sent_at: Date;
        },
      ];
      friends: [
        id: {
          friend_ref: string; // references users
          friends_since: Date;
        },
      ];
      habits: [
        habit_participation_id: {
          habit_ref: string; // references habits
          // collections
          completions: [
            completionId: {
              // index & return sorted by date
              date: Date;
              numberOfCompletions: number;
            },
          ];
        },
      ];
    },
  ];

  habits: [
    habit_id: {
      color: string;
      created_at: Date;
      description: string;
      title: string;
      owner_id: string;
      goal_period: string;
      goal_completions_per_period: number;
      icon: string;
      participants: [
        user_ref: string, // references users
      ];
    },
  ];

  habit_invites: [
    invite_id: {
      habit_ref: string; // references habits
      friend_ref: string; // references users
      sent_at: Date;
    },
  ];

  friend_requests: [
    request_id: {
      sender_ref: string; // references users
      receiver_ref: string; // references users
      sent_at: Date;
    },
  ];
};

export type userT = Omit<
  dbT["users"][0],
  "nudges" | "friends" | "habits" | "habit_invites" | "friend_requests"
>;
export type nudgeT = dbT["users"][0]["nudges"][0];
export type habitInviteT = dbT["habit_invites"][0];
export type friendRequestT = dbT["friend_requests"][0];

export type habitInfoT = Omit<dbT["habits"][0], "participants">;
export type completionT = dbT["users"][0]["habits"][0]["completions"][0];
export type habitCardDataT = {
  habit_info: habitInfoT;
  my_completion_data: completionT[];
  participant_data: [
    {
      user_info: userT;
      completion_data: completionT[];
    },
  ];
};

export type friendCardDataT = {
  friend_info: userT;
  common_habits: commonHabitT[];
};
export type commonHabitT = {
  color: string;
  icon: string;
  title: string;
};

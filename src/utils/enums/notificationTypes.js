export const NotificationTypes = {
  'friendship_request_notification': {
    type: 'friendship_request_notification',
    title: 'Friendship request',
    getDescription: (friendName)=> `You received a friendship request from ${friendName}`,
  },
  "notification_to_join_course_battle": {
    type: "notification_to_join_course_battle",
    title: 'Quiz battle request',
    getDescription: (friendName)=> `You received a quiz battle request from ${friendName}`,
  }
}

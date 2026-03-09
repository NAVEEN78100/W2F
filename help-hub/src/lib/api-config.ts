export const API_HOST = import.meta.env.VITE_API_URL || "http://localhost:5000";
export const TOPIC_FEEDBACK_API_HOST =
  import.meta.env.VITE_TOPIC_FEEDBACK_API_URL || API_HOST;

export const apiUrl = (path: string): string => `${API_HOST}${path}`;
export const topicFeedbackApiUrl = (path: string): string =>
  `${TOPIC_FEEDBACK_API_HOST}${path}`;

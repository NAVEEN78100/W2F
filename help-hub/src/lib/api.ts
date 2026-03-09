// API utility for fetching data from the admin backend
const API_HOST = import.meta.env.VITE_API_URL || "http://localhost:5000";
const API_BASE_URL = `${API_HOST}/api`;

// Helper function to add timeout to fetch requests
const fetchWithTimeout = (url: string, timeout = 5000): Promise<Response> => {
  return Promise.race([
    fetch(url),
    new Promise<Response>((_, reject) =>
      setTimeout(() => reject(new Error("Request timeout")), timeout),
    ),
  ]);
};

export interface Article {
  _id: string;
  title: string;
  description: string;
  slug: string;
  content: string;
  pdf_url?: string;
  image_url?: string;
  url?: string;
  is_published: boolean;
  position: number;
  sections?: { question: string; answer: string }[];
  helpChosenForYou?: {
    title: string;
    description: string;
    link?: string;
    content?: string;
    pdf_url?: string;
  }[];
  createdAt: string;
  updatedAt: string;
}

export interface Topic {
  _id: string;
  title: string;
  description: string;
  slug: string;
  icon: string;
  is_published: boolean;
  position: number;
  quickQuestions: {
    question: string;
    answer: string;
    slug: string;
    pdfText?: string;
    helpChosenForYou?: {
      title: string;
      description?: string;
      link?: string;
      content?: string;
      pdf_url?: string;
    }[];
  }[];
  createdAt: string;
  updatedAt: string;
}

export const api = {
  // Get published articles
  getPublishedArticles: async (): Promise<Article[]> => {
    console.log("Fetching articles from", `${API_BASE_URL}/articles/published`);
    try {
      const response = await fetchWithTimeout(
        `${API_BASE_URL}/articles/published`,
      );
      if (!response.ok) {
        throw new Error("Failed to fetch articles");
      }
      return response.json();
    } catch (error) {
      console.error("Articles fetch error:", error);
      throw error;
    }
  },

  // Get article by slug
  getArticleBySlug: async (slug: string): Promise<Article> => {
    const response = await fetchWithTimeout(
      `${API_BASE_URL}/articles/slug/${slug}`,
    );
    if (!response.ok) {
      throw new Error("Failed to fetch article");
    }
    return response.json();
  },

  // Get all articles
  getAllArticles: async (): Promise<Article[]> => {
    const response = await fetchWithTimeout(`${API_BASE_URL}/articles`);
    if (!response.ok) {
      throw new Error("Failed to fetch articles");
    }
    return response.json();
  },

  // Get published topics
  getPublishedTopics: async (): Promise<Topic[]> => {
    console.log("Fetching topics from", `${API_BASE_URL}/topics/published`);
    try {
      const response = await fetchWithTimeout(
        `${API_BASE_URL}/topics/published`,
      );
      if (!response.ok) {
        throw new Error("Failed to fetch topics");
      }
      return response.json();
    } catch (error) {
      console.error("Topics fetch error:", error);
      throw error;
    }
  },

  // Get topic by slug
  getTopicBySlug: async (slug: string): Promise<Topic> => {
    const response = await fetchWithTimeout(
      `${API_BASE_URL}/topics/slug/${slug}`,
    );
    if (!response.ok) {
      throw new Error("Failed to fetch topic");
    }
    return response.json();
  },

  // Get topic by id
  getTopicById: async (id: string): Promise<Topic> => {
    const response = await fetchWithTimeout(`${API_BASE_URL}/topics/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch topic");
    }
    return response.json();
  },

  // Submit support feedback
  submitSupportFeedback: async (
    formData: FormData,
  ): Promise<{ ticketId: string }> => {
    const response = await fetch(`${API_BASE_URL}/support-feedback`, {
      method: "POST",
      body: formData,
    });
    if (!response.ok) {
      throw new Error("Failed to submit support feedback");
    }
    return response.json();
  },

  // Submit general feedback
  submitGeneralFeedback: async (formData: {
    name: string;
    email: string;
    contact: string;
    state: string;
    city: string;
    feedbackType: string;
    feedbackDetails: string;
  }): Promise<{ ticketId: string; referralCode: string; message: string }> => {
    const response = await fetch(`${API_BASE_URL}/general-feedback`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    if (!response.ok) {
      throw new Error("Failed to submit general feedback");
    }
    return response.json();
  },

  // Submit grievance
  submitGrievance: async (
    formData: FormData,
  ): Promise<{ ticketId: string; message: string }> => {
    try {
      const response = await fetch(`${API_BASE_URL}/grievances`, {
        method: "POST",
        body: formData,
      });

      const contentType = response.headers.get("content-type");
      let errorData = null;

      if (contentType && contentType.includes("application/json")) {
        errorData = await response.json();
      } else {
        errorData = await response.text();
      }

      if (!response.ok) {
        console.error("Grievance submission error:", {
          status: response.status,
          statusText: response.statusText,
          data: errorData,
        });
        throw new Error(
          typeof errorData === "object" && errorData.message
            ? errorData.message
            : "Failed to submit grievance",
        );
      }

      return errorData;
    } catch (error: any) {
      console.error("Grievance submission error:", error);
      throw error;
    }
  },

  // Get grievances (admin)
  getGrievances: async (): Promise<any[]> => {
    const response = await fetch(`${API_BASE_URL}/grievances`, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("Failed to fetch grievances");
    }
    return response.json();
  },

  // Get grievance by ticket ID
  getGrievanceByTicketId: async (ticketId: string): Promise<any> => {
    const response = await fetch(`${API_BASE_URL}/grievances/${ticketId}`, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("Failed to fetch grievance");
    }
    return response.json();
  },

  // Update grievance status (admin)
  updateGrievanceStatus: async (
    grievanceId: string,
    status: string,
    adminNotes: string,
  ): Promise<any> => {
    const response = await fetch(
      `${API_BASE_URL}/grievances/${grievanceId}/status`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status, adminNotes }),
      },
    );
    if (!response.ok) {
      throw new Error("Failed to update grievance status");
    }
    return response.json();
  },
};

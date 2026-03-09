import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Plus,
  Pencil,
  Trash2,
  GripVertical,
  Loader2,
  FolderTree,
  X,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { toast } from "sonner";

interface QuickQuestion {
  question: string;
  answer: string;
  pdfText: string;
  helpChosenForYou?: HelpChosenForYou[];
}

interface NewQuickQuestion {
  question: string;
  pdfText: string;
}

interface AdditionalQA {
  question: string;
  answer: string;
}

interface HelpChosenForYou {
  title: string;
  description: string;
  link?: string;
  content?: string;
  pdf_url?: string;
}

interface Topic {
  _id: string;
  name: string;
  description: string | null;
  icon: string | null;
  quickQuestions: QuickQuestion[];
  additionalQA: AdditionalQA[];
  helpChosenForYou?: HelpChosenForYou[];
  is_published: boolean;
  position: number;
}

export default function TopicsManager() {
  const [isOpen, setIsOpen] = useState(false);
  const [editingTopic, setEditingTopic] = useState<Topic | null>(null);
  const [showQuickQuestionsEditor, setShowQuickQuestionsEditor] =
    useState(false);
  const [showAdditionalQAEditor, setShowAdditionalQAEditor] = useState(false);
  const [expandedQuestionIndex, setExpandedQuestionIndex] = useState<
    number | null
  >(null);
  const [quickQuestions, setQuickQuestions] = useState<QuickQuestion[]>([]);
  const [additionalQA, setAdditionalQA] = useState<AdditionalQA[]>([]);

  const [newQuickQuestion, setNewQuickQuestion] = useState<NewQuickQuestion>({
    question: "",
    pdfText: "",
  });
  const [newAdditionalQA, setNewAdditionalQA] = useState({
    question: "",
    answer: "",
  });
  const [newHelpChosenForYou, setNewHelpChosenForYou] = useState({
    title: "",
    description: "",
    link: "",
    content: "",
    pdf_url: "",
  });

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    icon: "📚",
    is_published: true,
  });

  const queryClient = useQueryClient();

  const { data: topics = [], isLoading } = useQuery({
    queryKey: ["admin-topics"],
    queryFn: async () => {
      const response = await fetch("/api/topics");
      if (!response.ok) throw new Error("Failed to fetch topics");
      return response.json();
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: {
      name: string;
      description: string;
      icon: string;
      is_published: boolean;
      quickQuestions: QuickQuestion[];
      additionalQA: AdditionalQA[];
    }) => {
      const maxPosition =
        topics.length > 0
          ? Math.max(...topics.map((t: Topic) => t.position)) + 1
          : 0;

      const response = await fetch("/api/topics", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          name: data.name,
          description: data.description || null,
          icon: data.icon || null,
          is_published: data.is_published,
          quickQuestions: data.quickQuestions || [],
          additionalQA: data.additionalQA || [],
          position: maxPosition,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create topic");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-topics"] });
      toast.success("Topic created successfully");
      resetForm();
    },
    onError: (error) => {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to create topic";
      toast.error(errorMessage);
      console.error("Create topic error:", error);
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      const response = await fetch(`/api/topics/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          name: data.name,
          description: data.description || null,
          icon: data.icon || null,
          is_published: data.is_published,
          quickQuestions: data.quickQuestions || [],
          additionalQA: data.additionalQA || [],
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update topic");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-topics"] });
      toast.success("Topic updated successfully");
      resetForm();
    },
    onError: (error) => {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to update topic";
      toast.error(errorMessage);
      console.error("Update topic error:", error);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/topics/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!response.ok) throw new Error("Failed to delete topic");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-topics"] });
      toast.success("Topic deleted");
    },
    onError: (error) => {
      toast.error("Failed to delete topic");
      console.error(error);
    },
  });

  const reorderMutation = useMutation({
    mutationFn: async (reorderedTopics: Topic[]) => {
      const response = await fetch("/api/topics/reorder", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ topics: reorderedTopics }),
      });
      if (!response.ok) throw new Error("Failed to reorder topics");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-topics"] });
    },
  });

  const uploadPdfMutation = useMutation({
    mutationFn: async ({
      topicId,
      questionIndex,
      file,
      isNew,
      type,
      itemIndex,
    }: {
      topicId?: string;
      questionIndex?: number;
      file: File;
      isNew: boolean;
      type?: string;
      itemIndex?: number;
    }) => {
      const formDataToSend = new FormData();
      formDataToSend.append("pdf", file);

      const endpoint = isNew
        ? "/api/topics/temp-upload-pdf"
        : type === "help-item"
        ? `/api/topics/${topicId}/quick-questions/${questionIndex}/help-items/${itemIndex}/upload-pdf`
        : `/api/topics/${topicId}/quick-questions/${questionIndex}/upload-pdf`;

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formDataToSend,
      });

      if (!response.ok) throw new Error("Failed to upload PDF");
      return response.json();
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["admin-topics"] });
      if (variables.isNew) {
        // For new topics, just update the form
        if (variables.type === "help-item") {
          setNewHelpChosenForYou({
            ...newHelpChosenForYou,
            content: data.extracted_text,
            pdf_url: "uploaded",
          });
        } else {
          setNewQuickQuestion({
            ...newQuickQuestion,
            pdfText: data.extracted_text,
          });
        }
        toast.success("PDF uploaded and text extracted");
      } else {
        // Update the quick question with extracted text
        if (variables.type === "help-item") {
          setQuickQuestions((prev) =>
            prev.map((q, i) =>
              i === variables.questionIndex
                ? {
                    ...q,
                    helpChosenForYou: q.helpChosenForYou?.map((h, j) =>
                      j === variables.itemIndex
                        ? { ...h, content: data.extracted_text, pdf_url: "uploaded" }
                        : h,
                    ),
                  }
                : q,
            ),
          );
        } else {
          setQuickQuestions((prev) =>
            prev.map((q, i) =>
              i === variables.questionIndex
                ? { ...q, pdfText: data.extracted_text }
                : q,
            ),
          );
        }
        toast.success("PDF uploaded and text extracted");
      }
    },
    onError: (error) => {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to upload PDF";
      toast.error(errorMessage);
      console.error("PDF upload error:", error);
    },
  });

  const resetForm = () => {
    setFormData({ name: "", description: "", icon: "📚", is_published: true });
    setEditingTopic(null);
    setQuickQuestions([]);
    setAdditionalQA([]);
    setNewQuickQuestion({ question: "", pdfText: "" });
    setNewAdditionalQA({ question: "", answer: "" });
    setNewHelpChosenForYou({
      title: "",
      description: "",
      link: "",
      content: "",
      pdf_url: "",
    });
    setShowQuickQuestionsEditor(false);
    setShowAdditionalQAEditor(false);
     setIsOpen(false);
  };

  const handleEdit = (topic: Topic) => {
    setEditingTopic(topic);
    setFormData({
      name: topic.name,
      description: topic.description || "",
      icon: topic.icon || "📚",
      is_published: topic.is_published,
    });
    setQuickQuestions(
      (topic.quickQuestions || []).map((q) => ({
        question: q.question,
        answer: q.answer || q.pdfText || "",
        pdfText: q.pdfText || "",
        helpChosenForYou: q.helpChosenForYou || [],
      })),
    );
    setAdditionalQA(topic.additionalQA || []);
    setIsOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const submitData = {
      name: formData.name,
      description: formData.description,
      icon: formData.icon,
      is_published: formData.is_published,
      quickQuestions: quickQuestions,
      additionalQA: additionalQA,
    };

    console.log("Submitting topic data:", JSON.stringify(submitData, null, 2));
    console.log("Quick questions count:", quickQuestions.length);
    quickQuestions.forEach((q, i) => {
      console.log(
        `Question ${i}: helpChosenForYou length:`,
        q.helpChosenForYou?.length || 0,
      );
    });

    if (editingTopic) {
      updateMutation.mutate({ id: editingTopic._id, data: submitData });
    } else {
      createMutation.mutate(submitData);
    }
  };

  const handleAddQuickQuestion = () => {
    if (newQuickQuestion.question && newQuickQuestion.pdfText) {
      setQuickQuestions([
        ...quickQuestions,
        {
          question: newQuickQuestion.question,
          answer: newQuickQuestion.pdfText,
          pdfText: newQuickQuestion.pdfText,
          helpChosenForYou: [],
        },
      ]);
      setNewQuickQuestion({ question: "", pdfText: "" });
    } else {
      toast.error("Please fill in both question and answer");
    }
  };

  const handleDeleteQuickQuestion = (index: number) => {
    setQuickQuestions(quickQuestions.filter((_, i) => i !== index));
  };

  const handleAddAdditionalQA = () => {
    if (newAdditionalQA.question && newAdditionalQA.answer) {
      setAdditionalQA([...additionalQA, newAdditionalQA]);
      setNewAdditionalQA({ question: "", answer: "" });
    } else {
      toast.error("Please fill in both question and answer");
    }
  };



  const handleDeleteAdditionalQA = (index: number) => {
    setAdditionalQA(additionalQA.filter((_, i) => i !== index));
  };

  const moveItem = (index: number, direction: "up" | "down") => {
    const newTopics = [...topics];
    const targetIndex = direction === "up" ? index - 1 : index + 1;

    if (targetIndex < 0 || targetIndex >= newTopics.length) return;

    [newTopics[index], newTopics[targetIndex]] = [
      newTopics[targetIndex],
      newTopics[index],
    ];
    reorderMutation.mutate(newTopics);
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">
            Manage Topics
          </h1>
          <p className="text-muted-foreground mt-1">
            Organize topics for easy navigation
          </p>
        </div>

        <Dialog
          open={isOpen}
          onOpenChange={(open) => {
            setIsOpen(open);
            if (!open) resetForm();
          }}
        >
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Topic
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingTopic ? "Edit Topic" : "Add Topic"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              {/* Basic Info */}
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Getting Started"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Brief description of the topic..."
                  rows={2}
                />
              </div>

              {/* Quick Questions */}
              <div className="border-t pt-4">
                <button
                  type="button"
                  onClick={() =>
                    setShowQuickQuestionsEditor(!showQuickQuestionsEditor)
                  }
                  className="flex items-center gap-2 w-full p-2 hover:bg-muted rounded-md font-medium"
                >
                  {showQuickQuestionsEditor ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                  Quick Questions ({quickQuestions.length}/3)
                </button>

                {showQuickQuestionsEditor && (
                  <div className="space-y-3 mt-4">
                    {quickQuestions.map((qq, index) => (
                      <div
                        key={index}
                        className="p-3 bg-muted rounded-lg space-y-2"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p className="text-sm font-medium text-foreground">
                              {qq.question}
                            </p>
                            <p className="text-xs text-muted-foreground line-clamp-2">
                              {qq.answer}
                            </p>
                            {qq.helpChosenForYou &&
                              qq.helpChosenForYou.length > 0 && (
                                <p className="text-xs text-blue-600 mt-1">
                                  {qq.helpChosenForYou.length} help item(s)
                                </p>
                              )}
                          </div>
                          <button
                            type="button"
                            onClick={() => handleDeleteQuickQuestion(index)}
                            className="p-1 hover:bg-destructive/10 rounded"
                          >
                            <X className="w-4 h-4 text-destructive" />
                          </button>
                        </div>
                        {/* Help Chosen For You for this question */}
                        <div className="mt-3">
                          <button
                            type="button"
                            onClick={() =>
                              setExpandedQuestionIndex(
                                expandedQuestionIndex === index ? null : index,
                              )
                            }
                            className="text-xs text-blue-600 hover:underline"
                          >
                            {expandedQuestionIndex === index
                              ? "Hide"
                              : "Manage"}{" "}
                            Help Items ({qq.helpChosenForYou?.length || 0})
                          </button>
                          {expandedQuestionIndex === index && (
                            <div className="mt-2 pl-3 border-l-2 border-blue-200">
                              {qq.helpChosenForYou &&
                                qq.helpChosenForYou.map((item, itemIndex) => (
                                  <div
                                    key={itemIndex}
                                    className="text-xs bg-white p-2 rounded mb-1 border"
                                  >
                                    <div className="flex justify-between items-start">
                                      <div className="flex-1">
                                        <p className="font-medium">
                                          {item.title}
                                        </p>
                                        {item.description && (
                                          <p className="text-gray-600">
                                            {item.description}
                                          </p>
                                        )}
                                        {item.content && (
                                          <p className="text-gray-500 mt-1">
                                            {item.content}
                                          </p>
                                        )}
                                        {item.pdf_url && (
                                          <p className="text-blue-600">
                                            📄 PDF Available
                                          </p>
                                        )}
                                      </div>
                                      <button
                                        type="button"
                                        onClick={() => {
                                          const updatedQuestions = [
                                            ...quickQuestions,
                                          ];
                                          updatedQuestions[
                                            index
                                          ].helpChosenForYou = updatedQuestions[
                                            index
                                          ].helpChosenForYou?.filter(
                                            (_, i) => i !== itemIndex,
                                          );
                                          setQuickQuestions(updatedQuestions);
                                        }}
                                        className="text-red-500 hover:text-red-700 ml-2"
                                      >
                                        ✕
                                      </button>
                                    </div>
                                  </div>
                                ))}
                              <div className="mt-2 p-2 bg-gray-50 rounded">
                                <Input
                                  value={newHelpChosenForYou.title}
                                  onChange={(e) =>
                                    setNewHelpChosenForYou({
                                      ...newHelpChosenForYou,
                                      title: e.target.value,
                                    })
                                  }
                                  placeholder="Help item title"
                                  className="mb-2"
                                />
                                <Textarea
                                  value={newHelpChosenForYou.description}
                                  onChange={(e) =>
                                    setNewHelpChosenForYou({
                                      ...newHelpChosenForYou,
                                      description: e.target.value,
                                    })
                                  }
                                  placeholder="Brief description"
                                  rows={2}
                                  className="mb-2"
                                />
                                <Input
                                  value={newHelpChosenForYou.link}
                                  onChange={(e) =>
                                    setNewHelpChosenForYou({
                                      ...newHelpChosenForYou,
                                      link: e.target.value,
                                    })
                                  }
                                  placeholder="Link slug (optional)"
                                  className="mb-2"
                                />
                                <Textarea
                                  value={newHelpChosenForYou.content}
                                  onChange={(e) =>
                                    setNewHelpChosenForYou({
                                      ...newHelpChosenForYou,
                                      content: e.target.value,
                                    })
                                  }
                                  placeholder="Additional content (optional)"
                                  rows={2}
                                  className="mb-2"
                                />

                                <Button
                                  type="button"
                                  size="sm"
                                  onClick={() => {
                                    if (
                                      newHelpChosenForYou.title?.trim() &&
                                      newHelpChosenForYou.description?.trim()
                                    ) {
                                      const updatedQuestions = [
                                        ...quickQuestions,
                                      ];
                                      if (
                                        !updatedQuestions[index]
                                          .helpChosenForYou
                                      ) {
                                        updatedQuestions[
                                          index
                                        ].helpChosenForYou = [];
                                      }
                                      updatedQuestions[
                                        index
                                      ].helpChosenForYou.push({
                                        ...newHelpChosenForYou,
                                        title: newHelpChosenForYou.title.trim(),
                                        description:
                                          newHelpChosenForYou.description.trim(),
                                        link:
                                          newHelpChosenForYou.link?.trim() ||
                                          undefined,
                                        content:
                                          newHelpChosenForYou.content?.trim() ||
                                          undefined,
                                        pdf_url:
                                          newHelpChosenForYou.pdf_url?.trim() ||
                                          undefined,
                                      });
                                      setQuickQuestions(updatedQuestions);
                                      setNewHelpChosenForYou({
                                        title: "",
                                        description: "",
                                        link: "",
                                        content: "",
                                        pdf_url: "",
                                      });
                                      setPdfFile(null);
                                      toast.success(
                                        "Help item added successfully",
                                      );
                                    } else {
                                      toast.error(
                                        "Please fill in title and description",
                                      );
                                    }
                                  }}
                                  className="w-full"
                                >
                                  Add Help Item
                                </Button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}

                    {quickQuestions.length < 3 && (
                      <div className="space-y-2 p-3 bg-accent/30 rounded-lg">
                        <Input
                          value={newQuickQuestion.question}
                          onChange={(e) =>
                            setNewQuickQuestion({
                              ...newQuickQuestion,
                              question: e.target.value,
                            })
                          }
                          placeholder="New quick question"
                        />
                        <Textarea
                          value={newQuickQuestion.pdfText}
                          onChange={(e) =>
                            setNewQuickQuestion({
                              ...newQuickQuestion,
                              pdfText: e.target.value,
                            })
                          }
                          placeholder="Description"
                          rows={2}
                        />

                        <Button
                          type="button"
                          size="sm"
                          onClick={handleAddQuickQuestion}
                          className="w-full"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Add Quick Question
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Additional Q&A */}
              <div className="border-t pt-4">
                <button
                  type="button"
                  onClick={() =>
                    setShowAdditionalQAEditor(!showAdditionalQAEditor)
                  }
                  className="flex items-center gap-2 w-full p-2 hover:bg-muted rounded-md font-medium"
                >
                  {showAdditionalQAEditor ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                  View More Q&A ({additionalQA.length})
                </button>

                {showAdditionalQAEditor && (
                  <div className="space-y-3 mt-4">
                    {additionalQA.map((qa, index) => (
                      <div
                        key={index}
                        className="p-3 bg-muted rounded-lg space-y-2"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p className="text-sm font-medium text-foreground">
                              {qa.question}
                            </p>
                            <p className="text-xs text-muted-foreground line-clamp-2">
                              {qa.answer}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleDeleteAdditionalQA(index)}
                            className="p-1 hover:bg-destructive/10 rounded"
                          >
                            <X className="w-4 h-4 text-destructive" />
                          </button>
                        </div>
                      </div>
                    ))}

                    <div className="space-y-2 p-3 bg-accent/30 rounded-lg">
                      <Input
                        value={newAdditionalQA.question}
                        onChange={(e) =>
                          setNewAdditionalQA({
                            ...newAdditionalQA,
                            question: e.target.value,
                          })
                        }
                        placeholder="New question"
                      />
                      <Textarea
                        value={newAdditionalQA.answer}
                        onChange={(e) =>
                          setNewAdditionalQA({
                            ...newAdditionalQA,
                            answer: e.target.value,
                          })
                        }
                        placeholder="Answer to the question"
                        rows={2}
                      />
                      <Button
                        type="button"
                        size="sm"
                        onClick={handleAddAdditionalQA}
                        className="w-full"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Q&A Item
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between border-t pt-4">
                <Label htmlFor="is_published">Published</Label>
                <Switch
                  id="is_published"
                  checked={formData.is_published}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, is_published: checked })
                  }
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={
                    createMutation.isPending || updateMutation.isPending
                  }
                >
                  {(createMutation.isPending || updateMutation.isPending) && (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  )}
                  {editingTopic ? "Update" : "Create"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Topics List */}
      <div className="admin-card">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
          </div>
        ) : topics.length === 0 ? (
          <div className="text-center py-12">
            <FolderTree className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              No topics yet. Add your first topic!
            </p>
          </div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th className="w-12"></th>
                <th>Topic</th>
                <th>Quick Q&A</th>
                <th>Additional Q&A</th>
                <th>Help Items</th>
                <th>Status</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {topics.map((topic: Topic, index: number) => (
                <tr key={topic._id} className="animate-fade-in">
                  <td>
                    <div className="flex flex-col gap-1">
                      <button
                        onClick={() => moveItem(index, "up")}
                        disabled={index === 0}
                        className="drag-handle disabled:opacity-30"
                      >
                        <GripVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                  <td>
                    <div>
                      <p className="font-medium text-foreground">
                        {topic.name}
                      </p>
                      {topic.description && (
                        <p className="text-sm text-muted-foreground line-clamp-1">
                          {topic.description}
                        </p>
                      )}
                    </div>
                  </td>
                  <td>
                    <span className="text-sm text-muted-foreground">
                      {topic.quickQuestions?.length || 0}/3 Q&A
                    </span>
                  </td>
                  <td>
                    <span className="text-sm text-muted-foreground">
                      {topic.additionalQA?.length || 0} Q&A
                    </span>
                  </td>
                  <td>
                    <span className="text-sm text-muted-foreground">
                      {topic.quickQuestions?.reduce(
                        (total, qq) =>
                          total + (qq.helpChosenForYou?.length || 0),
                        0,
                      ) || 0}{" "}
                      Help Items
                    </span>
                  </td>
                  <td>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        topic.is_published
                          ? "bg-success/10 text-success"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {topic.is_published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td>
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleEdit(topic)}
                        className="action-btn p-2 hover:bg-muted rounded-md"
                      >
                        <Pencil className="w-4 h-4 text-muted-foreground" />
                      </button>
                      <button
                        onClick={() => deleteMutation.mutate(topic._id)}
                        className="action-btn p-2 hover:bg-destructive/10 rounded-md"
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

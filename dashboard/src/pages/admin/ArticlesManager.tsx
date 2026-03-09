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
  FileText,
  ExternalLink,
  X,
  Upload,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { toast } from "sonner";

interface Section {
  question: string;
  answer: string;
}

interface HelpItem {
  title: string;
  description: string;
  link?: string;
  pdf_url?: string;
  content?: string;
}

interface Article {
  _id: string;
  title: string;
  description: string | null;
  slug: string;
  content: string | null;
  pdf_url: string | null;
  image_url: string | null;
  is_published: boolean;
  position: number;
  sections: Section[];
  helpChosenForYou?: HelpItem[];
}

export default function ArticlesManager() {
  const [isOpen, setIsOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [showContentEditor, setShowContentEditor] = useState(false);
  const [showSectionsEditor, setShowSectionsEditor] = useState(false);
  const [showHelpEditor, setShowHelpEditor] = useState(false);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [sections, setSections] = useState<Section[]>([]);
  const [helpChosenForYou, setHelpChosenForYou] = useState<HelpItem[]>([]);
  const [newSection, setNewSection] = useState({ question: "", answer: "" });
  const [newHelpItem, setNewHelpItem] = useState({
    title: "",
    description: "",
    link: "",
    pdf_url: "",
    content: "",
  });
  const [helpItemPdfFile, setHelpItemPdfFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    slug: "",
    content: "",
    is_published: true,
  });

  const queryClient = useQueryClient();

  const { data: articles = [], isLoading } = useQuery({
    queryKey: ["admin-articles"],
    queryFn: async () => {
      const response = await fetch("/api/articles");
      if (!response.ok) throw new Error("Failed to fetch articles");
      return response.json();
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      const maxPosition =
        articles.length > 0
          ? Math.max(...articles.map((a: Article) => a.position)) + 1
          : 0;

      const response = await fetch("/api/articles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          title: data.title,
          description: data.description || null,
          slug: data.slug,
          content: data.content || null,
          is_published: data.is_published,
          sections: data.sections || [],
          helpChosenForYou: data.helpChosenForYou || [],
          position: maxPosition,
        }),
      });

      if (!response.ok) throw new Error("Failed to create article");
      return response.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["admin-articles"] });
      toast.success("Article created successfully");
      resetForm();
    },
    onError: (error) => {
      toast.error("Failed to create article");
      console.error(error);
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      const response = await fetch(`/api/articles/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          title: data.title,
          description: data.description || null,
          slug: data.slug,
          content: data.content || null,
          is_published: data.is_published,
          sections: data.sections || [],
          helpChosenForYou: data.helpChosenForYou || [],
        }),
      });

      if (!response.ok) throw new Error("Failed to update article");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-articles"] });
      toast.success("Article updated successfully");
      resetForm();
    },
    onError: (error) => {
      toast.error("Failed to update article");
      console.error(error);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/articles/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!response.ok) throw new Error("Failed to delete article");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-articles"] });
      toast.success("Article deleted");
    },
    onError: (error) => {
      toast.error("Failed to delete article");
      console.error(error);
    },
  });

  const uploadPdfMutation = useMutation({
    mutationFn: async ({ file, isNew }: { file: File; isNew: boolean }) => {
      const formDataToSend = new FormData();
      formDataToSend.append("pdf", file);

      const endpoint = isNew
        ? "/api/articles/temp-upload-pdf"
        : `/api/articles/${editingArticle?._id}/upload-pdf`;

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
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["admin-articles"] });
      setFormData((prev) => ({
        ...prev,
        content: data.extracted_text,
      }));
      toast.success("PDF uploaded and text extracted");
      setPdfFile(null);
      if (editingArticle) {
        // For editing, reset form after successful upload
        resetForm();
      }
    },
    onError: (error) => {
      toast.error("Failed to upload PDF");
      console.error(error);
    },
  });

  const reorderMutation = useMutation({
    mutationFn: async (reorderedArticles: Article[]) => {
      const response = await fetch("/api/articles/reorder", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ articles: reorderedArticles }),
      });
      if (!response.ok) throw new Error("Failed to reorder articles");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-articles"] });
    },
  });

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      slug: "",
      content: "",
      is_published: true,
    });
    setEditingArticle(null);
    setSections([]);
    setHelpChosenForYou([]);
    setNewSection({ question: "", answer: "" });
    setNewHelpItem({
      title: "",
      description: "",
      link: "",
      pdf_url: "",
      content: "",
    });
    setPdfFile(null);
    setHelpItemPdfFile(null);
    setShowContentEditor(false);
    setShowSectionsEditor(false);
    setShowHelpEditor(false);
    setIsOpen(false);
  };

  const handleEdit = (article: Article) => {
    setEditingArticle(article);
    setFormData({
      title: article.title,
      description: article.description || "",
      slug: article.slug,
      content: article.content || "",
      is_published: article.is_published,
    });
    setSections(article.sections || []);
    setHelpChosenForYou(article.helpChosenForYou || []);
    setIsOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const submitData = {
      title: formData.title,
      description: formData.description,
      slug: formData.slug,
      content: formData.content,
      is_published: formData.is_published,
      sections: sections,
      helpChosenForYou: helpChosenForYou,
    };

    if (editingArticle) {
      updateMutation.mutate({ id: editingArticle._id, data: submitData });
    } else {
      createMutation.mutate(submitData);
    }
  };

  const handleAddSection = () => {
    if (newSection.question && newSection.answer) {
      setSections([...sections, newSection]);
      setNewSection({ question: "", answer: "" });
    } else {
      toast.error("Please fill in both question and answer");
    }
  };

  const handleDeleteSection = (index: number) => {
    setSections(sections.filter((_, i) => i !== index));
  };

  const handleAddHelpItem = () => {
    if (newHelpItem.title && newHelpItem.description) {
      setHelpChosenForYou([...helpChosenForYou, newHelpItem]);
      setNewHelpItem({
        title: "",
        description: "",
        link: "",
        pdf_url: "",
        content: "",
      });
    } else {
      toast.error("Please fill in title and description");
    }
  };

  const handleDeleteHelpItem = (index: number) => {
    setHelpChosenForYou(helpChosenForYou.filter((_, i) => i !== index));
  };

  const moveItem = (index: number, direction: "up" | "down") => {
    const newArticles = [...articles];
    const targetIndex = direction === "up" ? index - 1 : index + 1;

    if (targetIndex < 0 || targetIndex >= newArticles.length) return;

    [newArticles[index], newArticles[targetIndex]] = [
      newArticles[targetIndex],
      newArticles[index],
    ];
    reorderMutation.mutate(newArticles);
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">
            Popular Articles
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage articles, content, and FAQ sections
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
              Add Article
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingArticle ? "Edit Article" : "Add Article"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              {/* Basic Info */}
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder="What is Wander With Food?"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="slug">Slug *</Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      slug: e.target.value.toLowerCase().replace(/\s+/g, "-"),
                    })
                  }
                  placeholder="what-is-wander-with-food"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Short Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Brief description shown on the card..."
                  rows={2}
                />
              </div>

              {/* Content Section */}
              <div className="border-t pt-4">
                <button
                  type="button"
                  onClick={() => setShowContentEditor(!showContentEditor)}
                  className="flex items-center gap-2 w-full p-2 hover:bg-muted rounded-md font-medium"
                >
                  {showContentEditor ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                  Article Content
                </button>

                {showContentEditor && (
                  <div className="space-y-3 mt-4">
                    <div className="space-y-2">
                      <Label>Upload PDF to Extract Content</Label>
                      <div className="flex gap-2">
                        <Input
                          type="file"
                          accept=".pdf"
                          onChange={(e) =>
                            setPdfFile(e.target.files?.[0] || null)
                          }
                        />
                        <Button
                          type="button"
                          onClick={() => {
                            if (pdfFile) {
                              uploadPdfMutation.mutate({
                                file: pdfFile,
                                isNew: !editingArticle,
                              });
                            }
                          }}
                          disabled={!pdfFile || uploadPdfMutation.isPending}
                        >
                          {uploadPdfMutation.isPending ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Upload className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                      {editingArticle?.pdf_url && (
                        <p className="text-sm text-muted-foreground">
                          PDF uploaded: {editingArticle.pdf_url}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="content">Article Content (Answer)</Label>
                      <Textarea
                        id="content"
                        value={formData.content}
                        onChange={(e) =>
                          setFormData({ ...formData, content: e.target.value })
                        }
                        placeholder="Full article content/answer..."
                        rows={6}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Sections/FAQ */}
              <div className="border-t pt-4">
                <button
                  type="button"
                  onClick={() => setShowSectionsEditor(!showSectionsEditor)}
                  className="flex items-center gap-2 w-full p-2 hover:bg-muted rounded-md font-medium"
                >
                  {showSectionsEditor ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                  More in This Section ({sections.length})
                </button>

                {showSectionsEditor && (
                  <div className="space-y-3 mt-4">
                    {sections.map((section, index) => (
                      <div
                        key={index}
                        className="p-3 bg-muted rounded-lg space-y-2"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p className="text-sm font-medium text-foreground">
                              {section.question}
                            </p>
                            <p className="text-xs text-muted-foreground line-clamp-2">
                              {section.answer}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleDeleteSection(index)}
                            className="p-1 hover:bg-destructive/10 rounded"
                          >
                            <X className="w-4 h-4 text-destructive" />
                          </button>
                        </div>
                      </div>
                    ))}

                    <div className="space-y-2 p-3 bg-accent/30 rounded-lg">
                      <Input
                        value={newSection.question}
                        onChange={(e) =>
                          setNewSection({
                            ...newSection,
                            question: e.target.value,
                          })
                        }
                        placeholder="New question"
                      />
                      <Textarea
                        value={newSection.answer}
                        onChange={(e) =>
                          setNewSection({
                            ...newSection,
                            answer: e.target.value,
                          })
                        }
                        placeholder="Answer to the question"
                        rows={2}
                      />
                      <Button
                        type="button"
                        size="sm"
                        onClick={handleAddSection}
                        className="w-full"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Q&A Item
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              {/* Help Chosen For You */}
              <div className="border-t pt-4">
                <button
                  type="button"
                  onClick={() => setShowHelpEditor(!showHelpEditor)}
                  className="flex items-center gap-2 w-full p-2 hover:bg-muted rounded-md font-medium"
                >
                  {showHelpEditor ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                  Help Chosen For You ({helpChosenForYou.length})
                </button>

                {showHelpEditor && (
                  <div className="space-y-3 mt-4">
                    {helpChosenForYou.map((item, index) => (
                      <div
                        key={index}
                        className="p-3 bg-muted rounded-lg space-y-2"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p className="text-sm font-medium text-foreground">
                              {item.title}
                            </p>
                            <p className="text-xs text-muted-foreground line-clamp-2">
                              {item.description}
                            </p>
                            {item.link && (
                              <p className="text-xs text-accent-foreground">
                                Link: {item.link}
                              </p>
                            )}
                          </div>
                          <button
                            type="button"
                            onClick={() => handleDeleteHelpItem(index)}
                            className="p-1 hover:bg-destructive/10 rounded"
                          >
                            <X className="w-4 h-4 text-destructive" />
                          </button>
                        </div>
                      </div>
                    ))}

                    <div className="space-y-2 p-3 bg-accent/30 rounded-lg">
                      <Input
                        value={newHelpItem.title}
                        onChange={(e) =>
                          setNewHelpItem({
                            ...newHelpItem,
                            title: e.target.value,
                          })
                        }
                        placeholder="Help item title"
                      />
                      <Textarea
                        value={newHelpItem.description}
                        onChange={(e) =>
                          setNewHelpItem({
                            ...newHelpItem,
                            description: e.target.value,
                          })
                        }
                        placeholder="Description of the help item"
                        rows={2}
                      />
                      <Input
                        value={newHelpItem.link}
                        onChange={(e) =>
                          setNewHelpItem({
                            ...newHelpItem,
                            link: e.target.value,
                          })
                        }
                        placeholder="Optional link (e.g., /article/slug)"
                      />

                      <Textarea
                        value={newHelpItem.content}
                        onChange={(e) =>
                          setNewHelpItem({
                            ...newHelpItem,
                            content: e.target.value,
                          })
                        }
                        placeholder="Help item content (auto-filled from PDF or manual entry)"
                        rows={3}
                      />

                      <Button
                        type="button"
                        size="sm"
                        onClick={handleAddHelpItem}
                        className="w-full"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Help Item
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
                  {editingArticle ? "Update" : "Create"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Articles List */}
      <div className="admin-card">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
          </div>
        ) : articles.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              No articles yet. Add your first article!
            </p>
          </div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th className="w-12"></th>
                <th>Title</th>
                <th>Sections</th>
                <th>Status</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((article: Article, index: number) => (
                <tr key={article._id} className="animate-fade-in">
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
                        {article.title}
                      </p>
                      {article.description && (
                        <p className="text-sm text-muted-foreground line-clamp-1">
                          {article.description}
                        </p>
                      )}
                      {article.pdf_url && (
                        <p className="text-xs text-accent-foreground bg-accent/20 rounded px-2 py-1 w-fit mt-1">
                          PDF attached
                        </p>
                      )}
                    </div>
                  </td>
                  <td>
                    <span className="text-sm text-muted-foreground">
                      {article.sections?.length || 0} Q&A
                    </span>
                  </td>
                  <td>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        article.is_published
                          ? "bg-success/10 text-success"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {article.is_published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td>
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleEdit(article)}
                        className="action-btn p-2 hover:bg-muted rounded-md"
                      >
                        <Pencil className="w-4 h-4 text-muted-foreground" />
                      </button>
                      <button
                        onClick={() => deleteMutation.mutate(article._id)}
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

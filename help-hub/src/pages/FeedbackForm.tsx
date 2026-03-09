import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import emailjs from "emailjs-com";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";

const FeedbackForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    emailjs.init("katJyt0NEEicyS-mq");
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    state: "",
    city: "",
    platform: "",
    issueCategory: "",
    elaboration: "",
    evidence: null as File | null,
    declaration: false,
  });

  const issueCategories = {
    "Restaurant Listing - L1": [
      "Restaurant not visible",
      "Incorrect restaurant distance",
      "Restaurant category mismatch",
      "Restaurant details incorrect",
    ],
    "Dish Information - L1": [
      "Dish missing",
      "Incorrect dish pricing",
      "Dish availability mismatch",
    ],
    "Rewards & Reviews - L2": [
      "Rating not submitted",
      "Points not credited",
      "User level not updated",
      "Review not visible",
    ],
    "Offers & Events - L1": [
      "Expired offer shown",
      "Offer not visible",
      "Incorrect event info",
    ],
    "Account & Preferences - L2": [
      "Unable to update profile",
      "Preferences not saved",
      "Login issue",
      "Account deletion",
    ],
    "Technical - L2": [
      "App crash",
      "App slow",
      "QR code issue",
      "Feature not working",
      "Security concern",
    ],
    "Other - Manual Level Allocation": ["Manual Level Allocation"],
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (100KB) and type
      if (file.size > 100 * 1024) {
        setError("File size must be less than 100KB");
        return;
      }
      if (!["image/jpeg", "image/png", "application/pdf"].includes(file.type)) {
        setError("Only PDF, PNG, JPG files are allowed");
        return;
      }
      setError("");
      setFormData((prev) => ({ ...prev, evidence: file }));
    }
  };

  const validateForm = () => {
    if (!formData.name.trim()) return "Name is required";
    if (
      !formData.email.trim() ||
      !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)
    )
      return "Valid email is required";
    if (!formData.contact.trim() || !/^\d{10}$/.test(formData.contact))
      return "Valid 10-digit contact number is required";
    if (!formData.state.trim()) return "State is required";
    if (!formData.city.trim()) return "City is required";
    if (!formData.platform) return "Platform is required";
    if (!formData.issueCategory) return "Issue category is required";
    if (!formData.elaboration.trim()) return "Elaboration is required";
    if (formData.elaboration.length > 2000)
      return "Elaboration must be less than 2000 characters";
    if (!formData.declaration) return "You must accept the declaration";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    try {
      const submitData = new FormData();
      submitData.append("name", formData.name);
      submitData.append("email", formData.email);
      submitData.append("contact", formData.contact);
      submitData.append("state", formData.state);
      submitData.append("city", formData.city);
      submitData.append("platform", formData.platform);
      submitData.append("issueCategory", formData.issueCategory);
      submitData.append("elaboration", formData.elaboration);
      if (formData.evidence) {
        submitData.append("evidence", formData.evidence);
      }

      const result = await api.submitSupportFeedback(submitData);

      // Send confirmation email via EmailJS (optional - doesn't block submission)
      try {
        await emailjs.send("service_7uj6se7", "template_yq6ekpx", {
          to_name: formData.name,
          to_email: formData.email,
          contact: formData.contact,
          state: formData.state,
          city: formData.city,
          ticket_id: result.ticketId,
          submitted_date: new Date().toLocaleDateString(),
          form_type: "Support",
          platform: formData.platform,
          issue_category: formData.issueCategory,
          description: formData.elaboration,
        });
      } catch (emailErr) {
        // Email sending failed - but don't block form success
        // This might happen if template ID doesn't match
      }

      setSuccess(
        `Your support request has been submitted successfully. Ticket ID: ${result.ticketId}`,
      );
      // Reset form
      setFormData({
        name: "",
        email: "",
        contact: "",
        state: "",
        city: "",
        platform: "",
        issueCategory: "",
        elaboration: "",
        evidence: null,
        declaration: false,
      });
    } catch (err) {
      setError("Failed to submit support request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Get Support</h1>

        {error && (
          <Alert className="mb-6 border-red-200 bg-red-50">
            <AlertDescription className="text-red-800">
              {error}
            </AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="mb-6 border-green-200 bg-green-50">
            <AlertDescription className="text-green-800">
              {success}
            </AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                required
                className="bg-gray-50 border border-gray-300"
              />
            </div>

            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                required
                className="bg-gray-50 border border-gray-300"
              />
            </div>

            <div>
              <Label htmlFor="contact">Contact *</Label>
              <Input
                id="contact"
                type="tel"
                value={formData.contact}
                onChange={(e) => handleInputChange("contact", e.target.value)}
                required
                className="bg-gray-50 border border-gray-300"
              />
            </div>

            <div>
              <Label htmlFor="state">State *</Label>
              <Input
                id="state"
                type="text"
                value={formData.state}
                onChange={(e) => handleInputChange("state", e.target.value)}
                required
                className="bg-gray-50 border border-gray-300"
              />
            </div>

            <div>
              <Label htmlFor="city">City *</Label>
              <Input
                id="city"
                type="text"
                value={formData.city}
                onChange={(e) => handleInputChange("city", e.target.value)}
                required
                className="bg-gray-50 border border-gray-300"
              />
            </div>

            <div>
              <Label htmlFor="platform">
                Let us know where did you encountered the issue *
              </Label>
              <Select
                value={formData.platform}
                onValueChange={(value) => handleInputChange("platform", value)}
              >
                <SelectTrigger className="bg-gray-50 border border-gray-300">
                  <SelectValue placeholder="Select platform" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Android App">Android App</SelectItem>
                  <SelectItem value="iOS App">iOS App</SelectItem>
                  <SelectItem value="Website">Website</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="issueCategory">
              Pick the issue category that relates to your concern *
            </Label>
            <Select
              value={formData.issueCategory}
              onValueChange={(value) =>
                handleInputChange("issueCategory", value)
              }
            >
              <SelectTrigger className="bg-gray-50 border border-gray-300">
                <SelectValue placeholder="Select issue category" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(issueCategories).map(
                  ([category, subcategories]) => (
                    <div key={category}>
                      <div className="px-2 py-1.5 text-sm font-semibold text-muted-foreground">
                        {category}
                      </div>
                      {subcategories.map((sub) => (
                        <SelectItem
                          key={`${category} - ${sub}`}
                          value={`${category} - ${sub}`}
                        >
                          {sub}
                        </SelectItem>
                      ))}
                    </div>
                  ),
                )}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="elaboration">
              Elaborate us on what went wrong *
            </Label>
            <Textarea
              id="elaboration"
              value={formData.elaboration}
              onChange={(e) => handleInputChange("elaboration", e.target.value)}
              maxLength={2000}
              rows={4}
              required
              className="bg-gray-50 border border-gray-300"
            />
            <div className="text-sm text-muted-foreground mt-1">
              {formData.elaboration.length}/2000 characters
            </div>
          </div>

          <div>
            <Label htmlFor="evidence">
              Upload an evidence (PDF/PNG/JPG, max 100KB)
            </Label>
            <Input
              id="evidence"
              type="file"
              accept=".pdf,.png,.jpg,.jpeg"
              onChange={handleFileChange}
              className="bg-gray-50 border border-gray-300"
            />
          </div>

          <div className="flex items-start space-x-2">
            <Checkbox
              id="declaration"
              checked={formData.declaration}
              onCheckedChange={(checked) =>
                handleInputChange("declaration", checked as boolean)
              }
            />
            <Label htmlFor="declaration" className="text-sm leading-relaxed">
              Your submission will be reviewed and updated shortly. Only one
              submission per contact number is allowed. Multiple attempts might
              flag your submission. If you wish to know more on how we operate,
              please check out our Help Desk.
            </Label>
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default FeedbackForm;

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
import { Loader2, AlertCircle, CheckCircle } from "lucide-react";

const GrievanceForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [fileName, setFileName] = useState("");

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
    incidentDate: "",
    evidence: null as File | null,
    declaration: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const indianStates = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
  ];

  const issueCategories = [
    "Data Privacy Violation",
    "Payment Issues",
    "Harassment or Misconduct",
    "Platform Abuse",
    "Legal or Compliance Issue",
    "Other",
  ];

  const platforms = [
    "Wander With Food App",
    "Wander With Food Website",
    "Other",
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Contact validation
    const contactRegex = /^\d{10}$/;
    if (!formData.contact.trim()) {
      newErrors.contact = "Contact number is required";
    } else if (!contactRegex.test(formData.contact.replace(/\D/g, ""))) {
      newErrors.contact = "Contact must be a valid 10-digit number";
    }

    // State validation
    if (!formData.state) {
      newErrors.state = "State is required";
    }

    // City validation
    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }

    // Platform validation
    if (!formData.platform) {
      newErrors.platform = "Please select where you encountered the issue";
    }

    // Issue Category validation
    if (!formData.issueCategory) {
      newErrors.issueCategory = "Please select an issue category";
    }

    // Elaboration validation
    if (!formData.elaboration.trim()) {
      newErrors.elaboration = "Please provide details about the issue";
    }

    // Declaration validation
    if (!formData.declaration) {
      newErrors.declaration = "You must confirm the information is true";
    }

    // Evidence validation
    if (formData.evidence) {
      const maxSize = 100 * 1024; // 100 KB
      const allowedTypes = ["application/pdf", "image/png", "image/jpeg"];

      if (formData.evidence.size > maxSize) {
        newErrors.evidence = "File size must not exceed 100 KB";
      }

      if (!allowedTypes.includes(formData.evidence.type)) {
        newErrors.evidence = "Only PDF, PNG, and JPG files are allowed";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData((prev) => ({
        ...prev,
        evidence: file,
      }));
      setFileName(file.name);
    }
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      declaration: checked,
    }));
    if (errors.declaration) {
      setErrors((prev) => ({
        ...prev,
        declaration: "",
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const submitData = new FormData();
      submitData.append("name", formData.name);
      submitData.append("email", formData.email);
      submitData.append("contact", formData.contact.replace(/\D/g, ""));
      submitData.append("state", formData.state);
      submitData.append("city", formData.city);
      submitData.append("platform", formData.platform);
      submitData.append("issueCategory", formData.issueCategory);
      submitData.append("elaboration", formData.elaboration);
      if (formData.incidentDate) {
        submitData.append("incidentDate", formData.incidentDate);
      }
      if (formData.evidence) {
        submitData.append("evidence", formData.evidence);
      }

      console.log("Submitting grievance to backend...");
      const response = await api.submitGrievance(submitData);
      console.log("Grievance submitted successfully:", response);

      // Send confirmation email via EmailJS
      try {
        console.log("Attempting to send EmailJS email...");
        const emailParams = {
          to_name: formData.name,
          to_email: formData.email,
          contact: formData.contact,
          state: formData.state,
          city: formData.city,
          platform: formData.platform,
          grievance_category: formData.issueCategory,
          description: formData.elaboration,
          incident_date: formData.incidentDate || "Not provided",
          ticket_id: response.ticketId,
          submitted_date: new Date().toLocaleDateString(),
          form_type: "Grievance",
        };

        const emailResult = await emailjs.send(
          "service_7uj6se7",
          "template_yq6ekpx",
          emailParams,
          "katJyt0NEEicyS-mq",
        );

        console.log("EmailJS send result:", emailResult);
        console.log("Email sent successfully!");
      } catch (emailErr) {
        console.error("EmailJS send failed:", emailErr);
        // Email sending failed - but don't block form success
      }

      setSuccess(
        `Your grievance has been submitted successfully. Ticket ID: ${response.ticketId}`,
      );
      setFormData({
        name: "",
        email: "",
        contact: "",
        state: "",
        city: "",
        platform: "",
        issueCategory: "",
        elaboration: "",
        incidentDate: "",
        evidence: null,
        declaration: false,
      });
      setFileName("");

      // Redirect after 2 seconds
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      console.error("Error submitting grievance:", err);
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Failed to submit grievance. Please ensure the backend server is running on http://localhost:5000";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <a
        href="http://localhost:3000"
        className="fixed top-4 left-4 z-[70] group inline-flex items-center gap-2 rounded-full border border-yellow-400/70 bg-yellow-50/90 px-4 py-2 text-sm font-semibold text-yellow-900 shadow-lg backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:bg-yellow-100 hover:shadow-xl active:translate-y-0 active:scale-[0.98] dark:border-yellow-300/50 dark:bg-zinc-900/85 dark:text-yellow-200 dark:hover:bg-zinc-800"
      >
        <span aria-hidden="true" className="transition-transform duration-300 group-hover:-translate-x-0.5">
          ←
        </span>
        <span>back to home</span>
      </a>
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-2xl p-8 relative border-2 border-yellow-500/30">
        {/* Logo at top right corner of form */}
        <div className="absolute top-4 right-4 z-10">
          <img src="/4 (1).png" alt="WWF Logo" className="h-12 w-12 sm:h-16 sm:w-16 object-contain" />
        </div>
        
        <div className="mb-8 pb-6 border-b-4 border-yellow-500">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            <span className="text-yellow-600">W2F</span> Grievance Submission
          </h1>
          <p className="text-gray-700 font-medium">
            Please provide detailed information about your grievance. We take
            your concerns seriously.
          </p>
        </div>

        {error && (
          <Alert className="mb-6 border-red-200 bg-red-50">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              {error}
            </AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="mb-6 border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              {success}
            </AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field */}
          <div>
            <Label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className={`border-2 border-gray-300 ${errors.name ? "border-red-500" : ""}`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <Label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email <span className="text-red-500">*</span>
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email address"
              className={`border-2 border-gray-300 ${errors.email ? "border-red-500" : ""}`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Contact Field */}
          <div>
            <Label
              htmlFor="contact"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Contact Number <span className="text-red-500">*</span>
            </Label>
            <Input
              id="contact"
              name="contact"
              type="tel"
              value={formData.contact}
              onChange={handleChange}
              placeholder="Enter your 10-digit mobile number"
              maxLength={10}
              className={`border-2 border-gray-300 ${errors.contact ? "border-red-500" : ""}`}
            />
            {errors.contact && (
              <p className="text-red-500 text-sm mt-1">{errors.contact}</p>
            )}
          </div>

          {/* State Dropdown */}
          <div>
            <Label
              htmlFor="state"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              State <span className="text-red-500">*</span>
            </Label>
            <Select
              value={formData.state}
              onValueChange={(value) => handleSelectChange("state", value)}
            >
              <SelectTrigger className={errors.state ? "border-red-500" : ""}>
                <SelectValue placeholder="Select your state" />
              </SelectTrigger>
              <SelectContent>
                {indianStates.map((state) => (
                  <SelectItem key={state} value={state}>
                    {state}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.state && (
              <p className="text-red-500 text-sm mt-1">{errors.state}</p>
            )}
          </div>

          {/* City Field */}
          <div>
            <Label
              htmlFor="city"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              City <span className="text-red-500">*</span>
            </Label>
            <Input
              id="city"
              name="city"
              type="text"
              value={formData.city}
              onChange={handleChange}
              placeholder="Enter your city"
              className={`border-2 border-gray-300 ${errors.city ? "border-red-500" : ""}`}
            />
            {errors.city && (
              <p className="text-red-500 text-sm mt-1">{errors.city}</p>
            )}
          </div>

          {/* Platform Selection */}
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-3">
              Where did you encounter the issue?{" "}
              <span className="text-red-500">*</span>
            </Label>
            <div className="space-y-2">
              {platforms.map((platform) => (
                <div key={platform} className="flex items-center">
                  <input
                    type="radio"
                    id={platform}
                    name="platform"
                    value={platform}
                    checked={formData.platform === platform}
                    onChange={handleChange}
                    className="w-4 h-4 text-blue-600"
                  />
                  <Label
                    htmlFor={platform}
                    className="ml-2 text-sm text-gray-700 cursor-pointer"
                  >
                    {platform}
                  </Label>
                </div>
              ))}
            </div>
            {errors.platform && (
              <p className="text-red-500 text-sm mt-1">{errors.platform}</p>
            )}
          </div>

          {/* Issue Category Dropdown */}
          <div>
            <Label
              htmlFor="issueCategory"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              My issue is related to <span className="text-red-500">*</span>
            </Label>
            <Select
              value={formData.issueCategory}
              onValueChange={(value) =>
                handleSelectChange("issueCategory", value)
              }
            >
              <SelectTrigger
                className={errors.issueCategory ? "border-red-500" : ""}
              >
                <SelectValue placeholder="Select issue category" />
              </SelectTrigger>
              <SelectContent>
                {issueCategories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.issueCategory && (
              <p className="text-red-500 text-sm mt-1">
                {errors.issueCategory}
              </p>
            )}
          </div>

          {/* Elaboration Field */}
          <div>
            <Label
              htmlFor="elaboration"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Elaborate on what went wrong{" "}
              <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="elaboration"
              name="elaboration"
              value={formData.elaboration}
              onChange={handleChange}
              placeholder="Please provide detailed information about your issue..."
              rows={5}
              className={`border-2 border-gray-300 ${errors.elaboration ? "border-red-500" : ""}`}
            />
            {errors.elaboration && (
              <p className="text-red-500 text-sm mt-1">{errors.elaboration}</p>
            )}
          </div>

          {/* Incident Date Field */}
          <div>
            <Label
              htmlFor="incidentDate"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Date of Incident (Optional)
            </Label>
            <Input
              id="incidentDate"
              name="incidentDate"
              type="date"
              value={formData.incidentDate}
              onChange={handleChange}
              className="border-2 border-gray-300"
            />
          </div>

          {/* File Upload Field */}
          <div>
            <Label
              htmlFor="evidence"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Upload an Evidence (Optional)
            </Label>
            <div className="flex items-center gap-3">
              <Input
                id="evidence"
                type="file"
                onChange={handleFileChange}
                accept=".pdf,.png,.jpg,.jpeg"
                className="flex-1 border-2 border-gray-300"
              />
            </div>
            {fileName && (
              <p className="text-sm text-green-600 mt-2">✓ {fileName}</p>
            )}
            <p className="text-xs text-gray-500 mt-1">
              Limit to 100 KB - PDF/PNG/JPG
            </p>
            {errors.evidence && (
              <p className="text-red-500 text-sm mt-1">{errors.evidence}</p>
            )}
          </div>

          {/* Declaration Checkbox */}
          <div>
            <div className="flex items-start gap-3">
              <Checkbox
                id="declaration"
                checked={formData.declaration}
                onCheckedChange={handleCheckboxChange}
              />
              <Label
                htmlFor="declaration"
                className="text-sm text-gray-700 cursor-pointer leading-relaxed"
              >
                I confirm the information provided is true to the best of my
                knowledge. <span className="text-red-500">*</span>
              </Label>
            </div>
            {errors.declaration && (
              <p className="text-red-500 text-sm mt-1">{errors.declaration}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-bold text-lg py-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Submitting...
                </span>
              ) : (
                "Submit Grievance"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GrievanceForm;

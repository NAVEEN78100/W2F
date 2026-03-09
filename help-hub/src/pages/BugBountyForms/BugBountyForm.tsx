import React, { useState } from "react";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Upload, CheckCircle, AlertCircle } from "lucide-react";
import emailjs from "emailjs-com";
interface FormData {
  name: string;
  email: string;
  contact: string;
  state: string;
  city: string;
  operatingSystem: string;
  bugDescription: string;
  referenceFile: File | null;
}

const BugBountyForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    contact: "",
    state: "",
    city: "",
    operatingSystem: "",
    bugDescription: "",
    referenceFile: null,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(
    null,
  );
  const [ticketId, setTicketId] = useState<string>("");

  const states = [
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
    "Delhi",
    "Jammu and Kashmir",
    "Ladakh",
    "Puducherry",
    "Chandigarh",
    "Andaman and Nicobar Islands",
    "Dadra and Nagar Haveli and Daman and Diu",
    "Lakshadweep",
  ];

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

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
    const contactRegex = /^[6-9]\d{9}$/;
    if (!formData.contact.trim()) {
      newErrors.contact = "Contact number is required";
    } else if (!contactRegex.test(formData.contact)) {
      newErrors.contact =
        "Please enter a valid 10-digit mobile number starting with 6-9";
    }

    // State validation
    if (!formData.state) {
      newErrors.state = "Please select your state";
    }

    // City validation
    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }

    // Operating System validation
    if (!formData.operatingSystem) {
      newErrors.operatingSystem = "Please select the operating system";
    }

    // Bug description validation
    if (!formData.bugDescription.trim()) {
      newErrors.bugDescription = "Bug description is required";
    } else if (formData.bugDescription.length > 1000) {
      newErrors.bugDescription =
        "Bug description must be less than 1000 characters";
    }

    // File validation
    if (formData.referenceFile) {
      const allowedTypes = ["image/jpeg", "image/png"];
      const maxSize = 100 * 1024; // 100KB

      if (!allowedTypes.includes(formData.referenceFile.type)) {
        newErrors.referenceFile = "Only PNG and JPG files are allowed";
      } else if (formData.referenceFile.size > maxSize) {
        newErrors.referenceFile = "File size must be less than 100KB";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const generateTicketId = async (): Promise<string> => {
    try {
      const response = await fetch("/api/bug-bounty-ticket");
      if (!response.ok) {
        throw new Error("Failed to generate ticket ID");
      }
      const data = await response.json();
      return data.ticketId;
    } catch (error) {
      console.error("Error generating ticket ID:", error);
      // Fallback ticket ID generation
      const year = "26";
      const timestamp = Date.now().toString().slice(-4);
      return `W2F-${year}-BB-${timestamp.padStart(5, "0")}`;
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, referenceFile: file }));
    if (errors.referenceFile) {
      setErrors((prev) => ({ ...prev, referenceFile: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Generate ticket ID
      const generatedTicketId = await generateTicketId();
      setTicketId(generatedTicketId);

      // Prepare form data for submission
      const submitData = new FormData();
      submitData.append("name", formData.name);
      submitData.append("email", formData.email);
      submitData.append("contact", formData.contact);
      submitData.append("state", formData.state);
      submitData.append("city", formData.city);
      submitData.append("operatingSystem", formData.operatingSystem);
      submitData.append("bugDescription", formData.bugDescription);
      submitData.append("ticketId", generatedTicketId);

      if (formData.referenceFile) {
        submitData.append("referenceFile", formData.referenceFile);
      }

      // Submit to backend
      const response = await fetch("/api/bug-bounty", {
        method: "POST",
        body: submitData,
      });

      if (!response.ok) {
        throw new Error("Failed to submit bug bounty report");
      }

      // Send confirmation email using emailjs
      await emailjs.send(
        "service_7uj6se7",
        "template_yq6ekpx",
        {
          to_name: formData.name,
          to_email: formData.email,
          form_type: "Bug Bounty",
          ticket_id: generatedTicketId,
          platform: "N/A",
          issue_category: "Bug Report",
          incident_date: "N/A",
          submitted_date: new Date().toLocaleDateString(),
          description: `Bug Report: ${formData.bugDescription.substring(0, 200)}...`,
        },
        "katJyt0NEEicyS-mq",
      );

      setSubmitStatus("success");

      // Reset form
      setFormData({
        name: "",
        email: "",
        contact: "",
        state: "",
        city: "",
        operatingSystem: "",
        bugDescription: "",
        referenceFile: null,
      });
    } catch (error) {
      console.error("Submission error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800 py-8 px-4">
      <a
        href="http://localhost:3000"
        className="fixed top-4 left-4 z-[70] group inline-flex items-center gap-2 rounded-full border border-yellow-400/70 bg-yellow-50/90 px-4 py-2 text-sm font-semibold text-yellow-900 shadow-lg backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:bg-yellow-100 hover:shadow-xl active:translate-y-0 active:scale-[0.98] dark:border-yellow-300/50 dark:bg-zinc-900/85 dark:text-yellow-200 dark:hover:bg-zinc-800"
      >
        <span aria-hidden="true" className="transition-transform duration-300 group-hover:-translate-x-0.5">
          ←
        </span>
        <span>back to home</span>
      </a>
      <div className="max-w-2xl mx-auto">
        <Card className="relative border-2 border-yellow-500/30 shadow-2xl bg-white">
          {/* Logo at top right corner of form */}
          <div className="absolute top-4 right-4 z-10">
            <img src="/4 (1).png" alt="WWF Logo" className="h-12 w-12 sm:h-16 sm:w-16 object-contain" />
          </div>
          
          <CardHeader className="bg-gradient-to-r from-black to-gray-900 text-white border-b-4 border-yellow-500">
            <CardTitle className="text-2xl sm:text-3xl font-bold text-center text-yellow-400">
              W2F Bug Bounty Form
            </CardTitle>
            <p className="text-gray-300 text-center text-sm sm:text-base mt-2">
              Help us improve by reporting bugs and security issues
            </p>
          </CardHeader>
          <CardContent>
            {submitStatus === "success" && (
              <Alert className="mb-6 border-green-200 bg-green-50">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  <strong>Success!</strong> Your bug bounty report has been
                  submitted successfully.
                  <br />
                  <strong>Ticket ID:</strong> {ticketId}
                  <br />
                  You will receive a confirmation email shortly.
                </AlertDescription>
              </Alert>
            )}

            {submitStatus === "error" && (
              <Alert className="mb-6 border-red-200 bg-red-50">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-800">
                  <strong>Error!</strong> Failed to submit your bug bounty
                  report. Please try again.
                </AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className={`bg-gray-50 ${errors.name ? "border-red-500" : ""}`}
                  placeholder="Enter your full name"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className={`bg-gray-50 ${errors.email ? "border-red-500" : ""}`}
                  placeholder="Enter your email address"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              {/* Contact */}
              <div>
                <Label htmlFor="contact">Contact Number *</Label>
                <Input
                  id="contact"
                  type="tel"
                  value={formData.contact}
                  onChange={(e) => handleInputChange("contact", e.target.value)}
                  className={`bg-gray-50 ${errors.contact ? "border-red-500" : ""}`}
                  placeholder="Enter 10-digit mobile number"
                  maxLength={10}
                />
                {errors.contact && (
                  <p className="text-red-500 text-sm mt-1">{errors.contact}</p>
                )}
              </div>

              {/* State and City */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="state">State *</Label>
                  <Select
                    value={formData.state}
                    onValueChange={(value) => handleInputChange("state", value)}
                  >
                    <SelectTrigger
                      className={errors.state ? "border-red-500" : ""}
                    >
                      <SelectValue placeholder="Select your state" />
                    </SelectTrigger>
                    <SelectContent>
                      {states.map((state) => (
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

                <div>
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    type="text"
                    value={formData.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    className={`bg-gray-50 ${errors.city ? "border-red-500" : ""}`}
                    placeholder="Enter your city"
                  />
                  {errors.city && (
                    <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                  )}
                </div>
              </div>

              {/* Operating System */}
              <div>
                <Label>Operating System *</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                  {["iOS", "Android", "Windows", "Other"].map((os) => (
                    <label
                      key={os}
                      className="flex items-center space-x-2 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="operatingSystem"
                        value={os}
                        checked={formData.operatingSystem === os}
                        onChange={(e) =>
                          handleInputChange("operatingSystem", e.target.value)
                        }
                        className="text-primary"
                      />
                      <span className="text-sm">{os}</span>
                    </label>
                  ))}
                </div>
                {errors.operatingSystem && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.operatingSystem}
                  </p>
                )}
              </div>

              {/* Bug Description */}
              <div>
                <Label htmlFor="bugDescription">
                  Help us understand more about the bug you encountered * (
                  {formData.bugDescription.length}/1000)
                </Label>
                <Textarea
                  id="bugDescription"
                  value={formData.bugDescription}
                  onChange={(e) =>
                    handleInputChange("bugDescription", e.target.value)
                  }
                  className={`bg-gray-50 ${errors.bugDescription ? "border-red-500" : ""}`}
                  placeholder="Please provide detailed information about the bug..."
                  rows={4}
                  maxLength={1000}
                />
                {errors.bugDescription && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.bugDescription}
                  </p>
                )}
              </div>

              {/* File Upload */}
              <div>
                <Label htmlFor="referenceFile">
                  Upload Reference (Optional)
                </Label>
                <div className="mt-2">
                  <input
                    id="referenceFile"
                    type="file"
                    accept="image/png,image/jpeg,image/jpg"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="referenceFile"
                    className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-colors"
                  >
                    <div className="text-center">
                      <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-600">
                        Click to upload PNG/JPG file (max 100KB)
                      </p>
                      {formData.referenceFile && (
                        <p className="text-sm text-green-600 mt-1">
                          {formData.referenceFile.name}
                        </p>
                      )}
                    </div>
                  </label>
                </div>
                {errors.referenceFile && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.referenceFile}
                  </p>
                )}
              </div>

              {/* Declaration */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-sm mb-2">Declaration</h3>
                <p className="text-sm text-gray-600">
                  Bug bounty is subject to first come first serve basis. If we
                  find your submission to be valid, we will reach out to you and
                  process the bounty. Only one submission per contact number
                  will be considered. Multiple attempts might flag your account
                  as spam.
                  <br />
                  <br />
                  For more details on how we handle bug bounty, please check out
                  our Help Desk.
                </p>
              </div>

              {/* Submit Button */}
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-bold text-lg py-6 shadow-lg hover:shadow-xl transition-all duration-300" 
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Bug Report"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BugBountyForm;

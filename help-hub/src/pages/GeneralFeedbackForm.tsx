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
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, AlertCircle, CheckCircle } from "lucide-react";

const GeneralFeedbackForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showReferralPopup, setShowReferralPopup] = useState(false);
  const [referralCode, setReferralCode] = useState("");

  useEffect(() => {
    emailjs.init("katJyt0NEEicyS-mq");
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    state: "",
    city: "",
    section: "",
    feedbackType: "",
    feedbackDetails: "",
  });

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

  const sections = ["Support", "Content", "Technical", "General"];

  const feedbackTypes = [
    "Feature suggestion",
    "UX improvement",
    "Category suggestion",
    "General feedback",
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) return "Name is required";
    if (
      !formData.email.trim() ||
      !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)
    )
      return "Please enter a valid email address";
    if (!formData.contact.trim() || !/^\d{10}$/.test(formData.contact))
      return "Please enter a valid 10-digit contact number";
    if (!formData.state) return "State is required";
    if (!formData.city.trim()) return "City is required";
    if (!formData.feedbackType) return "Feedback type is required";
    if (!formData.feedbackDetails.trim())
      return "Feedback details are required";
    if (formData.feedbackDetails.length > 2000)
      return "Feedback details must be less than 2000 characters";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
      const response = await api.submitGeneralFeedback(formData);

      // Send confirmation email via EmailJS
      try {
        console.log("Attempting to send EmailJS email...");
        const emailParams = {
          to_name: formData.name,
          to_email: formData.email,
          contact: formData.contact,
          state: formData.state,
          city: formData.city,
          feedback_type: formData.feedbackType,
          feedback_details: formData.feedbackDetails,
          section: formData.section,
          ticket_id: response.ticketId,
          submitted_date: new Date().toLocaleDateString(),
          form_type: "Feedback",
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

      setReferralCode(response.referralCode);
      setShowReferralPopup(true);

      // Reset form
      setFormData({
        name: "",
        email: "",
        contact: "",
        state: "",
        city: "",
        section: "",
        feedbackType: "",
        feedbackDetails: "",
      });
    } catch (err) {
      console.error("Error submitting feedback:", err);
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Failed to submit feedback. Please ensure the backend server is running on http://localhost:5000";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleReferralClose = () => {
    setShowReferralPopup(false);
    setReferralCode("");
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
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-2xl p-8 relative border-2 border-yellow-500/30">
        {/* Logo at top right corner of form */}
        <div className="absolute top-4 right-4 z-10">
          <img src="/4 (1).png" alt="WWF Logo" className="h-12 w-12 sm:h-16 sm:w-16 object-contain" />
        </div>
        
        <div className="mb-8 pb-6 border-b-4 border-yellow-500">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            <span className="text-yellow-600">Share</span> Your Feedback
          </h1>
          <p className="text-gray-700 font-medium">
            Help us improve by sharing your feedback.
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
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="Enter your full name"
              className="bg-gray-50 border border-gray-300"
            />
          </div>

          {/* Email Field */}
          <div>
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              placeholder="Enter your email address"
              className="bg-gray-50 border border-gray-300"
            />
          </div>

          {/* Contact Field */}
          <div>
            <Label htmlFor="contact">Contact Number *</Label>
            <Input
              id="contact"
              value={formData.contact}
              onChange={(e) => handleInputChange("contact", e.target.value)}
              placeholder="Enter your 10-digit mobile number"
              maxLength={10}
              className="bg-gray-50 border border-gray-300"
            />
          </div>

          {/* State Dropdown */}
          <div>
            <Label htmlFor="state">State *</Label>
            <Select
              value={formData.state}
              onValueChange={(value) => handleInputChange("state", value)}
            >
              <SelectTrigger className="bg-gray-50 border border-gray-300">
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
          </div>

          {/* City Field */}
          <div>
            <Label htmlFor="city">City *</Label>
            <Input
              id="city"
              value={formData.city}
              onChange={(e) => handleInputChange("city", e.target.value)}
              placeholder="Enter your city"
              className="bg-gray-50 border border-gray-300"
            />
          </div>

          {/* Section Dropdown */}
          <div>
            <Label htmlFor="section">Section *</Label>
            <Select
              value={formData.section}
              onValueChange={(value) => handleInputChange("section", value)}
            >
              <SelectTrigger className="bg-gray-50 border border-gray-300">
                <SelectValue placeholder="Select section" />
              </SelectTrigger>
              <SelectContent>
                {sections.map((section) => (
                  <SelectItem key={section} value={section}>
                    {section}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Feedback Type Dropdown */}
          <div>
            <Label htmlFor="feedbackType">Feedback Type *</Label>
            <Select
              value={formData.feedbackType}
              onValueChange={(value) =>
                handleInputChange("feedbackType", value)
              }
            >
              <SelectTrigger className="bg-gray-50 border border-gray-300">
                <SelectValue placeholder="Select feedback type" />
              </SelectTrigger>
              <SelectContent>
                {feedbackTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Feedback Details Field */}
          <div>
            <Label htmlFor="feedbackDetails">
              Help us understand your feedback in detail *
            </Label>
            <Textarea
              id="feedbackDetails"
              value={formData.feedbackDetails}
              onChange={(e) =>
                handleInputChange("feedbackDetails", e.target.value)
              }
              maxLength={2000}
              rows={4}
              required
              className="bg-gray-50 border border-gray-300"
            />
            <div className="text-sm text-muted-foreground mt-1">
              {formData.feedbackDetails.length}/2000 characters
            </div>
          </div>

          <Button 
            type="submit" 
            disabled={loading} 
            className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-bold text-lg py-6 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Feedback"
            )}
          </Button>
        </form>

        {/* Referral Code Popup */}
        {showReferralPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
              <h2 className="text-xl font-bold mb-4">Thank You!</h2>
              <p className="mb-4">
                Your feedback has been submitted successfully. Here's your
                referral code:
              </p>
              <div className="bg-gray-100 p-3 rounded font-mono text-center mb-4">
                {referralCode}
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Use this code to earn points in the Wander With Food app. The
                code expires in 24 hours.
              </p>
              <Button onClick={handleReferralClose} className="w-full">
                Close
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GeneralFeedbackForm;

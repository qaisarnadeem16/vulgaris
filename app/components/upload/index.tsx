"use client";

import React, { useState, useRef, ChangeEvent, useEffect, useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import bitmap from "/public/assets/bitmap.svg";
import purpledots from "/public/assets/purpledots.svg";
import gradientellipse from "/public/assets/gradientellipse.svg";
import Section from "../shared/section";
import Button from "../shared/common/custom-btn";
import Heading from "../shared/common/heading";
import SubHeading from "../shared/common/sub-heading";
import { analyzeExamResults } from "@/actions/exam-report-actions";
import { useAuth } from "@/app/context/AuthContext";
import { TogglePaidOneTime } from "@/libs/payments";
import { saveReportAction, saveReportDataAction } from "@/actions/auth-actions/auth-actions";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/config/firebase";
import Link from "next/link";
import { IoArrowBackSharp, IoClose } from "react-icons/io5";
import { MdOutlineInfo } from "react-icons/md";

// TypeScript interfaces
interface AnalysisResponse {
  success: boolean;
  data: {
    reportSummary: string;
    keyFindings: string[];
    recommendations: string[];
  };
  simplified_conclusion?: string;
  disclaimer?: string;
  cost?: number;
  error?: string;
}

interface LocalStorageData {
  fileName: string;
  fileBase64: string;
  diseaseDescription: string;
}

// Utility functions for Base64 conversion
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};

const base64ToFile = (base64: string, fileName: string): File => {
  const [header, data] = base64.split(",");
  const mime = header.match(/:(.*?);/)?.[1] || "application/pdf";
  const byteString = atob(data);
  const arrayBuffer = new ArrayBuffer(byteString.length);
  const uint8Array = new Uint8Array(arrayBuffer);
  for (let i = 0; i < byteString.length; i++) {
    uint8Array[i] = byteString.charCodeAt(i);
  }
  return new File([arrayBuffer], fileName, { type: mime });
};

const Upload = () => {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [diseaseDescription, setDiseaseDescription] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResponse | null>(null);
  const [error, setError] = useState<string>("");
  const { user, refetchUser } = useAuth();

  // Load saved data from localStorage on mount
  useEffect(() => {
    const loadLocalStorage = () => {
      const data: LocalStorageData = {
        fileName: localStorage.getItem("uploadFileName") || "",
        fileBase64: localStorage.getItem("uploadFileBase64") || "",
        diseaseDescription: localStorage.getItem("uploadDiseaseDescription") || "",
      };
      if (data.fileName && data.fileBase64) {
        try {
          const restoredFile = base64ToFile(data.fileBase64, data.fileName);
          setFile(restoredFile);
          setFileName(data.fileName);
        } catch (err) {
          console.error("Error restoring file from Base64:", err);
          setError("Failed to restore uploaded file.");
        }
      }
      setDiseaseDescription(data.diseaseDescription);
    };
    loadLocalStorage();
  }, []);

  // Save to localStorage
  const saveToLocalStorage = useCallback(async () => {
    if (file) {
      try {
        const base64 = await fileToBase64(file);
        localStorage.setItem("uploadFileName", fileName);
        localStorage.setItem("uploadFileBase64", base64);
      } catch (err) {
        console.error("Error converting file to Base64:", err);
        setError("Failed to save file to localStorage.");
      }
    }
    localStorage.setItem("uploadDiseaseDescription", diseaseDescription);
  }, [file, fileName, diseaseDescription]);

  // Clear localStorage and reset file states
  const clearData = useCallback(() => {
    setFile(null);
    setFileName("");
    setDiseaseDescription("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    localStorage.removeItem("uploadFileName");
    localStorage.removeItem("uploadFileBase64");
    localStorage.removeItem("uploadDiseaseDescription");
  }, []);

  // Handle file selection
  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile || selectedFile.type !== "application/pdf") {
      setError("Please upload a valid PDF file.");
      return;
    }
    if (selectedFile.size > 5 * 1024 * 1024) {
      // 5MB limit
      setError("File size exceeds 5MB limit.");
      return;
    }

    setFile(selectedFile);
    setFileName(selectedFile.name);
    setError("");
    await saveToLocalStorage();
  };

  // Handle drag-and-drop
  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files?.[0];
    if (!droppedFile || droppedFile.type !== "application/pdf") {
      setError("Please upload a valid PDF file.");
      return;
    }
    if (droppedFile.size > 5 * 1024 * 1024) {
      // 5MB limit
      setError("File size exceeds 5MB limit.");
      return;
    }

    setFile(droppedFile);
    setFileName(droppedFile.name);
    setError("");
    await saveToLocalStorage();
  };

  // Analyze medical report
  const analyzeMedicalReport = async (file: File) => {
    setIsProcessing(true);
    setError("");

    try {
      // Upload file to Firebase
      const storageRef = ref(storage, `medical-report-files/${file.name}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);

      // Save report data
      const saveResult = await saveReportDataAction(
        user?.email || "test@gmail.com",
        downloadURL,
        diseaseDescription
      );
      if (saveResult.error) {
        throw new Error(saveResult.error);
      }

      const formData = new FormData();
      formData.append("file", file);
      formData.append("model", "gpt-4o");
      if (diseaseDescription) {
        formData.append("disease_context", diseaseDescription);
      }

      const response = await analyzeExamResults(formData);
      // if (!response.success) {
      //   throw new Error(response.error || "Analysis failed.");
      // }

      if (user) {
        await TogglePaidOneTime(user.email);
        const { email, simplified_conclusion, disclaimer, cost } = {
          email: user.email,
          simplified_conclusion: response.simplified_conclusion || "",
          disclaimer: response.disclaimer || "",
          cost: Number(response.cost) || 0,
        };

        const saveResult = await saveReportAction(email, simplified_conclusion, disclaimer, cost);
        if (saveResult.error) {
          throw new Error(saveResult.error);
        }
      }

      setAnalysisResult(response);
      clearData();
      await refetchUser();
    } catch (err) {
      console.error("Analysis error:", err);
      setError(err instanceof Error ? err.message : "Analysis failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  // Handle upload and analysis
  const handleUploadClick = async () => {
    setError("");

    if (!diseaseDescription.trim()) {
      setError("Please enter a specific question about your report.");
      return;
    }

    if (!file) {
      setError("Please upload a file before submitting.");
      return;
    }

    try {
      if (!user) {
        await saveToLocalStorage();
        router.push("/login");
        return;
      }

      if (!user.paidOneTime && !user.isSubscribed) {
        await saveToLocalStorage();
        router.push("/payment");
        return;
      }

      await analyzeMedicalReport(file);
    } catch (err) {
      console.error("Upload error:", err);
      setError("Something went wrong. Please try again.");
    }
  };

  // Update localStorage when diseaseDescription changes
  useEffect(() => {
    saveToLocalStorage();
  }, [diseaseDescription, saveToLocalStorage]);

  return (
    <div
      className="relative min-h-screen bg-cover bg-center flex flex-col"
      style={{ backgroundImage: `url(${bitmap.src})` }}
    >
      <div className="absolute left-0 top-0 hidden lg:block">
        <Image src={purpledots} alt="Decorative dots" />
      </div>
      <div className="absolute left-0 top-7">
        <Image src={gradientellipse} alt="Gradient ellipse" width={200} height={200} priority />
      </div>
      <div className="absolute left-28 top-28">
        <Link href="/" className="cursor-pointer text-black rounded-full hover:underline hover:text-buttonBg">
          <IoArrowBackSharp size={32} aria-label="Go back" />
        </Link>
      </div>
      <div className="flex justify-center pt-20 items-center flex-grow">
        {!analysisResult ? (
          <Section>
            <Heading className="font-poppins font-bold md:text-5xl">
              Upload & Analyze Your Medical Report
            </Heading>
            <SubHeading
              text="Powered by our cutting-edge AI system for accurate, instant insights"
              styles="font-poppins"
            />

            <div className="p-4 space-y-6">
              <div className="text-center text-gray-700 font-medium">
                Upload Your Lab Results or Medical Report
              </div>

              <div
                className="flex items-center max-w-md mx-auto rounded-full py-2 border border-[#52469E] px-2 cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                  accept="application/pdf"
                  aria-label="Upload medical report"
                />
                <div className="relative flex w-full items-center">
                  <input
                    type="text"
                    value={fileName}
                    placeholder="Drag & drop or click to browse"
                    readOnly
                    className="w-full px-4 py-2 focus:outline-none placeholder-[#979797] bg-transparent cursor-pointer"
                    aria-label="Selected file name"
                  />
                  {fileName && (
                    <button
                      onClick={clearData}
                      className="absolute right-2 text-gray-500 hover:text-red-600"
                      title="Clear file"
                      aria-label="Clear uploaded file"
                    >
                      <IoClose size={20} />
                    </button>
                  )}
                </div>
                <button
                  disabled={isProcessing}
                  className="bg-red-600 text-white px-6 py-2 rounded-full ml-2 disabled:opacity-50"
                  aria-label="Upload file"
                >
                  {isProcessing ? "Processing..." : "Upload"}
                </button>
              </div>

              <div className="relative group max-w-md mx-auto">
                <label className="text-sm flex items-center gap-2 font-medium text-gray-700 mb-2">
                  A Specific Question about your report?
                  <div className="relative flex items-center">
                    <MdOutlineInfo
                      size={20}
                      className="cursor-pointer text-gray-500"
                      aria-label="Question examples"
                    />
                    <div className="absolute top-6 left-0 z-10 hidden group-hover:block w-96 text-sm bg-white text-black border border-gray-300 shadow-lg rounded p-3">
                      <ul className="list-disc pl-4 space-y-1">
                        <li>I have been experiencing headaches. Could this be related to any findings in my exam?</li>
                        <li>I’m concerned about my heart health. What does my exam say about this?</li>
                        <li>What steps can I take to improve my health based on these results?</li>
                        <li>I've noticed some joint pain. Can my exam explain why this is happening?</li>
                        <li>Is there anything in my exam that suggests I need further tests for diabetes?</li>
                      </ul>
                    </div>
                  </div>
                </label>
                <input
                  type="text"
                  placeholder="e.g., Type specific question"
                  value={diseaseDescription}
                  onChange={(e) => setDiseaseDescription(e.target.value)}
                  className={`w-full px-4 py-3 rounded-full border ${diseaseDescription.trim() === "" && error ? "border-red-500" : "border-[#52469E]"
                    } focus:outline-none`}
                  aria-label="Specific question about report"
                />
              </div>

              {error && <div className="text-red-500 text-center">{error}</div>}

              <div className="text-center flex justify-center pt-4">
                <Button
                  label={isProcessing ? "Analyzing..." : "Generate"}
                  style="shadow-purple-400 shadow-sm !px-10 !py-2 text-lg"
                  onClick={handleUploadClick}
                  disabled={isProcessing}
                />
              </div>
            </div>
          </Section>
        ) : (
          <Section>
            <div className="space-y-4 max-w-5xl mx-auto">
              <div className="space-y-4 text-center">
                <Heading className="font-poppins font-bold md:text-5xl">
                  AI Analysis Completed!
                </Heading>
                <SubHeading
                  text="Here is your AI-powered health analysis based on your uploaded report."
                  styles="font-poppins"
                />
              </div>

              <div className="p-6 mx-auto font-poppins text-white rounded-xl flex flex-col items-center text-center bg-[#6fA3D8] space-y-4">
                <div className="text-left text-lg text-white space-y-2">
                  {analysisResult.simplified_conclusion?.split("\n").map((line: string, index: number) => (
                    <p key={index}>
                      {line.split(/(\*\*.*?\*\*)/g).map((part, i) =>
                        part.startsWith("**") && part.endsWith("**") ? (
                          <strong key={i} className="font-semibold text-black pr-2">
                            {part.replace(/\*\*/g, "")}
                          </strong>
                        ) : (
                          part
                        )
                      )}
                    </p>
                  ))}
                </div>
              </div>
              <p className="font-medium">
                Disclaimer: <span className="text-[#D80027]">{analysisResult.disclaimer}</span>
              </p>

              <div className="flex justify-center pt-4">
                <button
                  onClick={() => {
                    setAnalysisResult(null);
                    router.refresh();
                  }}
                  className="flex items-center gap-2 text-white rounded-md bg-gray-400 shadow-md px-7 py-2 text-lg hover:bg-[#c00023] transition"
                  aria-label="Back to upload"
                >
                  Back
                </button>
              </div>
            </div>
          </Section>
        )}
      </div>
    </div>
  );
};

export default Upload;
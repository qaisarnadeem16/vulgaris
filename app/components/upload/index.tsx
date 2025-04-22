'use client';

import React, { useState, useRef, ChangeEvent } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import bitmap from '/public/assets/bitmap.svg';
import purpledots from '/public/assets/purpledots.svg';
import gradientellipse from '/public/assets/gradientellipse.svg';
import Section from '../shared/section';
import Button from '../shared/common/custom-btn';
import Heading from '../shared/common/heading';
import SubHeading from '../shared/common/sub-heading';
import { analyzeExamResults } from '@/actions/exam-report-actions';
import { GreenHeart } from '@/app/svg';
import { BsDownload } from 'react-icons/bs';
import Link from 'next/link';
import { IoArrowBackSharp } from 'react-icons/io5';
import { MdOutlineInfo } from 'react-icons/md';

interface AnalysisResponse {
  success: boolean;
  data: {
    reportSummary: string;
    keyFindings: string[];
    recommendations: string[];
  };
  error?: string;
}

const Upload = () => {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState('');
  const [diseaseDescription, setDiseaseDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  const user = { hasPlan: true }; // Mock user status

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFileName(e.dataTransfer.files[0].name);
      if (fileInputRef.current) {
        fileInputRef.current.files = e.dataTransfer.files;
      }
    }
  };

  const analyzeMedicalReport = async (file: File) => {
    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', file);
      if (diseaseDescription) {
        formData.append('disease_context', diseaseDescription);
      }

      const response = await analyzeExamResults(formData);
      setAnalysisResult(response);
    } catch (err: any) {
      setError(err.message || 'Analysis failed.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUploadClick = async () => {
    if (!user?.hasPlan) return router.push('/payment');

    if (!diseaseDescription.trim()) {
      setError('Please enter a specific question about your report.');
      return;
    }

    if (fileInputRef.current?.files?.[0]) {
      await analyzeMedicalReport(fileInputRef.current.files[0]);
    } else {
      setError('Please select a file first');
    }
  };

  return (
    <div
      className="relative min-h-screen bg-cover bg-center flex flex-col"
      style={{ backgroundImage: `url(${bitmap.src})` }}
    >
      <div className="absolute left-0 top-0 hidden lg:block">
        <Image src={purpledots} alt="dots" />
      </div>
      <div className="absolute left-0 top-7">
        <Image src={gradientellipse} alt="ellipse" width={200} height={200} />
      </div>
      <div className="absolute left-28 top-28">
        <Link href={'/'} className="cursor-pointer text-black  rounded-full hover:underline hover:text-buttonBg">
          <IoArrowBackSharp size={32} />
        </Link>
      </div>
      <div className="flex justify-center pt-20 items-center flex-grow">
        {!analysisResult && <Section>

          <Heading className="font-poppins font-bold md:text-5xl">
            Upload & Analyze Your Medical Report
          </Heading>
          <SubHeading text="Powered by GPT-4.1 for accurate, instant insights" styles="font-poppins" />

          <div className="p-4 space-y-6">
            <div className="text-center text-gray-700 uppercase font-medium">
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
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              />
              <input
                type="text"
                value={fileName}
                placeholder="Drag & drop or click to browse"
                readOnly
                className="w-full px-4 py-2 focus:outline-none placeholder-[#979797] bg-transparent cursor-pointer"
              />
              <button
                onClick={handleUploadClick}
                disabled={isLoading}
                className="bg-red-600 text-white px-6 py-2 rounded-full ml-2"
              >
                {isLoading ? 'Processing...' : 'Upload'}
              </button>
            </div>

            <div className="relative group max-w-md mx-auto">
              <label className="text-sm flex items-center gap-2 font-medium text-gray-700 mb-2">
                A Specific Question about your report?
                <div className="relative flex items-center">
                  <MdOutlineInfo size={20} className="cursor-pointer text-gray-500" />
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
                placeholder="e.g., Type 2 Diabetes"
                value={diseaseDescription}
                onChange={(e) => setDiseaseDescription(e.target.value)}
                className={`w-full px-4 py-3 rounded-full border ${diseaseDescription.trim() === '' && error ? 'border-red-500' : 'border-[#52469E]'} focus:outline-none`}
              />
            </div>


            {error && <div className="text-red-500 text-center">{error}</div>}

            <div className="text-center flex justify-center pt-4">
              <Button
                label={isLoading ? "Analyzing..." : "Generate"}
                style="shadow-purple-400 shadow-sm !px-10 !py-2 text-lg"
                onClick={handleUploadClick}
                disabled={isLoading}
              />
            </div>



          </div>
        </Section>}


        {analysisResult && (
          <Section>
            <div className="space-y-4 max-w-5xl mx-auto">

              {/* Header */}
              <div className="space-y-4 text-center">
                <Heading className="font-poppins font-bold md:text-5xl">
                  AI Analysis Completed!
                </Heading>
                <SubHeading
                  text="Here is your AI-powered health analysis based on your uploaded report."
                  styles="font-poppins"
                />
              </div>

              {/* Result Card */}
              <div className="p-6  mx-auto font-poppins text-white rounded-xl flex flex-col items-center text-center bg-[#6fA3D8] space-y-4">
                <div className="text-left text-lg text-white space-y-2">
                  {analysisResult.simplified_conclusion.split("\n").map((line: string, index: number) => (
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
              <p className="font-medium " >
                Disclaimer: <span className="text-[#D80027]">{analysisResult.disclaimer}</span>
              </p>

              {/* Download Button */}
              <div className="flex justify-center pt-4">
                {/* <button
                  className="flex items-center gap-2 text-white rounded-md bg-[#D80027] shadow-md px-7 py-3 text-lg hover:bg-[#c00023] transition"
                >
                  Download Report <BsDownload />
                </button> */}
                <button
                  onClick={() => setAnalysisResult(null)}
                  className="flex items-center gap-2 text-white rounded-md bg-gray-400 shadow-md px-7 py-2 text-lg hover:bg-[#c00023] transition"
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

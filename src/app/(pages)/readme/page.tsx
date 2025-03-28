"use client";

import React, { Suspense, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { GitPullRequest, Sparkles, FileText, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/lib/AuthContext";
import { useSearchParams } from "next/navigation";
import { MarkdownViewer, MarkdownEditor } from "react-github-markdown";
export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ReadmePage />
    </Suspense>
  );
}

function ReadmePage() {
  const searchParams = useSearchParams();
  const url = searchParams.get("url");
  const inst = searchParams.get("inst");
  const [githubUrl, setGithubUrl] = useState(url || "");
  const [instructions, setInstructions] = useState(inst || "");
  const [isGenerating, setIsGenerating] = useState(false);
  const [readme, setReadme] = useState("");
  const { user } = useAuth();

  const handleGenerate = async () => {
    if (!githubUrl) return;

    setIsGenerating(true);

    const searchParams = new URLSearchParams();
    searchParams.set("url", githubUrl);
    searchParams.set("inst", instructions);
    const token = await user?.getIdToken();
    try {
      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_SCI_URI
        }/sci/readme?${searchParams.toString()}`,
        {
          headers: {
            "x-sci-auth": `${token}`,
          },
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      const data = await response.text();
      const formattedData = data.replace(/```markdown/g, "");
      setReadme(formattedData);
    } catch (error) {
      console.error(error);
      toast.error(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const openMarkdownEditor = () => {
    navigator.clipboard.writeText(readme);
    window.open("https://jbt.github.io/markdown-editor", "_blank");
  };

  return (
    <div className="container py-16 md:py-32 mx-auto max-w-6xl p-6 max-md:pt-12">
      <div className="mb-8">
        <h1 className="text-4xl font-medium">README Generator</h1>
        <p className="text-muted-foreground mt-2">
          Create professional documentation for your repository
        </p>
      </div>

      <div className="space-y-5">
        <div>
          <div className="flex items-center justify-between mb-1">
            <label htmlFor="github-url" className="text-sm font-medium">
              GitHub Repository URL
            </label>
          </div>
          <div className="flex gap-2">
            <Input
              id="github-url"
              placeholder="https://github.com/username/repository"
              value={githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
              required
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleGenerate();
                }
              }}
            />
          </div>
        </div>

        <div>
          <div className="mb-1">
            <label htmlFor="instructions" className="text-sm font-medium">
              Special Instructions (Optional)
            </label>
          </div>
          <Textarea
            id="instructions"
            placeholder="Add any specific details or requirements for your README..."
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            className="min-h-32"
          />
        </div>

        <Button
          onClick={handleGenerate}
          disabled={!githubUrl || isGenerating}
          className="w-full"
          size="lg"
        >
          {isGenerating ? (
            <>
              <Sparkles className="mr-2 h-5 w-5 animate-pulse" />
              <span>Generating...</span>
            </>
          ) : (
            <>
              <GitPullRequest className="mr-2 h-5 w-5" />
              <span>Generate README</span>
            </>
          )}
        </Button>
      </div>

      {readme && !isGenerating && (
        <div className="flex items-end flex-col gap-4 justify-start mt-7">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              navigator.clipboard.writeText(readme);
              toast.success("README copied to clipboard");
            }}
          >
            <FileText className="mr-2 h-4 w-4" />
            <span>Copy Markdown</span>
          </Button>

          <MarkdownViewer value={readme} isDarkTheme={false} />
        </div>
      )}
    </div>
  );
}

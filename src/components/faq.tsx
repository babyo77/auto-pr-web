"use client";

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// FAQ data
const faqData = [
  {
    question: "How does Auto PR work?",
    answer:
      "Auto PR analyzes your code changes and automatically generates professional pull request descriptions in seconds. It uses AI to understand the context of your changes and creates meaningful summaries with proper formatting.",
  },
  {
    question: "How secure is my code data?",
    answer:
      "We take security seriously. Auto PR only accesses the code changes in your current PR, and we never store your code. All processing is done securely, and we use industry-standard encryption for all communications.",
  },
  {
    question: "Can I customize the PR message?",
    answer:
      "Yes! Auto PR offers customizable PR message so you can match your team's PR format and requirements. via custom instructions directly through the extension.",
  },
  {
    question: "Do I need to install anything besides the Chrome extension?",
    answer:
      "No, the Chrome extension is all you need. Simply install it from the Chrome Web Store, and you're ready to start generating PRs immediately.",
  },
  {
    question: "Is there a limit to how many PRs I can generate?",
    answer:
      "Our free tier allows for up to 3 PRs per month. For unlimited PRs and advanced features, check out our Pro and Team pricing plans.",
  },
];

export default function FAQ() {
  return (
    <section>
      <div className="py-14 md:pt-0 md:pb-0 pb-0">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <h2 className="text-title text-4xl lg:text-5xl font-semibold">
              Frequently Asked Questions
            </h2>
            <p className="text-body mt-4">Have questions about Auto PR?</p>
          </div>
          <div className="mx-auto mt-12 max-w-6xl">
            <Accordion type="single" collapsible className="w-full">
              {faqData.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left text-base font-medium">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}

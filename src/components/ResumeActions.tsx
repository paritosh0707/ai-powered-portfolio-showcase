import { useState } from "react";
import { Download, Eye } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

/** Single source of truth for the latest resume — both actions use this file. */
const RESUME_URL = "/Paritosh_Sharma_Senior_AI_Engineer.pdf";
const RESUME_FILENAME = "Paritosh_Sharma_Senior_AI_Engineer.pdf";

type Props = {
  /** desktop = compact inline; mobile = full-width stacked (drawer) */
  variant?: "desktop" | "mobile";
  /** called after either action fires (e.g. to close the mobile drawer) */
  onAction?: () => void;
};

export default function ResumeActions({ variant = "desktop", onAction }: Props) {
  const [open, setOpen] = useState(false);

  const handleView = () => {
    setOpen(true);
    onAction?.();
  };

  const isMobile = variant === "mobile";

  return (
    <>
      {isMobile ? (
        <div className="flex flex-col gap-2">
          <button onClick={handleView} className="btn-primary w-full gap-2">
            <Eye className="h-4 w-4" />
            View Resume
          </button>
          <a
            href={RESUME_URL}
            download={RESUME_FILENAME}
            onClick={onAction}
            className="btn-outline w-full gap-2"
          >
            <Download className="h-4 w-4" />
            Download Resume
          </a>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <button
            onClick={handleView}
            className="btn-primary h-9 px-4 text-xs gap-1.5"
          >
            <Eye className="h-3.5 w-3.5" />
            View Resume
          </button>
          <a
            href={RESUME_URL}
            download={RESUME_FILENAME}
            aria-label="Download resume"
            title="Download resume"
            className="btn-outline h-9 w-9 !px-0"
          >
            <Download className="h-4 w-4" />
          </a>
        </div>
      )}

      {/* In-page viewer — keeps the user on the portfolio; close (X / Esc / backdrop) returns them exactly where they were. */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-[95vw] max-w-5xl h-[90vh] p-0 gap-0 flex flex-col overflow-hidden">
          <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3 pr-12">
            <DialogTitle className="text-sm md:text-base font-semibold">
              Resume — Paritosh Sharma
            </DialogTitle>
            <a
              href={RESUME_URL}
              download={RESUME_FILENAME}
              className="btn-outline h-9 px-3 text-xs gap-1.5 shrink-0"
            >
              <Download className="h-3.5 w-3.5" />
              Download
            </a>
          </div>
          <DialogDescription className="sr-only">
            Online preview of Paritosh Sharma's resume. Close this dialog to
            continue browsing the portfolio.
          </DialogDescription>
          <iframe
            src={`${RESUME_URL}#view=FitH`}
            title="Resume — Paritosh Sharma"
            className="w-full flex-1 bg-muted"
          />
        </DialogContent>
      </Dialog>
    </>
  );
}

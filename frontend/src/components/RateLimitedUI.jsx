import { AlertCircle } from "lucide-react";

const RateLimitedUI = () => {
  return (
    <div className="mb-8 border border-yellow-200 rounded-lg p-6 bg-yellow-50">
      <div className="flex items-start gap-4">
        <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
        <div>
          <h3 className="font-semibold text-yellow-900">Too many requests</h3>
          <p className="text-sm text-yellow-700 mt-1">
            You&apos;ve made too many requests. Please wait a moment and try again.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RateLimitedUI;

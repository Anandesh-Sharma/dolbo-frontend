import PageHeader from "../PageHeader";

interface LoadingStateProps {
  message: string;
  title: string;
  description: string;
}

export default function LoadingState({ 
  message = 'Loading...', 
  title, 
  description 
}: LoadingStateProps) {
  return (
    <div className="space-y-8">
      {(title && description) && (
        <PageHeader
          title={title}
          description={description}
        />
      )}
      <div className="min-h-[calc(100vh-16rem)] flex items-center justify-center">
        <div className="flex items-center space-x-2 text-gray-400">
          <div className="animate-spin rounded-full h-5 w-5 border-2 border-blue-500 border-t-transparent" />
          <span>{message}</span>
        </div>
      </div>
    </div>
  );
} 
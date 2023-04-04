import { ReactMarkdown } from "react-markdown/lib/react-markdown";

import CodeBlock from "./markdown-components/CodeBlock";
import remarkGfm from "remark-gfm";
import { useEffect, useRef } from "react";
import { ChatMessage, ChatRole } from "../../../../hooks/useOpenAI";

interface ChatListProps {
  messages: ChatMessage[];
}

const ChatList = ({ messages }: ChatListProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  const filteredMsgs = messages.filter((msg) => msg.role !== ChatRole.SYSTEM);

  return (
    <div
      ref={containerRef}
      className="h-[calc(100vh-200px)] text-sm overflow-y-auto pb-12 break-words"
    >
      {filteredMsgs.length < 1 ? (
        <div className="mt-10 text-center">
          <img
            src="/images/robot.png"
            className="mx-auto"
            height={300}
            width={300}
          />
          <h1 className="text-xl text-gray-400">Start a new conversation ✨</h1>
          <p className="text-gray-400 mt-1 leading-tight font-light">
            Type your message at the bottom <br /> and press send button
          </p>
        </div>
      ) : (
        filteredMsgs
          .filter((msg) => msg.role !== ChatRole.SYSTEM)
          .map((msg, i) => (
            <div
              data-user={msg.role === ChatRole.USER || undefined}
              className="p-4 data-[user]:border-l-4 border-blue-400 data-[user]:bg-black/10 data-[user]:dark:bg-neutral-800/95 max-w-[400px]"
              key={i}
            >
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  code: CodeBlock,
                }}
              >
                {msg.content}
              </ReactMarkdown>
            </div>
          ))
      )}
    </div>
  );
};

export default ChatList;

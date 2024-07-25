"use client";
import React, { useEffect, useState } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { cn } from "@/lib/utils";
import { Chat } from "./chat";
import { useAuthContext } from "@/hooks/useAuthContext";
import { Sidebar } from "./sidebar";
import { BASE_URL } from "@/components/Constants/server";

export function ChatLayout({
  defaultLayout = [320, 480],
  defaultCollapsed = false,
  navCollapsedSize,
}) {
  const { user } = useAuthContext();
  const Id = user?.userId;
  const [conversations, setConversations] = useState([]);
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  // load conversations
  useEffect(() => {
    const getConversations = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/conversation/${Id}`);
        const res = await response.json();
        setConversations(res);
        console.log("conversations", res);
      } catch (err) {
        console.error(err);
      }
    };
    getConversations();
  }, [user]);

  useEffect(() => {
    const checkScreenWidth = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Initial check
    checkScreenWidth();

    // Event listener for screen width changes
    window.addEventListener("resize", checkScreenWidth);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", checkScreenWidth);
    };
  }, []);

  const handleSelectUser = (userId, messages) => {
    setSelectedUser({ id: userId, messages });
  };

  return (
    <ResizablePanelGroup
      direction="horizontal"
      onLayout={(sizes) => {
        document.cookie = `react-resizable-panels:layout=${JSON.stringify(
          sizes
        )}`;
      }}
      className="items-stretch h-full"
    >
      <ResizablePanel
        defaultSize={defaultLayout[0]}
        collapsedSize={navCollapsedSize}
        collapsible={true}
        minSize={isMobile ? 0 : 24}
        maxSize={isMobile ? 8 : 30}
        onCollapse={() => {
          setIsCollapsed(true);
          document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
            true
          )}`;
        }}
        onExpand={() => {
          setIsCollapsed(false);
          document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
            false
          )}`;
        }}
        className={cn(
          isCollapsed &&
            "min-w-[50px] md:min-w-[70px] transition-all duration-300 ease-in-out"
        )}
      >
        <Sidebar
          isCollapsed={isCollapsed || isMobile}
          links={conversations.map((conversation) => ({
            id: conversation.members[1], // Use second member's ID
            name: conversation.members[1],
            messages: conversation.messages ?? [],
            variant:
              selectedUser?.id === conversation.members[1] ? "grey" : "ghost",
          }))}
          isMobile={isMobile}
          onSelectUser={handleSelectUser}
        />
        {console.log(selectedUser)}
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
        <Chat
          userId={selectedUser?.id}
          messages={selectedUser?.messages}
          isMobile={isMobile}
        />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}

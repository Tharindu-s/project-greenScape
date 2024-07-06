"use client";
import { Sidebar, useSidebar, Overlay } from "@rewind-ui/core";
import { useState } from "react";
import logo from "../../assets/logo.png";
import Image from "next/image";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useLogout } from "@/hooks/useLogout";
import { GrProjects } from "react-icons/gr";
import { CiUser } from "react-icons/ci";

function SideBar() {
  const { professional } = useAuthContext();
  const { logout } = useLogout();

  const [expanded, setExpanded] = useState(true);
  const [mobile, setMobile] = useState(false);
  const sidebar = useSidebar();

  return (
    <div className="relative flex flex-row w-full h-full min-h-[55rem] font-inter">
      <Sidebar
        onToggle={(state) => {
          setExpanded(state.expanded);
          setMobile(state.mobile);
        }}
        className="absolute text-textmain bg-mint"
      >
        <Sidebar.Head>
          <Sidebar.Head.Logo>
            <Image src={logo} width={48} height={48} alt="Rewind-UI" />
          </Sidebar.Head.Logo>
          <Sidebar.Head.Title>GreenScape</Sidebar.Head.Title>
          <Sidebar.Head.Toggle />
        </Sidebar.Head>

        <Sidebar.Nav>
          <Sidebar.Nav.Section>
            <Sidebar.Nav.Section.Title className="flex text-textmain">
              {professional?.professionalName}
            </Sidebar.Nav.Section.Title>
            <Sidebar.Nav.Section.Item
              icon={<CiUser />}
              label="Clients"
              href="#"
            />
            <Sidebar.Nav.Section.Item
              //   icon={<Users />}
              label="Users"
              as="button"
            >
              <Sidebar.Nav.Section isChild>
                <Sidebar.Nav.Section.Item
                  icon={<span className="w-1 h-1 bg-transparent rounded" />}
                  label="List all"
                  href="#"
                />
                <Sidebar.Nav.Section.Item
                  icon={<span className="w-1 h-1 bg-transparent rounded" />}
                  label="Add new"
                  href="#"
                />
                <Sidebar.Nav.Section.Item
                  icon={<span className="w-1 h-1 bg-transparent rounded" />}
                  label="Archived"
                  href="#"
                />
              </Sidebar.Nav.Section>
            </Sidebar.Nav.Section.Item>
            <Sidebar.Nav.Section.Item
              //   icon={<Shield />}
              label="Roles"
              href="#"
            />
            <Sidebar.Nav.Section.Item
              //   icon={<Key />}
              label="Permissions"
              href="#"
            />
            <Sidebar.Nav.Section.Item
              //   icon={<Sliders />}
              label="Settings"
              href="#"
            />
          </Sidebar.Nav.Section>

          <Sidebar.Nav.Section>
            <Sidebar.Nav.Section.Title>Support</Sidebar.Nav.Section.Title>
            <Sidebar.Nav.Section.Item
              //   icon={<LifeRing />}
              label="Contact"
              href="#"
            />
            <Sidebar.Nav.Section.Item
              //   icon={<EnvelopeOpen />}
              label="Tickets"
              href="#"
            />
            <Sidebar.Separator />
            <Sidebar.Nav.Section.Item
              //   icon={<Book />}
              label="Documentation"
              href="#"
            />
          </Sidebar.Nav.Section>
        </Sidebar.Nav>

        <Sidebar.Footer>
          <div className="flex flex-col items-center justify-center text-sm">
            <span className="font-semibold">Rewind-UI</span>
            <span>version x.y.z</span>
          </div>
        </Sidebar.Footer>
      </Sidebar>

      <main
        className={`transition-all transform duration-100 text-slate-700 flex w-full flex-col items-center ${
          expanded ? "md:ml-64" : "md:ml-20"
        }`}
      >
        {mobile && (
          <Overlay
            blur="none"
            onClick={() => {
              sidebar.toggleMobile();
            }}
            className="z-40 md:hidden"
          />
        )}
        <header className="flex flex-row sticky top-0 px-8 items-center bg-white border-b border-b-gray-100 w-full shadow-sm min-h-[4rem]">
          <span>Navbar</span>

          <button
            onClick={() => {
              sidebar.toggleMobile();
            }}
            size="sm"
            color="white"
            icon
            className="flex ml-auto md:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 448 512"
            >
              <path d="M448 96c0-17.7-14.3-32-32-32H32C14.3 64 0 78.3 0 96s14.3 32 32 32H416c17.7 0 32-14.3 32-32zm0 320c0-17.7-14.3-32-32-32H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H416c17.7 0 32-14.3 32-32z" />
              <path
                className="opacity-50"
                d="M0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32z"
              />
            </svg>
          </button>
        </header>

        <div className="w-full h-full p-8">
          <p>Dashboard</p>
        </div>

        <div className="flex sticky bottom-0 items-center bg-white w-full min-h-[4rem] px-8">
          <span>Footer</span>
        </div>
      </main>
    </div>
  );
}

export default SideBar;

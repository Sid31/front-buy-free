import { Menu } from "lucide-react";
import { X } from "lucide-react";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import {
  ConnectModal,
  ConnectButton,
  useAccountBalance,
  useWallet,
  SuiChainId,
  ErrorCode,
  formatSUI,
  useSuiClient,
  AccountAssetManager,
  AccountCoinManager
} from "@suiet/wallet-kit";

const NAV_ITEMS = [
  { label: "$VRAM", href: "#" },
  { label: "Token Sales", href: "#" },
  { label: "Launch Partners", href: "#" },
  { label: "Create Token Sale", href: "#" },
  { label: "Staking", href: "#" },
  { label: "Help", href: "#" },
] as const;

const NavItems = ({
  className = "flex flex-col md:flex-row gap-4",
}: {
  className?: string;
}) => (
  <div className={className}>
    {NAV_ITEMS.map(({ label, href }) => (
      <a
        key={label}
        href={href}
        className="group relative text-text-muted hover:text-accent-green text-sm block py-2"
      >
        <span>{label}</span>
        <span className="absolute bottom-1.5 left-0 w-0 h-[2px] bg-accent-green transition-all duration-300 group-hover:w-full" />
      </a>
    ))}
  </div>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 ${
        isScrolled
          ? "bg-black/80 backdrop-blur-sm border-b border-neutral-700"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <span className="text-white font-bold text-xl">VRAM.AI</span>
            {/* Desktop Navigation */}
            <div className="hidden md:flex md:ml-8 space-x-4">
              <NavItems />
            </div>
          </div>

          <div className="flex items-center">

            <ConnectButton
                className='wkit-button1 cursor-pointer bg-accent-green text-background rounded-lg hover:bg-accent-green-light transition-all duration-200 flex items-center'
                onConnectError={(error) => {
                    if (error.code === ErrorCode.WALLET__CONNECT_ERROR__USER_REJECTED) {
                        console.warn(
                            "user rejected the connection to " + error.details?.wallet
                        );
                    } else {
                        console.warn("unknown connect error: ", error);
                    }
                }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-wallet w-4 h-4 mr-2"
              >
                <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"></path>
                <path d="M3 5v14a2 2 0 0 0 2 2h16v-5"></path>
                <path d="M18 12a2 2 0 0 0 0 4h4v-4Z"></path>
              </svg>
              Connect Wallet
              
            </ConnectButton>
            

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="ml-4 md:hidden inline-flex items-center justify-center p-2 rounded-md text-text-muted hover:text-accent-green focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden border-t border-card-border bg-black/95 backdrop-blur-sm"
          >
            <div className="px-4 pt-2 pb-3 space-y-1">
              <NavItems />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;

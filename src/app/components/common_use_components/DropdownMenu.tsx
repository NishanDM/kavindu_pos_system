import { useEffect, useRef, useState } from "react";

type DropdownItem = {
  label: string;
  onClick: () => void;
  danger?: boolean;
};

type DropdownMenuProps = {
  isOpen: boolean;
  onOpen: (e: React.MouseEvent) => void;
  onClose: () => void;
  items: DropdownItem[];
  children: (props: {
    ref: React.RefObject<HTMLElement | null>;
    onClick: (e: React.MouseEvent) => void;
  }) => React.ReactNode;
};

export function DropdownMenu({
  isOpen,
  onOpen,
  onClose,
  items,
  children,
}: DropdownMenuProps) {
  const triggerRef = useRef<HTMLElement | null>(null);

  const [position, setPosition] = useState({
    top: 0,
    left: 0,
  });

  const updatePosition = () => {
    if (!triggerRef.current) return;

    const rect = triggerRef.current.getBoundingClientRect();

    setPosition({
      top: rect.bottom + window.scrollY,
      left: rect.right - 160,
    });
  };

  const handleOpen = (e: React.MouseEvent) => {
    e.stopPropagation();

    triggerRef.current = e.currentTarget as HTMLElement;

    updatePosition();
    onOpen(e);
  };

  // Recalculate position on scroll/resize
  useEffect(() => {
    if (!isOpen) return;

    const handleScroll = () => updatePosition();
    const handleResize = () => updatePosition();

    window.addEventListener("scroll", handleScroll, true);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll, true);
      window.removeEventListener("resize", handleResize);
    };
  }, [isOpen]);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = () => onClose();

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [onClose]);

  return (
    <>
      {children({
        ref: triggerRef,
        onClick: handleOpen,
      })}

      {isOpen && (
        <div
          className="fixed z-[9999] w-40 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden"
          style={{ top: position.top, left: position.left }}
          onClick={(e) => e.stopPropagation()}
        >
          {items.map((item: DropdownItem, idx: number) => (
            <button
              key={idx}
              onClick={() => {
                item.onClick();
                onClose();
              }}
              className={`w-full text-left px-4 py-2 text-xs hover:bg-gray-100 ${
                item.danger ? "text-red-600" : ""
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </>
  );
}
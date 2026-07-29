import React, { useMemo, useState } from "react";

const CustomDropdown = ({
    icon,
    name,
    value,
    placeholder,
    options = [],
    onType,
    onSelect,
    onTouched,
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const filteredOptions = useMemo(() => {
        const searchValue = value.trim().toLowerCase();

        if (!searchValue) {
            return Array.isArray(options) ? options.slice(0, 35) : [];
        }

        return options
            .filter((item) =>
                item.label.toLowerCase().includes(searchValue)
            )
            .slice(0, 35);
    }, [options, value]);
    console.log("filteredOptions", filteredOptions)
    return (
        <div className="relative">
            <div className="form_control">
                {icon}

                <input
                    name={name}
                    value={value}
                    autoComplete="off"
                    onFocus={() => setIsOpen(true)}
                    onBlur={() => {
                        onTouched?.();
                        window.setTimeout(() => setIsOpen(false), 150);
                    }}
                    onChange={(e) => {
                        onType(e.target.value);
                        setIsOpen(true);
                    }}
                    placeholder={placeholder}
                    className="w-full bg-card text-14 input font-sm text-[#0B1727] outline-none placeholder:text-[#748194]"
                />
            </div>

            {isOpen && (
                <div className="absolute left-0 right-0 top-[64px] z-[80] h-[150px] overflow-y-auto rounded-2xl border border-[#E8EEF5] bg-white py-1 shadow-[0_14px_40px_rgba(11,23,39,0.12)]">
                    {filteredOptions?.length > 0 ? (
                        filteredOptions.map((item) => (
                            <button
                                key={item.value}
                                type="button"
                                onMouseDown={() => onSelect(item)}
                                className="block w-full px-4 py-2 text-left text-14 font-semibold text-[#0B1727] transition-all duration-200 hover:bg-primary/15"
                            >

                                <span className="block text-14 font-medium text-[#748194]">
                                    {item.label}
                                </span>
                            </button>
                        ))
                    ) : (
                        <div className="px-4 py-3 text-14 font-semibold text-[#748194]">
                            No category found
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default CustomDropdown;

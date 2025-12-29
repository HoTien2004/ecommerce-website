import { useState } from "react";
import { categoryFilters, type FilterGroup } from "../../data/filters";
import { Checkbox } from "../ui/checkbox";
import { Slider } from "../ui/slider";
import { formatPrice } from "../../data/products";
import { Button } from "../ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "../../lib/utils";

interface ProductFiltersProps {
  category: string;
  selectedFilters: Record<string, string[]>;
  priceRange: number[];
  onFilterChange: (key: string, values: string[]) => void;
  onPriceChange: (range: number[]) => void;
  onClearFilters: () => void;
}

export const ProductFilters = ({
  category,
  selectedFilters,
  priceRange,
  onFilterChange,
  onPriceChange,
  onClearFilters,
}: ProductFiltersProps) => {
  const filters = categoryFilters[category] || [];
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    filters.slice(0, 4).forEach((f) => {
      initial[f.key] = true;
    });
    return initial;
  });

  const toggleGroup = (key: string) => {
    setExpandedGroups((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleCheckboxChange = (groupKey: string, value: string, checked: boolean) => {
    const currentValues = selectedFilters[groupKey] || [];
    const newValues = checked
      ? [...currentValues, value]
      : currentValues.filter((v) => v !== value);
    onFilterChange(groupKey, newValues);
  };

  const hasActiveFilters = Object.values(selectedFilters).some((arr) => arr.length > 0);

  if (filters.length === 0) return null;

  return (
    <div className="space-y-4">
      {hasActiveFilters && (
        <Button variant="outline" size="sm" onClick={onClearFilters} className="w-full">
          Xóa bộ lọc
        </Button>
      )}

      {filters.map((filter: FilterGroup) => (
        <div key={filter.key} className="border-b border-border pb-4">
          <button
            onClick={() => toggleGroup(filter.key)}
            className="flex items-center justify-between w-full py-2 font-semibold text-left hover:text-primary transition-colors"
          >
            <span>{filter.name}</span>
            {expandedGroups[filter.key] ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>

          <div
            className={cn(
              "overflow-hidden transition-all duration-200",
              expandedGroups[filter.key] ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
            )}
          >
            {filter.type === "checkbox" && filter.options && (
              <div className="space-y-2 mt-2">
                {filter.options.map((option) => {
                  const isChecked = (selectedFilters[filter.key] || []).includes(option.value);
                  return (
                    <label
                      key={option.value}
                      className="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors text-sm"
                    >
                      <Checkbox
                        checked={isChecked}
                        onCheckedChange={(checked) =>
                          handleCheckboxChange(filter.key, option.value, checked as boolean)
                        }
                      />
                      <span>{option.label}</span>
                    </label>
                  );
                })}
              </div>
            )}

            {filter.type === "range" && (
              <div className="mt-4 space-y-3">
                <Slider
                  value={priceRange}
                  onValueChange={onPriceChange}
                  min={filter.min || 0}
                  max={filter.max || 100000000}
                  step={1000000}
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{formatPrice(priceRange[0])}</span>
                  <span>{formatPrice(priceRange[1])}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

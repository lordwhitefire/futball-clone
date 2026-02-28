"use client";

import { useState } from "react";
import type { ProductDescription, ProductFeatures } from "@/lib/types";
import { ChevronDown } from "lucide-react";

interface ProductDescriptionTabsProps {
  description: ProductDescription;
  features: ProductFeatures;
}

export default function ProductDescriptionTabs({
  description,
  features,
}: ProductDescriptionTabsProps) {
  const [openSection, setOpenSection] = useState<string | null>("description");

  const toggle = (key: string) => {
    setOpenSection(openSection === key ? null : key);
  };

  return (
    <div className="border-t border-border mt-8">
      {/* Description */}
      <AccordionItem
        title="Description"
        isOpen={openSection === "description"}
        onToggle={() => toggle("description")}
      >
        <div className="space-y-4">
          <p className="text-sm font-semibold text-foreground">
            {description.tagline}
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {description.intro}
          </p>
          {description.collection && (
            <p className="text-xs uppercase tracking-wider font-bold text-muted-foreground">
              Collection: {description.collection}
            </p>
          )}
          <div>
            <p className="text-sm font-bold mb-2 text-foreground">
              Key Benefits
            </p>
            <ul className="space-y-1.5">
              {description.key_benefits.map((benefit, i) => (
                <li
                  key={i}
                  className="text-sm text-muted-foreground flex items-start gap-2"
                >
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-foreground mt-1.5 flex-shrink-0" />
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {description.closing}
          </p>
        </div>
      </AccordionItem>

      {/* Technical Details */}
      <AccordionItem
        title="Technical Details"
        isOpen={openSection === "technical"}
        onToggle={() => toggle("technical")}
      >
        <div className="space-y-3">
          <DetailRow label="Range" value={description.technical_details.range} />
          <DetailRow
            label="Sole Type"
            value={description.technical_details.sole_type}
          />
          <DetailRow
            label="Upper Material"
            value={description.technical_details.upper_material}
          />
          <DetailRow
            label="Adjustment"
            value={description.technical_details.adjustment}
          />
          {description.technical_details.technologies.length > 0 && (
            <div className="flex gap-4">
              <span className="text-sm font-semibold text-foreground min-w-[120px]">
                Technologies
              </span>
              <ul className="space-y-1">
                {description.technical_details.technologies.map((tech, i) => (
                  <li key={i} className="text-sm text-muted-foreground">
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <DetailRow
            label="Recommended Use"
            value={description.technical_details.recommended_use}
          />
        </div>
      </AccordionItem>

      {/* Features */}
      <AccordionItem
        title="Features"
        isOpen={openSection === "features"}
        onToggle={() => toggle("features")}
      >
        <div className="space-y-3">
          <DetailRow label="Traction" value={features.traction} />
          <DetailRow label="Sole Material" value={features.sole_material} />
          <DetailRow label="Upper Material" value={features.upper_material} />
          <DetailRow label="Closure" value={features.closure} />
          <DetailRow label="Level" value={features.level} />
          <DetailRow label="Season" value={features.season} />
          {features.weight_grams && (
            <DetailRow
              label="Weight"
              value={`${features.weight_grams}g`}
            />
          )}
        </div>
      </AccordionItem>

      {/* Shipping */}
      <AccordionItem
        title="Shipping & Returns"
        isOpen={openSection === "shipping"}
        onToggle={() => toggle("shipping")}
      >
        <div className="space-y-3 text-sm text-muted-foreground">
          <p>
            Free shipping on orders over 100 EUR within mainland Spain.
          </p>
          <p>
            Standard delivery: 1-3 business days.
          </p>
          <p>
            Returns accepted within 30 days. Personalized products cannot be returned.
          </p>
        </div>
      </AccordionItem>
    </div>
  );
}

function AccordionItem({
  title,
  isOpen,
  onToggle,
  children,
}: {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-border">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full py-4 text-left"
      >
        <span className="text-sm font-bold uppercase tracking-wide text-foreground">
          {title}
        </span>
        <ChevronDown
          className={`h-4 w-4 text-muted-foreground transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && <div className="pb-5">{children}</div>}
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-4">
      <span className="text-sm font-semibold text-foreground min-w-[120px]">
        {label}
      </span>
      <span className="text-sm text-muted-foreground">{value}</span>
    </div>
  );
}

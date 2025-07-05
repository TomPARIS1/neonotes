'use client'

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb"

import { usePathname } from "next/navigation"
import { Fragment } from "react";

function Breadcrumbs() {
    const path = usePathname();
  const segments = path.split("/").filter(Boolean); // enlève les segments vides

  // Filter "doc" segment
  const visibleSegments = segments.filter(segment => segment !== "doc");

  return (
    <div>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>

          {visibleSegments.map((segment, index) => {
            const href = `/${visibleSegments.slice(0, index + 1).join("/")}`;
            const isLast = index === visibleSegments.length - 1;

            return (
              <Fragment key={segment}>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  {isLast ? (
                    <BreadcrumbPage>{segment}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink href={href}>{segment}</BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              </Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}

export default Breadcrumbs